import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { SITE_URL, Link, localizePath, useLangPath } from '../i18n/routing';
import { getGuide } from '../content/guides';
import { breadcrumbSchema } from '../utils/schemas';
import { PRICES } from '../data/pricing';
import { reveal, stagger } from '../utils/motion';
import { stressed } from './learn/inline';
import './free-guide.css';

const PREVIEW_ROWS = 4;

const Row = ({ item }) => (
  <li className="guide-row">
    <span className="guide-row__a">{stressed(item.a)}</span>
    {item.tr && <span className="guide-row__tr">{item.tr}</span>}
    <span className="guide-row__b">{item.b}</span>
    {item.note && <span className="guide-row__note">{stressed(item.note)}</span>}
  </li>
);

const FreeGuide = () => {
  const { t } = useTranslation();
  const { lng } = useLangPath();
  const guide = getGuide(lng);
  const pdf = `/guides/${guide.file}`;
  const trialPrice = `€${PRICES.trial.price}`;
  const [first, ...rest] = guide.sections;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DigitalDocument',
        name: guide.title,
        description: t('guide.seo.description'),
        inLanguage: lng,
        encodingFormat: 'application/pdf',
        url: `${SITE_URL}${pdf}`,
        isAccessibleForFree: true,
        author: { '@id': `${SITE_URL}/#alina` },
      },
      breadcrumbSchema([
        { name: t('nav.home'), url: `${SITE_URL}${localizePath('/', lng)}` },
        { name: t('guide.crumb'), url: `${SITE_URL}${localizePath('/free-guide', lng)}` },
      ]),
    ],
  };

  const download = (
    <a href={pdf} download className="btn-primary" data-testid="guide-download">
      <FiDownload /> {t('guide.download')}
    </a>
  );

  return (
    <div className="guide-page page-transition">
      <SEOHead title={t('guide.seo.title')} description={t('guide.seo.description')} schema={schema} />

      <PageHero
        crumbs={[{ name: t('guide.crumb') }]}
        eyebrow={t('guide.eyebrow')}
        uk="Слова"
        title={guide.title}
        lede={guide.subtitle}
        aside={
          <a href={pdf} download className="guide-cover" aria-label={t('guide.download')}>
            <span className="guide-cover__eyebrow">{t('guide.eyebrow')}</span>
            <span className="guide-cover__title">{guide.title}</span>
            <span className="guide-cover__rule" aria-hidden="true" />
            <span className="guide-cover__by">{t('guide.by')} · alinazelinska.com</span>
            <span className="guide-cover__badge">PDF</span>
          </a>
        }
      >
        <div className="guide-actions">
          {download}
          <p className="guide-meta">{t('guide.meta')}</p>
        </div>
      </PageHero>

      <section className="page-section">
        <div className="section-shell guide-preview">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('guide.preview.eyebrow')}</p>
            <h2>{t('guide.preview.title')}</h2>
            {guide.intro.map((paragraph, i) => (
              <p key={i}>{stressed(paragraph)}</p>
            ))}
          </motion.header>

          {first && (
            <motion.div {...reveal} className="guide-sheet">
              <h3>{first.h2}</h3>
              {first.intro && <p className="guide-sheet__intro">{first.intro}</p>}
              <div className="guide-labels" aria-hidden="true">
                <span>{guide.labels.a}</span>
                {guide.labels.tr && <span>{guide.labels.tr}</span>}
                <span>{guide.labels.b}</span>
              </div>
              <ul className={`guide-rows ${guide.labels.tr ? 'guide-rows--tr' : ''}`}>
                {first.items.map((item, i) => (
                  <Row key={i} item={item} />
                ))}
              </ul>
            </motion.div>
          )}

          {rest.length > 0 && (
            <div className="guide-more">
              <h3 className="guide-more__title">{t('guide.preview.more')}</h3>
              <ol className="guide-more__list">
                {rest.map((section, i) => (
                  <motion.li key={i} {...stagger(i % 3)}>
                    <span className="num">{String(i + 2).padStart(2, '0')}</span>
                    <div>
                      <h4>{section.h2}</h4>
                      <p>
                        {section.items
                          .slice(0, PREVIEW_ROWS)
                          .map((item) => item.a.replace(/\u0301/g, ''))
                          .join(' · ')}
                        {' …'}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
              <div className="guide-more__cta">
                {download}
                <p className="guide-meta">{t('guide.noSignup')}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="closing closing--long">
        <div className="closing__inner">
          <h2>{t('guide.closing.title')}</h2>
          <p className="closing__sub">{t('guide.closing.sub', { price: trialPrice, minutes: PRICES.trial.minutes })}</p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              {t('learn.article.trial.cta', { price: trialPrice })} <FiArrowRight />
            </Link>
            <Link to="/learn" className="btn-outline">
              {t('guide.closing.learn')} <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeGuide;
