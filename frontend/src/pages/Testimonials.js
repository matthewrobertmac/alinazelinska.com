import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials as testimonialImages } from '../data/content';
import { FiArrowLeft, FiArrowRight, FiStar } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { aggregateRatingSchema } from '../utils/schemas';
import { accent, clean } from '../utils/text';
import './testimonials.css';
import { ease, reveal } from '../utils/motion';

// Get initials from name
const getInitials = (name) => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[1][0];
  }
  return parts[0][0];
};

const Avatar = ({ testimonial }) =>
  testimonial.img ? (
    <img src={testimonial.img} alt={testimonial.name} className="voice__avatar" loading="lazy" />
  ) : (
    <span className="voice__avatar voice__avatar--initials" aria-hidden="true">
      {getInitials(testimonial.name)}
    </span>
  );

const Stars = ({ label }) => (
  <span className="voice__stars" aria-label={label}>
    {[...Array(5)].map((_, i) => (
      <FiStar key={i} aria-hidden="true" />
    ))}
  </span>
);

const Testimonials = () => {
  const { t } = useTranslation();
  const reviews = t('reviews.items', { returnObjects: true });
  // Avatars stay in content.js; the words come from the active language, in the same order.
  const testimonials = (Array.isArray(reviews) ? reviews : []).map((review, i) => ({
    ...review,
    img: testimonialImages[i]?.img,
  }));
  const stats = t('reviews.stats', { returnObjects: true });
  const testimonialStats = Array.isArray(stats) ? stats : [];
  const [currentPage, setCurrentPage] = useState(0);
  const wallRef = useRef(null);
  const testimonialsPerPage = 6;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getCurrentTestimonials = () => {
    const start = currentPage * testimonialsPerPage;
    const end = start + testimonialsPerPage;
    return testimonials.slice(start, end);
  };

  // Bring the top of the wall back into view when paging
  const scrollToWall = () => {
    if (wallRef.current) {
      const top = wallRef.current.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      scrollToWall();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      scrollToWall();
    }
  };

  const [lead, ...rest] = getCurrentTestimonials();

  return (
    <div className="testimonials-page page-transition">
      <SEOHead
        title={t('testimonials.seo.title')}
        description={t('testimonials.seo.description')}
        keywords={t('testimonials.seo.keywords')}
        schema={aggregateRatingSchema}
        hreflang={[
          { lang: 'en', url: 'https://alinazelinska.com/testimonials' },
          { lang: 'uk', url: 'https://alinazelinska.com/testimonials?lang=uk' },
          { lang: 'ru', url: 'https://alinazelinska.com/testimonials?lang=ru' },
          { lang: 'x-default', url: 'https://alinazelinska.com/testimonials' }
        ]}
      />

      <PageHero
        crumbs={[{ name: t('testimonials.crumb') }]}
        eyebrow={t('testimonials.eyebrow')}
        uk="Відгуки"
        testId="testimonials-title"
        title={accent(t('testimonials.title'))}
        lede={t('testimonials.subtitle')}
      >
        <p className="voices-verified">
          <FiStar aria-hidden="true" />
          <span>{t('testimonials.verificationNote')}</span>
        </p>
      </PageHero>

      {/* ─── Stats ────────────────────────────────────────── */}
      <section className="page-section voices-stats-section">
        <div className="section-shell">
          <motion.dl {...reveal} className="trust-row voices-stats">
            {testimonialStats.map((stat, index) => (
              <div key={index}>
                <dt>{stat.number}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ─── Wall of quotes ───────────────────────────────── */}
      <section className="page-section page-section--tint" ref={wallRef}>
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{t('testimonials.wall.eyebrow')}</p>
              <h2>
                {t('testimonials.wall.title')} <em className="display-italic">{t('testimonials.wall.titleAccent')}</em>
              </h2>
            </div>
            <p>{t('testimonials.wall.text', { count: testimonials.length })}</p>
          </motion.header>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease }}
            >
              {lead && (
                <figure className="voice-lead" data-testid="testimonial-card-0">
                  <span className="voice-lead__mark" aria-hidden="true">
                    “
                  </span>
                  <blockquote>{lead.text}</blockquote>
                  <figcaption className="voice__by">
                    <Avatar testimonial={lead} />
                    <span>
                      <strong>{lead.name}</strong>
                      <small>{lead.lessons}</small>
                    </span>
                    <Stars label={t('testimonials.rated')} />
                  </figcaption>
                </figure>
              )}

              <div className="voice-wall">
                {rest.map((testimonial, index) => (
                  <motion.figure
                    key={testimonial.name + index}
                    className="voice"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.1 + index * 0.07 }}
                    data-testid={`testimonial-card-${index + 1}`}
                  >
                    <span className="voice__mark" aria-hidden="true">
                      “
                    </span>
                    <blockquote>{testimonial.text}</blockquote>
                    <figcaption className="voice__by">
                      <Avatar testimonial={testimonial} />
                      <span>
                        <strong>{testimonial.name}</strong>
                        <small>{testimonial.lessons}</small>
                      </span>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="voice-pager" aria-label={t('testimonials.pager.label')}>
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 0}
                data-testid="prev-page-btn"
                className="voice-pager__btn"
                aria-label={t('testimonials.pager.prev')}
              >
                <FiArrowLeft />
              </button>

              <span className="voice-pager__label" data-testid="page-indicator">
                <Trans
                  i18nKey="testimonials.pager.page"
                  values={{ current: currentPage + 1, total: totalPages }}
                  components={{ b: <b /> }}
                />
              </span>

              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                data-testid="next-page-btn"
                className="voice-pager__btn"
                aria-label={t('testimonials.pager.next')}
              >
                <FiArrowRight />
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Твоя черга.
          </p>
          <h2>{accent(t('testimonials.cta.title'))}</h2>
          <p className="closing__sub">{t('testimonials.cta.subtitle')}</p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              {clean(t('testimonials.cta.button'))} <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Testimonials;
