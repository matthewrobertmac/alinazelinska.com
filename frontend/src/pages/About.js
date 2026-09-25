import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { ARTICLES, Link, useLangPath } from '../i18n/routing';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import VideoIntro from '../components/blocks/VideoIntro';
import ReviewStrip from '../components/blocks/ReviewStrip';
import { personSchema } from '../utils/schemas';
import { clean } from '../utils/text';
import './about.css';
import { reveal, stagger } from '../utils/motion';

const PORTRAIT_URL = '/media/alina-about.jpeg';
// The "words I love" list became a learning article (written in English only)
const WORDS_ARTICLE = 'ukrainian-words-without-english-equivalent';

// Content strings mark the italic rose accent with *word*
const emphasise = (text, className) =>
  clean(text)
    .split(/\*(.+?)\*/)
    .map((part, i) =>
      i % 2 ? (
        <em key={i} className={className}>
          {part}
        </em>
      ) : (
        part
      )
    );

const list = (value) => (Array.isArray(value) ? value : []);

const About = () => {
  const { t } = useTranslation();
  const { lng } = useLangPath();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paragraphs = list(t('about.story.paragraphs', { returnObjects: true }));
  const languages = list(t('about.languages.items', { returnObjects: true }));
  const services = list(t('about.services.items', { returnObjects: true }));
  const showWordsLink = (ARTICLES[WORDS_ARTICLE] || []).includes(lng);

  return (
    <div className="about-page page-transition">
      <SEOHead
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: personSchema,
        }}
      />

      <PageHero
        crumbs={[{ name: t('nav.about') }]}
        eyebrow={t('about.hero.eyebrow')}
        uk="Слово"
        testId="about-title"
        title={emphasise(t('about.hero.title'))}
        lede={t('about.hero.lede')}
        aside={
          <figure className="about-portrait">
            <div className="about-portrait__frame">
              <LazyImage src={PORTRAIT_URL} alt={t('about.hero.portraitAlt')} className="about-portrait__img" />
            </div>
            <figcaption>
              <span lang="uk">Аліна Зелінська</span>
              <small>{t('about.hero.since')}</small>
            </figcaption>
          </figure>
        }
      />

      {/* ─── Video ────────────────────────────────────────── */}
      <section className="page-section about-video-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('about.video.eyebrow')}</p>
            <h2>{emphasise(t('about.video.title'), 'display-italic')}</h2>
          </motion.header>
          <motion.div {...reveal}>
            <VideoIntro />
          </motion.div>
        </div>
      </section>

      {/* ─── Story ────────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{t('about.story.eyebrow')}</p>
              <h2>{emphasise(t('about.story.title'), 'display-italic')}</h2>
            </motion.header>

            <motion.div {...reveal} className="prose-ink about-story">
              {paragraphs.map((paragraph, index) => (
                <p key={index} data-testid={`about-paragraph-${index}`}>
                  {paragraph}
                </p>
              ))}
              <p className="about-career">{t('about.career')}</p>
              {showWordsLink && (
                <p className="about-words-link">
                  <Link to={`/learn/${WORDS_ARTICLE}`} className="link-underline">
                    {t('about.story.wordsLink')} <FiArrowRight className="inline" />
                  </Link>
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Languages ────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{t('about.languages.eyebrow')}</p>
              <h2 data-testid="skills-title">{emphasise(t('about.languages.title'), 'display-italic')}</h2>
            </motion.header>

            <ul className="langs">
              {languages.map((skill, index) => (
                <motion.li key={skill.name} {...stagger(index)} data-testid={`skill-item-${index}`}>
                  <span className="langs__name">{skill.name}</span>
                  <span className={`langs__level ${skill.learning ? 'is-learning' : ''}`}>{skill.level}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Services ─────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('about.services.eyebrow')}</p>
            <h2 data-testid="services-title">{emphasise(t('about.services.title'), 'display-italic')}</h2>
          </motion.header>

          <ul className="about-links">
            {services.map((service, index) => (
              <motion.li key={service.to} {...stagger(index)} data-testid={`service-item-${index}`}>
                <Link to={service.to} className="about-link">
                  <span className="num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="about-link__body">
                    <strong>{service.label}</strong>
                    <span>{service.text}</span>
                  </span>
                  <FiArrowUpRight className="about-link__arrow" aria-hidden="true" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Reviews ──────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('about.reviews.eyebrow')}</p>
            <h2>{emphasise(t('about.reviews.title'), 'display-italic')}</h2>
          </motion.header>
          <ReviewStrip indices={[8, 9, 0]} />
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            До зустрічі на уроці.
          </p>
          <h2>{emphasise(t('about.closing.title'), 'display-italic')}</h2>
          <p className="closing__sub">{t('about.closing.sub')}</p>
          <div className="closing__actions">
            <Link to="/booking#package-trial" className="btn-primary">
              {t('about.closing.book')} <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-outline">
              {t('about.closing.contact')} <FiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
