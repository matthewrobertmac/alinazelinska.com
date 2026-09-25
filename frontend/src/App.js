import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingBookButton from './components/FloatingBookButton';
import AccessibilityMenu from './components/AccessibilityMenu';
import { LandingPage, shouldShowLanding } from './components/LandingPage';
import { CurrencyProvider } from './context/CurrencyContext';
import i18n from './i18n';
import { LANGS, DEFAULT_LANG, splitLang, localizePath, isBot } from './i18n/routing';
import './App.css';

// Pages are code-split. The current page's code is fetched before the app starts (see preloadCurrentPage),
// so it takes over the prerendered HTML without flashing the loader.
const loadedPages = {};
const page = (name, load) => {
  const Lazy = lazy(load);
  const Page = (props) => {
    const Loaded = loadedPages[name];
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />;
  };
  Page.preload = () => load().then((module) => {
    loadedPages[name] = module.default;
  });
  return Page;
};

const Home = page('Home', () => import('./pages/Home'));
const About = page('About', () => import('./pages/About'));
const Testimonials = page('Testimonials', () => import('./pages/Testimonials'));
const Contact = page('Contact', () => import('./pages/Contact'));
const TikTok = page('TikTok', () => import('./pages/TikTok'));
const Booking = page('Booking', () => import('./pages/Booking'));
const FAQ = page('FAQ', () => import('./pages/FAQ'));
const SuccessStories = page('SuccessStories', () => import('./pages/SuccessStories'));
const SpecialProjects = page('SpecialProjects', () => import('./pages/SpecialProjects'));
const UkrainianLessons = page('UkrainianLessons', () => import('./pages/services/UkrainianLessons'));
const RussianLessons = page('RussianLessons', () => import('./pages/services/RussianLessons'));
const SpeakingClub = page('SpeakingClub', () => import('./pages/services/SpeakingClub'));
const PoetryTranslation = page('PoetryTranslation', () => import('./pages/services/PoetryTranslation'));
const CreativeWriting = page('CreativeWriting', () => import('./pages/services/CreativeWriting'));

// Loading fallback component
const PageLoader = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="page-loader" role="status" aria-label={t('widgets.loader.label')}>
      <span lang={i18n.resolvedLanguage === 'ru' ? 'ru' : 'uk'}>{t('widgets.loader.text')}</span>
    </div>
  );
};

const pages = {
  '/': Home,
  '/about': About,
  '/testimonials': Testimonials,
  '/success-stories': SuccessStories,
  '/special-projects': SpecialProjects,
  '/faq': FAQ,
  '/services/ukrainian-lessons': UkrainianLessons,
  '/services/russian-lessons': RussianLessons,
  '/services/speaking-club': SpeakingClub,
  '/services/poetry-translation': PoetryTranslation,
  '/services/creative-writing': CreativeWriting,
  '/tiktok': TikTok,
  '/booking': Booking,
  '/contact': Contact,
};

// Keeps i18n in step with the URL, which is the source of truth for language.
// Old ?lang=uk links move to /uk/…; a visitor's saved or browser language picks
// the prefix only when they land on an unprefixed address (never for bots).
const LanguageSync = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const { lng, path } = splitLang(pathname);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const legacy = params.get('lang');
    if (LANGS.includes(legacy)) {
      params.delete('lang');
      const rest = params.toString();
      navigate(`${localizePath(path, legacy)}${rest ? `?${rest}` : ''}${hash}`, { replace: true });
      return;
    }
    if (i18n.resolvedLanguage !== lng) i18n.changeLanguage(lng);
  }, [pathname, search, hash, lng, path, navigate]);

  useEffect(() => {
    if (lng !== DEFAULT_LANG || isBot()) return;
    let preferred = null;
    try {
      preferred = localStorage.getItem('i18nextLng');
    } catch {}
    if (!preferred) preferred = (navigator.language || '').slice(0, 2);
    if (LANGS.includes(preferred) && preferred !== DEFAULT_LANG) {
      navigate(`${localizePath(path, preferred)}${search}${hash}`, { replace: true });
    }
    // Only on first arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export const preloadCurrentPage = () => {
  const Page = pages[splitLang(window.location.pathname).path];
  return Page ? Page.preload().catch(() => {}) : Promise.resolve();
};

const prefixes = LANGS.map((lang) => localizePath('', lang));

function AppRouter({ theme, toggleTheme }) {
  return (
    <>
      <LanguageSync />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <FloatingBookButton />
      <AccessibilityMenu />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {prefixes.flatMap((prefix) =>
            Object.entries(pages).map(([path, Page]) => (
              <Route key={prefix + path} path={path === '/' ? prefix || '/' : prefix + path} element={<Page />} />
            ))
          )}
          {/* Retired or unknown addresses (/login, /profile, /admin…) land on that language's home page */}
          {prefixes.filter(Boolean).map((prefix) => (
            <Route key={prefix} path={`${prefix}/*`} element={<Navigate to={prefix} replace />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // The splash greets first-time visitors on the home page only — never deep links or crawlers
    const onHome = splitLang(window.location.pathname).path === '/';
    setShowLanding(onHome && !isBot() && shouldShowLanding());
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleEnterSite = () => {
    setShowLanding(false);
  };

  return (
    <HelmetProvider>
        <CurrencyProvider>
          <AnimatePresence mode="wait">
            {showLanding ? (
              <LandingPage key="landing" onEnter={handleEnterSite} />
            ) : (
              <Router key="main">
                <div className="App min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-all duration-300">
                  <AppRouter theme={theme} toggleTheme={toggleTheme} />
                </div>
              </Router>
            )}
          </AnimatePresence>
        </CurrencyProvider>
    </HelmetProvider>
  );
}

export default App;
