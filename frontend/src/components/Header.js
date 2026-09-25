import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSun, FiMoon, FiUser, FiArrowRight } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import { ease } from '../utils/motion';

const Header = ({ theme, toggleTheme }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
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

  const navLinks = [
    { path: '/about', label: t('nav.about') },
    { path: '/testimonials', label: t('nav.testimonials') },
    { path: '/tiktok', label: t('nav.tiktok') },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => location.pathname === path;

  const ThemeIcon = theme === 'dark' ? FiSun : FiMoon;

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${isMobileMenuOpen ? 'is-open' : ''}`}>
      <nav className="site-header__bar">
        <Link to="/" className="wordmark" data-testid="logo-link" aria-label="Alina Zelinska — home">
          <span className="wordmark__a">Alina</span>
          <span className="wordmark__z">Zelinska</span>
        </Link>

        <div className="site-header__links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-${link.label.toLowerCase()}`}
              className={`nav-link ${isActive(link.path) ? 'is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="site-header__tools">
          <LanguageSwitcher />
          <button onClick={toggleTheme} data-testid="theme-toggle" className="icon-btn icon-btn--desk" aria-label="Toggle theme">
            <ThemeIcon />
          </button>
          {isAuthenticated ? (
            <Link to="/profile" className="icon-btn" aria-label="Your profile">
              {user?.picture ? <img src={user.picture} alt="" className="icon-btn__avatar" /> : <FiUser />}
            </Link>
          ) : (
            <Link to="/login" className="nav-link nav-link--quiet nav-link--desk">
              Login
            </Link>
          )}
          <Link to="/booking" className="header-cta" data-testid="nav-book">
            {t('nav.booking')}
            <FiArrowRight />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
            className="burger"
            aria-label="Toggle menu"
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
              {[{ path: '/', label: t('nav.home') }, ...navLinks, { path: '/booking', label: t('nav.booking') }].map(
                (link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.05, ease }}
                  >
                    <Link
                      to={link.path}
                      data-testid={`mobile-nav-${link.label.toLowerCase()}`}
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
              <button onClick={toggleTheme} data-testid="theme-toggle-mobile" className="icon-btn" aria-label="Toggle theme">
                <ThemeIcon />
              </button>
              <Link to={isAuthenticated ? '/profile' : '/login'}>{isAuthenticated ? 'Profile' : 'Login'}</Link>
              <span lang="uk">Мова — це дім ✦</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
