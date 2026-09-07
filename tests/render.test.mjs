import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { writeFile, unlink } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { BANK } from '../app/questions.js';
import { makeAttempt, initialAnswer, submitAnswer, advanceAttempt } from '../app/engine.js';

test('React renders landing, all 72 exercise views, feedback, turtle, calculator and results', async () => {
  const modulePath = new URL('./.render-probe.mjs', import.meta.url);
  const compiled = await build({ entryPoints: ['app/main.jsx'], bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', loader: { '.css': 'empty' }, external: ['react', 'react-dom', 'react-dom/client', 'react-dom/server'], write: false, logLevel: 'silent' });
  await writeFile(modulePath, compiled.outputFiles[0].contents);
  try {
    const { App, Exercise, Results, CalculatorDemo, TurtleDemo } = await import(modulePath.href);
    const landing = renderToString(createElement(App));
    assert.match(landing, /Tu próxima/); assert.match(landing, /first-name/); assert.match(landing, /Top 5/);
    for (const version of Object.keys(BANK)) {
      let attempt = makeAttempt('Ana', 'Ruiz', version, 'python-2026');
      for (const q of BANK[version]) {
        attempt.drafts[q.id] = initialAnswer(q);
        if (q.options) attempt.optionOrders[q.id] = q.options.map(o => o.id);
      }
      for (const q of BANK[version]) {
        const before = renderToString(createElement(Exercise, { attempt }));
        assert.match(before, /Comprobar respuesta/); assert.ok(before.includes(q.title), q.id);
        assert.equal((before.match(/<progress /g) || []).length, 1);
        attempt = submitAnswer(attempt, q, q.answer);
        const after = renderToString(createElement(Exercise, { attempt }));
        assert.match(after, /Respuesta correcta/);
        assert.doesNotMatch(after, /Comprobar respuesta/);
        attempt = advanceAttempt(attempt);
      }
      const results = renderToString(createElement(Results, { attempt }));
      assert.match(results, /Recorrido completo/); assert.match(results, /10,00/);
    }
    assert.match(renderToString(createElement(CalculatorDemo, { op: '/', a: 3, b: 0 })), /No se puede dividir entre cero/);
    assert.match(renderToString(createElement(TurtleDemo, { sides: 4, turn: 90, length: 80 })), /Polígono de 4 lados/);
  } finally { await unlink(modulePath); }
});
