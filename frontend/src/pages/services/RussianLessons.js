import React from 'react';
import ServicePage from './ServicePage';

// Practical Russian for foreigners, taught by a Ukrainian. Promoted on the English site only.
const RussianLessons = () => (
  <ServicePage
    id="russian"
    serviceType="Russian language lessons"
    watermark="Практика"
    reviews={[0, 6]}
    related={['ukrainian', 'club', 'about']}
  />
);

export default RussianLessons;
