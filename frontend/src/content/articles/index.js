// Learning articles, one JSON file per language and slug: <lang>/<slug>.json.
// Which slugs exist in which language is declared in ARTICLES (src/i18n/routing.js),
// which also drives the prerender and the sitemap.
import { ARTICLES } from '../../i18n/routing';

const files = require.context('./', true, /^\.\/(en|uk|ru)\/[\w-]+\.json$/);

const byKey = {};
files.keys().forEach((path) => {
  const [, lng, file] = path.split('/');
  byKey[`${lng}/${file.replace(/\.json$/, '')}`] = files(path);
});

// The article in this language, or null when it isn't written for this audience
export const getArticle = (slug, lng) =>
  (ARTICLES[slug] || []).includes(lng) ? byKey[`${lng}/${slug}`] || null : null;

// Every article written for this language, in registry order
export const articlesFor = (lng) =>
  Object.keys(ARTICLES)
    .map((slug) => ({ slug, article: getArticle(slug, lng) }))
    .filter(({ article }) => article);
