import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingBookButton from './components/FloatingBookButton';
import AccessibilityMenu from './components/AccessibilityMenu';
import { LandingPage, shouldShowLanding } from './components/LandingPage';
import { AuthProvider } from './context/AuthContext';
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
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[var(--color-text-secondary)]">Loading...</p>
    </div>
  </div>
);

// Router component to handle auth callback detection
function AppRouter({ theme, toggleTheme }) {
  const location = useLocation();
  
  // Check for session_id in URL fragment BEFORE rendering routes
  if (location.hash?.includes('session_id=')) {
    return (
      <Suspense fallback={<PageLoader />}>
        <AuthCallback />
      </Suspense>
    );
  }

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
          <Route path="/tiktok" element={<TikTok />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/admin" element={<AdminDashboard />} />
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
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
