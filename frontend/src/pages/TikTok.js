import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaTiktok } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { meta } from '../data/content';

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

    if (embedRef.current) {
      observer.observe(embedRef.current);
    }

    return () => {
      if (embedRef.current) {
        observer.unobserve(embedRef.current);
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
        if (window.tiktokEmbed) {
          window.tiktokEmbed.lib.render();
        }
      }
    }
  }, [isVisible]);

  return (
    <div ref={embedRef} className="min-h-[500px] flex items-center justify-center">
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
        <div className="w-[325px] h-[500px] bg-[var(--color-bg-secondary)] rounded-lg flex items-center justify-center">
          <p className="text-[var(--color-text-secondary)]">Loading video...</p>
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

  return (
    <div className="page-transition pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaTiktok className="w-12 h-12 text-[var(--color-accent)]" />
              <h1
                className="text-5xl md:text-6xl font-serif font-bold"
                data-testid="tiktok-title"
              >
                {t('tiktok.title')}
              </h1>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <a
              href="https://www.tiktok.com/@movalina.study"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xl text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors font-semibold"
              data-testid="tiktok-handle"
            >
              @movalina.study
              <FiExternalLink className="w-5 h-5" />
            </a>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-4">
              {t('tiktok.followersInfo')}
            </p>
          </motion.div>

          {/* TikTok Feed - Lazy Loaded Embedded Videos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {tiktokVideoIds.map((videoId, index) => (
                <motion.div
                  key={videoId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="w-full flex justify-center"
                  data-testid={`tiktok-video-${index}`}
                >
                  <TikTokEmbed videoId={videoId} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <a
              href="https://www.tiktok.com/@movalina.study"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
              data-testid="view-tiktok-btn"
            >
              <FaTiktok className="w-5 h-5" />
              {t('tiktok.watchAll')}
              <FiExternalLink className="w-4 h-4" />
            </a>
            <p className="text-sm text-[var(--color-text-secondary)] mt-4">
              {t('tiktok.followHint')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Follow Section */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
          >
            {t('tiktok.whatYouLearn')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🇺🇦',
                title: t('tiktok.ukrainian.title'),
                description: t('tiktok.ukrainian.description'),
              },
              {
                icon: '🇷🇺',
                title: t('tiktok.russian.title'),
                description: t('tiktok.russian.description'),
              },
              {
                icon: '🇬🇧',
                title: t('tiktok.english.title'),
                description: t('tiktok.english.description'),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center p-8"
                data-testid={`content-type-${index}`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-serif font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Join Community Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {t('tiktok.joinCommunity.title')}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
              {t('tiktok.joinCommunity.subtitle')}
            </p>
            <a
              href="https://www.tiktok.com/@movalina.study"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <FaTiktok className="w-5 h-5" />
              {t('tiktok.joinCommunity.button')}
              <FiExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TikTok;
