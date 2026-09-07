import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  root: `${project}app`,
  base: './',
  publicDir: false,
  esbuild: { jsx: 'automatic' },
  plugins: [{
    name: 'editable-teacher-config',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] === '/config.js') {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.end(readFileSync(`${project}config.js`));
        } else next();
      });
    }
  }],
  build: { outDir: `${project}dist`, emptyOutDir: true, target: 'es2020' }
});
