import { build } from 'vite';
import { writeFile, readFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { BANK, solutionText } from '../app/questions.js';
import { BANK_REVISION } from '../app/engine.js';

const root = new URL('../', import.meta.url);
process.chdir(fileURLToPath(root));
const answerBank = Object.fromEntries(Object.entries(BANK).map(([v, questions]) => [v, questions.map(q => ({
  id: q.id, type: q.type, answer: q.answer,
  allowed: q.type === 'fill' ? q.blanks.map(b => b.options.map(o => o.id)) : q.type === 'match' ? q.items.map(() => q.choices.map(o => o.id)) : q.type === 'order' ? q.steps.map(() => q.steps.map(s => s.id)) : q.options.map(o => o.id)
}))]));
const backend = await readFile(new URL('google-sheets/backend.template.gs', root), 'utf8');
await writeFile(new URL('google-sheets/Code.gs', root), `// ARCHIVO COMPLETO. Copia TODO su contenido en Apps Script.\nconst BANK_REVISION = ${JSON.stringify(BANK_REVISION)};\nconst ANSWER_BANK = ${JSON.stringify(answerBank)};\n\n${backend}`);
let solutions = '# Guía docente: 72 ejercicios y soluciones\n\n12 ejercicios por versión. Cada ejercicio incorrecto descuenta 0,25: nota = 10 − 0,25 × errores. Las preguntas con varias piezas cuentan como un solo ejercicio.\n\n';
for (const [v, questions] of Object.entries(BANK)) {
  solutions += `## Versión ${v}\n\n`;
  for (const q of questions) solutions += `### ${q.id} · ${q.topic}: ${q.title}\n\n${q.prompt}\n\n**Guía:** ${q.guide}\n\n${q.code ? '\x60\x60\x60python\n' + q.code + '\n\x60\x60\x60\n\n' : ''}**Respuesta:**\n\n\x60\x60\x60text\n${solutionText(q)}\n\x60\x60\x60\n\n${q.explanation}\n\n`;
}
await writeFile(new URL('GUIA-DOCENTE.md', root), solutions);
// One classic IIFE script avoids file:// module restrictions, asset upload
// mistakes and mismatches between cached HTML and hashed JavaScript filenames.
await build({
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    lib: { entry: fileURLToPath(new URL('app/main.jsx', root)), name: 'PythonGrandPrix', formats: ['iife'], fileName: () => 'python-grand-prix.js', cssFileName: 'python-grand-prix' },
    rollupOptions: { output: { inlineDynamicImports: true } }
  }
});
const css = await readFile(new URL('dist/python-grand-prix.css', root), 'utf8');
const js = await readFile(new URL('dist/python-grand-prix.js', root), 'utf8');
const startup = await readFile(new URL('app/startup.js', root), 'utf8');
const template = await readFile(new URL('app/index.html', root), 'utf8');
const inlineJs = js.replace(/<\/script/gi, '<\\/script');
const html = template
  .replace('    <script src="./config.js"></script>\n', '')
  .replace('</head>', () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>\n  </head>`)
  .replace('    <script type="module" src="./main.jsx"></script>',
    () => `<script>${startup}</script>\n    <script src="./config.js"></script>\n    <script>${inlineJs}</script>`);
await writeFile(new URL('dist/index.html', root), html);
await copyFile(new URL('config.js', root), new URL('dist/config.js', root));
await writeFile(new URL('dist/.nojekyll', root), '');
// Root is standalone and works on GitHub Pages and directly from a local file.
await copyFile(new URL('dist/index.html', root), new URL('index.html', root));
console.log('Ready: standalone index.html + optional editable config.js; no external application assets or module requests.');
