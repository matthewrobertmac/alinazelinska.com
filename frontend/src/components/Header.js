import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSun, FiMoon, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { logotext } from '../data/content';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

const Header = ({ theme, toggleTheme }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/testimonials', label: t('nav.testimonials') },
    { path: '/tiktok', label: t('nav.tiktok') },
    { path: '/booking', label: t('nav.booking') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-bg)] bg-opacity-95 backdrop-blur-md shadow-lg border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-serif font-bold gradient-text hover:opacity-80 transition-opacity"
          data-testid="logo-link"
        >
          {logotext}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-${link.label.toLowerCase()}`}
              className={`font-medium transition-all duration-300 hover:text-[var(--color-accent)] relative ${
                isActive(link.path)
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-text)]'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded-full"></span>
              )}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle"
            className="p-2 rounded-full hover:bg-[var(--color-bg-secondary)] transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FiSun className="w-5 h-5 text-[var(--color-accent)]" />
            ) : (
              <FiMoon className="w-5 h-5 text-[var(--color-accent)]" />
            )}
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* User Menu */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[var(--color-bg-secondary)] transition-all"
            >
              {user?.picture ? (
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
              )}
              <span className="text-sm font-medium hidden lg:inline">{user?.name?.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn-outline text-sm px-4 py-2"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle-mobile"
            className="p-2 rounded-full hover:bg-[var(--color-bg-secondary)] transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FiSun className="w-5 h-5 text-[var(--color-accent)]" />
            ) : (
              <FiMoon className="w-5 h-5 text-[var(--color-accent)]" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            className="p-2 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6 text-[var(--color-accent)]" />
            ) : (
              <FiMenu className="w-6 h-6 text-[var(--color-accent)]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-bg)] bg-opacity-98 backdrop-blur-md border-t border-[var(--color-border)] shadow-xl">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
