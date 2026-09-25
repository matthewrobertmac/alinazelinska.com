import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ease } from '../utils/motion';

const badges = [
  { key: 'rating', value: '5.0' },
  { key: 'students', value: '500+' },
  { key: 'lessons', value: '3,500+' },
  { key: 'attendance', value: '100%' },
];

const TrustBadges = () => {
  const { t, i18n } = useTranslation();
  // Thousands separator follows the language: 3,500 in English, 3 500 in Ukrainian and Russian
  const localise = (value) => (i18n.resolvedLanguage === 'en' ? value : value.replace(',', '\u00a0'));
  return (
  <dl className="trust-row">
    {badges.map((badge, index) => (
      <motion.div
        key={badge.key}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease, delay: index * 0.08 }}
      >
        <dt>{localise(badge.value)}</dt>
        <dd>
          <strong>{t(`widgets.trust.${badge.key}.label`)}</strong>
          <span>{t(`widgets.trust.${badge.key}.note`)}</span>
        </dd>
      </motion.div>
    ))}
  </dl>
  );
};

export default TrustBadges;
