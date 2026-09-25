import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaTiktok } from 'react-icons/fa';
import { FiArrowUpRight, FiPlay } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { accent, clean } from '../utils/text';
import './tiktok.css';
import { reveal, stagger } from '../utils/motion';

// Videos from @movalina.study (captions: tiktok.videos.<id>). Covers are self-hosted in public/media/tiktok/ so the
// grid appears instantly; TikTok's player loads only for the video someone plays.
const videos = [
  '7588914741314096406',
  '7586343750364876054',
  '7585976441234328854',
  '7581140573931851030',
  '7561058641697066262',
  '7558833442746535190',
  '7555133090306313494',
  '7576672900434890006',
  '7564815695691730198',
  '7563726142662855958',
  '7577058084200172822',
  '7571563031734390038',
  '7543332287581048086',
  '7583000875501669654',
  '7572624839064849687',
  '7556675495782272259',
  '7565574108361002262',
  '7567090474025078019',
];

const TikTokVideo = ({ id }) => {
  const { t } = useTranslation();
  const label = t(`tiktok.videos.${id}`);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <div className="tt-embed">
      {playing ? (
        <>
          {!ready && (
            <div className="tt-embed__loading" role="status">
              <span className="tt-embed__spinner" aria-hidden="true" />
              <p>{t('tiktok.player.loading')}</p>
              <small>{t('tiktok.player.loadingHint')}</small>
            </div>
          )}
          <iframe
            src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&rel=0&description=1&music_info=1`}
            title={label}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => setReady(true)}
          />
        </>
      ) : (
        <button type="button" className="tt-embed__poster" onClick={() => setPlaying(true)} aria-label={t('tiktok.player.play', { label })}>
          <img src={`/media/tiktok/${id}.jpg`} alt="" loading="lazy" width="360" height="640" />
          <span className="tt-embed__play" aria-hidden="true">
            <FiPlay />
          </span>
        </button>
      )}
    </div>
  );
};

const TikTok = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const topics = [
    {
      icon: '🇺🇦',
      lang: 'uk',
      word: 'Українська',
      title: t('tiktok.ukrainian.title'),
      description: t('tiktok.ukrainian.description'),
    },
    {
      icon: '🇷🇺',
      lang: 'ru',
      word: 'Русский',
      title: t('tiktok.russian.title'),
      description: t('tiktok.russian.description'),
    },
    {
      icon: '🇬🇧',
      lang: 'en',
      word: 'English',
      title: t('tiktok.english.title'),
      description: t('tiktok.english.description'),
    },
  ];

  return (
    <div className="tiktok-page page-transition">
      <SEOHead
        title={t('tiktok.seo.title')}
        description={t('tiktok.seo.description')}
        keywords={t('tiktok.seo.keywords')}
      />

      <PageHero
        crumbs={[{ name: 'TikTok' }]}
        eyebrow={
          <>
            <FaTiktok aria-hidden="true" /> {t('tiktok.eyebrow')}
          </>
        }
        uk="Дивись"
        testId="tiktok-title"
        title={accent(t('tiktok.title'))}
        lede={t('tiktok.followersInfo')}
      >
        <a
          href="https://www.tiktok.com/@movalina.study"
          target="_blank"
          rel="noopener noreferrer"
          className="tt-handle link-underline"
          data-testid="tiktok-handle"
        >
          @movalina.study
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </PageHero>

      {/* ─── Feed ─────────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{t('tiktok.feed.eyebrow')}</p>
              <h2>
                {t('tiktok.feed.title')} <em className="display-italic">{t('tiktok.feed.titleAccent')}</em>
              </h2>
            </div>
            <p>{clean(t('tiktok.followHint'))}</p>
          </motion.header>

          {/* Covers load instantly; each player loads on click */}
          <div className="tt-grid">
            {videos.map((id, index) => (
              <motion.figure
                key={id}
                {...stagger(index % 3)}
                className="tt-item"
                data-testid={`tiktok-video-${index}`}
              >
                <figcaption className="tt-item__label">
                  <span className="num">{String(index + 1).padStart(2, '0')}</span>
                  <span>{t('tiktok.feed.episode')}</span>
                </figcaption>
                <TikTokVideo id={id} />
              </motion.figure>
            ))}
          </div>

          <motion.div {...reveal} className="tt-more">
            <a
              href="https://www.tiktok.com/@movalina.study"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-testid="view-tiktok-btn"
            >
              <FaTiktok aria-hidden="true" />
              {clean(t('tiktok.watchAll'))}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── What you'll learn ────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{t('tiktok.topicsEyebrow')}</p>
              <h2>{accent(t('tiktok.whatYouLearn'))}</h2>
              <p>{clean(t('tiktok.subtitle'))}</p>
            </motion.header>

            <ol className="rule-list tt-topics">
              {topics.map((item, index) => (
                <motion.li key={item.lang} {...stagger(index)} data-testid={`content-type-${index}`}>
                  <span className="num">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="tt-topics__word" lang={item.lang} aria-hidden="true">
                      {item.word}
                    </span>
                    <h3>{clean(item.title)}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            До зустрічі у стрічці.
          </p>
          <h2>{accent(t('tiktok.joinCommunity.title'))}</h2>
          <p className="closing__sub">{t('tiktok.joinCommunity.subtitle')}</p>
          <div className="closing__actions">
            <a
              href="https://www.tiktok.com/@movalina.study"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaTiktok aria-hidden="true" />
              {clean(t('tiktok.joinCommunity.button'))}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TikTok;
