import React from 'react';
import { Link } from 'react-router-dom';
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
      title: 'Learn',
      links: [
        { path: '/services/ukrainian-lessons', label: 'Ukrainian lessons' },
        { path: '/services/russian-lessons', label: 'Russian lessons' },
        { path: '/services/speaking-club', label: 'Speaking club' },
        { path: '/booking', label: t('nav.booking') },
      ],
    },
    {
      title: 'Create',
      links: [
        { path: '/services/poetry-translation', label: 'Poetry translation' },
        { path: '/services/creative-writing', label: 'Creative writing' },
        { path: '/special-projects', label: 'Special projects' },
      ],
    },
    {
      title: 'Alina',
      links: [
        { path: '/about', label: t('nav.about') },
        { path: '/testimonials', label: t('nav.testimonials') },
        { path: '/success-stories', label: 'Success stories' },
        { path: '/tiktok', label: t('nav.tiktok') },
        { path: '/faq', label: 'FAQ' },
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
            <p className="eyebrow">Write to me</p>
            <a href={`mailto:${contactInfo.email}`} className="site-footer__mail">
              Let’s talk <em>words.</em>
              <FiArrowUpRight />
            </a>
            <p className="site-footer__email">{contactInfo.email}</p>
          </div>

          <nav className="site-footer__cols" aria-label="Footer">
            {columns.map((col) => (
              <div key={col.title}>
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
            © {currentYear} Alina Zelinska · {t('footer.rights')}
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
