// Renders every mockup HTML file in this folder to a 1920x1080 PNG in ./png.
// Usage: node mockups/render.mjs [name-filter]
import { createRequire } from 'node:module';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  const globalRoot = execSync('npm root -g').toString().trim();
  playwright = require(join(globalRoot, 'playwright'));
}

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'png');
mkdirSync(out, { recursive: true });
const filter = process.argv[2] || '';
const files = readdirSync(here).filter((f) => f.endsWith('.html') && f.includes(filter)).sort();

const launch = { args: ['--force-color-profile=srgb'] };
if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
const browser = await playwright.chromium.launch(launch);
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

for (const f of files) {
  errors.length = 0;
  await page.goto(pathToFileURL(join(here, f)).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const target = join(out, basename(f, '.html') + '.png');
  await page.locator('.frame').first().screenshot({ path: target });
  console.log((errors.length ? 'WARN ' : 'ok   ') + f + (errors.length ? '  ' + errors.join(' | ') : ''));
}
await browser.close();
