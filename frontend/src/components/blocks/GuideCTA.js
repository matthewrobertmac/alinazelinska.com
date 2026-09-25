import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { Link } from '../../i18n/routing';
import './blocks.css';

// Free printable guide, matched to each language's audience (see /free-guide)
const GuideCTA = () => {
  const { t } = useTranslation();
  return (
    <aside className="guide-cta">
      <span className="guide-cta__icon" aria-hidden="true">
        <FiDownload />
      </span>
      <div>
        <p className="eyebrow">{t('widgets.guide.eyebrow')}</p>
        <h3>{t('widgets.guide.title')}</h3>
        <p>{t('widgets.guide.text')}</p>
      </div>
      <Link to="/free-guide" className="btn-primary">
        {t('widgets.guide.cta')} <FiArrowRight />
      </Link>
    </aside>
  );
};

export default GuideCTA;
