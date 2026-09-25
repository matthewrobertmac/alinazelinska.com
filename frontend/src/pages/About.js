import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { dataabout, meta, worktimeline, skills, services, funFacts, favouriteWords } from '../data/content';
import TrustBadges from '../components/TrustBadges';
import LazyImage from '../components/LazyImage';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { personSchema } from '../utils/schemas';
import { clean } from '../utils/text';
import './about.css';
import { ease, reveal, stagger } from '../utils/motion';

const VIDEO_URL = 'https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/kodpfas7_copy_F5503918-139B-4C1A-89CB-371F6DF38D88%20%281%29.mp4';
const PORTRAIT_URL = 'https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/n2vsu8vg_lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit.%20lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit%20%281%29.jpeg';

// Content strings use *word* for emphasis
const emphasise = (text) =>
  clean(text)
    .split(/\*(.+?)\*/)
    .map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const languages = skills.filter((s) => s.level);

const About = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    document.title = `About | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

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

  const paragraphs = dataabout.aboutme.split('\n\n');

  return (
    <div className="about-page page-transition">
      <SEOHead
        title="About Alina Zelinska | Ukrainian Tutor from Malta | 5.0★ Rating"
        description="Meet Alina Zelinska: Native Ukrainian & Russian tutor based in Sliema, Malta. 500+ students, 3,500+ lessons, perfect 5.0 rating, 100% attendance."
        keywords="Alina Zelinska, Ukrainian tutor Malta, language teacher, native Ukrainian speaker"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: personSchema,
        }}
      />

      <PageHero
        crumbs={[{ name: 'About Me' }]}
        eyebrow="About me · Sliema, Malta"
        uk="Слово"
        testId="about-title"
        title={
          <>
            Hi, I’m Alina — a little <em>obsessed</em> with language.
          </>
        }
        lede="Teacher, translator, poet, songwriter — and, let’s be honest, a total word nerd. Originally from Ukraine, teaching the world from a Mediterranean island."
        aside={
          <figure className="about-portrait">
            <div className="about-portrait__frame">
              <LazyImage src={PORTRAIT_URL} alt="Alina Zelinska" className="about-portrait__img" />
            </div>
            <figcaption>
              <span lang="uk">Аліна Зелінська</span>
              <small>since April 2022 · 3,500+ lessons</small>
            </figcaption>
          </figure>
        }
      />

      {/* ─── Story ────────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">My story</p>
              <h2>
                Words are my whole <em className="display-italic">personality.</em>
              </h2>
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
              <p className="eyebrow">Say hello</p>
              <h2>{clean(t('about.videoHeading'))}</h2>
            </div>
            <p>{clean(t('about.videoCaption'))}</p>
          </motion.header>

          <motion.div {...reveal} className="about-video">
            <video ref={videoRef} src={VIDEO_URL} playsInline muted={isMuted} loop onClick={togglePlay} />

            {!isPlaying && (
              <button type="button" className="about-video__play" onClick={togglePlay} aria-label="Play video">
                <FiPlay />
              </button>
            )}

            <div className="about-video__controls">
              {isPlaying && (
                <button type="button" onClick={togglePlay} aria-label="Pause video">
                  <FiPause />
                </button>
              )}
              <button type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
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
            <p className="eyebrow">Off the record</p>
            <h2>{clean(t('about.funFacts.title'))}</h2>
          </motion.header>

          <ol className="facts">
            {funFacts.map((fact, index) => (
              <motion.li key={fact.text} {...stagger(index % 2)}>
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
              <p className="eyebrow">Lexicon</p>
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
                  {item.transliteration} — <strong>{item.translation}</strong>
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
              <p className="eyebrow">Journey</p>
              <h2 data-testid="work-timeline-title">{t('about.experience')}</h2>
              <p>I love building things from scratch — whether that’s a business, a lesson plan, or a poem.</p>
            </motion.header>

            <ol className="rule-list timeline">
              {worktimeline.map((work, index) => (
                <motion.li key={work.where} {...stagger(index)} data-testid={`work-item-${index}`}>
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
            <p className="eyebrow">Fluency</p>
            <h2 data-testid="skills-title">{t('about.skills')}</h2>
          </motion.header>

          <ul className="langs">
            {languages.map((skill, index) => (
              <motion.li key={skill.name} {...stagger(index)} data-testid={`skill-item-${index}`}>
                <span className="langs__name">{skill.name}</span>
                <span className={`langs__level ${skill.level === 'Learning' ? 'is-learning' : ''}`}>
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
            <p className="eyebrow">Work with me</p>
            <h2 data-testid="services-title">{clean(t('about.services'))}</h2>
          </motion.header>

          <ol className="rule-list about-services">
            {services.map((service, index) => (
              <motion.li key={service.title} {...stagger(index)} data-testid={`service-item-${index}`}>
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
          <h2>
            Beyond <em className="display-italic">teaching.</em>
          </h2>
          <p className="closing__sub">
            I also work on book translations, songwriting projects, and language learning app consulting. Want to see
            what I’ve been working on?
          </p>
          <div className="closing__actions">
            <Link to="/special-projects" className="btn-primary">
              Special projects <FiArrowRight />
            </Link>
            <Link to="/booking" className="btn-outline">
              Book a lesson <FiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
