import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const languages = ['en', 'uk', 'ru'];

// Every JSON file under locales/<lang>/ is merged into that language's strings,
// so each area of the site keeps its own file (common.json, home.json, …).
const files = require.context('./locales', true, /^\.\/(en|uk|ru)\/[\w-]+\.json$/);

const merge = (target, source) => {
  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = merge(target[key] || {}, value);
    } else {
      target[key] = value;
    }
  });
  return target;
};

const resources = Object.fromEntries(languages.map((lng) => [lng, { translation: {} }]));
files.keys().forEach((path) => {
  const lng = path.split('/')[1];
  merge(resources[lng].translation, files(path));
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: languages,
    // uk-UA, ru-RU, en-GB… all map onto the three sites
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
  });

// Keep <html lang> in step so screen readers and search engines read the right language
const setHtmlLang = (lng) => {
  document.documentElement.lang = (lng || 'en').split('-')[0];
};
setHtmlLang(i18n.resolvedLanguage);
i18n.on('languageChanged', setHtmlLang);

export default i18n;
