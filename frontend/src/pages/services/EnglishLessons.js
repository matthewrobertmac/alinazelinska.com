import React from 'react';
import ServicePage from './ServicePage';

// Lead offer of the Ukrainian site: English with a teacher who speaks your language
const EnglishLessons = () => (
  <ServicePage
    id="english"
    serviceType="English language lessons"
    watermark="Сміливо"
    reviews={[9, 7, 4]}
    related={['ufrs', 'ukrainian', 'learn']}
    guide={['uk']}
  />
);

export default EnglishLessons;
