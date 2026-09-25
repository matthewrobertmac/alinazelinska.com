import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiCheck, FiCreditCard, FiClock, FiArrowRight, FiArrowDown, FiHome, FiInstagram, FiMail, FiAlertCircle, FiPlus } from 'react-icons/fi';
import { FaPaypal } from 'react-icons/fa';
import { useCurrency } from '../context/CurrencyContext';
import CurrencySelector from '../components/CurrencySelector';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { contactInfo } from '../data/content';
import { PRICES, perLesson, savingPercent } from '../data/pricing';
import { clean } from '../utils/text';
import { generateFAQSchema, serviceSchema } from '../utils/schemas';
import './booking.css';
import { Link, SITE_URL, localizePath, useLangPath } from '../i18n/routing';
import { ease, reveal, stagger } from '../utils/motion';

const PAYPAL_EMAIL = 'zelinskayaalinaig@gmail.com';

// Package order on the page; prices always come from data/pricing.js
const PACKAGE_KEYS = ['trial', 'standard', 'intensive'];
// Answers shown on this page, pulled from the FAQ page's data so policies are written once
const BOOKING_FAQ_IDS = ['after-payment', 'reschedule', 'what-you-need', 'refund', 'payment'];

const eur = (value) => `€${value}`;

// Content strings mark the italic rose accent with *word*
const emphasise = (text) =>
  clean(text)
    .split(/\*(.+?)\*/)
    .map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const Booking = () => {
  const { t } = useTranslation();
  const { lng } = useLangPath();
  const { currency, formatPrice } = useCurrency();
  const [loading, setLoading] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  // Purely visual: which package panel is highlighted (the trial by default, or the one in the URL hash)
  const [selected, setSelected] = useState('trial');

  useEffect(() => {
    // Handle PayPal return
    const paypalSuccess = new URLSearchParams(window.location.search).get('paypal_success');
    if (paypalSuccess === 'true') {
      setPaymentStatus('success');
      window.history.replaceState({}, document.title, window.location.pathname);
      window.scrollTo(0, 0);
      return;
    }

    // /booking#package-intensive (from the price tables elsewhere) → highlight and scroll to that panel
    const key = window.location.hash.replace('#package-', '');
    if (PACKAGE_KEYS.includes(key)) {
      setSelected(key);
      const timer = setTimeout(() => {
        const el = document.getElementById(`package-${key}`);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 112, behavior: 'smooth' });
      }, 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, []);

  const packages = PACKAGE_KEYS.map((id) => ({ id, priceEur: PRICES[id].price }));

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
        <SEOHead title={t('booking.docTitle')} description={t('booking.successMessage')} />
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
          <h1>{t('booking.success')}</h1>
          <p className="booking-success__text">{t('booking.successMessage')}</p>
          <Link to="/" className="btn-primary">
            <FiHome />
            {t('booking.backToHome')}
          </Link>
        </motion.div>
      </div>
    );
  }

  const priceVars = { trial: eur(PRICES.trial.price), standard: eur(PRICES.standard.price), intensive: eur(PRICES.intensive.price) };
  const categories = t('faq.categories', { returnObjects: true });
  const allFaqs = (Array.isArray(categories) ? categories : []).flatMap((c) => c.questions || []);
  const faqs = BOOKING_FAQ_IDS.map((id) => allFaqs.find((q) => q.id === id)).filter(Boolean);
  const steps = t('booking.steps.items', { returnObjects: true });
  const pageUrl = `${SITE_URL}${localizePath('/booking', lng)}`;

  const schema = [
    serviceSchema({
      name: t('booking.seo.serviceName'),
      description: t('booking.seo.serviceDescription'),
      url: pageUrl,
      lng,
      serviceType: 'Language tutoring',
      offers: PACKAGE_KEYS.map((key) => ({ key, name: t(`booking.packages.${key}.name`) })),
    }),
    generateFAQSchema(faqs),
  ];

  return (
    <div className="booking-page page-transition">
      <SEOHead title={t('booking.seo.title', priceVars)} description={t('booking.seo.description', priceVars)} schema={schema} />

      <PageHero
        compact
        crumbs={[{ name: t('nav.booking') }]}
        eyebrow={t('booking.hero.eyebrow')}
        uk="Урок"
        testId="booking-title"
        title={emphasise(t('booking.hero.title'))}
        lede={t('booking.hero.lede')}
      >
        {/* Prices as plain text right under the title, so they're above the fold on any screen */}
        <nav className="booking-glance" aria-label={t('booking.hero.pricesLabel')}>
          {packages.map((pkg) => (
            <a
              key={pkg.id}
              href={`#package-${pkg.id}`}
              className="booking-glance__item"
              onClick={(e) => {
                e.preventDefault();
                setSelected(pkg.id);
                const el = document.getElementById(`package-${pkg.id}`);
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 112, behavior: 'smooth' });
              }}
            >
              <span className="booking-glance__name">{t(`booking.packages.${pkg.id}.name`)}</span>
              <span className="booking-glance__price">{eur(pkg.priceEur)}</span>
              <span className="booking-glance__meta">
                {PRICES[pkg.id].lessons > 1
                  ? t('booking.perLessonSaving', { price: eur(perLesson(pkg.id)), saving: savingPercent(pkg.id) })
                  : t(`booking.packages.${pkg.id}.meta`, { minutes: PRICES[pkg.id].minutes, lessons: PRICES[pkg.id].lessons })}
              </span>
              <FiArrowDown className="booking-glance__arrow" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </PageHero>

      {/* ─── Packages ─────────────────────────────────────── */}
      <section className="page-section page-section--tint booking-packages-section" aria-label={t('booking.packagesLabel')}>
        <div className="section-shell">
          <div className="booking-pay">
            <p className="booking-pay__note">{t('booking.currencyNote')}</p>
            <div className="booking-pay__row">
              <span className="field-label">{t('booking.currencyLabel')}</span>
              <CurrencySelector />
            </div>
          </div>

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
              const plan = PRICES[pkg.id];
              return (
                <motion.article
                  key={pkg.id}
                  id={`package-${pkg.id}`}
                  {...stagger(index)}
                  className={`booking-pkg ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelected(pkg.id)}
                  onFocusCapture={() => setSelected(pkg.id)}
                  data-testid={`package-${pkg.id}`}
                >
                  <div className="booking-pkg__top">
                    <span className="num">{String(index + 1).padStart(2, '0')}</span>
                    {pkg.id === 'trial' && <span className="chip">{t('booking.start')}</span>}
                    <span className="booking-pkg__radio" aria-hidden="true">
                      <FiCheck />
                    </span>
                  </div>

                  <h2 className="booking-pkg__name">{t(`booking.packages.${pkg.id}.name`)}</h2>
                  <p className="booking-pkg__duration">
                    <FiClock aria-hidden="true" />
                    {t(`booking.packages.${pkg.id}.meta`, { minutes: plan.minutes, lessons: plan.lessons })}
                  </p>

                  <div className="booking-pkg__price">
                    <span className="booking-pkg__amount">{eur(pkg.priceEur)}</span>
                    {currency !== 'EUR' && <span className="booking-pkg__approx">≈ {formatPrice(pkg.priceEur)}</span>}
                    {plan.lessons > 1 && (
                      <span className="booking-pkg__saving">
                        {t('booking.perLessonSaving', { price: eur(perLesson(pkg.id)), saving: savingPercent(pkg.id) })}
                      </span>
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
                    type="button"
                    onClick={() => handleBooking(pkg.id)}
                    disabled={loading === pkg.id}
                    className={`booking-pkg__cta ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                    data-testid={`book-${pkg.id}`}
                  >
                    {loading === pkg.id ? (
                      <span className="booking-pkg__processing">{t('booking.processing')}</span>
                    ) : (
                      <>
                        {t('booking.cta', { price: eur(pkg.priceEur) })}
                        <FiArrowRight />
                      </>
                    )}
                  </button>
                </motion.article>
              );
            })}
          </div>

          <div className="booking-after">
            <p className="booking-after__next">
              <FiMail aria-hidden="true" />
              <span>{t('booking.next')}</span>
            </p>
            <p className="booking-after__methods">
              <FaPaypal aria-hidden="true" />
              <FiCreditCard aria-hidden="true" />
              <span>{t('booking.payWith')}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{t('booking.steps.eyebrow')}</p>
            <h2>{emphasise(t('booking.steps.title'))}</h2>
          </motion.header>

          <ol className="booking-expect">
            {(Array.isArray(steps) ? steps : []).map((step, index) => (
              <motion.li key={step.title} {...stagger(index)}>
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.li>
            ))}
          </ol>

          {/* Secondary, optional path */}
          <motion.aside {...reveal} className="booking-questions">
            <div>
              <p className="eyebrow">{t('booking.questions.eyebrow')}</p>
              <h2>{emphasise(t('booking.questions.title'))}</h2>
              <p>{t('booking.questions.text')}</p>
            </div>
            <div className="booking-questions__actions">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <FiInstagram /> {t('booking.questions.instagram')}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="btn-outline">
                <FiMail /> {t('booking.questions.email')}
              </a>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ─── Booking FAQ ──────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">{t('booking.faq.eyebrow')}</p>
              <h2>{emphasise(t('booking.faq.title'))}</h2>
              <p>
                <Link to="/faq" className="link-underline">
                  {t('booking.faq.all')} <FiArrowRight className="inline" />
                </Link>
              </p>
            </motion.header>

            <div className="booking-faq">
              {faqs.map((faq) => (
                <details key={faq.id} className="booking-faq__item">
                  <summary>
                    <span>{faq.q}</span>
                    <FiPlus aria-hidden="true" />
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
