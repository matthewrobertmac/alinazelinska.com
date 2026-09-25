import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import './AccessibilityMenu.css';
import { ease } from '../utils/motion';

// The panel has no floating button of its own (it crowded the page and the Book pill on phones).
// It opens from the header's "Aa" button, the mobile menu and the footer via this event.
const OPEN_EVENT = 'a11y:open';

export const openA11y = (opener) => {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { opener } }));
};

const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

const applySettings = (size, contrast) => {
  const root = document.documentElement;
  root.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
  root.classList.add(`font-size-${size}`);
  root.classList.toggle('high-contrast', contrast);
};

const AccessibilityMenu = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    const savedFontSize = read('fontSize') || 'normal';
    const savedContrast = read('highContrast') === 'true';
    setFontSize(savedFontSize);
    setHighContrast(savedContrast);
    applySettings(savedFontSize, savedContrast);
  }, []);

  // Open (or toggle) when any of the entry points asks
  useEffect(() => {
    const onOpen = (e) => {
      openerRef.current = e.detail?.opener || null;
      setIsOpen((open) => !open);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    const opener = openerRef.current;
    if (opener && opener.isConnected) opener.focus();
  }, []);

  // Focus the panel on open; close on Escape or a click outside
  useEffect(() => {
    if (!isOpen) return undefined;
    const id = requestAnimationFrame(() => panelRef.current?.querySelector('button')?.focus());
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    const onPointer = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !openerRef.current?.contains?.(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isOpen, close]);

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    write('fontSize', size);
    applySettings(size, highContrast);
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    write('highContrast', String(next));
    applySettings(fontSize, next);
  };

  const sizes = [
    { key: 'small', label: t('widgets.a11y.small') },
    { key: 'normal', label: t('widgets.a11y.normal') },
    { key: 'large', label: t('widgets.a11y.large') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-label={t('widgets.a11y.panel')}
          initial={{ opacity: 0, y: reduce ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -10 }}
          transition={{ duration: reduce ? 0.15 : 0.4, ease }}
          className="a11y__panel"
          data-testid="accessibility-panel"
        >
          <div className="a11y__head">
            <p className="eyebrow">{t('widgets.a11y.title')}</p>
            <button type="button" className="a11y__close" onClick={close} aria-label={t('widgets.a11y.close')}>
              <FiX aria-hidden="true" />
            </button>
          </div>

          <div className="a11y__row">
            <p className="a11y__label" id="a11y-size-label">
              {t('widgets.a11y.textSize')}
            </p>
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
  );
};

export default AccessibilityMenu;
