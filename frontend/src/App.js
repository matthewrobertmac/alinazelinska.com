import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingBookButton from './components/FloatingBookButton';
import AccessibilityMenu from './components/AccessibilityMenu';
import { LandingPage, shouldShowLanding } from './components/LandingPage';
import { CurrencyProvider } from './context/CurrencyContext';
import './i18n';
import './App.css';

// Lazy load pages for better performance (code splitting)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const TikTok = lazy(() => import('./pages/TikTok'));
const Booking = lazy(() => import('./pages/Booking'));
const FAQ = lazy(() => import('./pages/FAQ'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const SpecialProjects = lazy(() => import('./pages/SpecialProjects'));
const UkrainianLessons = lazy(() => import('./pages/services/UkrainianLessons'));
const RussianLessons = lazy(() => import('./pages/services/RussianLessons'));
const SpeakingClub = lazy(() => import('./pages/services/SpeakingClub'));
const PoetryTranslation = lazy(() => import('./pages/services/PoetryTranslation'));
const CreativeWriting = lazy(() => import('./pages/services/CreativeWriting'));

// Loading fallback component
const PageLoader = () => (
  <div className="page-loader" role="status" aria-label="Loading">
    <span lang="uk">Хвилинку…</span>
  </div>
);

function AppRouter({ theme, toggleTheme }) {
  
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <FloatingBookButton />
      <AccessibilityMenu />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/special-projects" element={<SpecialProjects />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/services/ukrainian-lessons" element={<UkrainianLessons />} />
          <Route path="/services/russian-lessons" element={<RussianLessons />} />
          <Route path="/services/speaking-club" element={<SpeakingClub />} />
          <Route path="/services/poetry-translation" element={<PoetryTranslation />} />
          <Route path="/services/creative-writing" element={<CreativeWriting />} />
          <Route path="/tiktok" element={<TikTok />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          {/* Retired addresses (/login, /profile, /admin…) land on the home page */}
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
    
    // Check if should show landing page
    setShowLanding(shouldShowLanding());
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
