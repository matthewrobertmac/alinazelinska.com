import { useTranslation } from 'react-i18next';
import { testimonials } from '../../data/content';

// Student reviews in the visitor's language, filtered by the English course label
// (translated `lessons` no longer contain the English word, so we match on the source data by index).
const useReviews = (course) => {
  const { t } = useTranslation();
  const translated = t('reviews.items', { returnObjects: true });
  const items = Array.isArray(translated) ? translated : [];

  return testimonials
    .map((source, index) => ({ source, review: { ...source, ...(items[index] || {}) } }))
    .filter(({ source }) => source.lessons.toLowerCase().includes(course))
    .map(({ review }) => review);
};

export default useReviews;
