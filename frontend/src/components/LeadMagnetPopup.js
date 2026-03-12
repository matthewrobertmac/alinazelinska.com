import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiMail } from 'react-icons/fi';

const LeadMagnetPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenLeadMagnet');
    const hasSubscribed = localStorage.getItem('hasSubscribed');
    
    if (hasSeenPopup || hasSubscribed) {
      return;
    }

    // Show popup after 30 seconds or on exit intent
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    // Exit intent detection
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasSeenPopup) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenLeadMagnet', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // TODO: Integrate with your email service (Resend, Mailchimp, etc.)
    // For now, just simulate success
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      localStorage.setItem('hasSubscribed', 'true');
      
      // Close popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            <div className="bg-[var(--color-bg)] rounded-2xl shadow-2xl overflow-hidden border-2 border-[var(--color-accent)]/20">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors z-10"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>

              {!isSubmitted ? (
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiDownload className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                      Get Your Free Language Guide! 🎁
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Download "10 Ukrainian Phrases You'll Use Every Day" — perfect for beginners!
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3 mb-6">
                    {[
                      'Essential daily phrases with pronunciation',
                      'Cultural context for each phrase',
                      'Audio pronunciation guide (coming soon!)',
                      'Plus: Weekly language tips in your inbox'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-[var(--color-accent)] text-xl flex-shrink-0">✓</span>
                        <span className="text-sm text-[var(--color-text-secondary)]">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg border-2 border-[var(--color-border)] focus:border-[var(--color-accent)] focus:outline-none bg-[var(--color-bg)] text-[var(--color-text)] transition-colors"
                        required
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      <FiDownload className="w-5 h-5" />
                      Send Me The Free Guide!
                    </button>
                  </form>

                  <p className="text-xs text-[var(--color-text-secondary)] text-center mt-4">
                    No spam, ever. Unsubscribe anytime. 💕
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiMail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-3">
                    Check Your Email! 📬
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    I just sent you the guide! Don't forget to check your spam folder if you don't see it in a few minutes.
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-4">
                    Welcome to the community! 🌸
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnetPopup;
