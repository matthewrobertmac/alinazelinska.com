// Renders the free guides (src/content/guides/<lang>.json) into printable A4 PDFs in public/guides/.
// Run after editing a guide:  node scripts/guides.mjs
// The PDFs are committed, so the build and deploy don't need a browser for them.
import { readFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public/guides');
const SITE = 'https://alinazelinska.com';
const LANGS = ['en', 'uk', 'ru'];

// Prices and contacts come from their single sources in src/data
const pricing = await readFile(join(root, 'src/data/pricing.js'), 'utf8');
const trial = pricing.match(/trial:\s*\{\s*price:\s*(\d+),\s*minutes:\s*(\d+)/);
const PRICE = `€${trial[1]}`;
const MINUTES = trial[2];
const content = await readFile(join(root, 'src/data/content.js'), 'utf8');
const contact = (key) => content.match(new RegExp(`${key}:\\s*"([^"]+)"`))[1];
const EMAIL = contact('email');
const portraitFull = (await readFile(join(root, 'public/media/alina-portrait.jpg'))).toString('base64');
let portrait = portraitFull;

const json = async (path) => JSON.parse(await readFile(join(root, path), 'utf8'));
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fill = (s, vars) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
const pad = (i) => String(i + 1).padStart(2, '0');
const localize = (path, lng) => (lng === 'en' ? path : `/${lng}${path}`);

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap');
@page { size: A4; margin: 18mm 17mm 20mm; }
@page cover { margin: 0; }
:root {
  --bg: #FAF6F1; --tint: #F3ECE4; --surface: #FFFDFB; --text: #1C1418; --text2: #5E5358; --muted: #8C8085;
  --accent: #B83A5E; --accent-soft: #F6DCE3; --gold: #A87B2D; --border: rgba(28,20,24,.12); --border2: rgba(28,20,24,.22);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'Manrope', sans-serif; font-size: 10.5pt; line-height: 1.5; color: var(--text); }
h1, h2, h3, .serif { font-family: 'Cormorant Garamond', serif; font-weight: 500; letter-spacing: -0.01em; }
.eyebrow { font-size: 7.5pt; font-weight: 600; letter-spacing: .24em; text-transform: uppercase; color: var(--accent) !important; }

/* Cover */
.cover { page: cover; position: relative; width: 210mm; height: 297mm; overflow: hidden; background: var(--bg);
  padding: 24mm 22mm; display: flex; flex-direction: column; break-after: page; }
.cover::before { content: ''; position: absolute; inset: 0; background:
  radial-gradient(55% 40% at 88% 12%, rgba(232,128,160,.38), transparent 70%),
  radial-gradient(45% 35% at 5% 95%, rgba(230,180,80,.32), transparent 70%); }
.cover > * { position: relative; }
.cover__top { display: flex; justify-content: space-between; align-items: center; }
.cover__site { font-size: 9pt; color: var(--text2); }
.cover__watermark { position: absolute; left: 16mm; top: 34mm; font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: 190pt; line-height: 1; color: var(--text); opacity: .06; white-space: nowrap; }
.cover h1 { margin-top: auto; font-size: 50pt; line-height: .98; letter-spacing: -0.03em; font-weight: 400; max-width: 160mm; }
.cover__sub { margin-top: 7mm; max-width: 130mm; font-size: 13pt; line-height: 1.5; color: var(--text2); }
.cover__rule { width: 18mm; height: 1px; background: var(--gold); margin: 14mm 0 8mm; }
.cover__author { display: flex; align-items: center; gap: 5mm; }
.cover__author img { width: 18mm; height: 18mm; border-radius: 50%; object-fit: cover; border: 2px solid #fff; box-shadow: 0 0 0 1px var(--accent); }
.cover__author strong { display: block; font-family: 'Cormorant Garamond', serif; font-size: 17pt; font-weight: 500; }
.cover__author span { font-size: 9pt; color: var(--text2); }

/* Intro */
.intro { break-after: page; }
.intro h2 { font-size: 30pt; line-height: 1.08; margin: 4mm 0 6mm; }
.intro p { font-size: 11.5pt; line-height: 1.7; color: var(--text2); margin-bottom: 4mm; max-width: 150mm; }
.toc { margin-top: 10mm; border-top: 1px solid var(--border2); }
.toc li { list-style: none; display: flex; gap: 5mm; padding: 3mm 0; border-bottom: 1px solid var(--border); font-size: 11pt; }
.toc .num { width: 9mm; }
.toc small { margin-left: auto; color: var(--muted); }
.num { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--gold); font-size: 13pt; }

/* Sections */
.section { margin-bottom: 9mm; }
.section__head { display: flex; align-items: baseline; gap: 4mm; break-after: avoid; }
.section__head .num { font-size: 20pt; }
.section h2 { font-size: 22pt; line-height: 1.1; }
.section__intro { margin: 1.5mm 0 0 13mm; color: var(--text2); font-size: 10pt; break-after: avoid; }
table { width: 100%; border-collapse: collapse; margin-top: 4mm; }
thead th { text-align: left; font-size: 7pt; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: var(--muted);
  padding: 0 3mm 2mm 0; border-bottom: 1px solid var(--border2); }
thead { display: table-header-group; }
tr { break-inside: avoid; }
td { padding: 2.2mm 3mm 2.2mm 0; border-bottom: 1px solid var(--border); vertical-align: top; }
td.a { font-family: 'Cormorant Garamond', serif; font-size: 14pt; line-height: 1.2; font-weight: 500; }
td.tr { font-size: 9pt; letter-spacing: .03em; color: var(--accent); padding-top: 3mm; }
td.b { padding-top: 2.7mm; }
.stress { color: var(--accent); }
td .note { display: block; margin-top: 1mm; font-size: 8.5pt; line-height: 1.45; color: var(--muted); }
.mistakes td.a { color: var(--text2); text-decoration: line-through; text-decoration-color: rgba(184,58,94,.55); text-decoration-thickness: 1px; }
.mistakes td.b { font-family: 'Cormorant Garamond', serif; font-size: 14pt; line-height: 1.2; font-weight: 600; padding-top: 2.6mm; }
.mistakes td { width: 50%; }
.mistakes .noterow td { padding-top: 0; font-size: 9pt; color: var(--text2); line-height: 1.5; }
.mistakes .itemrow td { border-bottom: 0; }

/* Closing page */
.closing { break-before: page; display: flex; flex-direction: column; min-height: 255mm; }
.closing h2 { font-size: 34pt; line-height: 1.02; margin: 4mm 0 6mm; max-width: 150mm; font-weight: 400; }
.closing > p { font-size: 12pt; line-height: 1.7; color: var(--text2); max-width: 145mm; }
.cta { margin-top: 12mm; padding: 11mm 12mm; background: var(--bg); border: 1px solid var(--accent); border-radius: 7mm; position: relative; overflow: hidden; }
.cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(50% 60% at 95% 0%, rgba(232,128,160,.3), transparent 70%); }
.cta > * { position: relative; }
.cta h3 { font-size: 28pt; margin: 3mm 0 2mm; }
.cta p { color: var(--text2); font-size: 11pt; }
.cta a.button { display: inline-block; margin-top: 7mm; padding: 4mm 9mm; border-radius: 99px; background: var(--text); color: var(--bg);
  font-weight: 600; font-size: 11pt; text-decoration: none; }
.cta .url { display: block; margin-top: 3mm; font-size: 9pt; color: var(--muted); }
.find { margin-top: auto; display: flex; gap: 8mm; align-items: center; padding-top: 8mm; border-top: 1px solid var(--border2); }
.find img { flex: none; width: 22mm; height: 22mm; border-radius: 50%; object-fit: cover; border: 2px solid #fff; box-shadow: 0 0 0 1px var(--accent); }
.find strong { font-family: 'Cormorant Garamond', serif; font-size: 18pt; font-weight: 500; display: block; }
.find ul { list-style: none; font-size: 9.5pt; color: var(--text2); margin-top: 1mm; }
.find a { color: var(--text2); text-decoration: none; }
`;

// Stress marks (combining acute) sit badly in the display serif, so the stressed vowel is coloured instead
const stress = (s) => s.replace(/(\S)\u0301/g, '<span class="stress">$1</span>');
const cell = (item, key) => (item[key] ? stress(esc(item[key])) : '');

const table = (section, labels, mistakes) => {
  if (mistakes) {
    return `<table class="mistakes"><thead><tr><th>${esc(labels.a)}</th><th>${esc(labels.b)}</th></tr></thead><tbody>
      ${section.items
        .map(
          (item) => `<tr class="itemrow"><td class="a">${cell(item, 'a')}</td><td class="b">${cell(item, 'b')}</td></tr>
          ${item.note ? `<tr class="noterow"><td colspan="2">${esc(item.note)}</td></tr>` : ''}`
        )
        .join('')}</tbody></table>`;
  }
  const hasTr = Boolean(labels.tr);
  return `<table><thead><tr><th style="width:${hasTr ? 34 : 38}%">${esc(labels.a)}</th>${
    hasTr ? `<th style="width:26%">${esc(labels.tr)}</th>` : ''
  }<th>${esc(labels.b)}</th></tr></thead><tbody>
    ${section.items
      .map(
        (item) => `<tr><td class="a">${cell(item, 'a')}</td>${hasTr ? `<td class="tr">${cell(item, 'tr')}</td>` : ''}
        <td class="b">${cell(item, 'b')}${item.note ? `<span class="note">${stress(esc(item.note))}</span>` : ''}</td></tr>`
      )
      .join('')}</tbody></table>`;
};

const html = (lng, guide, t) => {
  // The Ukrainian guide lists wrong → right sentences, which read better as a two-line layout
  const mistakes = lng === 'uk';
  const booking = `${SITE}${localize('/booking', lng)}`;
  const name = t.pdf.footer.split(' · ')[0];
  return `<!doctype html><html lang="${lng}"><head><meta charset="utf-8"><title>${esc(guide.title)}</title><style>${css}</style></head><body>
  <section class="cover">
    <div class="cover__top"><span class="eyebrow">${esc(t.pdf.eyebrow)}</span><span class="cover__site">alinazelinska.com</span></div>
    <span class="cover__watermark" lang="uk">Слово</span>
    <h1>${esc(guide.title)}</h1>
    <p class="cover__sub">${esc(guide.subtitle)}</p>
    <div class="cover__rule"></div>
    <div class="cover__author"><img src="data:image/jpeg;base64,${portrait}" alt="">
      <div><strong>${esc(name)}</strong><span>${esc(t.by === name ? '' : t.by)}alinazelinska.com</span></div></div>
  </section>

  <section class="intro">
    <p class="eyebrow">${esc(t.pdf.eyebrow)}</p>
    <h2>${esc(guide.title)}</h2>
    ${guide.intro.map((p) => `<p>${stress(esc(p))}</p>`).join('')}
    <ol class="toc">${guide.sections
      .map((s, i) => `<li><span class="num">${pad(i)}</span><span>${esc(s.h2)}</span><small>${s.items.length}</small></li>`)
      .join('')}</ol>
  </section>

  ${guide.sections
    .map(
      (s, i) => `<section class="section">
    <div class="section__head"><span class="num">${pad(i)}</span><h2>${esc(s.h2)}</h2></div>
    ${s.intro ? `<p class="section__intro">${esc(s.intro)}</p>` : ''}
    ${table(s, guide.labels, mistakes)}
  </section>`
    )
    .join('')}

  <section class="closing">
    <p class="eyebrow">${esc(t.pdf.ctaEyebrow)}</p>
    <h2>${esc(guide.outro.title)}</h2>
    <p>${esc(guide.outro.text)}</p>
    <div class="cta">
      <p class="eyebrow">${esc(name)}</p>
      <h3>${esc(fill(t.pdf.cta, { price: PRICE }))}</h3>
      <p>${esc(fill(t.pdf.ctaText, { minutes: MINUTES }))}</p>
      <a class="button" href="${booking}?utm_source=guide&amp;utm_medium=pdf&amp;utm_campaign=free-guide">${esc(fill(t.pdf.cta, { price: PRICE }))} →</a>
      <span class="url">${booking.replace('https://', '')}</span>
    </div>
    <div class="find"><img src="data:image/jpeg;base64,${portrait}" alt="">
      <div><strong>${esc(name)}</strong>
        <ul>
          <li><a href="${SITE}${localize('/', lng)}">alinazelinska.com</a></li>
          <li>Instagram @alin.a.zelinska · TikTok @movalina.study</li>
          <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
        </ul></div></div>
  </section>
  </body></html>`;
};

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
// A small square crop of the portrait keeps each PDF light
portrait = await page.evaluate(async (src) => {
  const img = new Image();
  img.src = `data:image/jpeg;base64,${src}`;
  await img.decode();
  const size = 360;
  const canvas = Object.assign(document.createElement('canvas'), { width: size, height: size });
  const side = Math.min(img.width, img.height);
  canvas.getContext('2d').drawImage(img, (img.width - side) / 2, 0, side, side, 0, 0, size, size);
  return canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
}, portraitFull);
for (const lng of LANGS) {
  const guide = await json(`src/content/guides/${lng}.json`);
  const { guide: t } = await json(`src/i18n/locales/${lng}/guide.json`);
  await page.setContent(html(lng, guide, t), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const file = join(out, guide.file);
  await page.pdf({
    path: file,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;padding:0 17mm;display:flex;justify-content:space-between;font-family:Helvetica,Arial,sans-serif;font-size:7pt;color:#8C8085;letter-spacing:.04em">
      <span>${esc(t.pdf.footer)}</span><span class="pageNumber"></span></div>`,
  });
  console.log(`  ${lng}  public/guides/${guide.file}`);
}
await browser.close();
