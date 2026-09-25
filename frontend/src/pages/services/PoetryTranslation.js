import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import { breadcrumbSchema } from '../../utils/schemas';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');

// Philosophy copy uses *word* for emphasis
const emphasise = (text) =>
  text.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const PoetryTranslation = () => {
  const { t } = useTranslation();
  const p = (k, o) => t(`services.poetry.${k}`, o);
  const s = (k) => t(`services.shared.${k}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { name: s('services'), url: '/special-projects' },
    { name: p('crumb') }
  ];

  const languagePairs = [
    { from: 'uk', to: 'en' },
    { from: 'ru', to: 'en' },
    { from: 'en', to: 'uk' },
    { from: 'en', to: 'ru' },
  ];

  const process = p('process', { returnObjects: true });
  const whatITranslate = p('translate', { returnObjects: true });
  const philosophy = p('philosophy', { returnObjects: true });

  return (
    <div className="svc-page page-transition">
      <SEOHead
        title={p('seo.title')}
        description={p('seo.description')}
        keywords={p('seo.keywords')}
        schema={breadcrumbSchema([
          { name: s('home'), url: 'https://alinazelinska.com' },
          { name: s('services'), url: 'https://alinazelinska.com/special-projects' },
          { name: p('crumb'), url: 'https://alinazelinska.com/services/poetry-translation' }
        ])}
      />

      <PageHero
        crumbs={breadcrumbItems}
        eyebrow={p('eyebrow')}
        uk="Вірш"
        title={
          <>
            {p('title')} <em>{p('titleAccent')}</em>
          </>
        }
        lede={p('lede')}
      >
        <p className="svc-pairs-line">
          {s('lang.uk')} <span aria-hidden="true">↔</span> {s('lang.ru')} <span aria-hidden="true">↔</span> {s('lang.en')}
        </p>
        <div className="svc-actions">
          <Link to="/contact" className="btn-primary">
            {p('cta')} <FiArrowRight />
          </Link>
        </div>
      </PageHero>

      {/* ─── Philosophy ───────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{p('philosophyEyebrow')}</p>
              <h2>
                {p('philosophyTitle')} <em className="display-italic">{p('philosophyAccent')}</em>
              </h2>
            </motion.header>

            <motion.div {...reveal} className="prose-ink svc-prose">
              {philosophy.map((paragraph, index) => (
                <p key={index}>{emphasise(paragraph)}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Language pairs ───────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{p('pairsEyebrow')}</p>
            <h2>
              {p('pairsTitle')} <em className="display-italic">{p('pairsAccent')}</em>
            </h2>
          </motion.header>

          <ul className="svc-pairs">
            {languagePairs.map((pair, index) => (
              <motion.li key={`${pair.from}-${pair.to}`} {...stagger(index % 2)}>
                <span>{s(`lang.${pair.from}`)}</span>
                <span className="svc-pairs__arrow" aria-hidden="true">
                  <FiArrowRight />
                </span>
                <span className="sr-only">{s('to')}</span>
                <span className="svc-pairs__to">{s(`lang.${pair.to}`)}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Process ──────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{p('processEyebrow')}</p>
              <h2>
                {p('processTitle')} <em className="display-italic">{p('processAccent')}</em>
              </h2>
            </motion.header>

            <ol className="rule-list svc-steps">
              {process.map((item, index) => (
                <motion.li key={item.title} {...stagger(index)}>
                  <span className="num">{pad(index)}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── What I translate ─────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{s('commissions')}</p>
            <h2>
              {p('translateTitle')} <em className="display-italic">{p('translateAccent')}</em>
            </h2>
          </motion.header>

          <ol className="svc-checks svc-checks--cols">
            {whatITranslate.map((item, index) => (
              <motion.li key={item} {...stagger(index % 2)}>
                <span className="num">{pad(index)}</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Слово за словом.
          </p>
          <h2>
            {p('closingTitle')} <em className="display-italic">{p('closingAccent')}</em>
          </h2>
          <p className="closing__sub">
            {p('closingSub')}
          </p>
          <div className="closing__actions">
            <Link to="/contact" className="btn-primary">
              {p('cta')} <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PoetryTranslation;
