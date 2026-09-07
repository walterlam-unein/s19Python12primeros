import test from 'node:test';
import assert from 'node:assert/strict';
import { endpointValid, makePayload, saveResult } from '../app/api.js';
import { BANK } from '../app/questions.js';
import { makeAttempt, submitAnswer, advanceAttempt } from '../app/engine.js';
const URL = 'https://script.google.com/macros/s/test_deployment/exec';
function finished() { let a = makeAttempt('Ana', 'Ruiz', 'A', 'python-2026'); for (const q of BANK.A) { a = submitAnswer(a, q, q.answer); a = advanceAttempt(a); } return a; }
const pause = async () => {};
test('Apps Script URL validation', () => {
  assert.ok(endpointValid(URL));
  for (const url of ['', 'http://script.google.com/macros/s/x/exec', URL.replace('/exec', '/dev'), 'https://evil.example/exec', URL + '?x=1']) assert.equal(endpointValid(url), false);
});
test('payload omits the browser grade and correctness flags', () => {
  const p = makePayload(finished());
  assert.equal('grade' in p, false); assert.equal('correct' in p.answers[0], false); assert.equal(p.answers.length, 12);
});
test('an opaque POST response alone never confirms a save', async () => {
  let reads = 0;
  await assert.rejects(saveResult(URL, finished(), { pause, post: async () => ({ type: 'opaque' }), read: async () => { reads++; return { ok: true, state: 'pending' }; } }), /no está confirmado/);
  assert.equal(reads, 4);
});
test('a lost POST response can still be confirmed by its receipt', async () => {
  const a = finished();
  const data = await saveResult(URL, a, { pause, post: async () => { throw new Error('lost connection'); }, read: async () => ({ ok: true, state: 'saved', attemptId: a.id, errors: 0, grade: 10, receivedAt: new Date().toISOString() }) });
  assert.equal(data.grade, 10);
});
test('pending then committed, server rejection, mismatched receipts', async () => {
  const a = finished(); let reads = 0;
  const saved = await saveResult(URL, a, { pause, post: async () => {}, read: async () => ++reads < 2 ? { ok: true, state: 'pending' } : { ok: true, state: 'saved', attemptId: a.id, errors: 2, grade: 9.5 } });
  assert.equal(saved.grade, 9.5); assert.equal(reads, 2);
  await assert.rejects(saveResult(URL, a, { pause, post: async () => {}, read: async () => ({ state: 'rejected', error: 'Grupo incorrecto' }) }), /Grupo incorrecto/);
  await assert.rejects(saveResult(URL, a, { pause, post: async () => {}, read: async () => ({ state: 'saved', attemptId: 'wrong', errors: 0, grade: 10 }) }), /confirmación/);
});
