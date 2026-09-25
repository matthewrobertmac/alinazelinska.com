import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { LANGS, DEFAULT_LANG, SITE_URL, localizePath, useLangPath } from '../i18n/routing';

const OG_LOCALE = { en: 'en_US', uk: 'uk_UA', ru: 'ru_RU' };

const SEOHead = ({
  title: titleProp,
  description: descriptionProp,
  keywords = '',
  ogImage = 'https://alinazelinska.com/media/alina-portrait.jpg',
  schema = null,
}) => {
  const { t } = useTranslation();
  const title = titleProp || t('seo.defaultTitle');
  const description = descriptionProp || t('seo.defaultDescription');
  // Each language version is its own canonical page, cross-linked with hreflang
  const { lng, path } = useLangPath();
  const urlFor = (lang) => `${SITE_URL}${localizePath(path, lang)}`;
  const fullUrl = urlFor(lng);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={t('seo.siteName')} />
      <meta property="og:locale" content={OG_LOCALE[lng]} />
      {LANGS.filter((lang) => lang !== lng).map((lang) => (
        <meta key={lang} property="og:locale:alternate" content={OG_LOCALE[lang]} />
      ))}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Hreflang: every language version, plus English as the default */}
      {LANGS.map((lang) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={urlFor(lang)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlFor(DEFAULT_LANG)} />

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
