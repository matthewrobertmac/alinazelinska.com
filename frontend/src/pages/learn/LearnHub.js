import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import GuideCTA from '../../components/blocks/GuideCTA';
import { SITE_URL, Link, localizePath, useLangPath } from '../../i18n/routing';
import { articlesFor } from '../../content/articles';
import { breadcrumbSchema } from '../../utils/schemas';
import { PRICES } from '../../data/pricing';
import { stagger } from '../../utils/motion';
import { plain } from './inline';
import './learn.css';

const pad = (i) => String(i + 1).padStart(2, '0');

const LearnHub = () => {
  const { t } = useTranslation();
  const { lng } = useLangPath();
  const articles = articlesFor(lng);
  const url = `${SITE_URL}${localizePath('/learn', lng)}`;
  const trialPrice = `€${PRICES.trial.price}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: t('learn.hero.title') + ' ' + t('learn.hero.titleAccent'),
        description: t('learn.seo.description'),
        url,
        inLanguage: lng,
        hasPart: articles.map(({ slug, article }) => ({
          '@type': 'Article',
          headline: plain(article.h1),
          url: `${SITE_URL}${localizePath(`/learn/${slug}`, lng)}`,
        })),
      },
      breadcrumbSchema([
        { name: t('nav.home'), url: `${SITE_URL}${localizePath('/', lng)}` },
        { name: t('learn.crumb'), url },
      ]),
    ],
  };

  return (
    <div className="learn-page page-transition">
      <SEOHead title={t('learn.seo.title')} description={t('learn.seo.description')} schema={schema} />

      <PageHero
        crumbs={[{ name: t('learn.crumb') }]}
        eyebrow={t('learn.hero.eyebrow')}
        uk="Вчитися"
        title={
          <>
            {t('learn.hero.title')} <em>{t('learn.hero.titleAccent')}</em>
          </>
        }
        lede={t('learn.hero.lede')}
      />

      <section className="page-section page-section--flush-top">
        <div className="section-shell">
          <ol className="learn-index">
            {articles.map(({ slug, article }, i) => (
              <motion.li key={slug} {...stagger(i)}>
                <Link to={`/learn/${slug}`} className="learn-index__link">
                  <span className="num">{pad(i)}</span>
                  <div>
                    <h2>{plain(article.h1)}</h2>
                    <p>{plain(article.lede)}</p>
                  </div>
                  <span className="learn-index__meta">
                    {t('learn.readTime', { minutes: article.readingMinutes })}
                    <FiArrowRight aria-hidden="true" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-section page-section--tint">
        <div className="section-shell">
          <GuideCTA />
        </div>
      </section>

      <section className="closing closing--long">
        <div className="closing__inner">
          <h2>{t('learn.closing.title')}</h2>
          <p className="closing__sub">{t('learn.closing.sub', { price: trialPrice, minutes: PRICES.trial.minutes })}</p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              {t('learn.article.trial.cta', { price: trialPrice })} <FiArrowRight />
            </Link>
            <Link to={t('learn.closing.serviceTo')} className="btn-outline">
              {t('learn.closing.service')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnHub;
