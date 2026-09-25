import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import { meta } from '../data/content';
import PageHero from '../components/PageHero';
import './auth.css';
import { ease } from '../utils/motion';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  React.useEffect(() => {
    document.title = `${isRegister ? 'Register' : 'Login'} | ${meta.title}`;
  }, [isRegister]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.detail || 'Registration failed');
        }
        
        navigate('/profile');
      } else {
        await login(formData.email, formData.password);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const heading = isRegister ? 'Create Account' : 'Welcome Back';
  const [headFirst, headLast] = heading.split(' ');

  return (
    <div className="auth-page page-transition">
      <PageHero
        compact
        eyebrow={isRegister ? 'New here' : 'Student area'}
        uk={isRegister ? 'Вітаю' : 'Знову'}
        title={
          <>
            {headFirst} <em>{headLast}</em>
          </>
        }
        lede={isRegister ? 'Start your language learning journey' : 'Sign in to continue'}
        aside={
          <motion.div
            key={isRegister ? 'register' : 'login'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="auth-panel"
          >
            {error && (
              <div className="auth-alert" role="alert">
                <FiAlertCircle aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Login Button */}
            <button type="button" onClick={loginWithGoogle} className="auth-google">
              <FcGoogle aria-hidden="true" />
              <span>Continue with Google</span>
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {isRegister && (
                <div>
                  <label className="field-label" htmlFor="auth-name">Name</label>
                  <div className="auth-input">
                    <FiUser aria-hidden="true" />
                    <input
                      id="auth-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="field"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="field-label" htmlFor="auth-email">Email</label>
                <div className="auth-input">
                  <FiMail aria-hidden="true" />
                  <input
                    id="auth-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="field"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="auth-password">Password</label>
                <div className="auth-input auth-input--toggle">
                  <FiLock aria-hidden="true" />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="field"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-input__toggle"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary auth-submit">
                {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
                {!loading && <FiArrowRight />}
              </button>
            </form>

            <p className="auth-switch">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button type="button" onClick={() => setIsRegister(!isRegister)} className="link-underline">
                {isRegister ? 'Sign In' : 'Register'}
              </button>
            </p>
          </motion.div>
        }
      >
        <p className="auth-note">
          Lessons, bookings and messages from Alina — all in one place.{' '}
          <Link to="/booking" className="link-underline">
            Not a student yet? Book a lesson.
          </Link>
        </p>
      </PageHero>
    </div>
  );
};

export default Login;
