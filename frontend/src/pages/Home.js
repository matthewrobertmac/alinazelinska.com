import React, { useEffect, useState } from 'react';
import { Link } from '../i18n/routing';
import { useTranslation, Trans } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingWords from '../components/FloatingWords';
import QuizWidget from '../components/QuizWidget';
import SEOHead from '../components/SEOHead';
import { introdata, floatingWords, contactInfo } from '../data/content';
import { personSchema, organizationSchema, aggregateRatingSchema } from '../utils/schemas';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { clean } from '../utils/text';
import './home.css';
import { ease, reveal } from '../utils/motion';

// Indices into reviews.items (same order as the testimonials page)
const FEATURED = [0, 8, 9];

const asArray = (value) => (Array.isArray(value) ? value : []);

const em = { em: <em /> };
const emItalic = { em: <em className="display-italic" /> };

const RotatingLine = ({ lines }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % lines.length), 3800);
    return () => clearInterval(id);
  }, [lines.length]);
  return (
    <span className="rotating-line" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease }}
          className="block"
        >
          {lines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const CircleBadge = ({ text }) => {
  return (
    <div className="circle-badge" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="spin-slow">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="circle-badge__core">5.0<small>★</small></span>
    </div>
  );
};

// The hero's last line glows: gradient on the words, trailing punctuation left plain.
const GradientLine = ({ text }) => {
  const [, words, punct] = text.match(/^(.*?)([.!?…]*)$/s);
  return (
    <>
      <span className="gradient-text">{words}</span>
      {punct}
    </>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const [quote, setQuote] = useState(0);

  const reviews = asArray(t('reviews.items', { returnObjects: true }));
  const featuredQuotes = FEATURED.map((i) => reviews[i]).filter(Boolean);
  const stats = asArray(t('home.stats', { returnObjects: true }));
  const heroLines = asArray(t('home.hero.title', { returnObjects: true }));
  const rotatingLines = asArray(t('home.intro.animated', { returnObjects: true }));
  const teachItems = asArray(t('home.whoITeach.items', { returnObjects: true }));
  const gloss = (w) => t(`widgets.lexicon.gloss.${w.tr}`, { defaultValue: w.en });
  const showTransliteration = i18n.resolvedLanguage === 'en';
  const quoteCount = featuredQuotes.length;
  const current = featuredQuotes[quote % Math.max(quoteCount, 1)];

  useEffect(() => {
    if (quoteCount < 2) return undefined;
    const id = setInterval(() => setQuote((q) => (q + 1) % quoteCount), 7000);
    return () => clearInterval(id);
  }, [quoteCount]);

  const offerings = [
    { key: 'conversationalUkrainian', to: '/services/ukrainian-lessons', tag: 'Українська' },
    { key: 'professionalUkrainian', to: '/services/ukrainian-lessons', tag: 'Ділова мова' },
    { key: 'examPrep', to: '/services/ukrainian-lessons', tag: 'Структура' },
    { key: 'russianLessons', to: '/services/russian-lessons', tag: 'Русский' },
    { key: 'poetryTranslation', to: '/services/poetry-translation', tag: 'Поезія' },
    { key: 'creativeWriting', to: '/services/creative-writing', tag: 'Слово' },
  ];

  const marqueeWords = floatingWords.slice(0, 18);

  return (
    <div className="home-page relative page-transition">
      <SEOHead
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        keywords={t('home.seo.keywords')}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [personSchema, organizationSchema, aggregateRatingSchema],
        }}
      />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__aura" aria-hidden="true" />
        <FloatingWords />

        <div className="hero__inner">
          <div className="hero__copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
            >
              {t('home.hero.eyebrow')}
            </motion.p>

            <h1 className="hero__title" data-testid="hero-title">
              {heroLines.map((line, i) => (
                <span key={i} className="hero__line">
                  <motion.span
                    className={`block ${i >= heroLines.length - 2 ? 'display-italic' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease, delay: 0.35 + i * 0.12 }}
                  >
                    {i === heroLines.length - 1 ? <GradientLine text={line} /> : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.9 }}
              className="hero__lede"
            >
              <p>
                {t('home.hero.ledePrefix')}
                <strong>{t('home.hero.ledeName')}</strong>
                {t('home.hero.ledeSuffix')}
              </p>
              {rotatingLines.length > 0 && <RotatingLine key={i18n.resolvedLanguage} lines={rotatingLines} />}
            </motion.div>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 1.05 }}
            >
              <Link to="/booking" className="btn-primary" data-testid="book-lesson-btn">
                {t('home.hero.bookFirst')}
                <FiArrowRight />
              </Link>
              <Link to="/testimonials" className="btn-outline" data-testid="view-testimonials-btn">
                {clean(t('home.viewTestimonials'))}
              </Link>
            </motion.div>

            <motion.dl
              className="hero__stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.3 }}
            >
              {stats.map((s) => (
                <div key={s.value}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.figure
            className="hero__portrait"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.6, ease, delay: 0.4 }}
          >
            <div className="arch">
              <div className="arch__glow" />
              <img src={introdata.image} alt={t('home.hero.portraitAlt')} data-testid="hero-image" fetchPriority="high" />
            </div>
            <CircleBadge text={t('home.badge')} />
            <motion.div
              className="hero__note"
              initial={{ opacity: 0, x: -16, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 1, ease, delay: 1.6 }}
            >
              <span lang="uk">Привіт!</span>
              <small>{t('home.hero.noteGloss')}</small>
            </motion.div>
          </motion.figure>
        </div>
      </section>

      {/* ─── Lexicon marquee ──────────────────────────────── */}
      <section className="lexicon-band" aria-label={t('home.lexiconLabel')}>
        <div className="marquee">
          {[0, 1].map((copy) => (
            <div className="marquee__track" key={copy} aria-hidden={copy === 1}>
              {marqueeWords.map((w) => (
                <span key={w.uk} className="lexicon-band__item">
                  <span lang="uk">{w.uk}</span>
                  <em>{gloss(w)}</em>
                  <span className="lexicon-band__star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Manifesto ────────────────────────────────────── */}
      <section className="manifesto">
        <motion.div {...reveal} className="manifesto__inner">
          <p className="eyebrow">{t('home.manifesto.eyebrow')}</p>
          <p className="manifesto__text">
            <Trans i18nKey="home.manifesto.text" components={em} />
          </p>
          <div className="manifesto__sign">
            <span className="manifesto__signature">{t('home.manifesto.signature')}</span>
            <Link to="/about" className="link-underline">
              {t('home.manifesto.readStory')} <FiArrowUpRight className="inline" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── What I offer ─────────────────────────────────── */}
      <section className="offer">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('home.whatIOffer.eyebrow')}</p>
            <h2>{clean(t('home.whatIOffer.title'))}</h2>
            <p>{clean(t('home.whatIOffer.subtitle'))}</p>
          </motion.header>

          <ol className="offer__list">
            {offerings.map((o, i) => (
              <motion.li
                key={o.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease, delay: i * 0.06 }}
              >
                <Link to={o.to} className="offer__row" data-testid={`service-card-${i}`}>
                  <span className="offer__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="offer__title">{t(`home.whatIOffer.${o.key}.title`)}</span>
                  <span className="offer__desc">{t(`home.whatIOffer.${o.key}.description`)}</span>
                  <span className="offer__tag" lang="uk">
                    {o.tag}
                  </span>
                  <span className="offer__arrow">
                    <FiArrowUpRight />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Who I teach ──────────────────────────────────── */}
      <section className="teach">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{t('home.whoITeach.eyebrow')}</p>
              <h2>{t('home.whoITeach.title')}</h2>
            </div>
            <p>{t('home.whoITeach.subtitle')}</p>
          </motion.header>

          <div className="teach__grid">
            {teachItems.map((item, i) => (
              <motion.article
                key={i}
                className="teach__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, ease, delay: i * 0.1 }}
              >
                <span className="teach__numeral">{['I', 'II', 'III', 'IV'][i]}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonial ──────────────────────────────────── */}
      <section className="voices">
        <div className="voices__inner">
          <span className="voices__mark" aria-hidden="true">
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={quote}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease }}
            >
              {current && (
                <>
                  <blockquote>{current.text}</blockquote>
                  <figcaption>
                    <strong>{current.name}</strong>
                    <span>{current.lessons}</span>
                  </figcaption>
                </>
              )}
            </motion.figure>
          </AnimatePresence>
          <div className="voices__controls">
            <div className="voices__dots">
              {featuredQuotes.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuote(i)}
                  className={i === quote ? 'is-active' : ''}
                  aria-label={t('home.voices.showReview', { name: q.name })}
                />
              ))}
            </div>
            <Link to="/testimonials" className="link-underline">
              {t('home.voices.allReviews')} <FiArrowUpRight className="inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Quiz ─────────────────────────────────────────── */}
      <section className="quiz-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('home.quiz.eyebrow')}</p>
            <h2>
              <Trans i18nKey="home.quiz.title" components={emItalic} />
            </h2>
            <p>{t('home.quiz.subtitle')}</p>
          </motion.header>
          <motion.div {...reveal} className="quiz-frame">
            <QuizWidget />
          </motion.div>
        </div>
      </section>

      {/* ─── TikTok ───────────────────────────────────────── */}
      <section className="tiktok-band">
        <motion.div {...reveal} className="tiktok-band__inner">
          <div>
            <p className="eyebrow">
              <FaTiktok /> {t('home.tiktok.eyebrow')}
            </p>
            <h2>
              <Trans i18nKey="home.tiktok.title" components={emItalic} />
            </h2>
            <p>{t('home.tiktok.subtitle')}</p>
          </div>
          <div className="tiktok-band__actions">
            <Link to="/tiktok" className="btn-primary" data-testid="tiktok-gallery-btn">
              {clean(t('home.tiktok.viewVideos'))}
              <FiArrowRight />
            </Link>
            <a
              href={contactInfo.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="tiktok-band__handle link-underline"
              data-testid="follow-tiktok-btn"
            >
              @movalina.study
            </a>
          </div>
        </motion.div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Почнімо.
          </p>
          <h2>
            <Trans i18nKey="home.closing.title" components={emItalic} />
          </h2>
          <p className="closing__sub">{t('home.closing.sub')}</p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              {t('home.closing.book')} <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-outline" data-testid="contact-me-btn">
              {clean(t('home.getInTouch'))}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
