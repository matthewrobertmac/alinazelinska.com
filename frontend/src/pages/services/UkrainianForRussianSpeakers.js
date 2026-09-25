import React from 'react';
import ServicePage from './ServicePage';

// Lead offer of the Russian site: switching from Russian to Ukrainian, calmly
const UkrainianForRussianSpeakers = () => (
  <ServicePage
    id="ufrs"
    serviceType="Ukrainian language lessons for Russian speakers"
    watermark="Своя"
    highlight="intensive"
    reviews={[8, 1, 4]}
    related={['ukrainian', 'club', 'learn']}
    guide={['ru']}
  />
);

export default UkrainianForRussianSpeakers;
