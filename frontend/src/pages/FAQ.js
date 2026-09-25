import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { generateFAQSchema } from '../utils/schemas';
import './faq.css';
import { ease, reveal } from '../utils/motion';

const stagger = (i) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease, delay: i * 0.05 },
});

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = t('faq.categories', { returnObjects: true });

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Flatten all FAQs for schema
  const allFAQs = faqs.flatMap(section => section.questions);

  return (
    <div className="faq-page page-transition">
      <SEOHead
        title={t('faq.seo.title')}
        description={t('faq.seo.description')}
        keywords={t('faq.seo.keywords')}
        schema={generateFAQSchema(allFAQs)}
      />

      <PageHero
        crumbs={[{ name: t('faq.hero.crumb') }]}
        eyebrow={`${t('faq.questionCount', { count: allFAQs.length })} · ${t('faq.topicCount', { count: faqs.length })}`}
        uk="Питання"
        title={
          <>
            {t('faq.hero.titleLead')} <em>{t('faq.hero.titleAccent')}</em>
          </>
        }
        lede={t('faq.hero.lede')}
      >
        <nav className="faq-index" aria-label={t('faq.hero.topicsLabel')}>
          {faqs.map((section, sectionIndex) => (
            <button key={section.id} type="button" onClick={() => jumpTo(`faq-${section.id}`)}>
              <span className="num">{String(sectionIndex + 1).padStart(2, '0')}</span>
              {section.title}
            </button>
          ))}
        </nav>
      </PageHero>

      {/* ─── FAQ groups ───────────────────────────────────── */}
      {faqs.map((section, sectionIndex) => (
        <section
          key={section.id}
          id={`faq-${section.id}`}
          className={`page-section faq-group ${sectionIndex % 2 ? 'page-section--tint' : ''}`}
        >
          <div className="section-shell">
            <div className="split">
              <motion.header {...reveal} className="split__aside section-head faq-group__head">
                <span className="num faq-group__num">{String(sectionIndex + 1).padStart(2, '0')}</span>
                <h2>{section.title}</h2>
                <p className="faq-group__count">
                  {t('faq.questionCount', { count: section.questions.length })}
                </p>
              </motion.header>

              <ul className="faq-list">
                {section.questions.map((faq, qIndex) => {
                  const globalIndex = `${sectionIndex}-${qIndex}`;
                  const isOpen = openIndex === globalIndex;
                  const panelId = `faq-panel-${globalIndex}`;
                  const buttonId = `faq-button-${globalIndex}`;

                  return (
                    <motion.li key={qIndex} {...stagger(qIndex)} className={isOpen ? 'is-open' : ''}>
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          onClick={() => toggleQuestion(globalIndex)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="faq-q"
                        >
                          <span>{faq.q}</span>
                          <span className="faq-q__icon" aria-hidden="true" />
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className="faq-a"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease }}
                          >
                            <p>{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Питай сміливо.
          </p>
          <h2>
            {t('faq.closing.titleLead')} <em className="display-italic">{t('faq.closing.titleAccent')}</em>
          </h2>
          <p className="closing__sub">{t('faq.closing.sub')}</p>
          <div className="closing__actions">
            <a
              href="https://www.instagram.com/alin.a.zelinska/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t('faq.closing.instagram')} <FiArrowUpRight />
            </a>
            <a href="mailto:zelinskayaalinaig@gmail.com" className="btn-outline">
              {t('faq.closing.email')} <FiMail />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FAQ;
