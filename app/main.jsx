import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BANK, TOPICS, solutionText } from './questions.js';
import { TOTAL, advanceAttempt, chooseVersion, completeAnswer, formatGrade, initialAnswer, makeAttempt, shuffle, submitAnswer, summarize, validName } from './engine.js';
import { clearAttempt, loadAttempt, loadPending, queueAttempt, removePending, storeAttempt } from './storage.js';
import { endpointValid, loadLeaderboard, saveResult } from './api.js';
import './styles.css';

const rawConfig = typeof window === 'undefined' ? {} : window.PYTHON_GP_CONFIG || {};
const config = { googleScriptUrl: String(rawConfig.googleScriptUrl || '').trim(), classId: String(rawConfig.classId || 'python-2026').trim(), courseName: String(rawConfig.courseName || 'Laboratorio de Python').slice(0, 90), version: rawConfig.version || 'aleatoria' };
const connected = endpointValid(config.googleScriptUrl);

function Icon({ name, size = 20, ...props }) {
  const paths = {
    arrow: <><path d="M4 12h15m-6-6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    up: <path d="m6 15 6-6 6 6" />,
    down: <path d="m6 9 6 6 6-6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    refresh: <><path d="M20 10a8 8 0 1 0-1 7M20 4v6h-6" /></>,
    code: <><path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18" /></>,
    flag: <><path d="M5 21V3m0 0h14l-3 4 3 4H5" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-10v1" /></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.code}</svg>;
}

function Header() {
  return <header className="site-header"><div className="brand"><span className="brand-mark">py<span>.</span></span><div>PYTHON<span className="brand-sub">GRAND PRIX</span></div></div><div className="header-right"><span className="edition"><span className="italy" aria-hidden="true" />EDICIÓN ITALIA</span><span className="course">{config.courseName}</span></div></header>;
}
function Footer() { return <footer className="site-footer"><span>Python 3 · Aprende haciendo</span><span>La precisión cuenta. El tiempo no resta.</span></footer>; }

function CodeBlock({ code, title = 'Python 3', activeLine }) {
  function highlight(line) {
    const tokens = line.match(/("[^"\n]*"|'[^'\n]*'|#.*$|\b(?:def|return|if|else|for|in|while|import|True|False|print|input|int|float|range|len)\b|\b\d+(?:\.\d+)?\b|___|\[[12]\])/g);
    if (!tokens) return line || ' ';
    const pieces = []; let pos = 0;
    tokens.forEach((token, i) => { const at = line.indexOf(token, pos); pieces.push(line.slice(pos, at)); const cls = token.startsWith('#') ? 'syntax-comment' : /^["']/.test(token) ? 'syntax-string' : /^\d/.test(token) ? 'syntax-number' : token === '___' || /^\[[12]\]$/.test(token) ? 'syntax-blank' : 'syntax-key'; pieces.push(<span className={cls} key={i}>{token}</span>); pos = at + token.length; });
    pieces.push(line.slice(pos)); return pieces;
  }
  return <div className="code-window"><div className="code-toolbar"><span><Icon name="code" size={15} /> {title}</span><span className="code-language">.py</span></div><pre tabIndex={0} aria-label="Código Python"><code>{code.split('\n').map((line, i) => <span className={'code-line' + (activeLine === i + 1 ? ' line-active' : '')} key={i}><span className="line-number" aria-hidden="true">{i + 1}</span><span>{highlight(line)}</span></span>)}</code></pre></div>;
}

function Leaderboard({ refreshKey = 0 }) {
  const [state, setState] = useState({ loading: false, entries: [], error: '' });
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (!connected) return;
    let alive = true;
    setState(s => ({ ...s, loading: true, error: '' }));
    loadLeaderboard(config.googleScriptUrl, config.classId).then(data => {
      if (alive) setState({ loading: false, entries: Array.isArray(data.entries) ? data.entries.slice(0, 5) : [], error: '' });
    }).catch(error => { if (alive) setState(s => ({ ...s, loading: false, error: error.message })); });
    return () => { alive = false; };
  }, [refresh, refreshKey]);
  return <section className="leaderboard card" aria-labelledby="board-title"><div className="section-heading"><div><span className="eyebrow">CLASIFICACIÓN</span><h2 id="board-title">Top 5</h2></div>{connected && <button type="button" className="icon-button" aria-label="Actualizar clasificación" disabled={state.loading} onClick={() => setRefresh(n => n + 1)}><Icon name="refresh" /></button>}</div>
    {!connected ? <p className="empty-board">El Top 5 estará disponible cuando el docente conecte el registro de la clase.</p> : state.loading && !state.entries.length ? <p role="status" className="empty-board">Consultando resultados…</p> : state.error ? <div className="board-error" role="status"><p>No se pudo actualizar la clasificación.</p><button className="text-button" onClick={() => setRefresh(n => n + 1)}>Volver a consultar</button></div> : !state.entries.length ? <p className="empty-board">Todavía no hay entregas.<br />La primera posición está abierta.</p> : <ol className="ranking">{state.entries.map((entry, i) => <li key={i}><span className={'rank ' + (i === 0 ? 'first-rank' : '')}>{String(i + 1).padStart(2, '0')}</span><span className="rank-name">{entry.name}</span><strong>{formatGrade(entry.grade)}<small>/10</small></strong></li>)}</ol>}
    <p className="board-note">Mejor nota por estudiante. En empate, primera entrega registrada. Los apellidos se abrevian.</p>
  </section>;
}

function Landing({ attempt, onStart, onResume, onReset, syncStatus, onSync, pendingCount, refreshKey }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formError, setFormError] = useState('');
  const firstRef = useRef(null), lastRef = useRef(null);
  const hasResume = attempt && attempt.status === 'active';
  function start(event) {
    event.preventDefault();
    if (!validName(firstName)) { setFormError('Escribe tu nombre: entre 2 y 60 caracteres, sin números.'); firstRef.current?.focus(); return; }
    if (!validName(lastName)) { setFormError('Escribe tu apellido: entre 2 y 60 caracteres, sin números.'); lastRef.current?.focus(); return; }
    setFormError(''); onStart(firstName, lastName);
  }
  return <main id="main" className="landing main-width"><section className="intro"><div className="intro-kicker"><span className="red-line" />12 RETOS · 6 VERSIONES</div><h1>Tu próxima<br />vuelta: <span>Python.</span></h1><p className="intro-copy">Lee código, encuentra errores y completa instrucciones. Un reto a la vez, hasta construir una calculadora.</p>
    <div className="intro-stats"><div><strong>12</strong><span>ejercicios guiados</span></div><div><strong>7—10</strong><span>calificación final</span></div><div><strong>A—F</strong><span>versión asignada</span></div></div>
    <div className="how-to"><span className="eyebrow">ANTES DE ARRANCAR</span><ol><li><span>01</span><p>Lee la explicación y prepara tu respuesta.</p></li><li><span>02</span><p>Compruébala una vez. Cada error resta <strong>0,25</strong>.</p></li><li><span>03</span><p>Revisa la solución y pasa al siguiente reto.</p></li></ol><p className="small muted">Las preguntas con varias piezas cuentan como un ejercicio. No hay límite de tiempo.</p></div>
    <details className="topic-details"><summary>Los 12 temas del recorrido</summary><div className="topic-chips">{TOPICS.map(topic => <span key={topic}>{topic}</span>)}</div></details>
  </section><aside className="start-column"><section className="start-card card"><div className="section-heading"><div><span className="eyebrow">PARRILLA DE SALIDA</span><h2>{hasResume ? 'Tu reto sigue aquí' : 'Prepara tu salida'}</h2></div><span className="number-tag">01/12</span></div>
    {hasResume ? <div className="resume"><p><strong>{attempt.firstName} {attempt.lastName}</strong></p><p>Versión {attempt.version} · {attempt.responses.length} de 12 respuestas comprobadas.</p><button className="button primary" onClick={onResume}>Continuar mi actividad <Icon name="arrow" /></button><button className="text-button" onClick={onReset}>Este no es mi nombre</button></div> : <form onSubmit={start} noValidate><div className="form-field"><label htmlFor="first-name">Nombre</label><input id="first-name" ref={firstRef} autoComplete="given-name" maxLength={60} placeholder="Tu nombre" value={firstName} onChange={e => setFirstName(e.target.value)} required /></div><div className="form-field"><label htmlFor="last-name">Apellido</label><input id="last-name" ref={lastRef} autoComplete="family-name" maxLength={60} placeholder="Tu apellido" value={lastName} onChange={e => setLastName(e.target.value)} required /></div>{formError && <p className="form-error" role="alert">{formError}</p>}<button type="submit" className="button primary">Comenzar los 12 retos <Icon name="arrow" /></button><p className="privacy-note">{connected ? 'Tu nombre, apellido, respuestas y nota se enviarán al registro del docente al terminar. En el Top 5 solo se verá tu nombre y la inicial del apellido.' : 'Modo práctica: tu avance se conserva en este navegador. El registro de la clase aún no está conectado.'}</p></form>}
    {config.googleScriptUrl && !connected && <p className="form-error" role="status">La dirección del registro necesita revisión del docente. Puedes practicar.</p>}
  </section><Leaderboard refreshKey={refreshKey} />{pendingCount > 0 && connected && <div className="pending-note"><span>{pendingCount} entrega(s) de este dispositivo pendiente(s) de registro.</span><button className="text-button" disabled={syncStatus === 'saving'} onClick={onSync}>{syncStatus === 'saving' ? 'Registrando…' : 'Reintentar registro'}</button></div>}</aside></main>;
}

function AnswerControls({ q, value, onChange, locked, optionOrder }) {
  if (q.type === 'match') return <div className="match-list">{q.items.map((item, i) => <div className="match-row" key={i}><label htmlFor={`${q.id}-type-${i}`}><code>{item.label}</code></label><select id={`${q.id}-type-${i}`} disabled={locked} value={value[i] || ''} onChange={e => onChange(value.map((v, j) => j === i ? e.target.value : v))}><option value="">Elige un tipo</option>{q.choices.map(option => <option value={option.id} key={option.id}>{option.label}</option>)}</select></div>)}</div>;
  if (q.type === 'fill') return <div className="fill-list">{q.blanks.map((blank, i) => <div className="form-field" key={i}><label htmlFor={`${q.id}-blank-${i}`}>{blank.label}</label><select id={`${q.id}-blank-${i}`} disabled={locked} value={value[i] || ''} onChange={e => onChange(value.map((v, j) => j === i ? e.target.value : v))}><option value="">Selecciona una opción</option>{blank.options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}</select></div>)}</div>;
  if (q.type === 'order') {
    function move(index, offset) { const copy = [...value]; [copy[index], copy[index + offset]] = [copy[index + offset], copy[index]]; onChange(copy); }
    return <ol className="order-list" aria-label="Líneas para ordenar">{value.map((id, i) => <li key={id}><span className="order-number">{i + 1}</span><code>{q.steps.find(s => s.id === id)?.code}</code><div className="order-controls"><button type="button" className="icon-button" disabled={locked || i === 0} aria-label={`Subir línea ${i + 1}: ${q.steps.find(s => s.id === id)?.code.trim()}`} onClick={() => move(i, -1)}><Icon name="up" size={18} /></button><button type="button" className="icon-button" disabled={locked || i === value.length - 1} aria-label={`Bajar línea ${i + 1}: ${q.steps.find(s => s.id === id)?.code.trim()}`} onClick={() => move(i, 1)}><Icon name="down" size={18} /></button></div></li>)}</ol>;
  }
  const choices = optionOrder?.map(id => q.options.find(o => o.id === id)).filter(Boolean) || q.options;
  return <fieldset className={'option-list ' + (q.type === 'bug' ? 'bug-options' : '')}><legend className="sr-only">Selecciona una respuesta</legend>{choices.map((option, i) => <label className={'option ' + (value === option.id ? 'selected' : '') + (locked ? ' locked' : '')} key={option.id}><input type="radio" name={q.id} value={option.id} checked={value === option.id} disabled={locked} onChange={() => onChange(option.id)} /><span className="option-letter">{String.fromCharCode(65 + i)}</span><span className={q.type === 'output' || q.type === 'bug' ? 'option-code' : ''}>{option.label}</span>{value === option.id && <Icon name="check" size={18} />}</label>)}</fieldset>;
}

function TurtleDemo({ sides, length, turn }) {
  const [run, setRun] = useState(0);
  let x = 0, y = 0, angle = 0;
  const points = [[x, y]];
  for (let i = 0; i < sides; i++) { x += length * Math.cos(angle * Math.PI / 180); y += length * Math.sin(angle * Math.PI / 180); points.push([x, y]); angle += turn; }
  const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
  const minX = Math.min(...xs), minY = Math.min(...ys), width = Math.max(...xs) - minX, height = Math.max(...ys) - minY;
  const pad = 24;
  return <div className="demo-block"><div><h3>Así se cierra el recorrido</h3><p>{sides} avances de {length} · giro de {turn}°</p><button type="button" className="button secondary compact" onClick={() => setRun(n => n + 1)}><Icon name="refresh" size={17} />Repetir dibujo</button></div><svg className="turtle-diagram" viewBox={`${minX - pad} ${minY - pad} ${width + 2 * pad} ${height + 2 * pad}`} role="img" aria-label={`Polígono de ${sides} lados, con giros exteriores de ${turn} grados`}><polyline key={run} className="turtle-path" points={points.map(p => p.join(',')).join(' ')} pathLength="1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" /><circle cx="0" cy="0" r="4" fill="currentColor" /></svg></div>;
}
function CalculatorDemo({ op, a: startA, b: startB }) {
  const [a, setA] = useState(String(startA));
  const [b, setB] = useState(String(startB));
  const n = Number(a), m = Number(b);
  let result;
  if (a.trim() === '' || b.trim() === '' || !Number.isFinite(n) || !Number.isFinite(m)) result = 'Escribe dos números';
  else if (op === '/' && m === 0) result = 'No se puede dividir entre cero';
  else { const calc = op === '+' ? n + m : op === '-' ? n - m : op === '*' ? n * m : n / m; result = Number.isFinite(calc) ? new Intl.NumberFormat('es-EC', { maximumFractionDigits: 8 }).format(calc) : 'El resultado es demasiado grande'; }
  return <div className="calculator-demo"><h3>Pruébala con otros números</h3><p className="small muted">Esta simulación sigue la operación del ejercicio. No cambia tu nota.</p><div className="calc-row"><label><span>Primer número</span><input type="number" step="any" value={a} onChange={e => setA(e.target.value)} /></label><span className="calc-symbol">{op === '*' ? '×' : op === '/' ? '÷' : op}</span><label><span>Segundo número</span><input type="number" step="any" value={b} onChange={e => setB(e.target.value)} /></label></div><output className="calc-result" aria-live="polite">= {result}</output></div>;
}

const TYPE_LABELS = { choice: 'Elige la respuesta', output: 'Predice la salida', fill: 'Completa el código', bug: 'Detecta el error', order: 'Ordena las líneas', match: 'Relaciona los tipos' };
function Exercise({ attempt, onAnswer, onDraft, onNext }) {
  const q = BANK[attempt.version][attempt.index];
  const response = attempt.responses[attempt.index];
  const locked = !!response;
  const value = response ? response.answer : attempt.drafts[q.id];
  const heading = useRef(null), feedback = useRef(null);
  const [error, setError] = useState('');
  useEffect(() => { setError(''); heading.current?.focus(); window.scrollTo({ top: 0, behavior: 'instant' }); }, [q.id]);
  useEffect(() => { if (locked) feedback.current?.focus(); }, [locked]);
  const count = attempt.responses.length;
  function check(event) {
    event.preventDefault();
    if (!completeAnswer(q, value)) { setError('Completa todas las partes antes de comprobar tu respuesta.'); return; }
    setError(''); onAnswer(q, value);
  }
  return <main id="main" className="exercise-page main-width"><div className="exercise-top"><div><span className="eyebrow">{attempt.firstName} {attempt.lastName}</span><p>Versión {attempt.version}<span className="separator">/</span>Reto {String(q.number).padStart(2, '0')} de 12</p></div><span className="progress-count">{count}<small> / 12</small></span></div><progress className="progress-bar" value={count} max={TOTAL} aria-label={`${count} de 12 ejercicios respondidos`} /><div className="progress-stages" aria-hidden="true"><span className={q.number <= 4 ? 'current' : ''}>01–04 · Fundamentos</span><span className={q.number >= 5 && q.number <= 8 ? 'current' : ''}>05–08 · Lógica</span><span className={q.number >= 9 ? 'current' : ''}>09–12 · Aplicación</span></div>
    <section className="exercise-card card"><div className="exercise-heading"><span className="topic-label">{q.topic}</span><span className="mode-label">{TYPE_LABELS[q.type]}</span></div><h1 tabIndex={-1} ref={heading}>{q.title}</h1><p className="question-prompt">{q.prompt}</p><div className="guide"><Icon name="info" size={20} /><p>{q.guide}</p></div><form onSubmit={check}><div className={'exercise-work ' + (q.code ? 'has-code' : '')}>{q.code && <CodeBlock code={q.code} activeLine={q.type === 'bug' && value ? Number(String(value).replace('line', '')) : undefined} />}<div className="answer-panel"><p className="answer-label">{q.type === 'order' ? 'Tu secuencia' : 'Tu respuesta'}</p><AnswerControls q={q} value={value} locked={locked} onChange={v => onDraft(q.id, v)} optionOrder={attempt.optionOrders[q.id]} /></div></div>{error && <p className="form-error" role="alert">{error}</p>}
    {!locked ? <div className="exercise-actions"><p>La primera respuesta es la que cuenta.</p><button className="button primary" type="submit">Comprobar respuesta <Icon name="check" /></button></div> : <div className="feedback-wrap"><div className={'feedback ' + (response.correct ? 'correct' : 'incorrect')} ref={feedback} tabIndex={-1} role="status"><span className="feedback-icon"><Icon name={response.correct ? 'check' : 'info'} /></span><div><h2>{response.correct ? 'Respuesta correcta' : 'Un detalle para corregir'}</h2><p>{q.explanation}</p>{!response.correct && <p className="penalty">Este ejercicio descuenta 0,25 puntos.</p>}</div></div>{!response.correct && <div className="solution"><strong>Respuesta del ejercicio</strong><pre>{solutionText(q)}</pre></div>}{q.solutionCode && <details className="solution-details"><summary>Ver el código completo</summary><CodeBlock code={q.solutionCode} title="Solución explicada" /></details>}{q.turtle && <TurtleDemo {...q.turtle} />}{q.calculator && <CalculatorDemo {...q.calculator} />}<div className="exercise-actions"><p>{response.correct ? 'Continúa cuando hayas revisado la explicación.' : 'Lee la corrección antes de avanzar.'}</p><button type="button" className="button primary" onClick={onNext}>{q.number === TOTAL ? 'Ver mi resultado' : 'Siguiente reto'}<Icon name={q.number === TOTAL ? 'flag' : 'arrow'} /></button></div></div>}</form></section><p className="exercise-footnote">{q.number < 12 ? 'Lee con calma. Las pistas forman parte de la actividad.' : 'Último reto. Revisa cómo se conectan las piezas.'}</p></main>;
}

function downloadReceipt(attempt) {
  const score = summarize(attempt);
  const text = `PYTHON GRAND PRIX — RESULTADO\nEstudiante: ${attempt.firstName} ${attempt.lastName}\nGrupo: ${attempt.classId}\nVersión: ${attempt.version}\nNota: ${formatGrade(attempt.receipt?.grade ?? score.grade)} / 10\nAciertos: ${score.correct}/12\nErrores: ${score.errors}\nFinalización del dispositivo: ${attempt.finishedAt}\nRegistro confirmado: ${attempt.receipt ? attempt.receipt.receivedAt : 'PENDIENTE; este archivo no confirma un registro en Google Sheets'}\nID de entrega: ${attempt.id}\n\n${attempt.responses.map((r, i) => `${i + 1}. ${TOPICS[i]}: ${r.correct ? 'Correcto' : 'Incorrecto'}`).join('\n')}\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `resultado-python-${attempt.id.slice(0, 8)}.txt`; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function Results({ attempt, syncStatus, syncError, onSync, onReset, refreshKey }) {
  const score = summarize(attempt);
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <main id="main" className="results-page main-width"><div className="results-intro"><span className="eyebrow">BANDERA A CUADROS · VERSIÓN {attempt.version}</span><h1 ref={heading} tabIndex={-1}>Recorrido completo.</h1><p>{attempt.firstName} {attempt.lastName}, has resuelto los 12 retos.</p></div><div className="results-grid"><section className="result-card card"><div className="result-score"><span className="eyebrow">TU CALIFICACIÓN</span><div><strong>{formatGrade(attempt.receipt?.grade ?? score.grade)}</strong><span>/ 10</span></div><p>10 − ({score.errors} × 0,25)</p></div><div className="result-stats"><div><strong>{score.correct}<small>/12</small></strong><span>Aciertos</span></div><div><strong>{score.errors}</strong><span>Errores</span></div><div><strong>12<small>/12</small></strong><span>Completados</span></div></div>
    <div className={'save-state ' + (attempt.receipt ? 'saved' : '')} role="status"><Icon name={attempt.receipt ? 'check' : 'info'} /><div><strong>{attempt.receipt ? 'Nota registrada' : syncStatus === 'saving' ? 'Confirmando el registro…' : connected ? 'Registro pendiente' : 'Resultado en este dispositivo'}</strong><p>{attempt.receipt ? `Entrega confirmada el ${new Date(attempt.receipt.receivedAt).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })} (Ecuador).` : syncStatus === 'saving' ? 'Espera la confirmación antes de cerrar la página.' : syncError || (connected ? 'Tu resultado se conserva aquí. Puedes volver a intentar el envío.' : 'El docente aún no ha conectado Google Sheets. Descarga tu resultado.')}</p></div></div>{connected && !attempt.receipt && <button className="button primary" disabled={syncStatus === 'saving'} onClick={onSync}>{syncStatus === 'saving' ? 'Registrando…' : 'Reintentar registro'}<Icon name="refresh" /></button>}
    <div className="result-buttons"><button className="button secondary" onClick={() => downloadReceipt(attempt)}><Icon name="download" size={18} />Descargar resultado</button><button className="text-button" onClick={onReset}>Nueva participación <Icon name="arrow" size={16} /></button></div><details className="review-details"><summary>Revisar mis 12 respuestas</summary><div className="review-list">{attempt.responses.map((r, i) => <details key={r.questionId}><summary><span className={'review-indicator ' + (r.correct ? 'right' : 'wrong')}><Icon name={r.correct ? 'check' : 'close'} size={15} /></span><span>{String(i + 1).padStart(2, '0')} · {TOPICS[i]}</span><span className="small">{r.correct ? 'Correcta' : 'Revisar'}</span></summary><p>{BANK[attempt.version][i].explanation}</p><pre>{solutionText(BANK[attempt.version][i])}</pre></details>)}</div></details></section><aside><Leaderboard refreshKey={refreshKey} /><div className="next-step"><span className="eyebrow">PARA LA PRÓXIMA VUELTA</span><h2>{score.errors === 0 ? 'Lleva el código a Python.' : 'Vuelve sobre tus errores.'}</h2><p>{score.errors === 0 ? 'Prueba los ejemplos del material y cambia un dato. Predice el resultado antes de ejecutarlos.' : 'Abre el repaso de respuestas. Identifica qué cambió entre tu elección y la solución.'}</p></div></aside></div></main>;
}

function App() {
  useEffect(() => { window.PYTHON_GP_READY = true; window.dispatchEvent(new Event('python-gp-ready')); }, []);
  const [attempt, setAttempt] = useState(() => loadAttempt(config.classId, BANK));
  const [view, setView] = useState(() => loadAttempt(config.classId, BANK)?.status === 'finished' ? 'result' : 'welcome');
  const [storageError, setStorageError] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle');
  const [syncError, setSyncError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [pendingCount, setPendingCount] = useState(() => loadPending(config.classId).length);
  const syncing = useRef(false), currentAttempt = useRef(attempt);
  currentAttempt.current = attempt;
  useEffect(() => { if (attempt && !storeAttempt(attempt)) setStorageError(true); }, [attempt]);
  async function syncAll() {
    if (!connected || syncing.current) return;
    syncing.current = true; setSyncStatus('saving'); setSyncError('');
    const current = currentAttempt.current;
    let pending = loadPending(config.classId);
    if (current?.status === 'finished' && !current.receipt && !pending.some(p => p.id === current.id)) pending = [...pending, current];
    let failed = false;
    for (const item of pending) {
      try {
        const receipt = await saveResult(config.googleScriptUrl, item);
        removePending(config.classId, item.id);
        setAttempt(a => a?.id === item.id ? { ...a, receipt } : a);
        setRefreshKey(n => n + 1);
      } catch (error) { failed = true; setSyncError(error.message); }
    }
    syncing.current = false; setSyncStatus(failed ? 'error' : 'done'); setPendingCount(loadPending(config.classId).length);
  }
  useEffect(() => {
    const onOnline = () => syncAll();
    window.addEventListener('online', onOnline);
    syncAll();
    return () => window.removeEventListener('online', onOnline);
  }, []);
  function start(first, last) {
    const version = chooseVersion(config.version, new URLSearchParams(window.location.search).get('version'));
    const next = makeAttempt(first, last, version, config.classId);
    BANK[version].forEach(q => { next.drafts[q.id] = initialAnswer(q); if (q.options) next.optionOrders[q.id] = shuffle(q.options.map(o => o.id)); });
    setAttempt(next); setView('exercise'); setSyncError('');
  }
  function reset() {
    if (attempt?.status === 'active' && !window.confirm('Se perderá el avance de esta actividad. ¿Empezar con otro nombre?')) return;
    if (attempt?.status === 'finished' && !attempt.receipt) {
      if (!queueAttempt(attempt)) { setStorageError(true); if (!window.confirm('Este navegador no permite conservar la entrega pendiente. Descarga el resultado antes de continuar. ¿Iniciar otra participación?')) return; }
    }
    clearAttempt(config.classId); setAttempt(null); setView('welcome'); setPendingCount(loadPending(config.classId).length); setSyncError('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function next() {
    const updated = advanceAttempt(attempt);
    setAttempt(updated);
    if (updated.status === 'finished') {
      if (!queueAttempt(updated)) setStorageError(true);
      currentAttempt.current = updated;
      setView('result'); setPendingCount(loadPending(config.classId).length); syncAll();
    }
  }
  return <><a className="skip-link" href="#main">Ir a la actividad</a><Header />{storageError && <div className="storage-warning" role="alert">Este navegador no permite guardar el avance. Mantén la página abierta y descarga tu resultado al terminar.</div>}{view === 'exercise' && attempt ? <Exercise attempt={attempt} onAnswer={(q, answer) => setAttempt(a => submitAnswer(a, q, answer))} onDraft={(id, value) => setAttempt(a => ({ ...a, drafts: { ...a.drafts, [id]: value } }))} onNext={next} /> : view === 'result' && attempt?.status === 'finished' ? <Results attempt={attempt} syncStatus={syncStatus} syncError={syncError} onSync={syncAll} onReset={reset} refreshKey={refreshKey} /> : <Landing attempt={attempt} onStart={start} onResume={() => setView('exercise')} onReset={reset} onSync={syncAll} syncStatus={syncStatus} pendingCount={pendingCount} refreshKey={refreshKey} />}<Footer /></>;
}

class ErrorBoundary extends React.Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch() { window.PYTHON_GP_READY = true; window.dispatchEvent(new Event('python-gp-ready')); }
  render() {
    if (this.state.error) return <main className="fallback"><h1>No se pudo abrir la actividad.</h1><p>Recarga la página. Si el problema continúa, avisa al docente; tu avance guardado se conservará.</p><button className="button primary" onClick={() => window.location.reload()}>Recargar</button></main>;
    return this.props.children;
  }
}
export { App, Landing, Exercise, Results, TurtleDemo, CalculatorDemo };
if (typeof document !== 'undefined') createRoot(document.getElementById('root')).render(<ErrorBoundary><App /></ErrorBoundary>);
