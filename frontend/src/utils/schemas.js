// JSON-LD structured data. Alina (a Person) is the entity everything hangs off: her name in all three
// scripts plus every profile in `sameAs` lets search engines connect italki / TikTok / Instagram / LinkedIn
// to this site. No self-awarded review stars — Google ignores self-serving AggregateRating.
import { SITE_URL } from '../i18n/routing';
import { PRICES, PRICE_CURRENCY } from '../data/pricing';
import { contactInfo } from '../data/content';

const PERSON_ID = `${SITE_URL}/#alina`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Alina Zelinska',
  alternateName: ['Аліна Зелінська', 'Алина Зелинская', 'movAlina'],
  jobTitle: 'Ukrainian, English and Russian language tutor, translator and poet',
  description:
    'Native Ukrainian tutor from Ukraine teaching Ukrainian, English and Russian online. 3,500+ lessons and 500+ students since 2022.',
  url: SITE_URL,
  image: `${SITE_URL}/media/alina-portrait.jpg`,
  email: `mailto:${contactInfo.email}`,
  nationality: { '@type': 'Country', name: 'Ukraine' },
  knowsLanguage: ['uk', 'en', 'ru'],
  knowsAbout: ['Ukrainian language', 'English language teaching', 'Russian language', 'Literary translation', 'Poetry'],
  sameAs: [contactInfo.italki, contactInfo.instagram, contactInfo.tiktok, contactInfo.linkedin],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Alina Zelinska',
  inLanguage: ['en', 'uk', 'ru'],
  publisher: { '@id': PERSON_ID },
};

const offer = (key, url, name) => ({
  '@type': 'Offer',
  name,
  price: PRICES[key].price,
  priceCurrency: PRICE_CURRENCY,
  url,
  availability: 'https://schema.org/InStock',
});

// A lesson service with real prices. `offers` is a list of { key, name } from data/pricing.js.
export const serviceSchema = ({ name, description, url, lng, serviceType, offers = [] }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url,
  inLanguage: lng,
  serviceType,
  provider: { '@id': PERSON_ID },
  areaServed: 'Worldwide',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: url, name: 'Online video lessons' },
  offers: offers.map(({ key, name: offerName }) => offer(key, url, offerName)),
});

export const articleSchema = ({ headline, description, url, lng, datePublished, dateModified }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  url,
  inLanguage: lng,
  datePublished,
  dateModified: dateModified || datePublished,
  author: { '@id': PERSON_ID, '@type': 'Person', name: 'Alina Zelinska', url: `${SITE_URL}/about` },
  publisher: { '@id': PERSON_ID },
  image: `${SITE_URL}/media/alina-portrait.jpg`,
  mainEntityOfPage: url,
});

export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
