// Builds dist, serves it with `astro preview`, prints /resume to public/resume.pdf.
// Playwright is NOT a site dependency. It is resolved from the global install
// (NODE_PATH) or from node_modules if you add it yourself; no browser download happens here.
import { spawn, execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const port = 4399;
execSync('npm run build', { cwd: root, stdio: 'inherit' });
const server = spawn('npx', ['astro', 'preview', '--host', 'localhost', '--port', String(port)], {
  cwd: root,
  stdio: 'ignore',
});
try {
  const url = `http://localhost:${port}/resume`;
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(url)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: path.join(root, 'public/resume.pdf'),
    format: 'A4',
    printBackground: false,
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log('wrote public/resume.pdf');
} finally {
  server.kill();
}
