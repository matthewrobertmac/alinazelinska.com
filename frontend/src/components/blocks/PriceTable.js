import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { Link } from '../../i18n/routing';
import { useCurrency } from '../../context/CurrencyContext';
import { contactInfo } from '../../data/content';
import { PRICES, perLesson, savingPercent } from '../../data/pricing';
import './blocks.css';

// Prices everywhere come from data/pricing.js. EUR is what PayPal charges; other currencies show as "≈".
const PriceTable = ({ packages = ['trial', 'standard', 'intensive'], highlight = 'trial', ctaTo = '/booking' }) => {
  const { t } = useTranslation();
  const { currency, formatPrice } = useCurrency();
  const eur = (value) => `€${value}`;

  return (
    <div className={`price-table price-table--${packages.length}`}>
      {packages.map((key) => {
        const plan = PRICES[key];
        const isPack = plan.lessons > 1;
        return (
          <article key={key} className={`price-card ${key === highlight ? 'is-highlight' : ''}`} data-testid={`price-${key}`}>
            {key === highlight && <span className="price-card__badge">{t('widgets.prices.start')}</span>}
            <h3>{t(`widgets.prices.plans.${key}.name`)}</h3>
            <p className="price-card__meta">{t(`widgets.prices.plans.${key}.meta`, { minutes: plan.minutes, lessons: plan.lessons })}</p>
            <p className="price-card__price">
              {eur(plan.price)}
              {currency !== 'EUR' && <small>≈ {formatPrice(plan.price)}</small>}
            </p>
            {isPack && (
              <p className="price-card__saving">
                {t('widgets.prices.perLesson', { price: eur(perLesson(key)), saving: savingPercent(key) })}
              </p>
            )}
            <ul>
              {t(`widgets.prices.plans.${key}.points`, { returnObjects: true }).map((point) => (
                <li key={point}>
                  <FiCheck aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
            {key === 'speakingClub' ? (
              // Club sessions are announced and booked through Instagram, not the lesson checkout
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className={key === highlight ? 'btn-primary' : 'btn-outline'}>
                {t(`widgets.prices.plans.${key}.cta`)} <FiArrowRight />
              </a>
            ) : (
              <Link to={`${ctaTo}#package-${key}`} className={key === highlight ? 'btn-primary' : 'btn-outline'}>
                {t(`widgets.prices.plans.${key}.cta`)} <FiArrowRight />
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default PriceTable;
