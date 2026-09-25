import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import { breadcrumbSchema } from '../../utils/schemas';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const CreativeWriting = () => {
  const { t } = useTranslation();
  const p = (k, o) => t(`services.creative.${k}`, o);
  const s = (k) => t(`services.shared.${k}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { name: s('services'), url: '/special-projects' },
    { name: p('crumb') }
  ];

  const services = p('items', { returnObjects: true });
  const style = p('style', { returnObjects: true });

  return (
    <div className="svc-page page-transition">
      <SEOHead
        title={p('seo.title')}
        description={p('seo.description')}
        keywords={p('seo.keywords')}
        schema={breadcrumbSchema([
          { name: s('home'), url: 'https://alinazelinska.com' },
          { name: s('services'), url: 'https://alinazelinska.com/special-projects' },
          { name: p('crumb'), url: 'https://alinazelinska.com/services/creative-writing' }
        ])}
      />

      <PageHero
        crumbs={breadcrumbItems}
        eyebrow={p('eyebrow')}
        uk="Перо"
        title={
          <>
            {p('title')} <em>{p('titleAccent')}</em>
          </>
        }
        lede={p('lede')}
      >
        <div className="svc-actions">
          <Link to="/contact" className="btn-primary">
            {s('getInTouch')} <FiArrowRight />
          </Link>
          <a href="mailto:zelinskayaalinaig@gmail.com" className="btn-outline">
            {p('emailMe')}
          </a>
        </div>
      </PageHero>

      {/* ─── What I write ─────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{s('commissions')}</p>
            <h2>
              {p('writeTitle')} <em className="display-italic">{p('writeAccent')}</em>
            </h2>
          </motion.header>

          <div className="svc-cards svc-cards--three">
            {services.map((service, index) => (
              <motion.article key={service.title} className="svc-card" {...stagger(index % 3)}>
                <span className="num">{ROMAN[index]}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── My style ─────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{p('styleEyebrow')}</p>
              <h2>
                {p('styleTitle')} <em className="display-italic">{p('styleAccent')}</em>
              </h2>
            </motion.header>

            <ol className="svc-checks">
              {style.map((item, index) => (
                <motion.li key={item} {...stagger(index % 3)}>
                  <span className="num">{pad(index)}</span>
                  <span>{item}</span>
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
            Напишімо щось гарне.
          </p>
          <h2>
            {p('closingTitle')} <em className="display-italic">{p('closingAccent')}</em>
          </h2>
          <p className="closing__sub">
            {p('closingSub')}
          </p>
          <div className="closing__actions">
            <Link to="/contact" className="btn-primary">
              {s('getInTouch')} <FiArrowRight />
            </Link>
            <a href="mailto:zelinskayaalinaig@gmail.com" className="btn-outline">
              {p('emailMe')} <FiArrowUpRight />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CreativeWriting;
