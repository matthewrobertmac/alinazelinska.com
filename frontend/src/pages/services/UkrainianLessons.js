import React from 'react';
import ServicePage from './ServicePage';

// EN: Ukrainian lessons online · UK: state-language exam prep · RU: репетитор украинского онлайн
const UkrainianLessons = () => (
  <ServicePage
    id="ukrainian"
    serviceType="Ukrainian language lessons"
    watermark="Мова"
    reviews={[8, 4, 2]}
    related={['ufrs', 'club', 'learn']}
    guide={['en']}
  />
);

export default UkrainianLessons;
