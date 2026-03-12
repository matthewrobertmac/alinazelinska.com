import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = 'Alina Zelinska | Ukrainian Tutor',
  description = 'Learn Ukrainian with Alina Zelinska',
  keywords = '',
  ogImage = 'https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/n9i5tibv_lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit.%20lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit%20%281%29.png',
  schema = null,
  canonical = null,
  hreflang = null,
}) => {
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
      <meta property="og:site_name" content="Alina Zelinska - Ukrainian Tutor" />

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
