// Language lives in the URL: English at /about, Ukrainian at /uk/about, Russian at /ru/about.
// One address per page per language is what lets search engines index each translation.
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const SITE_URL = 'https://alinazelinska.com';
export const LANGS = ['en', 'uk', 'ru'];
export const DEFAULT_LANG = 'en';

// Every page on the site, without a language prefix (also drives the prerender + sitemap)
export const ROUTES = [
  '/',
  '/about',
  '/testimonials',
  '/success-stories',
  '/special-projects',
  '/faq',
  '/services/ukrainian-lessons',
  '/services/russian-lessons',
  '/services/speaking-club',
  '/services/poetry-translation',
  '/services/creative-writing',
  '/tiktok',
  '/booking',
  '/contact',
];

// '/uk/about' → { lng: 'uk', path: '/about' }; '/about' → { lng: 'en', path: '/about' }
export const splitLang = (pathname = '/') => {
  const [, first, ...rest] = pathname.split('/');
  if (LANGS.includes(first) && first !== DEFAULT_LANG) {
    return { lng: first, path: `/${rest.join('/')}` };
  }
  return { lng: DEFAULT_LANG, path: pathname || '/' };
};

// ('/about', 'uk') → '/uk/about'; ('/', 'uk') → '/uk'; ('/about', 'en') → '/about'
export const localizePath = (path, lng) => {
  if (!lng || lng === DEFAULT_LANG) return path;
  return path === '/' ? `/${lng}` : `/${lng}${path}`;
};

// The current page's language and unprefixed path
export const useLangPath = () => splitLang(useLocation().pathname);

// Drop-in for react-router's Link: internal paths gain the current language prefix
export const Link = React.forwardRef(({ to, ...props }, ref) => {
  const { lng } = useLangPath();
  const target = typeof to === 'string' && to.startsWith('/') ? localizePath(to, lng) : to;
  return <RouterLink ref={ref} to={target} {...props} />;
});
Link.displayName = 'LocalizedLink';

// Search engines and link-preview fetchers get the page itself, never the splash or a language redirect
export const isBot = () =>
  typeof navigator !== 'undefined' &&
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|vkshare|lighthouse|headless/i.test(navigator.userAgent);
