import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadMagnetPopup from './components/LeadMagnetPopup';
import Home from './pages/Home';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import TikTok from './pages/TikTok';
import Booking from './pages/Booking';
import FAQ from './pages/FAQ';
import SuccessStories from './pages/SuccessStories';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AuthCallback from './pages/AuthCallback';
import AdminDashboard from './pages/admin/Dashboard';
import { LandingPage, shouldShowLanding } from './components/LandingPage';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import './i18n';
import './App.css';

// Router component to handle auth callback detection
function AppRouter({ theme, toggleTheme }) {
  const location = useLocation();
  
  // Check for session_id in URL fragment BEFORE rendering routes
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <LeadMagnetPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tiktok" element={<TikTok />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
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
