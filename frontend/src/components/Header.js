import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSun, FiMoon, FiArrowRight } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';
import { ease } from '../utils/motion';

const Header = ({ theme, toggleTheme }) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // `id` keeps the data-testids stable whatever language is showing
  const navLinks = [
    { path: '/about', id: 'about me', label: t('nav.about') },
    { path: '/testimonials', id: 'testimonials', label: t('nav.testimonials') },
    { path: '/tiktok', id: 'tiktok', label: t('nav.tiktok') },
    { path: '/faq', id: 'faq', label: t('nav.faq') },
    { path: '/contact', id: 'say hello', label: t('nav.contact') },
  ];

  const isActive = (path) => location.pathname === path;

  const ThemeIcon = theme === 'dark' ? FiSun : FiMoon;

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${isMobileMenuOpen ? 'is-open' : ''}`}>
      <nav className="site-header__bar">
        <Link to="/" className="wordmark" data-testid="logo-link" aria-label={t('header.logoLabel')}>
          <span className="wordmark__a">Alina</span>
          <span className="wordmark__z">Zelinska</span>
        </Link>

        <div className="site-header__links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-${link.id}`}
              className={`nav-link ${isActive(link.path) ? 'is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="site-header__tools">
          <LanguageSwitcher />
          <button onClick={toggleTheme} data-testid="theme-toggle" className="icon-btn icon-btn--desk" aria-label={t('header.toggleTheme')}>
            <ThemeIcon />
          </button>
          <Link to="/booking" className="header-cta" data-testid="nav-book">
            {t('nav.booking')}
            <FiArrowRight />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
            className="burger"
            aria-label={t('header.toggleMenu')}
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu__links">
              {[
                { path: '/', id: 'home', label: t('nav.home') },
                ...navLinks,
                { path: '/booking', id: 'book a lesson', label: t('nav.booking') },
              ].map(
                (link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.05, ease }}
                  >
                    <Link
                      to={link.path}
                      data-testid={`mobile-nav-${link.id}`}
                      className={isActive(link.path) ? 'is-active' : ''}
                    >
                      <span className="mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
            <div className="mobile-menu__foot">
              <button onClick={toggleTheme} data-testid="theme-toggle-mobile" className="icon-btn" aria-label={t('header.toggleTheme')}>
                <ThemeIcon />
              </button>
              <span lang="uk">Мова — це дім ✦</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
