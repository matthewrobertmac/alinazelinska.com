import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../../i18n/routing';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import useReviews from './useReviews';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import { russianCourseSchema, breadcrumbSchema } from '../../utils/schemas';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const RussianLessons = () => {
  const { t } = useTranslation();
  const p = (k, o) => t(`services.russian.${k}`, o);
  const s = (k) => t(`services.shared.${k}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const russianTestimonials = useReviews('russian');
  const learnerTypes = p('learners', { returnObjects: true });
  const whatYoullLearn = p('learn', { returnObjects: true });
  const faq = p('faq', { returnObjects: true });

  return (
    <div className="svc-page page-transition">
      <SEOHead
        title={p('seo.title')}
        description={p('seo.description')}
        keywords={p('seo.keywords')}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { ...russianCourseSchema, name: p('schema.name'), description: p('schema.description') },
            breadcrumbSchema([
              { name: s('home'), url: 'https://alinazelinska.com' },
              { name: s('services'), url: 'https://alinazelinska.com/special-projects' },
              { name: p('crumb'), url: 'https://alinazelinska.com/services/russian-lessons' }
            ])
          ]
        }}
      />

      <PageHero
        crumbs={[{ name: s('services'), url: '/special-projects' }, { name: p('crumb') }]}
        eyebrow={p('eyebrow')}
        uk="Слово"
        title={
          <>
            {p('title')} <em>{p('titleAccent')}</em>
          </>
        }
        lede={p('lede')}
        aside={
          <div className="svc-ledger">
            <span className="svc-ledger__label">{s('ledgerLabel')}</span>
            <dl>
              <div>
                <dt>500+</dt>
                <dd>{s('ledgerStudents')}</dd>
              </div>
              <div>
                <dt>3,500+</dt>
                <dd>{s('ledgerLessons')}</dd>
              </div>
              <div>
                <dt>
                  <em>5.0</em>
                </dt>
                <dd>{s('ledgerRating')}</dd>
              </div>
            </dl>
          </div>
        }
      >
        <div className="svc-actions">
          <Link to="/booking" className="btn-primary">
            {s('bookTrial')} <FiArrowRight />
          </Link>
          <Link to="/contact" className="btn-outline">
            {s('askAnything')}
          </Link>
        </div>
      </PageHero>

      {/* ─── Who this is for ──────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{s('whoEyebrow')}</p>
              <h2>
                {s('whoTitle')} <em className="display-italic">{s('whoAccent')}</em>
              </h2>
            </div>
            <p>{p('whoIntro')}</p>
          </motion.header>

          <div className="svc-cards">
            {learnerTypes.map((type, index) => (
              <motion.article key={type.title} className="svc-card" {...stagger(index)}>
                <span className="num">{ROMAN[index]}</span>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What you'll learn ────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{s('learnEyebrow')}</p>
              <h2>
                {s('learnTitle')} <em className="display-italic">{s('learnAccent')}</em>
              </h2>
            </motion.header>

            <ol className="svc-checks">
              {whatYoullLearn.map((item, index) => (
                <motion.li key={item} {...stagger(index % 4)}>
                  <span className="num">{pad(index)}</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Student testimonials ─────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{s('quotesEyebrow')}</p>
            <h2>
              {p('quotesTitle')} <em className="display-italic">{p('quotesAccent')}</em>
            </h2>
          </motion.header>

          <div className="svc-quotes">
            {russianTestimonials.map((testimonial, index) => (
              <motion.figure key={testimonial.name + index} className="svc-quote" {...stagger(index % 3)}>
                <blockquote>{testimonial.text}</blockquote>
                <figcaption>
                  {testimonial.img && <img src={testimonial.img} alt={testimonial.name} />}
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.lessons}</span>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{s('faqEyebrow')}</p>
            <h2>
              {p('faqTitle')} <em className="display-italic">{p('faqAccent')}</em>
            </h2>
          </motion.header>

          <ol className="rule-list svc-faq">
            {faq.map((item, index) => (
              <motion.li key={item.q} {...stagger(index)}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="ru">
            Начнём?
          </p>
          <h2>
            {p('closingTitle')} <em className="display-italic">{p('closingAccent')}</em>
          </h2>
          <p className="closing__sub">
            {p('closingSub')}
          </p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              {s('bookYourTrial')} <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default RussianLessons;
