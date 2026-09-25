import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { LANGS, DEFAULT_LANG, SITE_URL, NOINDEX, localizePath, useLangPath } from '../i18n/routing';

const OG_LOCALE = { en: 'en_US', uk: 'uk_UA', ru: 'ru_RU' };

const SEOHead = ({
  title: titleProp,
  description: descriptionProp,
  keywords = '',
  ogImage = 'https://alinazelinska.com/media/alina-portrait.jpg',
  schema = null,
  // Languages this page exists in (articles are written per audience); defaults to all three
  languages = LANGS,
  // 'website' or 'article'
  type = 'website',
}) => {
  const { t } = useTranslation();
  const title = titleProp || t('seo.defaultTitle');
  const description = descriptionProp || t('seo.defaultDescription');
  // Each language version is its own canonical page, cross-linked with hreflang
  const { lng, path } = useLangPath();
  const urlFor = (lang) => `${SITE_URL}${localizePath(path, lang)}`;
  const fullUrl = urlFor(lng);
  const alternates = LANGS.filter((lang) => languages.includes(lang));
  const xDefault = alternates.includes(DEFAULT_LANG) ? DEFAULT_LANG : alternates[0];
  const noindex = NOINDEX.includes(path);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={t('seo.siteName')} />
      <meta property="og:locale" content={OG_LOCALE[lng]} />
      {alternates.filter((lang) => lang !== lng).map((lang) => (
        <meta key={lang} property="og:locale:alternate" content={OG_LOCALE[lang]} />
      ))}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Hreflang: every language version, plus English as the default */}
      {alternates.map((lang) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={urlFor(lang)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlFor(xDefault)} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
