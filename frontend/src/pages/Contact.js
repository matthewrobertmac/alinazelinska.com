import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiInstagram, FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import { Link } from '../i18n/routing';
import { contactInfo } from '../data/content';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { accent, clean } from '../utils/text';
import './contact.css';
import { reveal, stagger } from '../utils/motion';

// Content strings use *word* for the italic rose accent
const emphasise = (text) =>
  clean(text)
    .split(/\*(.+?)\*/)
    .map((part, i) =>
      i % 2 ? (
        <em key={i} className="display-italic">
          {part}
        </em>
      ) : (
        part
      )
    );

const Contact = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      icon: <FiMail />,
      title: t('contact.emailCard.label'),
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      description: t('contact.emailCard.hint'),
    },
    {
      icon: <FiLinkedin />,
      title: t('contact.linkedinCard.label'),
      value: t('contact.linkedinCard.value'),
      link: contactInfo.linkedin,
      description: t('contact.linkedinCard.hint'),
    },
    {
      icon: <FiInstagram />,
      title: t('contact.instagramCard.label'),
      value: '@alin.a.zelinska',
      link: contactInfo.instagram,
      description: t('contact.instagramCard.hint'),
    },
  ];

  const offerings = ['languageLessons', 'translation', 'creativeWriting', 'consulting'];

  return (
    <div className="contact-page page-transition">
      <SEOHead
        title={t('contact.seo.title')}
        description={t('contact.seo.description')}
        keywords={t('contact.seo.keywords')}
      />

      <PageHero
        crumbs={[{ name: t('nav.contact') }]}
        eyebrow={t('contact.hero.eyebrow')}
        uk="Привіт"
        testId="contact-title"
        title={accent(t('contact.title'), { dash: true })}
        lede={t('contact.subtitle')}
      >
        <p className="contact-response">
          <span className="contact-response__dot" aria-hidden="true" />
          {t('contact.responseTime')}
        </p>
      </PageHero>

      {/* ─── Channels ─────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head contact-talk">
              <p className="eyebrow">{t('contact.info')}</p>
              <h2>{emphasise(t('contact.talk.title'))}</h2>
              <p>{t('contact.talk.text')}</p>
              <p className="contact-talk__uk" lang="uk">
                Пишіть — я відповім.
              </p>
            </motion.header>

            <ul className="contact-channels">
              {contactMethods.map((method, index) => (
                <motion.li key={method.title} {...stagger(index)}>
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel"
                    data-testid={`contact-method-${index}`}
                  >
                    <span className="contact-channel__icon" aria-hidden="true">
                      {method.icon}
                    </span>
                    <span className="contact-channel__body">
                      <span className="contact-channel__label">{method.title}</span>
                      <span className="contact-channel__value">{method.value}</span>
                      <span className="contact-channel__hint">{clean(method.description)}</span>
                    </span>
                    <span className="contact-channel__arrow" aria-hidden="true">
                      <FiArrowUpRight />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── What we can do together ──────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">{t('contact.together.eyebrow')}</p>
              <h2>{clean(t('contact.whatToExpect.title'))}</h2>
            </div>
            <p>
              {t('contact.together.text')}{' '}
              <Link to="/special-projects" className="link-underline contact-inline-link">
                {t('contact.together.link')}
              </Link>
              .
            </p>
          </motion.header>

          <ol className="contact-offer">
            {offerings.map((key, index) => (
              <motion.li key={key} {...stagger(index % 2)}>
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{t(`contact.whatToExpect.${key}.title`)}</h3>
                  <p>{t(`contact.whatToExpect.${key}.description`)}</p>
                </div>
                <span className="contact-offer__icon" aria-hidden="true">
                  {t(`contact.whatToExpect.${key}.icon`)}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            До зустрічі.
          </p>
          <h2>{emphasise(t('contact.closing.title'))}</h2>
          <p className="closing__sub">{clean(t('contact.bottomCta'))}</p>
          <div className="closing__actions">
            <a href={`mailto:${contactInfo.email}`} data-testid="email-cta-btn" className="btn-primary">
              {clean(t('contact.send'))} <FiArrowRight />
            </a>
            <Link to="/booking" className="btn-outline">
              {t('contact.closing.book')} <FiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
