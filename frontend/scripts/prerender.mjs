// Renders every page in every language into static HTML after `craco build`, and writes the sitemap.
//
// Search engines, AI crawlers and link previews (Telegram, WhatsApp, Facebook…) then receive the real
// page — title, description, hreflang and content in the right language — instead of an empty shell.
// The app still boots normally on top; this only changes what the first HTML response contains.
//
// Output uses Cloudflare's asset naming: /about → about.html, /uk → uk.html, /uk/about → uk/about.html.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const build = join(root, 'build');

// Single source of truth for pages and languages lives in src/i18n/routing.js
const routingSource = await readFile(join(root, 'src/i18n/routing.js'), 'utf8');
const listFrom = (name) =>
  [...routingSource.match(new RegExp(`export const ${name} = \\[([^\\]]*)\\]`))[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
const ROUTES = listFrom('ROUTES');
const LANGS = listFrom('LANGS');
const SITE_URL = routingSource.match(/SITE_URL = '([^']+)'/)[1];
const localize = (path, lng) => (lng === 'en' ? path : path === '/' ? `/${lng}` : `/${lng}${path}`);
const outFile = (url) => join(build, url === '/' ? 'index.html' : `${url.slice(1)}.html`);

// Serve the pristine build (SPA fallback to the original index.html) while we render
const shell = await readFile(join(build, 'index.html'), 'utf8');
const types = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = join(build, path);
  try {
    if (extname(path) && (await stat(file)).isFile()) {
      res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
      return res.end(await readFile(file));
    }
  } catch {}
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(shell);
});
await new Promise((resolve) => server.listen(0, resolve));
const origin = `http://localhost:${server.address().port}`;

// Third-party calls stay out of the snapshot (and out of Alina's analytics)
const BLOCKED = /googletagmanager|google-analytics|doubleclick|ipapi\.co|tiktok|ui-avatars/;

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await context.route('**/*', (route) =>
  BLOCKED.test(new URL(route.request().url()).hostname) ? route.abort() : route.continue()
);

const pages = [];
for (const lng of LANGS) for (const path of ROUTES) pages.push({ lng, path, url: localize(path, lng) });

const render = async ({ url }) => {
  const page = await context.newPage();
  await page.goto(origin + url, { waitUntil: 'load' });
  await page.waitForSelector('main h1, h1', { timeout: 20000 });
  // Scroll through so scroll-triggered reveals settle into their final, visible state
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const html = await page.evaluate(() => {
    const doc = document.documentElement;
    // Viewer-specific state the app re-applies on load
    doc.removeAttribute('data-theme');
    doc.removeAttribute('class');
    // Exactly one <title>: the page's own, not the template fallback alongside it
    const title = document.title;
    document.querySelectorAll('title').forEach((node) => node.remove());
    const node = document.createElement('title');
    node.textContent = title;
    document.head.prepend(node);
    return '<!doctype html>\n' + doc.outerHTML;
  });
  const title = await page.title();
  await page.close();
  return { html, title };
};

const results = [];
const queue = [...pages];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const item = queue.shift();
      const { html, title } = await render(item);
      results.push({ ...item, html, title });
    }
  })
);
await browser.close();
server.close();

for (const { url, html } of results) {
  await mkdir(dirname(outFile(url)), { recursive: true });
  await writeFile(outFile(url), html);
}

// Sitemap: every page in every language, each cross-linked to its translations
const today = new Date().toISOString().slice(0, 10);
const alternates = (path) =>
  [...LANGS.map((l) => [l, localize(path, l)]), ['x-default', path]]
    .map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${u === '/' ? '/' : u}"/>`)
    .join('\n');
const urls = pages
  .map(({ path, url }) => `  <url>\n    <loc>${SITE_URL}${url === '/' ? '/' : url}</loc>\n    <lastmod>${today}</lastmod>\n${alternates(path)}\n  </url>`)
  .join('\n');
await writeFile(
  join(build, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
);

for (const { url, title } of results.sort((a, b) => a.url.localeCompare(b.url))) console.log(`  ${url.padEnd(34)} ${title}`);
console.log(`Prerendered ${results.length} pages; sitemap has ${pages.length} URLs.`);
