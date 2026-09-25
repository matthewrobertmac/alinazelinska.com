import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiBookOpen, FiCalendar, FiDownload, FiMail, FiMessageCircle, FiStar } from 'react-icons/fi';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import { Link } from '../i18n/routing';
import { contactInfo } from '../data/content';
import { PRICES } from '../data/pricing';
import { stagger } from '../utils/motion';
import './links.css';

// Link-in-bio for Instagram and TikTok (noindex via NOINDEX in routing.js).
// Incoming UTM parameters stay on this page's URL for analytics; nothing here rewrites them.
const Links = () => {
  const { t } = useTranslation();
  const trialPrice = `€${PRICES.trial.price}`;
  const services = t('links.services', { returnObjects: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const internal = [
    { to: '/booking', label: t('links.trial', { price: trialPrice }), icon: FiCalendar, primary: true },
    { to: '/free-guide', label: t('links.guide'), icon: FiDownload },
    ...(Array.isArray(services) ? services : []).map((service) => ({ ...service, icon: FiMessageCircle })),
    { to: '/testimonials', label: t('links.reviews'), icon: FiStar },
    { to: '/learn', label: t('links.learn'), icon: FiBookOpen },
  ];

  const external = [
    { href: contactInfo.instagram, label: 'Instagram', handle: '@alin.a.zelinska', icon: FaInstagram },
    { href: contactInfo.tiktok, label: 'TikTok', handle: '@movalina.study', icon: FaTiktok },
    { href: `mailto:${contactInfo.email}`, label: t('links.email'), handle: contactInfo.email, icon: FiMail },
  ];

  return (
    <div className="links-page page-transition">
      <SEOHead title={t('links.seo.title')} description={t('links.seo.description')} />

      <div className="links-card">
        <img className="links-card__photo" src="/media/alina-portrait.jpg" alt={t('links.photoAlt')} width="112" height="112" />
        <h1>{t('links.name')}</h1>
        <p className="links-card__bio">{t('links.bio')}</p>
        <p className="links-card__proof">{t('links.proof')}</p>

        <ul className="links-list">
          {internal.map(({ to, label, icon: Icon, primary }, i) => (
            <motion.li key={to} {...stagger(i * 0.5)}>
              <Link to={to} className={`links-btn ${primary ? 'links-btn--primary' : ''}`}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <ul className="links-list links-list--social">
          {external.map(({ href, label, handle, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                className="links-btn links-btn--quiet"
                {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <Icon aria-hidden="true" />
                <span>
                  {label}
                  <small>{handle}</small>
                </span>
                <FiArrowUpRight className="links-btn__out" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <Link to="/" className="links-home">
          alinazelinska.com
        </Link>
      </div>
    </div>
  );
};

export default Links;
