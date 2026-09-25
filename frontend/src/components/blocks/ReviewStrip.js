import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight, FiStar } from 'react-icons/fi';
import { Link } from '../../i18n/routing';
import { contactInfo } from '../../data/content';
import './blocks.css';

const initials = (name) =>
  name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

// Three real italki reviews (reviews.items) plus a link to verify them on italki
const ReviewStrip = ({ indices = [0, 8, 9], showAllLink = true }) => {
  const { t } = useTranslation();
  const items = t('reviews.items', { returnObjects: true });
  const picked = Array.isArray(items) ? indices.map((i) => items[i]).filter(Boolean) : [];

  return (
    <div className="review-strip">
      <div className="review-strip__grid">
        {picked.map((review) => (
          <figure key={review.name} className="review-card">
            <div className="review-card__stars" aria-label={t('widgets.reviewStrip.rated')}>
              {[0, 1, 2, 3, 4].map((i) => (
                <FiStar key={i} aria-hidden="true" />
              ))}
            </div>
            <blockquote>{review.text}</blockquote>
            <figcaption>
              <span className="review-card__avatar" aria-hidden="true">
                {initials(review.name)}
              </span>
              <span>
                <strong>{review.name}</strong>
                <small>{review.lessons}</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="review-strip__links">
        <a href={contactInfo.italki} target="_blank" rel="noopener noreferrer" className="link-underline">
          {t('widgets.reviewStrip.italki')} <FiArrowUpRight className="inline" />
        </a>
        {showAllLink && (
          <Link to="/testimonials" className="link-underline">
            {t('widgets.reviewStrip.all')} <FiArrowUpRight className="inline" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ReviewStrip;
