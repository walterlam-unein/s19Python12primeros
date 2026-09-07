import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { BANK } from '../app/questions.js';
import { makeAttempt, submitAnswer, advanceAttempt } from '../app/engine.js';
import { makePayload } from '../app/api.js';

function harness() {
  const rows = [], cache = new Map(), properties = new Map(); let locking = true;
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: row => { rows.push([...row]); },
    getRange: (r, c, n, m) => {
      const range = { getValues: () => rows.slice(r - 1, r - 1 + n).map(row => row.slice(c - 1, c - 1 + m)),
        setNumberFormat: () => range, setFontWeight: () => range, setBackground: () => range, setFontColor: () => range,
        createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => { const index = rows.findIndex((row, i) => i >= r - 1 && row[c - 1] === id); return index < 0 ? null : { getRow: () => index + 1 }; } }) }) };
      return range;
    }, setFrozenRows() {}, autoResizeColumns() {}
  };
  const ss = { getId: () => 'spreadsheet-test', getSheetByName: () => sheet, setSpreadsheetTimeZone() {} };
  const ctx = vm.createContext({ console,
    SpreadsheetApp: { getActiveSpreadsheet: () => ss, openById: id => { assert.equal(id, 'spreadsheet-test'); return ss; }, flush() {} },
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => properties.get(key), setProperty: (k, v) => properties.set(k, v) }) },
    LockService: { getScriptLock: () => ({ tryLock: () => locking, releaseLock() {} }) },
    CacheService: { getScriptCache: () => ({ get: key => cache.get(key) || null, put: (key, value) => cache.set(key, value), remove: key => cache.delete(key) }) },
    Utilities: { DigestAlgorithm: { SHA_256: 'sha256' }, Charset: { UTF_8: 'utf8' }, computeDigest: (alg, value) => [...createHash(alg).update(value).digest()], formatDate: date => date.toISOString() },
    ContentService: { MimeType: { JSON: 'json', JAVASCRIPT: 'js' }, createTextOutput: text => ({ text, setMimeType(type) { this.mimeType = type; return this; } }) }
  });
  vm.runInContext(readFileSync('google-sheets/Code.gs', 'utf8'), ctx);
  ctx.setup();
  return { ctx, rows, blockLock: () => { locking = false; } };
}
function payload(version = 'A', errorCount = 0, first = 'Ana', last = 'Ruiz') {
  let a = makeAttempt(first, last, version, 'python-2026');
  for (const [i, q] of BANK[version].entries()) {
    let answer = q.answer;
    if (i < errorCount) {
      if (q.type === 'order') answer = [...answer].reverse();
      else if (q.type === 'match') answer = answer.map(() => 'str');
      else if (q.type === 'fill') answer = q.blanks.map((b, j) => b.options.find(o => o.id !== q.answer[j]).id);
      else answer = q.options.find(o => o.id !== answer).id;
    }
    a = submitAnswer(a, q, answer); a = advanceAttempt(a);
  }
  return makePayload(a);
}
const post = (ctx, p) => JSON.parse(ctx.doPost({ postData: { contents: JSON.stringify(p) } }).text);
const get = (ctx, p) => JSON.parse(ctx.doGet({ parameter: p }).text);

test('server grades all 6 versions independently for every error count', () => {
  const { ctx, rows } = harness();
  for (const v of ['A', 'B', 'C', 'D', 'E', 'F']) for (let e = 0; e <= 12; e++) {
    const p = payload(v, e); p.grade = 10; p.errors = 0;
    const result = post(ctx, p);
    assert.equal(result.ok, true, result.error);
    assert.equal(result.grade, 10 - e * .25); assert.equal(result.errors, e);
  }
  assert.equal(rows.length, 79);
});
test('setup is repeatable, POST is idempotent, receipt is private', () => {
  const { ctx, rows } = harness(); ctx.setup(); assert.equal(rows.length, 1);
  const p = payload(); assert.ok(post(ctx, p).ok); assert.ok(post(ctx, p).ok); assert.equal(rows.length, 2);
  const status = get(ctx, { ...p, action: 'status' }); assert.equal(status.state, 'saved'); assert.equal(status.grade, 10);
  assert.equal(status.firstName, undefined); assert.equal(status.answers, undefined);
  const wrong = { ...p, receiptKey: payload().receiptKey, action: 'status' };
  assert.equal(get(ctx, wrong).state, 'pending');
  assert.equal(post(ctx, wrong).ok, false);
  assert.equal(rows[1][1].length, 64); assert.notEqual(rows[1][1], p.receiptKey);
});
test('reject incomplete, invalid, wrong group, injection and stale bank', () => {
  const { ctx, rows } = harness();
  for (const mutate of [
    p => { p.answers.pop(); }, p => { p.version = 'Z'; }, p => { p.classId = 'other'; }, p => { p.firstName = '=IMPORTXML("x")'; },
    p => { p.answers[0].answer = 'arbitrary'; }, p => { p.answers[1].answer = ['']; }, p => { p.revision = 'old'; },
    p => { p.answers[5].answer = ['s0', 's0', 's2', 's3']; }, p => { p.startedAt = 'invalid'; }, p => { p.elapsedSeconds = -1; }
  ]) { const p = payload(); mutate(p); assert.equal(post(ctx, p).ok, false); }
  assert.equal(rows.length, 1);
  const p = payload(); p.answers.pop(); post(ctx, p);
  assert.equal(get(ctx, { ...p, action: 'status' }).state, 'rejected');
});
test('leaderboard is top five unique students, best scores, stable ties, no full surnames', () => {
  const { ctx, rows } = harness();
  for (const [name, errors] of [['Ana', 4], ['Bea', 2], ['Carlos', 1], ['Diana', 0], ['Eva', 3], ['Felipe', 5], ['Gina', 6]]) post(ctx, payload('A', errors, name, 'Apellido')); 
  post(ctx, payload('B', 0, 'Ana', 'Apellido'));
  const tied = payload('C', 0, 'Hugo', 'Apellido'); post(ctx, tied);
  rows.slice(1).forEach((r, i) => { r[7] = `2026-09-07T10:${String(i).padStart(2, '0')}:00.000Z`; });
  const board = get(ctx, { action: 'leaderboard', classId: 'python-2026' });
  assert.equal(board.entries.length, 5);
  assert.deepEqual(board.entries.map(x => x.name), ['Diana A.', 'Ana A.', 'Hugo A.', 'Carlos A.', 'Bea A.']);
  assert.ok(board.entries.every(e => Object.keys(e).sort().join(',') === 'grade,name,rank'));
});
test('GET never writes, JSONP callback is constrained and locking failure is visible', () => {
  const { ctx, rows, blockLock } = harness();
  assert.equal(get(ctx, { action: 'submit', classId: 'python-2026' }).ok, false);
  const invalid = ctx.doGet({ parameter: { callback: 'alert(1)//' } }); assert.equal(invalid.mimeType, 'json');
  const valid = ctx.doGet({ parameter: { callback: 'pgp_123_456', action: 'leaderboard', classId: 'python-2026' } }); assert.match(valid.text, /^pgp_123_456\(/);
  assert.equal(rows.length, 1);
  blockLock(); assert.equal(post(ctx, payload()).ok, false); assert.equal(rows.length, 1);
});
