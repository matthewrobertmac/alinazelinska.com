import React, { useState, useEffect } from 'react';
import { Link, useLangPath } from '../i18n/routing';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCalendar, FiX, FiArrowRight } from 'react-icons/fi';
import './FloatingBookButton.css';
import { ease } from '../utils/motion';

const FloatingBookButton = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { path: currentPath } = useLangPath();
  const reduce = useReducedMotion();

  useEffect(() => {
    // Don't show on booking page
    if (currentPath === '/booking') {
      setIsVisible(false);
      return;
    }

    // Check if user dismissed
    const dismissed = sessionStorage.getItem('floatingButtonDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after scrolling down
    const handleScroll = () => {
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath, isDismissed]);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    sessionStorage.setItem('floatingButtonDismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: reduce ? 0 : 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : 24, opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.6, ease }}
          className="float-book"
        >
          {/* Main button */}
          <Link to="/booking" className="float-book__cta" data-testid="floating-book-btn">
            <FiCalendar className="float-book__icon" aria-hidden="true" />
            <span>{t('widgets.floatingBook.cta')}</span>
            <FiArrowRight className="float-book__arrow" aria-hidden="true" />
          </Link>

          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="float-book__dismiss"
            aria-label={t('widgets.floatingBook.dismiss')}
            data-testid="floating-book-dismiss"
          >
            <FiX aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingBookButton;
