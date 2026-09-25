import React from 'react';
import { Link } from '../i18n/routing';
import { useTranslation } from 'react-i18next';
import { FaTiktok, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiArrowUpRight, FiType } from 'react-icons/fi';
import { contactInfo } from '../data/content';
import { openA11y } from './AccessibilityMenu';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Columns differ per language (common.json → footer.columns); `href` names an external profile in contactInfo
  const rawColumns = t('footer.columns', { returnObjects: true });
  const columns = Array.isArray(rawColumns) ? rawColumns : [];

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
              <div key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.to || link.href}>
                      {link.href ? (
                        <a href={contactInfo[link.href]} target="_blank" rel="noopener noreferrer" className="link-underline">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.to} className="link-underline">
                          {link.label}
                        </Link>
                      )}
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
            <button
              type="button"
              className="site-footer__a11y"
              onClick={(e) => openA11y(e.currentTarget)}
              aria-haspopup="dialog"
              data-testid="a11y-open-footer"
            >
              <FiType aria-hidden="true" /> {t('footer.a11y')}
            </button>
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
