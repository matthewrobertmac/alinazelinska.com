import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiX } from 'react-icons/fi';

const UrgencyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [spotsLeft, setSpotsLeft] = useState(3);

  useEffect(() => {
    // Check if banner was dismissed
    const dismissed = sessionStorage.getItem('urgencyBannerDismissed');
    if (dismissed) {
      setIsVisible(false);
    }

    // Simulate dynamic spots (in production, fetch from API)
    const randomSpots = Math.floor(Math.random() * 3) + 2; // 2-4 spots
    setSpotsLeft(randomSpots);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('urgencyBannerDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-20 left-0 right-0 z-40"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-r from-[var(--color-accent)] to-pink-600 rounded-lg shadow-xl p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-grow">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiClock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white">
                    <p className="font-bold text-sm md:text-base">
                      ⚡ Limited Availability This Month
                    </p>
                    <p className="text-xs md:text-sm opacity-90">
                      Only <strong>{spotsLeft} spots</strong> left for new students in January. Book now to secure your place!
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                  aria-label="Dismiss"
                >
                  <FiX className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UrgencyBanner;
