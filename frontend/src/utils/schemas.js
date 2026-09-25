// JSON-LD Schema Generators for SEO

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alina Zelinska",
  "jobTitle": "Ukrainian Language Tutor",
  "description": "Native Ukrainian and Russian language tutor with over 3,500 lessons delivered and a perfect 5.0 rating.",
  "url": "https://alinazelinska.com",
  "image": "https://alinazelinska.com/media/alina-portrait.jpg",
  "sameAs": [
    "https://www.instagram.com/alin.a.zelinska/",
    "https://www.linkedin.com/in/alina-zelinska-60317a281/",
    "https://www.tiktok.com/@movalina.study"
  ],
  "knowsLanguage": ["Ukrainian", "Russian", "English", "Spanish", "German"],
  "nationality": {
    "@type": "Country",
    "name": "Ukraine"
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
  "description": "Ukrainian, Russian, and English language lessons with a native speaker, taught online worldwide.",
  "url": "https://alinazelinska.com",
  "logo": "https://alinazelinska.com/media/alina-portrait.jpg",
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

