import React from 'react';
import { useTranslation } from 'react-i18next';
import ServicePage from './ServicePage';
import { contactInfo } from '../../data/content';

// Poetry & literary translation, song lyrics and writing. No fixed prices, so the CTA is a conversation.
const WritingTranslation = () => {
  const { t } = useTranslation();
  const actions = [
    { to: '/contact', label: t('services.writing.cta'), primary: true },
    { href: `mailto:${contactInfo.email}`, label: t('services.writing.email') },
  ];
  return (
    <ServicePage
      id="writing"
      serviceType="Literary translation"
      watermark="Поезія"
      packages={[]}
      related={['about', 'ukrainian']}
      actions={actions}
      closingActions={actions}
    />
  );
};

export default WritingTranslation;
