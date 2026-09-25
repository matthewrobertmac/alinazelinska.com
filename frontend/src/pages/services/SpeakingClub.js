import React from 'react';
import { useTranslation } from 'react-i18next';
import ServicePage from './ServicePage';
import { contactInfo } from '../../data/content';

// Small-group Ukrainian conversation practice; dates are announced on Instagram
const SpeakingClub = () => {
  const { t } = useTranslation();
  const actions = [
    { href: contactInfo.instagram, label: t('services.speakingClub.instagram'), primary: true },
    { to: '/contact', label: t('services.speakingClub.askNext') },
  ];
  return (
    <ServicePage
      id="speakingClub"
      serviceType="Ukrainian conversation group"
      watermark="Розмова"
      packages={['speakingClub']}
      highlight="speakingClub"
      reviews={[8, 5, 4]}
      related={['ukrainian', 'ufrs']}
      actions={actions}
      closingActions={actions}
    />
  );
};

export default SpeakingClub;
