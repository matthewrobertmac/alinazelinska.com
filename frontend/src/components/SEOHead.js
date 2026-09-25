import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEOHead = ({
  title: titleProp,
  description: descriptionProp,
  keywords = '',
  ogImage = 'https://alinazelinska.com/media/alina-portrait.jpg',
  schema = null,
  canonical = null,
  hreflang = null,
}) => {
  const { t } = useTranslation();
  const title = titleProp || t('seo.defaultTitle');
  const description = descriptionProp || t('seo.defaultDescription');
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://alinazelinska.com';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const fullUrl = canonical || `${siteUrl}${currentPath}`;

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

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Hreflang Tags */}
      {hreflang && hreflang.map((lang, index) => (
        <link key={index} rel="alternate" hrefLang={lang.lang} href={lang.url} />
      ))}

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
