import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiType, FiSun, FiMoon } from 'react-icons/fi';

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);

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

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-[var(--color-accent)] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label="Accessibility options"
      >
        <FiType className="w-6 h-6" />
      </button>

      {/* Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-16 left-0 bg-[var(--color-bg)] border-2 border-[var(--color-border)] rounded-lg shadow-xl p-4 w-64"
        >
          <h3 className="font-bold mb-4">Accessibility</h3>

          {/* Font Size */}
          <div className="mb-4">
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">Text Size:</p>
            <div className="flex gap-2">
              {['small', 'normal', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={`flex-1 px-3 py-2 rounded border-2 transition-colors ${
                    fontSize === size
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'
                  }`}
                >
                  <span className={size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : 'text-sm'}>
                    {size === 'small' ? 'A' : size === 'normal' ? 'A' : 'A'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div>
            <button
              onClick={toggleHighContrast}
              className="w-full flex items-center justify-between p-3 rounded border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
            >
              <span className="text-sm">High Contrast</span>
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  highContrast ? 'bg-[var(--color-accent)]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AccessibilityMenu;
