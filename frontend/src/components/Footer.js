import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaTiktok, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { logotext, contactInfo } from '../data/content';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/testimonials', label: t('nav.testimonials') },
    { path: '/success-stories', label: 'Success Stories' },
    { path: '/special-projects', label: 'Special Projects' },
    { path: '/faq', label: 'FAQ' },
    { path: '/tiktok', label: t('nav.tiktok') },
    { path: '/booking', label: t('nav.booking') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left - Logo and Copyright */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-2xl font-serif font-bold gradient-text inline-block mb-3"
            >
              {logotext}
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)]">
              © {currentYear} Alina Zelinska
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {t('footer.rights')}
            </p>
          </div>

          {/* Center - Navigation Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-3">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-[var(--color-text-secondary)]">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right - Social Icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href={contactInfo.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[var(--color-bg)] flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-all"
              aria-label="TikTok"
            >
              <FaTiktok className="w-5 h-5" />
            </a>
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[var(--color-bg)] flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[var(--color-bg)] flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom - Tagline */}
        <div className="text-center pt-8 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-secondary)]">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
