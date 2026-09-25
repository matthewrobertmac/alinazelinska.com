# SEO & growth strategy — alinazelinska.com

The site is Alina's own storefront next to marketplaces (italki, Preply) that outrank any
individual tutor for broad terms like "Ukrainian tutor". We win where marketplaces are weak:
**her name**, **specific learner situations**, and **the Ukrainian- and Russian-language web**,
where almost no one writes useful, personal content for these needs.

Keyword volumes below are directional (from knowledge of the market, not measured).
Verify and re-prioritise with Google Search Console (site is verified) after 4–8 weeks of data,
and with Google Keyword Planner / Ahrefs for exact volumes.

---

## 1. Who each language version is for

| Version | Real visitor | Lead offer | Secondary |
|---|---|---|---|
| **EN** `/` | English speakers learning **Ukrainian**: diaspora/heritage learners, partners of Ukrainians, people relocating, volunteers, professionals | Ukrainian lessons | Russian lessons, speaking club, translation & writing |
| **UK** `/uk` | **Ukrainians learning English** — adults who want a teacher who speaks their language and knows their typical mistakes; plus Ukrainians perfecting Ukrainian for the state-language exam | English lessons | Ukrainian exam prep / perfecting Ukrainian, translation |
| **RU** `/ru` | **Russian speakers switching to Ukrainian** (the biggest real market since 2022), and Russian speakers learning English | Ukrainian for Russian speakers | English lessons |

Russian lessons are marketed **only on the English site** (to foreigners). On `/uk` and `/ru`
they stay reachable but are not promoted.

---

## 2. Keyword map (one primary intent per page — no two pages compete)

### English site
| Page | Primary | Secondary / long-tail |
|---|---|---|
| `/` | Ukrainian tutor online | learn Ukrainian online, Ukrainian lessons with a native speaker, online Ukrainian teacher |
| `/services/ukrainian-lessons` | Ukrainian lessons online | private Ukrainian lessons, Ukrainian for beginners, Ukrainian for heritage speakers, Ukrainian conversation practice, Ukrainian state language exam preparation |
| `/services/ukrainian-for-russian-speakers` | Ukrainian for Russian speakers | switch from Russian to Ukrainian, Ukrainian vs Russian differences |
| `/services/russian-lessons` | Russian tutor online native speaker | Russian lessons for beginners, conversational Russian lessons |
| `/services/english-lessons` | English lessons for Ukrainian speakers | English tutor who speaks Ukrainian/Russian |
| `/services/speaking-club` | Ukrainian speaking club online | Ukrainian conversation group, practise speaking Ukrainian |
| `/services/writing-translation` | Ukrainian poetry translation | Ukrainian to English literary translation, song lyrics translation, bilingual ghostwriting |
| `/learn/*` | informational: how to learn Ukrainian, Ukrainian vs Russian, Ukrainian words with no English equivalent | (see content plan) |
| `/about` | Alina Zelinska | Alina Zelinska Ukrainian tutor, movalina |

### Ukrainian site (`/uk`)
| Page | Primary | Secondary / long-tail |
|---|---|---|
| `/uk` | репетитор англійської онлайн | англійська онлайн з викладачем, індивідуальні уроки англійської |
| `/uk/services/english-lessons` | уроки англійської онлайн для дорослих | розмовна англійська онлайн, англійська з нуля для дорослих, англійська для роботи, репетитор англійської, який розмовляє українською |
| `/uk/services/ukrainian-lessons` | підготовка до іспиту з державної мови | іспит на рівень володіння державною мовою, репетитор української мови онлайн |
| `/uk/services/ukrainian-for-russian-speakers` | як перейти на українську мову | перейти на українську з російської, українська для російськомовних |
| `/uk/learn/*` | типові помилки українців в англійській, як почати говорити англійською | Present Perfect простими словами, артиклі в англійській |

### Russian site (`/ru`)
| Page | Primary | Secondary / long-tail |
|---|---|---|
| `/ru` | украинский язык для русскоязычных | перейти на украинский язык, репетитор украинского онлайн |
| `/ru/services/ukrainian-for-russian-speakers` | как перейти на украинский язык | курсы украинского для русскоговорящих, выучить украинский быстро |
| `/ru/services/ukrainian-lessons` | репетитор украинского языка онлайн | экзамен на знание украинского языка, уроки украинского онлайн |
| `/ru/services/english-lessons` | репетитор английского онлайн | английский для взрослых онлайн, разговорный английский |
| `/ru/learn/*` | как перейти на украинский, суржик ошибки | чем украинский отличается от русского, ложные друзья украинский русский |

**On-page rules** (every page, every language):
- `<title>` ≤ 60 chars, primary keyword first, brand last: `Уроки англійської онлайн для дорослих | Аліна Зелінська`.
- Meta description ≤ 155 chars: who it's for + proof (5.0, 3,500+ lessons) + price + action.
- Exactly one `<h1>`, containing the primary keyword in natural language (it can still be beautiful).
- Primary keyword in the first 100 words; secondary terms in `<h2>`s where they fit naturally.
- Prices visible as text (and in `Offer` structured data).
- Every page links to 2–3 related pages and to `/booking`.
- No keyword stuffing, no `meta keywords` reliance (ignored by Google).

---

## 3. Technical architecture (implemented)

- One URL per page per language: `/about`, `/uk/about`, `/ru/about` (Google's recommended subdirectory model).
- Self-referencing canonical + `hreflang` (en, uk, ru, x-default) on every page, and in the sitemap.
- Every route × language prerendered to static HTML at build (`scripts/prerender.mjs`), so Google, Bing,
  AI assistants and link previews (Telegram, WhatsApp, Viber, Facebook, LinkedIn) get real content.
- Generated `sitemap.xml`; `_redirects` gives 301s for retired URLs.
- Structured data: `Person` (with `sameAs` → italki, Instagram, TikTok, LinkedIn), `WebSite`,
  `Service` + `Offer` (real prices) per service, `FAQPage`, `Article` for learning posts, `BreadcrumbList`.
  No self-awarded review stars (Google ignores/penalises self-serving `AggregateRating`).
- Performance: prerendered HTML, code-split pages, lazy media, 4 MB intro video with poster (was 22 MB),
  TikTok covers self-hosted.

---

## 4. Making social & italki visitors find the website

People who discover Alina on TikTok, Instagram or italki mostly look her up **by name**. So:

1. **Own the name search.** `alinazelinska.com` must be result #1 for "Alina Zelinska", "Аліна Зелінська",
   "Алина Зелинская" and "movalina". Done via: name in titles/H1s, `Person` schema with `sameAs` to every
   profile, consistent spelling in all three scripts, an About page per language.
2. **Link-in-bio page** at `/links` (per language) — one tidy page for Instagram/TikTok bios with booking,
   the free guide, reviews and contact. Use it as the single bio link everywhere.
   Suggested bio links with tracking:
   - Instagram: `https://alinazelinska.com/links?utm_source=instagram&utm_medium=social&utm_campaign=bio`
   - TikTok: `https://alinazelinska.com/links?utm_source=tiktok&utm_medium=social&utm_campaign=bio`
   - LinkedIn (Featured + Contact info): `https://alinazelinska.com/?utm_source=linkedin&utm_medium=social`
3. **italki**: italki's rules forbid sending students off the platform, so **do not** put the website link in
   the italki profile. Instead the website links *to* italki as proof ("Verified reviews on italki"), and
   italki students who search her name find the site through (1).
   → Update the italki profile: it still says "Living in Sliema, Malta".
4. **Every TikTok/Instagram video** that teaches something gets a matching `/learn` article (same title,
   more depth) — mention "full guide on my website" in captions. Videos drive discovery; articles capture search.
5. **Same photo, same name, same one-line bio** on every profile, so Google connects them (entity consistency).

---

## 5. Content hub plan (`/learn`)

Articles written for one audience each (not straight translations), each ending with a soft CTA
(free guide + trial lesson). Launch set:

- EN: *How to learn Ukrainian online (a native tutor's honest guide)*; *Ukrainian vs Russian: the differences
  that actually matter*; *12 Ukrainian words English doesn't have*
- UK: *20 помилок в англійській, які роблять українці*; *Як нарешті заговорити англійською: план на 30 днів*;
  *Як перейти на українську з російської*
- RU: *Как перейти на украинский язык: пошаговый план*; *Суржик: 25 ошибок, которые выдают русскоязычных*;
  *Чем украинский отличается от русского: ложные друзья*

Cadence after launch: 2 articles/month per priority language, repurposed from TikTok scripts.

---

## 6. Lead magnet

A free printable guide per language (PDF + web page at `/free-guide`), matched to the audience:
- EN: *Your first 100 Ukrainian words* 
- UK: *20 помилок в англійській, які роблять українці — і як їх виправити*
- RU: *Переход на украинский: 50 слов-ловушек для русскоязычных*

Next step (needs Alina's account): connect an email provider (e.g. Buttondown, MailerLite — free tiers)
to deliver the guide by email and build a newsletter list.

---

## 7. Measurement

- Google Search Console: submit `https://alinazelinska.com/sitemap.xml`; watch impressions per language folder.
- GA4 (already installed): mark `booking` clicks, PayPal redirects, `mailto:`/Instagram clicks and guide
  downloads as key events; compare by language folder.
- Review monthly: which queries earn impressions but low CTR (rewrite titles), which pages convert.
