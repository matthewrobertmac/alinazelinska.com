import React from 'react';
import { Link } from '../i18n/routing';
import { useTranslation } from 'react-i18next';
import { FaTiktok, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { contactInfo } from '../data/content';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: t('footer.columns.learn'),
      links: [
        { path: '/services/ukrainian-lessons', label: t('footer.links.ukrainianLessons') },
        { path: '/services/russian-lessons', label: t('footer.links.russianLessons') },
        { path: '/services/speaking-club', label: t('footer.links.speakingClub') },
        { path: '/booking', label: t('nav.booking') },
      ],
    },
    {
      title: t('footer.columns.create'),
      links: [
        { path: '/services/poetry-translation', label: t('footer.links.poetryTranslation') },
        { path: '/services/creative-writing', label: t('footer.links.creativeWriting') },
        { path: '/special-projects', label: t('footer.links.specialProjects') },
      ],
    },
    {
      title: t('footer.columns.alina'),
      links: [
        { path: '/about', label: t('nav.about') },
        { path: '/testimonials', label: t('nav.testimonials') },
        { path: '/success-stories', label: t('footer.links.successStories') },
        { path: '/tiktok', label: t('nav.tiktok') },
        { path: '/faq', label: t('nav.faq') },
        { path: '/contact', label: t('nav.contact') },
      ],
    },
  ];

  const socials = [
    { href: contactInfo.tiktok, label: 'TikTok', Icon: FaTiktok },
    { href: contactInfo.instagram, label: 'Instagram', Icon: FaInstagram },
    { href: contactInfo.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__pitch">
            <p className="eyebrow">{t('footer.eyebrow')}</p>
            <a href={`mailto:${contactInfo.email}`} className="site-footer__mail">
              <span>
                {t('footer.mailLead')} <em>{t('footer.mailAccent')}</em>
              </span>
              <FiArrowUpRight />
            </a>
            <p className="site-footer__email">{contactInfo.email}</p>
          </div>

          <nav className="site-footer__cols" aria-label={t('footer.navLabel')}>
            {columns.map((col) => (
              <div key={col.links[0].path}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="link-underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="site-footer__giant" aria-hidden="true">
          <span>Alina</span>
          <em>Zelinska</em>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {currentYear} {t('footer.owner')} · {t('footer.rights')}
          </p>
          <p className="site-footer__tagline">{t('footer.tagline')}</p>
          <div className="site-footer__socials">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
