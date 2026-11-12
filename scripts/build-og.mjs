// Renders scripts/og.html to public/og.png (1200x630). Playwright resolved as in build-resume-pdf.mjs.
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
const here = path.dirname(fileURLToPath(import.meta.url));
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(path.join(here, 'og.html')).href);
await page.screenshot({ path: path.join(here, '../public/og.png') });
await browser.close();
