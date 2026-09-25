import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiType, FiX } from 'react-icons/fi';
import './AccessibilityMenu.css';
import { ease } from '../utils/motion';

const AccessibilityMenu = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('fontSize');
    const savedContrast = localStorage.getItem('highContrast') === 'true';

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedContrast) setHighContrast(true);

    // Apply settings
    applySettings(savedFontSize || 'normal', savedContrast);
  }, []);

  const applySettings = (size, contrast) => {
    // Font size
    document.documentElement.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
    document.documentElement.classList.add(`font-size-${size}`);

    // High contrast
    if (contrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    applySettings(size, highContrast);
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', newValue.toString());
    applySettings(fontSize, newValue);
  };

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const sizes = [
    { key: 'small', label: t('widgets.a11y.small') },
    { key: 'normal', label: t('widgets.a11y.normal') },
    { key: 'large', label: t('widgets.a11y.large') },
  ];

  return (
    <div className="a11y" data-testid="accessibility-menu">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`a11y__toggle ${isOpen ? 'is-open' : ''}`}
        aria-label={t('widgets.a11y.toggle')}
        aria-expanded={isOpen}
        aria-controls="a11y-panel"
        data-testid="accessibility-toggle"
      >
        <FiType aria-hidden="true" />
      </button>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="a11y-panel"
            role="dialog"
            aria-label={t('widgets.a11y.panel')}
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 10 }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease }}
            className="a11y__panel"
            data-testid="accessibility-panel"
          >
            <div className="a11y__head">
              <p className="eyebrow">{t('widgets.a11y.title')}</p>
              <button
                type="button"
                className="a11y__close"
                onClick={() => setIsOpen(false)}
                aria-label={t('widgets.a11y.close')}
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            {/* Font Size */}
            <div className="a11y__row">
              <p className="a11y__label" id="a11y-size-label">{t('widgets.a11y.textSize')}</p>
              <div className="a11y__sizes" role="group" aria-labelledby="a11y-size-label">
                {sizes.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleFontSizeChange(key)}
                    className={`a11y__chip a11y__chip--${key} ${fontSize === key ? 'is-active' : ''}`}
                    aria-pressed={fontSize === key}
                    aria-label={label}
                    data-testid={`font-size-${key}`}
                  >
                    A
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="a11y__row">
              <button
                type="button"
                role="switch"
                aria-checked={highContrast}
                onClick={toggleHighContrast}
                className="a11y__switch-row"
                data-testid="high-contrast-toggle"
              >
                <span className="a11y__label">{t('widgets.a11y.highContrast')}</span>
                <span className={`a11y__switch ${highContrast ? 'is-on' : ''}`} aria-hidden="true">
                  <span className="a11y__knob" />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityMenu;
