import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { BANK, TOPICS } from '../app/questions.js';
import { VERSIONS, gradeFor, initialAnswer, makeAttempt, submitAnswer, advanceAttempt, summarize, validateStoredAttempt, completeAnswer, validName, equalsAnswer } from '../app/engine.js';

function wrongAnswer(q) {
  if (q.type === 'order') return [...q.answer].reverse();
  if (q.type === 'match') return q.answer.map(() => 'str');
  if (q.type === 'fill') return q.blanks.map((b, i) => b.options.find(o => o.id !== q.answer[i]).id);
  return q.options.find(o => o.id !== q.answer).id;
}
test('72 unique guided exercises, 12 topics and all six interaction types', () => {
  const all = Object.values(BANK).flat();
  assert.equal(all.length, 72); assert.equal(new Set(all.map(q => q.id)).size, 72);
  assert.equal(new Set(all.map(q => q.type)).size, 6);
  for (const version of VERSIONS) {
    assert.deepEqual(BANK[version].map(q => q.topic), TOPICS);
    for (const q of BANK[version]) {
      assert.ok(q.prompt && q.guide && q.explanation && q.verification);
      assert.ok(completeAnswer(q, q.answer));
      assert.ok(!equalsAnswer(wrongAnswer(q), q.answer));
      if (q.type === 'fill') q.answer.forEach((a, i) => assert.ok(q.blanks[i].options.some(o => o.id === a)));
      else if (q.type === 'order') assert.deepEqual(q.answer, q.steps.map(s => s.id));
      else if (q.type === 'match') q.answer.forEach(a => assert.ok(q.choices.some(c => c.id === a)));
      else assert.equal(q.options.filter(o => o.id === q.answer).length, 1);
      if (q.type === 'choice' || q.type === 'output') assert.equal(q.options.find(o => o.id === q.answer).label, q.verification.output);
      if (q.type === 'fill') {
        let assembled = q.code;
        if (q.blanks.length === 1) assembled = assembled.replace('___', q.blanks[0].options.find(o => o.id === q.answer[0]).label);
        else q.blanks.forEach((blank, i) => { assembled = assembled.replace(`[${i + 1}]`, blank.options.find(o => o.id === q.answer[i]).label); });
        assert.equal(assembled, q.solutionCode, q.id);
      }
    }
  }
});
for (const version of VERSIONS) for (let errors = 0; errors <= 12; errors++) {
  test(`version ${version}: complete flow with ${errors} errors → ${gradeFor(errors)}`, () => {
    let a = makeAttempt('María José', 'Muñoz-Lam', version, 'python-2026');
    for (const [i, q] of BANK[version].entries()) {
      assert.equal(a.index, i);
      assert.equal(advanceAttempt(a), a, 'cannot advance before answering');
      a = submitAnswer(a, q, i < errors ? wrongAnswer(q) : q.answer);
      const locked = submitAnswer(a, q, q.answer);
      assert.equal(locked, a, 'a second answer cannot overwrite the first');
      const serialized = JSON.parse(JSON.stringify(a));
      a = validateStoredAttempt(serialized, 'python-2026', BANK);
      assert.ok(a, 'refresh restores a valid state');
      a = advanceAttempt(a);
    }
    assert.equal(a.status, 'finished'); assert.equal(a.responses.length, 12);
    assert.deepEqual(summarize(a), { errors, correct: 12 - errors, grade: gradeFor(errors) });
    assert.equal(advanceAttempt(a), a, 'finishing twice is idempotent');
  });
}
test('required answers, random order and safe names', () => {
  const q = BANK.A[11];
  assert.equal(completeAnswer(q, ['o0', '']), false);
  assert.throws(() => submitAnswer(makeAttempt('Ana', 'Ruiz', 'A', 'python-2026'), BANK.A[0], ''));
  for (let n = 0; n < 100; n++) {
    const q = BANK.A[5], order = initialAnswer(q);
    assert.ok(!equalsAnswer(order, q.answer)); assert.equal(new Set(order).size, 4);
  }
  for (const name of ['María José', 'O’Connor', "D'Ávila", 'Muñoz-Lam', '李华']) assert.ok(validName(name), name);
  for (const name of ['', 'X', '=SUM(1,1)', '67', '<script>', 'Ana1', 'a'.repeat(61)]) assert.equal(validName(name), false, name);
  assert.equal(validateStoredAttempt({}, 'python-2026', BANK), null);
  assert.equal(validateStoredAttempt(makeAttempt('Ana', 'Ruiz', 'A', 'other'), 'python-2026', BANK), null);
});
test('all 72 solutions execute as Python 3; input errors and turtle geometry checked', () => {
  const result = spawnSync('python3', ['scripts/check-python.py'], { input: JSON.stringify(Object.values(BANK).flat().map(q => ({ id: q.id, ...q.verification, errorVerification: q.errorVerification }))), encoding: 'utf8', timeout: 15000 });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /72 soluciones verificadas/);
});
test('GitHub Pages root contains all application code and styles inline', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.ok(existsSync('.nojekyll'));
  assert.match(html, /src="\.\/config\.js"/);
  assert.doesNotMatch(html, /src="[^"\n]*\.jsx"|type="module"/);
  assert.doesNotMatch(html, /(?:src|href)="\.\/assets\//);
  assert.match(html, /<style>[\s\S]*\.site-header/);
  assert.ok(html.length > 200000);
  assert.match(readFileSync('package-lock.json', 'utf8'), /19\.2\.7/);
});
