import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
const app = scripts.filter(m => !m[1].includes('src=')).at(-1)[2];

test('the exact delivered app bundle executes as a classic script without module imports', () => {
  for (const url of ['file:///C:/clase/index.html', 'https://docente.github.io/python-grand-prix/', 'https://docente.github.io/']) {
    const context = vm.createContext({ console, setTimeout, clearTimeout, window: { location: { href: url } } });
    vm.runInContext(app, context, { timeout: 5000 });
    assert.equal(typeof context.PythonGrandPrix.App, 'function');
    assert.equal(typeof context.PythonGrandPrix.Exercise, 'function');
  }
  assert.equal(scripts.filter(m => m[1].includes('src=')).length, 1, 'only optional teacher config is an external script');
  assert.doesNotMatch(html, /<script[^>]*type="module"/);
});

test('the bundle preserves supplied Google Sheets configuration without requiring it to start', () => {
  const supplied = { googleScriptUrl: 'https://script.google.com/macros/s/test_deployment/exec', classId: 'grupo-test', courseName: 'Mi clase' };
  const context = vm.createContext({ console, setTimeout, clearTimeout, window: { PYTHON_GP_CONFIG: supplied } });
  vm.runInContext(app, context, { timeout: 5000 });
  assert.equal(context.window.PYTHON_GP_CONFIG, supplied);
  assert.equal(typeof context.PythonGrandPrix.App, 'function');
});

test('startup reports failure instead of retaining loading, and stops its timer on success', () => {
  const startup = readFileSync('app/startup.js', 'utf8');
  function harness() {
    const events = {}, timers = new Map();
    const root = { children: [], replaceChildren(...items) { this.children = items; } };
    const context = vm.createContext({
      window: { addEventListener: (name, fn) => { events[name] = fn; }, location: { reload() {} } },
      document: { getElementById: () => root, createElement: name => ({ name, children: [], appendChild(item) { this.children.push(item); } }) },
      setTimeout: fn => { timers.set(1, fn); return 1; }, clearTimeout: id => timers.delete(id)
    });
    vm.runInContext(startup, context);
    return { root, events, timers, context };
  }
  const fail = harness(); fail.timers.get(1)();
  assert.equal(fail.root.children[0].children[0].textContent, 'No se pudo iniciar la actividad');
  const success = harness(); success.context.window.PYTHON_GP_READY = true; success.events['python-gp-ready']();
  assert.equal(success.timers.size, 0); assert.equal(success.root.children.length, 0);
  const error = harness(); error.events.error({ message: 'Startup error', filename: 'index.html' });
  assert.equal(error.root.children[0].children[3].textContent, 'Detalle: Startup error');
});
