import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiCheck, FiCreditCard, FiClock, FiArrowRight, FiHome } from 'react-icons/fi';
import { FaPaypal } from 'react-icons/fa';
import { meta } from '../data/content';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import CurrencySelector from '../components/CurrencySelector';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEOHead';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const PAYPAL_EMAIL = 'zelinskayaalinaig@gmail.com';

const Booking = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { getPackagePrices, currency, formatPrice, basePricesEur } = useCurrency();
  const [loading, setLoading] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  const prices = getPackagePrices();

  useEffect(() => {
    document.title = `${t('nav.booking')} | ${meta.title}`;
    window.scrollTo(0, 0);

    // Check for payment return
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const paypalSuccess = urlParams.get('paypal_success');
    
    if (sessionId) {
      pollPaymentStatus(sessionId);
    }
    
    // Handle PayPal return
    if (paypalSuccess === 'true') {
      setPaymentStatus('success');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [t]);

  const packages = [
    {
      id: 'trial',
      priceEur: basePricesEur.trial,
      popular: false,
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'standard',
      priceEur: basePricesEur.standard,
      popular: true,
      color: 'from-[var(--color-accent)] to-pink-600',
    },
    {
      id: 'intensive',
      priceEur: basePricesEur.intensive,
      popular: false,
      color: 'from-purple-400 to-purple-600',
    },
  ];

  const pollPaymentStatus = async (sessionId, attempts = 0) => {
    const maxAttempts = 5;
    const pollInterval = 2000;

    if (attempts >= maxAttempts) {
      setPaymentStatus('timeout');
      return;
    }

    try {
      setPaymentStatus('checking');
      const response = await fetch(`${BACKEND_URL}/api/payments/checkout/status/${sessionId}`);
      if (!response.ok) throw new Error('Failed to check status');

      const data = await response.json();
      
      if (data.payment_status === 'paid') {
        setPaymentStatus('success');
        // Clear the URL params
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      } else if (data.status === 'expired') {
        setPaymentStatus('expired');
        return;
      }

      // Continue polling
      setTimeout(() => pollPaymentStatus(sessionId, attempts + 1), pollInterval);
    } catch (err) {
      console.error('Error checking payment:', err);
      setPaymentStatus('error');
    }
  };

  const handleBooking = async (packageId) => {
    setLoading(packageId);
    setError(null);

    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) {
      setError('Package not found');
      setLoading(null);
      return;
    }

    const packageNames = {
      trial: 'Trial Lesson (30 min)',
      standard: 'Standard Lesson (60 min)',
      intensive: 'Intensive Pack (5 x 60 min)',
    };
    
    const returnUrl = encodeURIComponent(`${window.location.origin}/booking?paypal_success=true`);
    const cancelUrl = encodeURIComponent(`${window.location.origin}/booking`);
    const itemName = encodeURIComponent(`Language Lesson - ${packageNames[packageId]}`);
    
    // Create PayPal payment URL with guest checkout (landing_page=billing shows card form first)
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(PAYPAL_EMAIL)}&amount=${pkg.priceEur.toFixed(2)}&currency_code=EUR&item_name=${itemName}&return=${returnUrl}&cancel_return=${cancelUrl}&no_shipping=1&no_note=1&landing_page=billing`;
    
    // Create booking record in database before redirecting
    try {
      await fetch(`${BACKEND_URL}/api/bookings/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          package_id: packageId,
          user_id: user?.user_id || null,
          user_name: user?.name || 'PayPal Customer',
          user_email: user?.email || '',
          payment_method: 'paypal',
          amount: pkg.priceEur,
        }),
      });
    } catch (e) {
      console.log('Could not create booking record:', e);
    }
    
    window.location.href = paypalUrl;
  };

  // Success state
  if (paymentStatus === 'success') {
    return (
      <div className="page-transition pt-24 pb-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4 text-green-600">{t('booking.success')}</h1>
          <p className="text-[var(--color-text-secondary)] mb-8">{t('booking.successMessage')}</p>
          <a
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiHome className="w-5 h-5" />
            {t('booking.backToHome')}
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-transition pt-24 pb-16">
      <SEOHead
        title="Book Ukrainian Lessons | Alina Zelinska | Trial from €15"
        description="Book personalized Ukrainian lessons with Alina Zelinska. Trial lesson €15, Standard €30, Intensive pack €120. Perfect 5.0 rating, 500+ students worldwide."
        keywords="book Ukrainian lessons, Ukrainian tutor booking, learn Ukrainian online, Ukrainian language course"
        hreflang={[
          { lang: 'en', url: 'https://alinazelinska.com/booking' },
          { lang: 'uk', url: 'https://alinazelinska.com/booking?lang=uk' },
          { lang: 'ru', url: 'https://alinazelinska.com/booking?lang=ru' },
          { lang: 'x-default', url: 'https://alinazelinska.com/booking' }
        ]}
      />
      
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ name: 'Book a Lesson' }]} />
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6" data-testid="booking-title">
              {t('booking.title')}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4">
              {t('booking.subtitle')}
            </p>

            {/* Reassurance Line */}
            <p className="text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-6">
              {t('booking.reassurance')}
            </p>

            {/* Contact First Notice */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="card p-6 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent border-2 border-[var(--color-accent)]/30">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">💌</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Before You Book — Let's Connect!</h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">
                      Please <strong>message me first</strong> before making a payment so we can schedule your lesson together and make sure the timing works perfectly for both of us!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://www.instagram.com/alin.a.zelinska/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors text-sm font-medium"
                      >
                        📱 Message on Instagram
                      </a>
                      <a
                        href="mailto:zelinskayaalinaig@gmail.com"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent)] hover:text-white transition-colors text-sm font-medium"
                      >
                        ✉️ Send Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Currency Selector */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-sm text-[var(--color-text-secondary)]">Currency:</span>
              <CurrencySelector />
            </div>
            
            {/* Payment Info */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <FaPaypal className="w-5 h-5 text-[#0070ba]" />
                <FiCreditCard className="w-5 h-5" />
                <span>Pay with PayPal or Card</span>
              </div>
              {/* Trust Line */}
              <p className="text-xs text-[var(--color-accent)] font-medium">
                {t('booking.trustLine')}
              </p>
            </div>
          </motion.div>

          {/* What to Expect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-8">
              {t('booking.whatToExpect.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: t('booking.whatToExpect.step1.icon'),
                  title: t('booking.whatToExpect.step1.title'),
                  description: t('booking.whatToExpect.step1.description'),
                },
                {
                  icon: t('booking.whatToExpect.step2.icon'),
                  title: t('booking.whatToExpect.step2.title'),
                  description: t('booking.whatToExpect.step2.description'),
                },
                {
                  icon: t('booking.whatToExpect.step3.icon'),
                  title: t('booking.whatToExpect.step3.title'),
                  description: t('booking.whatToExpect.step3.description'),
                },
              ].map((step, index) => (
                <div key={index} className="card p-6 text-center">
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-center"
            >
              <p className="text-red-600 font-medium">{t('booking.error')}</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </motion.div>
          )}

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative card p-8 ${
                  pkg.popular ? 'border-2 border-[var(--color-accent)] scale-105' : ''
                }`}
                data-testid={`package-${pkg.id}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-accent)] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular ⭐
                  </div>
                )}

                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-6`}>
                  <FiClock className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-serif font-bold mb-2">
                  {t(`booking.packages.${pkg.id}.name`)}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                  {t(`booking.packages.${pkg.id}.duration`)}
                </p>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  {t(`booking.packages.${pkg.id}.description`)}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{formatPrice(pkg.priceEur)}</span>
                  <span className="text-[var(--color-text-secondary)] ml-2">
                    {pkg.id === 'intensive' ? '' : t('booking.perLesson')}
                  </span>
                  {currency !== 'EUR' && (
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      (€{pkg.priceEur.toFixed(2)} EUR)
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  <p className="font-medium text-sm">{t('booking.features')}</p>
                  {t(`booking.packages.${pkg.id}.features`, { returnObjects: true }).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--color-text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBooking(pkg.id)}
                  disabled={loading === pkg.id}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                      : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-accent)] hover:text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  data-testid={`book-${pkg.id}`}
                >
                  {loading === pkg.id ? (
                    <span className="animate-pulse">{t('booking.processing')}</span>
                  ) : (
                    <>
                      {t('booking.bookNow')}
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
