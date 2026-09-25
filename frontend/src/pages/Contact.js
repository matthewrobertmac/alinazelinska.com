import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiInstagram, FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import { Link } from '../i18n/routing';
import { contactInfo } from '../data/content';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { clean } from '../utils/text';
import './contact.css';
import { stagger } from '../utils/motion';

// Content strings mark the italic rose accent with *word*
const emphasise = (text) =>
  clean(text)
    .split(/\*(.+?)\*/)
    .map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const Contact = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const channels = [
    {
      key: 'email',
      icon: <FiMail />,
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
    },
    {
      key: 'instagram',
      icon: <FiInstagram />,
      value: '@alin.a.zelinska',
      link: contactInfo.instagram,
    },
    {
      key: 'linkedin',
      icon: <FiLinkedin />,
      value: t('contact.channels.linkedin.value'),
      link: contactInfo.linkedin,
    },
  ];

  const services = t('contact.services.items', { returnObjects: true });

  return (
    <div className="contact-page page-transition">
      <SEOHead title={t('contact.seo.title')} description={t('contact.seo.description')} />

      <PageHero
        compact
        crumbs={[{ name: t('nav.contact') }]}
        eyebrow={t('contact.hero.eyebrow')}
        uk="Привіт"
        testId="contact-title"
        title={emphasise(t('contact.hero.title'))}
        lede={t('contact.hero.lede')}
      >
        <p className="contact-response">
          <span className="contact-response__dot" aria-hidden="true" />
          {t('contact.response')}
        </p>
      </PageHero>

      {/* ─── Channels ─────────────────────────────────────── */}
      <section className="page-section contact-main" aria-label={t('contact.channels.label')}>
        <div className="section-shell">
          <ul className="contact-channels">
            {channels.map((channel, index) => (
              <motion.li key={channel.key} {...stagger(index)}>
                <a
                  href={channel.link}
                  target={channel.key === 'email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="contact-channel"
                  data-testid={`contact-method-${index}`}
                >
                  <span className="contact-channel__icon" aria-hidden="true">
                    {channel.icon}
                  </span>
                  <span className="contact-channel__body">
                    <span className="contact-channel__label">{t(`contact.channels.${channel.key}.label`)}</span>
                    <span className="contact-channel__value">{channel.value}</span>
                    <span className="contact-channel__hint">{t(`contact.channels.${channel.key}.hint`)}</span>
                  </span>
                  <span className="contact-channel__arrow" aria-hidden="true">
                    <FiArrowUpRight />
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* One line on services, with links */}
          <p className="contact-services">
            <strong>{t('contact.services.lead')}</strong>{' '}
            {(Array.isArray(services) ? services : []).map((item, i, arr) => (
              <React.Fragment key={item.to}>
                <Link to={item.to} className="link-underline">
                  {item.label}
                </Link>
                {i < arr.length - 1 ? ', ' : ' '}
              </React.Fragment>
            ))}
            {t('contact.services.or')}{' '}
            <Link to="/booking" className="link-underline">
              {t('contact.services.book')} <FiArrowRight className="inline" />
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
