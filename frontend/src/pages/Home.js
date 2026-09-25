import React, { useMemo, useRef } from 'react';
import { Link } from '../i18n/routing';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import FloatingWords from '../components/FloatingWords';
import SEOHead from '../components/SEOHead';
import PriceTable from '../components/blocks/PriceTable';
import ReviewStrip from '../components/blocks/ReviewStrip';
import VideoIntro from '../components/blocks/VideoIntro';
import GuideCTA from '../components/blocks/GuideCTA';
import { introdata } from '../data/content';
import { PRICES, perLesson } from '../data/pricing';
import { personSchema, websiteSchema } from '../utils/schemas';
import { ease, reveal, stagger } from '../utils/motion';
import './home.css';

const asArray = (value) => (Array.isArray(value) ? value : []);
const eur = (value) => `€${value}`;

// The cheapest honest "from" price for each kind of offer (see data/pricing.js)
const FROM = {
  lesson: Math.min(perLesson('standard'), perLesson('intensive')),
  club: perLesson('speakingClub'),
};

const TRIAL = { price: eur(PRICES.trial.price), minutes: PRICES.trial.minutes };

const emItalic = { em: <em className="display-italic" /> };

// Headline strings mark their accent as *words*
const emphasise = (text) =>
  String(text)
    .split(/\*(.+?)\*/)
    .map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const CircleBadge = ({ text }) => (
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
    <span className="circle-badge__core">
      5.0<small>★</small>
    </span>
  </div>
);

// Each language leads with its own audience's offer; the order and copy live in home.json
const Home = () => {
  const copyRef = useRef(null);
  // Words keep clear of every piece of text in the hero: the copy, the rating badge and the note
  const avoidRefs = useMemo(() => [copyRef, '.hero .circle-badge', '.hero .hero__note'], []);
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage;

  const stats = asArray(t('home.stats', { returnObjects: true }));
  const heroLines = asArray(t('home.hero.title', { returnObjects: true }));
  const offers = asArray(t('home.offers.items', { returnObjects: true }));
  const reviewIndices = asArray(t('home.reviews.indices', { returnObjects: true }));
  const extra = t('home.offers.extra', { returnObjects: true }) || {};

  return (
    <div className="home-page relative page-transition" data-lang={lng}>
      <SEOHead
        title={t('home.seo.title')}
        description={t('home.seo.description', TRIAL)}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [personSchema, websiteSchema],
        }}
      />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__aura" aria-hidden="true" />
        {/* Desktop: words drift across the whole hero, over the portrait, but never over the copy */}
        <FloatingWords avoidRefs={avoidRefs} />

        <div className="hero__inner">
          <div className="hero__copy" ref={copyRef}>
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
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease, delay: 0.35 + i * 0.12 }}
                  >
                    {emphasise(line)}{' '}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.8 }}
              className="hero__lede"
            >
              <p>
                {t('home.hero.ledePrefix')}
                <strong>{t('home.hero.ledeName')}</strong>
                {t('home.hero.ledeSuffix')}
              </p>
              <p className="hero__proof">{t('home.hero.proof')}</p>
            </motion.div>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.95 }}
            >
              <Link to="/booking" className="btn-primary" data-testid="book-lesson-btn">
                {t('home.hero.bookTrial', TRIAL)}
                <FiArrowRight />
              </Link>
              <a href="#prices" className="btn-outline" data-testid="see-prices-btn">
                {t('home.hero.seePrices')}
              </a>
            </motion.div>

            <motion.dl
              className="hero__stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              {stats.map((s) => (
                <div key={s.value}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <div className="hero__visual">
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
                transition={{ duration: 1, ease, delay: 1.5 }}
              >
                <span lang={t('home.hero.noteLang')}>{t('home.hero.note')}</span>
                <small>{t('home.hero.noteGloss')}</small>
              </motion.div>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ─── Manifesto ────────────────────────────────────── */}
      <section className="manifesto">
        <motion.div {...reveal} className="manifesto__inner">
          <p className="eyebrow">{t('home.manifesto.eyebrow')}</p>
          <p className="manifesto__text">
            <Trans i18nKey="home.manifesto.text" components={{ em: <em /> }} />
          </p>
          <div className="manifesto__sign">
            <span className="manifesto__signature">{t('home.manifesto.signature')}</span>
            <Link to="/about" className="link-underline">
              {t('home.manifesto.readStory')} <FiArrowUpRight className="inline" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── Offers ───────────────────────────────────────── */}
      <section className="offers page-section page-section--flush-top" id="lessons">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{t('home.offers.eyebrow')}</p>
              <h2>{emphasise(t('home.offers.title'))}</h2>
            </div>
            <p>{t('home.offers.subtitle')}</p>
          </motion.header>

          <div className="offers__grid">
            {offers.map((o, i) => (
              <motion.article key={o.to} className="offer-card" {...stagger(i)}>
                <Link to={o.to} className="offer-card__link" data-testid={`service-card-${i}`}>
                  <span className="offer-card__top">
                    <span className="offer-card__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="offer-card__tag" aria-hidden="true">
                      {o.tag}
                    </span>
                  </span>
                  <h3>{o.title}</h3>
                  <p className="offer-card__who">{o.who}</p>
                  <p className="offer-card__text">{o.text}</p>
                  <span className="offer-card__foot">
                    <span className="offer-card__price">{t('home.offers.from', { price: eur(FROM[o.price] || FROM.lesson) })}</span>
                    <span className="offer-card__more">
                      {t('home.offers.more')} <FiArrowUpRight aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>

          {extra.to && (
            <motion.p {...reveal} className="offers__extra">
              {extra.text}{' '}
              <Link to={extra.to} className="link-underline">
                {extra.link} <FiArrowUpRight className="inline" />
              </Link>
            </motion.p>
          )}
        </div>
      </section>

      {/* ─── Prices ───────────────────────────────────────── */}
      <section className="page-section page-section--tint" id="prices">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('home.prices.eyebrow')}</p>
            <h2>{emphasise(t('home.prices.title'))}</h2>
            <p>{t('home.prices.subtitle', TRIAL)}</p>
          </motion.header>
          <motion.div {...reveal}>
            <PriceTable />
          </motion.div>
        </div>
      </section>

      {/* ─── Reviews ──────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('home.reviews.eyebrow')}</p>
            <h2>{emphasise(t('home.reviews.title'))}</h2>
          </motion.header>
          <motion.div {...reveal}>
            <ReviewStrip indices={reviewIndices.length ? reviewIndices : undefined} />
          </motion.div>
        </div>
      </section>

      {/* ─── Video ────────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell home-video">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('home.video.eyebrow')}</p>
            <h2>{emphasise(t('home.video.title'))}</h2>
            <p>{t('home.video.text')}</p>
          </motion.header>
          <motion.div {...reveal}>
            <VideoIntro />
          </motion.div>
        </div>
      </section>

      {/* ─── Free guide + learning hub ────────────────────── */}
      <section className="page-section home-learn-section">
        <div className="section-shell home-learn">
          <motion.div {...reveal}>
            <GuideCTA />
          </motion.div>
          <motion.aside {...reveal} className="home-learn__teaser">
            <p className="eyebrow">{t('home.learn.eyebrow')}</p>
            <h2>{t('home.learn.title')}</h2>
            <p>{t('home.learn.text')}</p>
            <Link to="/learn" className="link-underline" data-testid="learn-link">
              {t('home.learn.link')} <FiArrowUpRight className="inline" />
            </Link>
          </motion.aside>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className={`closing ${lng === 'en' ? '' : 'closing--long'}`}>
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang={t('home.closing.wordLang')}>
            {t('home.closing.word')}
          </p>
          <h2>
            <Trans i18nKey="home.closing.title" components={emItalic} />
          </h2>
          <p className="closing__sub">{t('home.closing.sub')}</p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              {t('home.hero.bookTrial', TRIAL)} <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-outline" data-testid="contact-me-btn">
              {t('home.closing.contact')}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
