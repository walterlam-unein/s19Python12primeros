export const BANK_REVISION = 'python-gp-1';
export const VERSIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const TOTAL = 12;
export const gradeFor = errors => Math.max(7, Math.min(10, 10 - errors));
export const formatGrade = grade => Number(grade).toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function equalsAnswer(a, b) {
  if (Array.isArray(b)) return Array.isArray(a) && a.length === b.length && b.every((v, i) => a[i] === v);
  return a === b;
}

export function completeAnswer(q, answer) {
  if (Array.isArray(q.answer)) return Array.isArray(answer) && answer.length === q.answer.length && answer.every(x => typeof x === 'string' && x.length > 0);
  return typeof answer === 'string' && answer.length > 0;
}

export function randomInt(max) {
  const words = new Uint32Array(1);
  if (globalThis.crypto?.getRandomValues) {
    // Rejection sampling avoids modulo bias.
    const limit = Math.floor(4294967296 / max) * max;
    do { crypto.getRandomValues(words); } while (words[0] >= limit);
    return words[0] % max;
  }
  return Math.floor(Math.random() * max);
}
export function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1); [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function newId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = randomInt(16); return (c === 'x' ? r : (r & 3) | 8).toString(16);
  });
}
export function initialAnswer(q) {
  if (q.type === 'order') {
    let order = shuffle(q.steps.map(s => s.id));
    if (equalsAnswer(order, q.answer)) order = [...order.slice(1), order[0]];
    return order;
  }
  return Array.isArray(q.answer) ? q.answer.map(() => '') : '';
}
export function chooseVersion(configured, query) {
  const requested = String(query || configured || '').toUpperCase();
  return VERSIONS.includes(requested) ? requested : VERSIONS[randomInt(6)];
}
export function cleanName(text) {
  return String(text || '').normalize('NFC').trim().replace(/\s+/g, ' ');
}
export function validName(text) {
  const name = cleanName(text);
  return name.length >= 2 && name.length <= 60 && /^[\p{L}\p{M}][\p{L}\p{M} '\u2019-]*$/u.test(name);
}
export function makeAttempt(firstName, lastName, version, classId) {
  return { revision: BANK_REVISION, id: newId(), receiptKey: newId(), classId, firstName: cleanName(firstName), lastName: cleanName(lastName), version,
    startedAt: new Date().toISOString(), index: 0, responses: [], drafts: {}, optionOrders: {}, status: 'active' };
}
export function submitAnswer(attempt, q, answer) {
  if (attempt.status !== 'active' || attempt.responses[attempt.index]) return attempt;
  if (!completeAnswer(q, answer)) throw new Error('Completa la respuesta antes de comprobar.');
  return { ...attempt, responses: [...attempt.responses, { questionId: q.id, answer: Array.isArray(answer) ? [...answer] : answer, correct: equalsAnswer(answer, q.answer) }] };
}
export function advanceAttempt(attempt) {
  if (!attempt.responses[attempt.index]) return attempt;
  if (attempt.index < TOTAL - 1) return { ...attempt, index: attempt.index + 1 };
  if (attempt.status === 'finished') return attempt;
  return { ...attempt, status: 'finished', finishedAt: new Date().toISOString(), elapsedSeconds: Math.max(0, Math.round((Date.now() - Date.parse(attempt.startedAt)) / 1000)) };
}
export function summarize(attempt) {
  const errors = attempt.responses.filter(r => !r.correct).length;
  return { errors, correct: attempt.responses.length - errors, grade: gradeFor(errors) };
}
export function validateStoredAttempt(a, classId, bank) {
  if (!a || a.revision !== BANK_REVISION || a.classId !== classId || !VERSIONS.includes(a.version) || !validName(a.firstName) || !validName(a.lastName)) return null;
  if (!/^[a-f0-9-]{36}$/i.test(a.id || '') || !/^[a-f0-9-]{36}$/i.test(a.receiptKey || '') || !Number.isFinite(Date.parse(a.startedAt))) return null;
  if (!['active', 'finished'].includes(a.status) || !Number.isInteger(a.index) || a.index < 0 || a.index >= TOTAL || !Array.isArray(a.responses)) return null;
  if (a.responses.length < a.index || a.responses.length > a.index + 1 || (a.status === 'finished' && a.responses.length !== TOTAL)) return null;
  const questions = bank[a.version];
  if (a.responses.some((r, i) => r.questionId !== questions[i].id || !completeAnswer(questions[i], r.answer))) return null;
  const drafts = {}, optionOrders = {};
  for (const q of questions) {
    const oldDraft = a.drafts?.[q.id];
    drafts[q.id] = Array.isArray(q.answer) ? (Array.isArray(oldDraft) && oldDraft.length === q.answer.length ? oldDraft : initialAnswer(q)) : (typeof oldDraft === 'string' ? oldDraft : '');
    if (q.type === 'order' && (new Set(drafts[q.id]).size !== q.steps.length || drafts[q.id].some(id => !q.steps.some(s => s.id === id)))) drafts[q.id] = initialAnswer(q);
    if (q.options) {
      const previous = a.optionOrders?.[q.id];
      optionOrders[q.id] = Array.isArray(previous) && previous.length === q.options.length && new Set(previous).size === q.options.length && previous.every(id => q.options.some(o => o.id === id)) ? previous : shuffle(q.options.map(o => o.id));
    }
  }
  return { ...a, drafts, optionOrders, responses: a.responses.map((r, i) => ({ ...r, correct: equalsAnswer(r.answer, questions[i].answer) })) };
}
