import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiStar } from 'react-icons/fi';
import { Link } from '../i18n/routing';
import { contactInfo } from '../data/content';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { clean } from '../utils/text';
import './testimonials.css';
import { reveal, stagger } from '../utils/motion';

// Indices into reviews.items (that order is shared with other pages), strongest reviews first
const ORDER = [0, 8, 9, 4, 6, 5, 2, 7, 1, 3];

// Content strings mark the italic rose accent with *word*
const emphasise = (text) =>
  clean(text)
    .split(/\*(.+?)\*/)
    .map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const initials = (name) =>
  name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

const Stars = ({ label }) => (
  <span className="voice__stars" role="img" aria-label={label}>
    {[0, 1, 2, 3, 4].map((i) => (
      <FiStar key={i} aria-hidden="true" />
    ))}
  </span>
);

const Byline = ({ review }) => (
  <>
    <span className="voice__avatar" aria-hidden="true">
      {initials(review.name)}
    </span>
    <span>
      <strong>{review.name}</strong>
      <small>{review.lessons}</small>
    </span>
  </>
);

const ItalkiLink = ({ children, className = 'btn-outline' }) => (
  <a href={contactInfo.italki} target="_blank" rel="noopener noreferrer" className={className}>
    {children} <FiArrowUpRight className="inline" />
  </a>
);

const Testimonials = () => {
  const { t } = useTranslation();
  const items = t('reviews.items', { returnObjects: true });
  const all = Array.isArray(items) ? items : [];
  const reviews = ORDER.map((i) => all[i]).filter(Boolean);
  const stats = t('reviews.stats', { returnObjects: true });
  const [lead, ...rest] = reviews;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="testimonials-page page-transition">
      <SEOHead title={t('testimonials.seo.title')} description={t('testimonials.seo.description')} />

      <PageHero
        crumbs={[{ name: t('testimonials.crumb') }]}
        eyebrow={t('testimonials.eyebrow')}
        uk="Відгуки"
        testId="testimonials-title"
        title={emphasise(t('testimonials.title'))}
        lede={t('testimonials.subtitle')}
      >
        <div className="voices-hero-actions">
          <ItalkiLink className="btn-primary">
            <FiStar aria-hidden="true" /> {t('testimonials.italki')}
          </ItalkiLink>
          <Link to="/booking#package-trial" className="btn-outline">
            {t('testimonials.cta.button')} <FiArrowRight />
          </Link>
        </div>
      </PageHero>

      {/* ─── Stats ────────────────────────────────────────── */}
      <section className="page-section voices-stats-section">
        <div className="section-shell">
          <motion.dl {...reveal} className="trust-row voices-stats">
            {(Array.isArray(stats) ? stats : []).map((stat) => (
              <div key={stat.label}>
                <dt>{stat.number}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ─── All reviews ──────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{t('testimonials.wall.eyebrow')}</p>
              <h2>{emphasise(t('testimonials.wall.title'))}</h2>
            </div>
            <p>{t('testimonials.wall.text', { count: reviews.length })}</p>
          </motion.header>

          {lead && (
            <motion.figure {...reveal} className="voice-lead" data-testid="testimonial-card-0">
              <span className="voice-lead__mark" aria-hidden="true">
                “
              </span>
              <blockquote>{lead.text}</blockquote>
              <figcaption className="voice__by">
                <Byline review={lead} />
                <Stars label={t('testimonials.rated')} />
              </figcaption>
            </motion.figure>
          )}

          <div className="voice-wall">
            {rest.map((review, index) => (
              <motion.figure
                key={review.name}
                className="voice"
                {...stagger(index % 3)}
                data-testid={`testimonial-card-${index + 1}`}
              >
                <Stars label={t('testimonials.rated')} />
                <blockquote>{review.text}</blockquote>
                <figcaption className="voice__by">
                  <Byline review={review} />
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <p className="voices-more">
            <ItalkiLink className="link-underline">{t('testimonials.cta.italki')}</ItalkiLink>
          </p>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Твоя черга.
          </p>
          <h2>{emphasise(t('testimonials.cta.title'))}</h2>
          <p className="closing__sub">{t('testimonials.cta.subtitle')}</p>
          <div className="closing__actions">
            <Link to="/booking#package-trial" className="btn-primary">
              {t('testimonials.cta.button')} <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Testimonials;
