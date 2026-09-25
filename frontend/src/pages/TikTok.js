import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaTiktok } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { meta } from '../data/content';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { accent, clean } from '../utils/text';
import './tiktok.css';
import { reveal, stagger } from '../utils/motion';

// clean() plus flag emoji (regional indicators aren't Extended_Pictographic)
// Optimized TikTok Embed Component with Lazy Loading
const TikTokEmbed = ({ videoId }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const embedRef = React.useRef(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: '50px' }
    );

    const node = embedRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      // Load TikTok embed script only when needed
      if (!document.getElementById('tiktok-embed-script')) {
        const script = document.createElement('script');
        script.id = 'tiktok-embed-script';
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else {
        // If script already exists, reload embeds
        if (window.tiktokEmbed?.lib?.render) {
          window.tiktokEmbed.lib.render();
        }
      }
    }
  }, [isVisible]);

  return (
    <div ref={embedRef} className="tt-embed">
      {isVisible ? (
        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/@movalina.study/video/${videoId}`}
          data-video-id={videoId}
          style={{ maxWidth: '325px', minWidth: '250px' }}
        >
          <section></section>
        </blockquote>
      ) : (
        <div className="tt-embed__placeholder">
          <FaTiktok aria-hidden="true" />
          <p>Loading video...</p>
        </div>
      )}
    </div>
  );
};

const TikTok = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = `TikTok | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  // Actual TikTok video IDs from @movalina.study (unique videos only)
  const tiktokVideoIds = [
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
        title="Learn Languages on TikTok | @movalina.study | Alina Zelinska"
        description="Follow @movalina.study for bite-sized Ukrainian, Russian & English lessons on TikTok. Quick language tips, cultural insights, and fun educational content from Alina Zelinska."
        keywords="Ukrainian TikTok, language learning TikTok, @movalina.study, Ukrainian lessons, Russian lessons TikTok"
      />

      <PageHero
        crumbs={[{ name: 'TikTok' }]}
        eyebrow={
          <>
            <FaTiktok aria-hidden="true" /> Bite-sized lessons
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
              <p className="eyebrow">The feed</p>
              <h2>
                Latest <em className="display-italic">episodes.</em>
              </h2>
            </div>
            <p>{clean(t('tiktok.followHint'))}</p>
          </motion.header>

          {/* TikTok Feed - Lazy Loaded Embedded Videos */}
          <div className="tt-grid">
            {tiktokVideoIds.map((videoId, index) => (
              <motion.figure
                key={videoId}
                {...stagger(index % 3)}
                className="tt-item"
                data-testid={`tiktok-video-${index}`}
              >
                <figcaption className="tt-item__label">
                  <span className="num">{String(index + 1).padStart(2, '0')}</span>
                  <span>Episode</span>
                </figcaption>
                <TikTokEmbed videoId={videoId} />
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
              <p className="eyebrow">Three channels in one</p>
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
