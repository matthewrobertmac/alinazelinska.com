import React, { useState, useEffect } from 'react';
import { Link, useLangPath } from '../i18n/routing';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSun, FiMoon, FiArrowRight, FiType } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher';
import { openA11y } from './AccessibilityMenu';
import './Header.css';
import { ease } from '../utils/motion';

const Header = ({ theme, toggleTheme }) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { path: currentPath } = useLangPath();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Each language has its own menu (common.json → nav.main), led by that audience's main offer.
  // `id` (the path) keeps data-testids stable whatever language is showing.
  const main = t('nav.main', { returnObjects: true });
  const navLinks = (Array.isArray(main) ? main : []).map(({ to, label }) => ({
    path: to,
    id: to.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home',
    label,
  }));

  const isActive = (path) => currentPath === path || (path !== '/' && currentPath.startsWith(`${path}/`));

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
          <button
            type="button"
            onClick={(e) => openA11y(e.currentTarget)}
            data-testid="a11y-open"
            className="icon-btn icon-btn--desk"
            aria-label={t('header.a11y')}
            aria-haspopup="dialog"
            aria-controls="a11y-panel"
          >
            <FiType />
          </button>
          <button onClick={toggleTheme} data-testid="theme-toggle" className="icon-btn icon-btn--desk" aria-label={t('header.toggleTheme')}>
            <ThemeIcon />
          </button>
          <Link to="/booking" className="header-cta" data-testid="nav-book">
            {t('header.cta')}
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
                { path: '/booking', id: 'book a lesson', label: t('header.cta') },
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
              <div className="mobile-menu__tools">
                <button onClick={toggleTheme} data-testid="theme-toggle-mobile" className="icon-btn" aria-label={t('header.toggleTheme')}>
                  <ThemeIcon />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    openA11y(e.currentTarget);
                  }}
                  data-testid="a11y-open-mobile"
                  className="icon-btn"
                  aria-label={t('header.a11y')}
                  aria-haspopup="dialog"
                >
                  <FiType />
                </button>
              </div>
              <span lang="uk">Мова — це дім ✦</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
