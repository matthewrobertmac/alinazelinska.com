import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import TrustBadges from '../components/TrustBadges';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { personSchema } from '../utils/schemas';
import { clean } from '../utils/text';
import './about.css';
import { ease, reveal, stagger } from '../utils/motion';

const VIDEO_URL = '/media/alina-intro.mp4';
const PORTRAIT_URL = '/media/alina-about.jpeg';

// Content strings use *word* for emphasis
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
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t('about.docTitle');
  }, [t]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const paragraphs = list(t('about.story.paragraphs', { returnObjects: true }));
  const funFacts = list(t('about.funFacts.items', { returnObjects: true }));
  const favouriteWords = list(t('about.favouriteWords.items', { returnObjects: true }));
  const worktimeline = list(t('about.journey.items', { returnObjects: true }));
  const languages = list(t('about.languages.items', { returnObjects: true }));
  const services = list(t('about.offer.items', { returnObjects: true }));

  return (
    <div className="about-page page-transition">
      <SEOHead
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        keywords={t('about.seo.keywords')}
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

      {/* ─── Story ────────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{t('about.story.eyebrow')}</p>
              <h2>{emphasise(t('about.story.title'), 'display-italic')}</h2>
              <p>{clean(t('about.subtitle'))}</p>
            </motion.header>

            <motion.div {...reveal} className="prose-ink">
              {paragraphs.map((paragraph, index) => (
                <p key={index} data-testid={`about-paragraph-${index}`}>
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>

          <motion.div {...reveal} className="about-stats">
            <TrustBadges />
          </motion.div>
        </div>
      </section>

      {/* ─── Video ────────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{t('about.video.eyebrow')}</p>
              <h2>{clean(t('about.videoHeading'))}</h2>
            </div>
            <p>{clean(t('about.videoCaption'))}</p>
          </motion.header>

          <motion.div {...reveal} className="about-video">
            <video ref={videoRef} src={VIDEO_URL} playsInline muted={isMuted} loop onClick={togglePlay} />

            {!isPlaying && (
              <button type="button" className="about-video__play" onClick={togglePlay} aria-label={t('about.video.play')}>
                <FiPlay />
              </button>
            )}

            <div className="about-video__controls">
              {isPlaying && (
                <button type="button" onClick={togglePlay} aria-label={t('about.video.pause')}>
                  <FiPause />
                </button>
              )}
              <button type="button" onClick={toggleMute} aria-label={isMuted ? t('about.video.unmute') : t('about.video.mute')}>
                {isMuted ? <FiVolumeX /> : <FiVolume2 />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Fun facts ────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('about.funFacts.eyebrow')}</p>
            <h2>{clean(t('about.funFacts.title'))}</h2>
          </motion.header>

          <ol className="facts">
            {funFacts.map((fact, index) => (
              <motion.li key={index} {...stagger(index % 2)}>
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <p>{fact.text}</p>
                <span className="facts__icon" aria-hidden="true">
                  {fact.icon}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Favourite words ──────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{t('about.favouriteWords.eyebrow')}</p>
              <h2>{clean(t('about.favouriteWords.title'))}</h2>
            </div>
            <p>{t('about.favouriteWords.subtitle')}</p>
          </motion.header>

          <div className="words">
            {favouriteWords.map((item, index) => (
              <motion.article key={item.word} className="words__card" {...stagger(index)}>
                <span className="words__lang">{item.language}</span>
                <h3 lang="uk">{item.word}</h3>
                <p className="words__tr">
                  {item.transliteration && <>{item.transliteration} — </>}
                  <strong>{item.gloss}</strong>
                </p>
                <p className="words__note">{item.explanation}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Journey ──────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{t('about.journey.eyebrow')}</p>
              <h2 data-testid="work-timeline-title">{t('about.experience')}</h2>
              <p>{t('about.journey.lede')}</p>
            </motion.header>

            <ol className="rule-list timeline">
              {worktimeline.map((work, index) => (
                <motion.li key={index} {...stagger(index)} data-testid={`work-item-${index}`}>
                  <span className="timeline__date">{work.date}</span>
                  <h3>{work.jobtitle}</h3>
                  <p className="timeline__where">{work.where}</p>
                  {work.description && <p className="timeline__desc">{clean(work.description)}</p>}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Languages ────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('about.languages.eyebrow')}</p>
            <h2 data-testid="skills-title">{t('about.skills')}</h2>
          </motion.header>

          <ul className="langs">
            {languages.map((skill, index) => (
              <motion.li key={index} {...stagger(index)} data-testid={`skill-item-${index}`}>
                <span className="langs__name">{skill.name}</span>
                <span className={`langs__level ${skill.learning ? 'is-learning' : ''}`}>
                  {skill.level}
                </span>
                <span className="langs__bar" aria-hidden="true">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: skill.value / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease, delay: 0.2 + index * 0.08 }}
                  />
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Services ─────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('about.offer.eyebrow')}</p>
            <h2 data-testid="services-title">{clean(t('about.services'))}</h2>
          </motion.header>

          <ol className="rule-list about-services">
            {services.map((service, index) => (
              <motion.li key={index} {...stagger(index)} data-testid={`service-item-${index}`}>
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{emphasise(service.description)}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Не лише уроки.
          </p>
          <h2>{emphasise(t('about.closing.title'), 'display-italic')}</h2>
          <p className="closing__sub">{t('about.closing.sub')}</p>
          <div className="closing__actions">
            <Link to="/special-projects" className="btn-primary">
              {t('about.closing.projects')} <FiArrowRight />
            </Link>
            <Link to="/booking" className="btn-outline">
              {t('about.closing.book')} <FiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
