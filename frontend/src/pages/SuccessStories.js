import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import './success-stories.css';
import { reveal, stagger } from '../utils/motion';

// Initials avatars are drawn here (not by an image service) so they follow the translated name.
const avatarColors = ['#FF91A4', '#9333EA', '#FF91A4'];

const SuccessStories = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = t('successStories.items', { returnObjects: true });
  const stories = (Array.isArray(items) ? items : []).map((story, i) => ({ ...story, color: avatarColors[i % avatarColors.length] }));

  return (
    <div className="stories-page page-transition">
      <SEOHead title={t('successStories.seo.title')} description={t('successStories.seo.description')} />

      <PageHero
        crumbs={[{ name: t('successStories.crumb') }]}
        eyebrow={t('successStories.eyebrow')}
        uk="Історії"
        title={
          <>
            {t('successStories.title')} <em>{t('successStories.titleAccent')}</em>
          </>
        }
        lede={t('successStories.lede')}
      >
        <ol className="story-index">
          {stories.map((story, index) => (
            <li key={index}>
              <span className="num">{String(index + 1).padStart(2, '0')}</span>
              <span>
                {story.name} <small>{story.level}</small>
              </span>
            </li>
          ))}
        </ol>
      </PageHero>

      {/* ─── Stories ──────────────────────────────────────── */}
      {stories.map((story, index) => (
        <section key={index} className={`page-section story ${index % 2 ? 'page-section--tint' : ''}`}>
          <div className="section-shell">
            <div className="split">
              <motion.header {...reveal} className="split__aside story__aside">
                <span className="num story__num">{String(index + 1).padStart(2, '0')}</span>
                <div className="story__who">
                  <span className="story__avatar story__avatar--initials" style={{ background: story.color }} aria-hidden="true">
                    {story.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <h2>{story.name}</h2>
                    <p className="story__country">{story.country}</p>
                  </div>
                </div>
                <span className="chip">{story.learning}</span>

                <dl className="story__facts">
                  <div>
                    <dt>{t('successStories.labels.duration')}</dt>
                    <dd>{story.duration}</dd>
                  </div>
                  <div>
                    <dt>{t('successStories.labels.lessons')}</dt>
                    <dd>{story.lessons}</dd>
                  </div>
                  <div>
                    <dt>{t('successStories.labels.progress')}</dt>
                    <dd>{story.level}</dd>
                  </div>
                </dl>
              </motion.header>

              <div>
                <motion.blockquote {...reveal} className="story__quote">
                  <span className="story__mark" aria-hidden="true">
                    “
                  </span>
                  <p>{story.story}</p>
                </motion.blockquote>

                {/* Achievement Highlights */}
                <dl className="story__highlights">
                  {[
                    [t('successStories.labels.goal'), story.goal],
                    [t('successStories.labels.achievement'), story.achievement],
                    [t('successStories.labels.favorite'), story.favorite],
                  ].map(([label, value], i) => (
                    <motion.div key={i} {...stagger(i)}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Твоя історія — наступна.
          </p>
          <h2>
            {t('successStories.closing.title')} <em className="display-italic">{t('successStories.closing.titleAccent')}</em>
          </h2>
          <p className="closing__sub">{t('successStories.closing.sub')}</p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              {t('successStories.closing.book')} <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-outline">
              {t('successStories.closing.ask')} <FiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SuccessStories;
