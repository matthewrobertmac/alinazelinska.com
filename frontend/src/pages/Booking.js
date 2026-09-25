import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiCheck, FiCreditCard, FiClock, FiArrowRight, FiHome, FiInstagram, FiMail, FiAlertCircle } from 'react-icons/fi';
import { FaPaypal } from 'react-icons/fa';
import { useCurrency } from '../context/CurrencyContext';
import CurrencySelector from '../components/CurrencySelector';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { accent, clean } from '../utils/text';
import './booking.css';
import { Link, localizePath, useLangPath } from '../i18n/routing';
import { ease, reveal, stagger } from '../utils/motion';

const PAYPAL_EMAIL = 'zelinskayaalinaig@gmail.com';

// Content strings mark emphasis with *word*; `Tag` picks the element (italic accent or bold)
const emphasise = (text, Tag = 'em', className) =>
  clean(text)
    .split(/\*(.+?)\*/)
    .map((part, i) =>
      i % 2 ? (
        <Tag key={i} className={className}>
          {part}
        </Tag>
      ) : (
        part
      )
    );

const Booking = () => {
  const { t } = useTranslation();
  const { lng } = useLangPath();
  const { getPackagePrices, currency, formatPrice, basePricesEur } = useCurrency();
  const [loading, setLoading] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  // Purely visual: which package panel is highlighted (the popular one by default)
  const [selected, setSelected] = useState('standard');

  const prices = getPackagePrices();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Handle PayPal return
    const paypalSuccess = new URLSearchParams(window.location.search).get('paypal_success');
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
    },
    {
      id: 'standard',
      priceEur: basePricesEur.standard,
      popular: true,
    },
    {
      id: 'intensive',
      priceEur: basePricesEur.intensive,
      popular: false,
    },
  ];

  const handleBooking = (packageId) => {
    setLoading(packageId);
    setError(null);

    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) {
      setError(t('booking.notFound'));
      setLoading(null);
      return;
    }

    const packageNames = {
      trial: 'Trial Lesson (30 min)',
      standard: 'Standard Lesson (60 min)',
      intensive: 'Intensive Pack (5 x 60 min)',
    };
    
    const returnUrl = encodeURIComponent(`${window.location.origin}${localizePath('/booking', lng)}?paypal_success=true`);
    const cancelUrl = encodeURIComponent(`${window.location.origin}${localizePath('/booking', lng)}`);
    const itemName = encodeURIComponent(`Language Lesson - ${packageNames[packageId]}`);
    
    // Create PayPal payment URL with guest checkout (landing_page=billing shows card form first)
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(PAYPAL_EMAIL)}&amount=${pkg.priceEur.toFixed(2)}&currency_code=EUR&item_name=${itemName}&return=${returnUrl}&cancel_return=${cancelUrl}&no_shipping=1&no_note=1&landing_page=billing`;
    
    window.location.href = paypalUrl;
  };

  // Success state
  if (paymentStatus === 'success') {
    return (
      <div className="booking-page booking-success page-transition">
        <SEOHead title={t('booking.docTitle')} description={t('booking.seo.description')} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="booking-success__inner"
        >
          <span className="booking-success__seal" aria-hidden="true">
            <FiCheck />
          </span>
          <p className="closing__uk" lang="uk">
            Дякую!
          </p>
          <h1>{clean(t('booking.success'))}</h1>
          <p className="booking-success__text">{t('booking.successMessage')}</p>
          <Link to="/" className="btn-primary">
            <FiHome />
            {t('booking.backToHome')}
          </Link>
        </motion.div>
      </div>
    );
  }

  const steps = ['step1', 'step2', 'step3'].map((key) => ({
    icon: t(`booking.whatToExpect.${key}.icon`),
    title: t(`booking.whatToExpect.${key}.title`),
    description: t(`booking.whatToExpect.${key}.description`),
  }));

  return (
    <div className="booking-page page-transition">
      <SEOHead
        title={t('booking.seo.title')}
        description={t('booking.seo.description')}
        keywords={t('booking.seo.keywords')}
      />

      <PageHero
        crumbs={[{ name: t('nav.booking') }]}
        eyebrow={t('booking.hero.eyebrow')}
        uk="Урок"
        testId="booking-title"
        title={accent(t('booking.title'))}
        lede={t('booking.subtitle')}
      >
        <p className="booking-reassure">{clean(t('booking.reassurance'))}</p>
        <ul className="booking-trust">
          {t('booking.trustLine')
            .split('|')
            .map((item) => (
              <li key={item}>{item.trim()}</li>
            ))}
        </ul>
      </PageHero>

      {/* ─── Step 01 · Say hello first ────────────────────── */}
      <section className="page-section booking-step-section">
        <div className="section-shell">
          <motion.div {...reveal} className="booking-connect">
            <div className="booking-connect__marker">
              <span className="booking-step__label">{t('booking.step')}</span>
              <span className="booking-step__num">01</span>
            </div>
            <div className="booking-connect__body">
              <p className="eyebrow">{t('booking.connect.eyebrow')}</p>
              <h2>{emphasise(t('booking.connect.title'), 'em', 'display-italic')}</h2>
              <p className="booking-connect__text">{emphasise(t('booking.connect.text'), 'strong')}</p>
              <div className="booking-connect__actions">
                <a
                  href="https://www.instagram.com/alin.a.zelinska/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FiInstagram /> {t('booking.connect.instagram')}
                </a>
                <a href="mailto:zelinskayaalinaig@gmail.com" className="btn-outline">
                  <FiMail /> {t('booking.connect.email')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Step 02 · Choose a format ────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split booking-packages-head">
            <div>
              <p className="eyebrow">{t('booking.choose.eyebrow')}</p>
              <h2>{clean(t('booking.selectPackage'))}</h2>
            </div>
            <div className="booking-pay">
              <div className="booking-pay__row">
                <span className="field-label">{t('booking.choose.currency')}</span>
                <CurrencySelector />
              </div>
              <p className="booking-pay__methods">
                <FaPaypal aria-hidden="true" />
                <FiCreditCard aria-hidden="true" />
                <span>{t('booking.choose.payWith')}</span>
              </p>
            </div>
          </motion.header>

          {/* Error message */}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="booking-error" role="alert">
              <FiAlertCircle aria-hidden="true" />
              <div>
                <p className="booking-error__title">{t('booking.error')}</p>
                <p>{error}</p>
              </div>
            </motion.div>
          )}

          <div className="booking-packages">
            {packages.map((pkg, index) => {
              const isSelected = selected === pkg.id;
              return (
                <motion.article
                  key={pkg.id}
                  {...stagger(index)}
                  className={`booking-pkg ${isSelected ? 'is-selected' : ''} ${pkg.popular ? 'is-popular' : ''}`}
                  onClick={() => setSelected(pkg.id)}
                  onFocusCapture={() => setSelected(pkg.id)}
                  data-testid={`package-${pkg.id}`}
                >
                  <div className="booking-pkg__top">
                    <span className="num">{String(index + 1).padStart(2, '0')}</span>
                    {pkg.popular && <span className="chip">{t('booking.popular')}</span>}
                    <span className="booking-pkg__radio" aria-hidden="true">
                      <FiCheck />
                    </span>
                  </div>

                  <h3>{t(`booking.packages.${pkg.id}.name`)}</h3>
                  <p className="booking-pkg__duration">
                    <FiClock aria-hidden="true" />
                    {t(`booking.packages.${pkg.id}.duration`)}
                  </p>

                  <div className="booking-pkg__price">
                    <span className="booking-pkg__amount">{formatPrice(pkg.priceEur)}</span>
                    <span className="booking-pkg__per">
                      {pkg.id === 'intensive' ? '' : t('booking.perLesson')}
                    </span>
                    {currency !== 'EUR' && (
                      <span className="booking-pkg__eur">(€{pkg.priceEur.toFixed(2)} EUR)</span>
                    )}
                  </div>

                  <p className="booking-pkg__desc">{t(`booking.packages.${pkg.id}.description`)}</p>

                  <div className="booking-pkg__features">
                    <p className="field-label">{t('booking.features')}</p>
                    <ul>
                      {t(`booking.packages.${pkg.id}.features`, { returnObjects: true }).map((feature, i) => (
                        <li key={i}>
                          <FiCheck aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleBooking(pkg.id)}
                    disabled={loading === pkg.id}
                    className={`booking-pkg__cta ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                    data-testid={`book-${pkg.id}`}
                  >
                    {loading === pkg.id ? (
                      <span className="booking-pkg__processing">{t('booking.processing')}</span>
                    ) : (
                      <>
                        {clean(t('booking.bookNow'))}
                        <FiArrowRight />
                      </>
                    )}
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── What to expect ───────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('booking.expectEyebrow')}</p>
            <h2>{clean(t('booking.whatToExpect.title'))}</h2>
          </motion.header>

          <ol className="booking-expect">
            {steps.map((step, index) => (
              <motion.li key={index} {...stagger(index)}>
                <div className="booking-expect__head">
                  <span className="num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="booking-expect__icon" aria-hidden="true">
                    {step.icon}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Booking;
