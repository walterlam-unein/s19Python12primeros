import { BANK_REVISION } from './engine.js';

export function endpointValid(endpoint) {
  if (!endpoint) return false;
  try {
    const url = new URL(endpoint);
    return url.origin === 'https://script.google.com' && /^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url.pathname) && !url.search && !url.hash;
  } catch { return false; }
}

// JSONP is used only for read-only, non-sensitive responses. Student names and
// answers are sent in the POST body, never in a query string.
export function jsonp(endpoint, params, timeoutMs = 16000) {
  return new Promise((resolve, reject) => {
    if (!endpointValid(endpoint)) return reject(new Error('La dirección del registro no es válida. Comunícalo al docente.'));
    const callback = 'pgp_' + crypto.getRandomValues(new Uint32Array(2)).join('_');
    const script = document.createElement('script');
    let finished = false;
    let timer;
    const cleanup = () => {
      clearTimeout(timer); script.remove();
      // A late network callback must not throw after a timeout.
      window[callback] = () => {};
      setTimeout(() => { delete window[callback]; }, 60000);
    };
    const settle = (fn, value) => { if (!finished) { finished = true; cleanup(); fn(value); } };
    window[callback] = data => {
      if (!data || data.ok !== true) settle(reject, new Error(data?.error || 'El registro no respondió correctamente.'));
      else settle(resolve, data);
    };
    script.onerror = () => settle(reject, new Error('No se pudo contactar con el registro. Revisa la conexión y vuelve a intentarlo.'));
    const url = new URL(endpoint);
    Object.entries({ ...params, callback, _: Date.now() }).forEach(([key, value]) => url.searchParams.set(key, String(value)));
    script.src = url.href;
    script.referrerPolicy = 'no-referrer';
    timer = setTimeout(() => settle(reject, new Error('El registro está tardando en responder. Tu resultado sigue guardado aquí.')), timeoutMs);
    document.head.appendChild(script);
  });
}

export const loadLeaderboard = (endpoint, classId) => jsonp(endpoint, { action: 'leaderboard', classId });
export function makePayload(attempt) {
  if (attempt.status !== 'finished' || attempt.responses.length !== 12) throw new Error('Completa los 12 ejercicios antes de registrar.');
  return { revision: BANK_REVISION, attemptId: attempt.id, receiptKey: attempt.receiptKey, classId: attempt.classId, firstName: attempt.firstName,
    lastName: attempt.lastName, version: attempt.version, startedAt: attempt.startedAt, elapsedSeconds: attempt.elapsedSeconds,
    answers: attempt.responses.map(r => ({ questionId: r.questionId, answer: r.answer })) };
}

export async function saveResult(endpoint, attempt, adapters = {}) {
  const read = adapters.read || jsonp;
  const post = adapters.post || fetch;
  const pause = adapters.pause || (ms => new Promise(resolve => setTimeout(resolve, ms)));
  const payload = makePayload(attempt);
  if (!endpointValid(endpoint)) throw new Error('Falta conectar el registro. Tu resultado está guardado en este dispositivo.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    // text/plain is a simple request, avoiding an unsupported CORS preflight.
    // An opaque response is NEVER interpreted as successful persistence.
    await post(endpoint, { method: 'POST', mode: 'no-cors', redirect: 'follow', credentials: 'omit',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), signal: controller.signal });
  } catch {
    // The request may have reached Sheets even if the browser lost its response.
    // Confirm by receipt before deciding that the save failed.
  } finally { clearTimeout(timeout); }
  let lastError;
  for (let i = 0; i < 4; i++) {
    if (i) await pause(i * 1200);
    try {
      const result = await read(endpoint, { action: 'status', classId: attempt.classId, attemptId: attempt.id, receiptKey: attempt.receiptKey });
      if (result.state === 'saved') {
        if (result.attemptId !== attempt.id || !Number.isInteger(result.errors) || result.errors < 0 || result.errors > 12 || result.grade !== 10 - result.errors * 0.25) throw new Error('La confirmación del registro no es válida.');
        return result;
      }
      if (result.state === 'rejected') throw Object.assign(new Error(result.error || 'El registro rechazó los datos. Comunícalo al docente.'), { rejected: true });
      lastError = new Error('El guardado todavía no está confirmado. Pulsa Reintentar registro; no se duplicará la entrega.');
    } catch (error) { if (error.rejected) throw error; lastError = error; }
  }
  throw lastError || new Error('No se pudo confirmar el registro. Reintenta cuando vuelva la conexión.');
}
