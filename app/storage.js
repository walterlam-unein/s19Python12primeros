import { validateStoredAttempt } from './engine.js';
const PREFIX = 'python-grand-prix:v1:';
export function loadAttempt(classId, bank) {
  try { return validateStoredAttempt(JSON.parse(localStorage.getItem(PREFIX + classId)), classId, bank); } catch { return null; }
}
export function storeAttempt(attempt) {
  try { localStorage.setItem(PREFIX + attempt.classId, JSON.stringify(attempt)); return true; } catch { return false; }
}
export function clearAttempt(classId) {
  try { localStorage.removeItem(PREFIX + classId); } catch { /* The app can run without storage. */ }
}
export function loadPending(classId) {
  try { const p = JSON.parse(localStorage.getItem(PREFIX + classId + ':pending') || '[]'); return Array.isArray(p) ? p : []; } catch { return []; }
}
export function queueAttempt(attempt) {
  try {
    const pending = loadPending(attempt.classId);
    const found = pending.findIndex(p => p.id === attempt.id);
    if (found >= 0) pending[found] = attempt; else pending.push(attempt);
    localStorage.setItem(PREFIX + attempt.classId + ':pending', JSON.stringify(pending));
    return true;
  } catch { return false; }
}
export function removePending(classId, id) {
  try { localStorage.setItem(PREFIX + classId + ':pending', JSON.stringify(loadPending(classId).filter(p => p.id !== id))); } catch { /* Keep a safe duplicate for an idempotent retry. */ }
}
