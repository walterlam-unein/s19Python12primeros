// ARCHIVO COMPLETO. Copia TODO su contenido en Apps Script.
const BANK_REVISION = "python-gp-1";
const ANSWER_BANK = {"A":[{"id":"A01","type":"output","answer":"o0","allowed":["o0","o1","o2","o3"]},{"id":"A02","type":"fill","answer":["o0"],"allowed":[["o0","o1","o2","o3"]]},{"id":"A03","type":"match","answer":["int","float","str","bool"],"allowed":[["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"]]},{"id":"A04","type":"output","answer":"o0","allowed":["o0","o1","o2","o3"]},{"id":"A05","type":"bug","answer":"line2","allowed":["line1","line2","line3"]},{"id":"A06","type":"order","answer":["s0","s1","s2","s3"],"allowed":[["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"]]},{"id":"A07","type":"choice","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"A08","type":"fill","answer":["o1"],"allowed":[["o0","o1","o2","o3"]]},{"id":"A09","type":"output","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"A10","type":"fill","answer":["o1"],"allowed":[["o0","o1","o2","o3"]]},{"id":"A11","type":"fill","answer":["o0"],"allowed":[["o0","o1","o2","o3"]]},{"id":"A12","type":"fill","answer":["o0","o1"],"allowed":[["o0","o1","o2","o3"],["o0","o1","o2","o3"]]}],"B":[{"id":"B01","type":"output","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"B02","type":"fill","answer":["o1"],"allowed":[["o0","o1","o2","o3"]]},{"id":"B03","type":"match","answer":["str","int","bool","float"],"allowed":[["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"]]},{"id":"B04","type":"output","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"B05","type":"bug","answer":"line3","allowed":["line1","line2","line3"]},{"id":"B06","type":"order","answer":["s0","s1","s2","s3"],"allowed":[["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"]]},{"id":"B07","type":"choice","answer":"o2","allowed":["o0","o1","o2","o3"]},{"id":"B08","type":"fill","answer":["o2"],"allowed":[["o0","o1","o2","o3"]]},{"id":"B09","type":"output","answer":"o2","allowed":["o0","o1","o2","o3"]},{"id":"B10","type":"fill","answer":["o2"],"allowed":[["o0","o1","o2","o3"]]},{"id":"B11","type":"fill","answer":["o2"],"allowed":[["o0","o1","o2","o3"]]},{"id":"B12","type":"fill","answer":["o2","o1"],"allowed":[["o0","o1","o2","o3"],["o0","o1","o2","o3"]]}],"C":[{"id":"C01","type":"output","answer":"o2","allowed":["o0","o1","o2","o3"]},{"id":"C02","type":"fill","answer":["o2"],"allowed":[["o0","o1","o2","o3"]]},{"id":"C03","type":"match","answer":["bool","str","int","float"],"allowed":[["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"]]},{"id":"C04","type":"output","answer":"o2","allowed":["o0","o1","o2","o3"]},{"id":"C05","type":"bug","answer":"line2","allowed":["line1","line2","line3"]},{"id":"C06","type":"order","answer":["s0","s1","s2","s3"],"allowed":[["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"]]},{"id":"C07","type":"choice","answer":"o2","allowed":["o0","o1","o2","o3"]},{"id":"C08","type":"fill","answer":["o3"],"allowed":[["o0","o1","o2","o3"]]},{"id":"C09","type":"output","answer":"o3","allowed":["o0","o1","o2","o3"]},{"id":"C10","type":"fill","answer":["o0"],"allowed":[["o0","o1","o2","o3"]]},{"id":"C11","type":"fill","answer":["o1"],"allowed":[["o0","o1","o2","o3"]]},{"id":"C12","type":"fill","answer":["o1","o1"],"allowed":[["o0","o1","o2","o3"],["o0","o1","o2","o3"]]}],"D":[{"id":"D01","type":"output","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"D02","type":"fill","answer":["o1"],"allowed":[["o0","o1","o2","o3"]]},{"id":"D03","type":"match","answer":["float","str","int","bool"],"allowed":[["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"]]},{"id":"D04","type":"output","answer":"o3","allowed":["o0","o1","o2","o3"]},{"id":"D05","type":"bug","answer":"line3","allowed":["line1","line2","line3"]},{"id":"D06","type":"order","answer":["s0","s1","s2","s3"],"allowed":[["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"]]},{"id":"D07","type":"choice","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"D08","type":"fill","answer":["o0"],"allowed":[["o0","o1","o2","o3"]]},{"id":"D09","type":"output","answer":"o0","allowed":["o0","o1","o2","o3"]},{"id":"D10","type":"fill","answer":["o2"],"allowed":[["o0","o1","o2","o3"]]},{"id":"D11","type":"fill","answer":["o3"],"allowed":[["o0","o1","o2","o3"]]},{"id":"D12","type":"fill","answer":["o3","o1"],"allowed":[["o0","o1","o2","o3"],["o0","o1","o2","o3"]]}],"E":[{"id":"E01","type":"output","answer":"o3","allowed":["o0","o1","o2","o3"]},{"id":"E02","type":"fill","answer":["o2"],"allowed":[["o0","o1","o2","o3"]]},{"id":"E03","type":"match","answer":["int","float","bool","str"],"allowed":[["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"]]},{"id":"E04","type":"output","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"E05","type":"bug","answer":"line2","allowed":["line1","line2","line3"]},{"id":"E06","type":"order","answer":["s0","s1","s2","s3"],"allowed":[["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"]]},{"id":"E07","type":"choice","answer":"o3","allowed":["o0","o1","o2","o3"]},{"id":"E08","type":"fill","answer":["o1"],"allowed":[["o0","o1","o2","o3"]]},{"id":"E09","type":"output","answer":"o2","allowed":["o0","o1","o2","o3"]},{"id":"E10","type":"fill","answer":["o1"],"allowed":[["o0","o1","o2","o3"]]},{"id":"E11","type":"fill","answer":["o0"],"allowed":[["o0","o1","o2","o3"]]},{"id":"E12","type":"fill","answer":["o1","o1"],"allowed":[["o0","o1","o2","o3"],["o0","o1","o2","o3"]]}],"F":[{"id":"F01","type":"output","answer":"o2","allowed":["o0","o1","o2","o3"]},{"id":"F02","type":"fill","answer":["o1"],"allowed":[["o0","o1","o2","o3"]]},{"id":"F03","type":"match","answer":["str","bool","float","int"],"allowed":[["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"],["int","float","str","bool"]]},{"id":"F04","type":"output","answer":"o2","allowed":["o0","o1","o2","o3"]},{"id":"F05","type":"bug","answer":"line3","allowed":["line1","line2","line3"]},{"id":"F06","type":"order","answer":["s0","s1","s2","s3"],"allowed":[["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"],["s0","s1","s2","s3"]]},{"id":"F07","type":"choice","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"F08","type":"fill","answer":["o2"],"allowed":[["o0","o1","o2","o3"]]},{"id":"F09","type":"output","answer":"o1","allowed":["o0","o1","o2","o3"]},{"id":"F10","type":"fill","answer":["o3"],"allowed":[["o0","o1","o2","o3"]]},{"id":"F11","type":"fill","answer":["o2"],"allowed":[["o0","o1","o2","o3"]]},{"id":"F12","type":"fill","answer":["o0","o1"],"allowed":[["o0","o1","o2","o3"],["o0","o1","o2","o3"]]}]};

/* Python Grand Prix — copiar Code.gs (generado), no este archivo por separado. */
const SETTINGS = {
  CLASS_ID: 'python-2026',
  SHEET_NAME: 'Notas Python',
  TIME_ZONE: 'America/Guayaquil'
};
const HEADERS = ['ID de entrega', 'Hash del comprobante', 'Grupo', 'Nombre', 'Apellido', 'Versión', 'Inicio declarado UTC', 'Recepción UTC', 'Fecha y hora Ecuador', 'Duración declarada (s)', 'Aciertos', 'Errores', 'Nota / 10', 'Respuestas JSON', 'Revisión del banco'];

// Ejecuta esta función una sola vez desde la hoja: crea las cabeceras y solicita
// la autorización del propietario. No se pide autorización a los estudiantes.
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Abre Apps Script desde Extensiones > Apps Script de tu hoja.');
  ss.setSpreadsheetTimeZone(SETTINGS.TIME_ZONE);
  const sheet = ss.getSheetByName(SETTINGS.SHEET_NAME) || ss.insertSheet(SETTINGS.SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  else if (JSON.stringify(sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0]) !== JSON.stringify(HEADERS)) throw new Error('La pestaña existente tiene otras columnas. Usa un nombre de pestaña nuevo en SETTINGS.SHEET_NAME.');
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#152138').setFontColor('#ffffff');
  sheet.getRange('M2:M').setNumberFormat('0.00');
  sheet.autoResizeColumns(1, 13);
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());
  console.log('Registro preparado. Ahora implementa el script como aplicación web.');
}
function sheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!id) throw new Error('El docente debe ejecutar setup antes de implementar.');
  const sheet = SpreadsheetApp.openById(id).getSheetByName(SETTINGS.SHEET_NAME);
  if (!sheet) throw new Error('No existe la pestaña de notas. Ejecuta setup.');
  return sheet;
}
function validId_(id) { return typeof id === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(id); }
function cleanName_(value) { return typeof value === 'string' ? value.normalize('NFC').trim().replace(/\s+/g, ' ') : ''; }
function validName_(value) { return value.length >= 2 && value.length <= 60 && /^[\p{L}\p{M}][\p{L}\p{M} '\u2019-]*$/u.test(value); }
function hash_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8)
    .map(byte => ('0' + ((byte + 256) % 256).toString(16)).slice(-2)).join('');
}
function receiptHash_(p) { return hash_(p.attemptId + ':' + p.receiptKey); }
function equal_(a, b) {
  if (Array.isArray(b)) return Array.isArray(a) && a.length === b.length && b.every((v, i) => a[i] === v);
  return a === b;
}
function validate_(p) {
  if (!p || p.classId !== SETTINGS.CLASS_ID) throw new Error('El grupo no coincide con el configurado por el docente.');
  if (!validId_(p.attemptId) || !validId_(p.receiptKey)) throw new Error('Identificador de entrega inválido.');
  if (p.revision !== BANK_REVISION) throw new Error('La web y el registro usan versiones distintas del banco.');
  const key = ANSWER_BANK[p.version];
  if (!key || !Array.isArray(key) || !Array.isArray(p.answers) || p.answers.length !== 12) throw new Error('La entrega debe contener los 12 ejercicios de una versión válida.');
  const firstName = cleanName_(p.firstName), lastName = cleanName_(p.lastName);
  if (!validName_(firstName) || !validName_(lastName)) throw new Error('Revisa el nombre y el apellido.');
  if (typeof p.startedAt !== 'string' || !Number.isFinite(Date.parse(p.startedAt))) throw new Error('Fecha de inicio inválida.');
  if (!Number.isInteger(p.elapsedSeconds) || p.elapsedSeconds < 0 || p.elapsedSeconds > 31536000) throw new Error('Duración inválida.');
  let errors = 0;
  p.answers.forEach((r, i) => {
    const q = key[i];
    if (!r || r.questionId !== q.id) throw new Error('Los ejercicios no corresponden a la versión enviada.');
    if (Array.isArray(q.answer)) {
      if (!Array.isArray(r.answer) || r.answer.length !== q.answer.length) throw new Error('Faltan partes de una respuesta.');
      if (r.answer.some((value, j) => typeof value !== 'string' || !q.allowed[j].includes(value))) throw new Error('Una respuesta contiene opciones inválidas.');
      if (q.type === 'order' && new Set(r.answer).size !== q.answer.length) throw new Error('Un orden contiene líneas repetidas.');
    } else if (typeof r.answer !== 'string' || !q.allowed.includes(r.answer)) throw new Error('Opción inválida.');
    if (!equal_(r.answer, q.answer)) errors++;
  });
  return { firstName, lastName, errors, correct: 12 - errors, grade: 10 - errors * 0.25 };
}
function findRow_(sheet, id) {
  if (sheet.getLastRow() < 2) return null;
  const cell = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
  return cell ? sheet.getRange(cell.getRow(), 1, 1, HEADERS.length).getValues()[0] : null;
}
function confirmation_(row) {
  return { ok: true, state: 'saved', attemptId: String(row[0]), correct: Number(row[10]), errors: Number(row[11]), grade: Number(row[12]), receivedAt: String(row[7]) };
}
function persist_(p) {
  const result = validate_(p);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) throw new Error('Hay varias entregas simultáneas. Vuelve a intentar el registro.');
  try {
    const sheet = sheet_();
    const previous = findRow_(sheet, p.attemptId);
    const receiptHash = receiptHash_(p);
    if (previous) {
      if (String(previous[1]) !== receiptHash || String(previous[2]) !== p.classId) throw new Error('El comprobante no corresponde a la entrega.');
      return confirmation_(previous);
    }
    const now = new Date();
    const row = [p.attemptId, receiptHash, p.classId, result.firstName, result.lastName, p.version,
      p.startedAt, now.toISOString(), Utilities.formatDate(now, SETTINGS.TIME_ZONE, 'yyyy-MM-dd HH:mm:ss'),
      p.elapsedSeconds, result.correct, result.errors, result.grade, JSON.stringify(p.answers), p.revision];
    sheet.appendRow(row);
    SpreadsheetApp.flush();
    CacheService.getScriptCache().remove('board:' + p.classId);
    return confirmation_(row);
  } finally { lock.releaseLock(); }
}
function doPost(e) {
  let p;
  try {
    if (!e || !e.postData || typeof e.postData.contents !== 'string' || e.postData.contents.length > 12000) throw new Error('Solicitud vacía o demasiado grande.');
    p = JSON.parse(e.postData.contents);
    return output_(persist_(p));
  } catch (error) {
    const message = error && error.message ? error.message : 'No se pudo registrar la entrega.';
    if (p && validId_(p.attemptId) && validId_(p.receiptKey)) {
      try { CacheService.getScriptCache().put('error:' + receiptHash_(p), message, 600); } catch (_) {}
    }
    return output_({ ok: false, error: message });
  }
}
function status_(p) {
  if (!validId_(p.attemptId) || !validId_(p.receiptKey)) throw new Error('Comprobante inválido.');
  const receiptHash = receiptHash_(p);
  const row = findRow_(sheet_(), p.attemptId);
  if (row && String(row[1]) === receiptHash && String(row[2]) === p.classId) return confirmation_(row);
  const error = CacheService.getScriptCache().get('error:' + receiptHash);
  return error ? { ok: true, state: 'rejected', error } : { ok: true, state: 'pending' };
}
function normalizedStudent_(first, last) {
  return (first + ' ' + last).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}
function leaderboard_(classId) {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('board:' + classId);
  if (cached) return JSON.parse(cached);
  const sheet = sheet_();
  const rows = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues();
  const best = new Map();
  rows.filter(row => String(row[2]) === classId && String(row[14]) === BANK_REVISION).forEach(row => {
    const score = Number(row[12]);
    if (!Number.isFinite(score) || score < 7 || score > 10) return;
    const student = normalizedStudent_(String(row[3]), String(row[4]));
    const entry = { name: String(row[3]).split(' ')[0] + ' ' + String(row[4]).slice(0, 1) + '.', grade: score,
      receivedAt: String(row[7]), id: String(row[0]) };
    const prev = best.get(student);
    if (!prev || entry.grade > prev.grade || (entry.grade === prev.grade && entry.receivedAt < prev.receivedAt)) best.set(student, entry);
  });
  const entries = Array.from(best.values()).sort((a, b) => b.grade - a.grade || a.receivedAt.localeCompare(b.receivedAt) || a.id.localeCompare(b.id)).slice(0, 5)
    .map((entry, index) => ({ rank: index + 1, name: entry.name, grade: entry.grade }));
  const result = { ok: true, entries, updatedAt: new Date().toISOString() };
  cache.put('board:' + classId, JSON.stringify(result), 20);
  return result;
}
function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  const callback = p.callback || '';
  // Prevent callback injection. No writes are permitted through GET/JSONP.
  if (callback && !/^pgp_[0-9]+_[0-9]+$/.test(callback)) return output_({ ok: false, error: 'Callback inválido.' });
  try {
    if (!p.action) return output_({ ok: true, service: 'Python Grand Prix', revision: BANK_REVISION }, callback);
    if (p.classId !== SETTINGS.CLASS_ID) throw new Error('El grupo no coincide con el registro.');
    if (p.action === 'leaderboard') return output_(leaderboard_(p.classId), callback);
    if (p.action === 'status') return output_(status_(p), callback);
    throw new Error('Acción no disponible.');
  } catch (error) { return output_({ ok: false, error: error.message || 'No se pudo consultar el registro.' }, callback); }
}
function output_(data, callback) {
  // Escape characters that could break a script response. User-provided names
  // are rendered as text by React; the private sheet is never returned.
  const json = JSON.stringify(data).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  return ContentService.createTextOutput(callback ? callback + '(' + json + ');' : json)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}
