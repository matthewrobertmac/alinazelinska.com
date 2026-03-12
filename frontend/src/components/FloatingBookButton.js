import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiX } from 'react-icons/fi';

const FloatingBookButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Don't show on booking page
    if (location.pathname === '/booking') {
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
  }, [location, isDismissed]);

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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
              aria-label="Dismiss"
            >
              <FiX className="w-4 h-4" />
            </button>

            {/* Main button */}
            <Link
              to="/booking"
              className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[var(--color-accent)] to-pink-600 text-white rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-105 group"
            >
              <FiCalendar className="w-6 h-6" />
              <span className="font-bold text-lg">Book a Lesson</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingBookButton;
