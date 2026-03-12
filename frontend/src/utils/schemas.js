// JSON-LD Schema Generators for SEO

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alina Zelinska",
  "jobTitle": "Ukrainian Language Tutor",
  "description": "Native Ukrainian and Russian language tutor with over 3,500 lessons delivered and a perfect 5.0 rating.",
  "url": "https://alinazelinska.com",
  "image": "https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/n9i5tibv_lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit.%20lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit%20%281%29.png",
  "sameAs": [
    "https://www.instagram.com/alin.a.zelinska/",
    "https://www.linkedin.com/in/alina-zelinska-60317a281/",
    "https://www.tiktok.com/@movalina.study"
  ],
  "knowsLanguage": ["Ukrainian", "Russian", "English", "Spanish", "German"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sliema",
    "addressCountry": "Malta"
  },
  "alumniOf": {
    "@type": "Organization",
    "name": "italki"
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Alina Zelinska Ukrainian Tutoring",
  "description": "Online Ukrainian, Russian, and English language lessons with a native speaker based in Malta.",
  "url": "https://alinazelinska.com",
  "logo": "https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/n9i5tibv_lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit.%20lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit%20%281%29.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sliema",
    "addressCountry": "Malta"
  },
  "areaServed": "Worldwide",
  "availableLanguage": ["Ukrainian", "Russian", "English"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "500",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "EducationalOrganization",
    "name": "Alina Zelinska Ukrainian Tutoring",
    "url": "https://alinazelinska.com"
  },
  "ratingValue": "5.0",
  "reviewCount": "500",
  "bestRating": "5",
  "worstRating": "1"
};

export const ukrainianCourseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Ukrainian Language Lessons",
  "description": "Personalized one-on-one Ukrainian language lessons with a native speaker. From complete beginner to advanced fluency.",
  "provider": {
    "@type": "Person",
    "name": "Alina Zelinska",
    "url": "https://alinazelinska.com"
  },
  "inLanguage": "en",
  "availableLanguage": "Ukrainian",
  "educationalLevel": "All Levels",
  "teaches": "Ukrainian Language",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "instructor": {
      "@type": "Person",
      "name": "Alina Zelinska"
    }
  }
};

export const russianCourseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Russian Language Lessons",
  "description": "Personalized one-on-one Russian language lessons with a native speaker.",
  "provider": {
    "@type": "Person",
    "name": "Alina Zelinska",
    "url": "https://alinazelinska.com"
  },
  "inLanguage": "en",
  "availableLanguage": "Russian",
  "educationalLevel": "All Levels",
  "teaches": "Russian Language"
};

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Alina Zelinska Ukrainian Tutoring",
  "description": "Online Ukrainian, Russian, and English language lessons with a native speaker.",
  "image": "https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/n9i5tibv_lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit.%20lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit%20%281%29.png",
  "@id": "https://alinazelinska.com",
  "url": "https://alinazelinska.com",
  "telephone": "",
  "email": "zelinskayaalinaig@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "Sliema",
    "addressCountry": "MT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.9122,
    "longitude": 14.5019
  },
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "500"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:00",
    "closes": "21:00"
  },
  "sameAs": [
    "https://www.instagram.com/alin.a.zelinska/",
    "https://www.linkedin.com/in/alina-zelinska-60317a281/",
    "https://www.tiktok.com/@movalina.study"
  ]
};

