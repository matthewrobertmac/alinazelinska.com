import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiPlay, FiVolume2, FiVolumeX, FiArrowRight } from 'react-icons/fi';
import './LandingPage.css';
import { ease } from '../utils/motion';

const VIDEO_URL = 'https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/kodpfas7_copy_F5503918-139B-4C1A-89CB-371F6DF38D88%20%281%29.mp4';

// Check if user should see landing page (first visit or > 7 days since last visit)
const shouldShowLanding = () => {
  const lastVisit = localStorage.getItem('alina_last_visit');
  const hasSeenLanding = localStorage.getItem('alina_seen_landing');

  if (!hasSeenLanding) return true;

  if (lastVisit) {
    const daysSinceVisit = (Date.now() - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
    if (daysSinceVisit > 7) return true;
  }

  return false;
};

const LandingPage = ({ onEnter }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Show skip button after 3 seconds
    const timer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleEnter = () => {
    localStorage.setItem('alina_seen_landing', 'true');
    localStorage.setItem('alina_last_visit', Date.now().toString());
    onEnter();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Motion helpers — collapse to simple fades when reduced motion is requested
  const rise = (delay, y = 16) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.2 : 1, ease, delay: reduce ? 0 : delay },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
      className="landing"
      data-testid="landing-page"
      role="dialog"
      aria-modal="true"
      aria-labelledby="landing-title"
    >
      <div className="landing__aura" aria-hidden="true" />

      <div className="landing__inner">
        {/* Name & subtitle */}
        <div className="landing__copy">
          <motion.p className="landing__welcome" lang="uk" {...rise(0.15, 10)}>
            Ласкаво просимо
          </motion.p>

          <h1 id="landing-title" className="landing__title">
            {['Alina', 'Zelinska'].map((word, i) => (
              <span key={word} className="landing__line">
                <motion.span
                  className={`block ${i === 1 ? 'display-italic' : ''}`}
                  initial={{ y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: reduce ? 0.2 : 1.2, ease, delay: reduce ? 0 : 0.3 + i * 0.12 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="eyebrow landing__subtitle" {...rise(0.7, 12)}>
            Ukrainian · Russian · English Language Tutor
          </motion.p>
        </div>

        {/* Video */}
        <motion.div
          className="landing__media"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.2 : 1.3, ease, delay: reduce ? 0 : 0.5 }}
        >
          <div className="landing__frame">
            <video
              ref={videoRef}
              src={VIDEO_URL}
              className="landing__video"
              playsInline
              muted={isMuted}
              onEnded={handleVideoEnd}
              poster=""
              aria-label="Introduction video from Alina Zelinska"
              data-testid="landing-video"
            />

            {/* Play Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="landing__play"
                  onClick={handlePlay}
                  aria-label="Play introduction video"
                  data-testid="landing-play-btn"
                >
                  <span className="landing__play-disc" aria-hidden="true">
                    <FiPlay />
                  </span>
                  <span className="landing__play-label">Tap to play</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Mute Button */}
            {isPlaying && !videoEnded && (
              <button
                type="button"
                onClick={toggleMute}
                className="landing__mute"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                aria-pressed={isMuted}
                data-testid="landing-mute-btn"
              >
                {isMuted ? <FiVolumeX aria-hidden="true" /> : <FiVolume2 aria-hidden="true" />}
              </button>
            )}
          </div>

          <p className="landing__caption" aria-hidden="true">
            <span className="num">01</span>
            <span>A short hello from Malta</span>
          </p>
        </motion.div>

        {/* Enter — space is reserved so nothing jumps when it appears */}
        <div className="landing__actions">
          <AnimatePresence>
            {(videoEnded || showSkip) && (
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.8, ease }}
                className="landing__enter"
              >
                <button
                  type="button"
                  onClick={handleEnter}
                  className="btn-primary"
                  data-testid="landing-enter-btn"
                >
                  {videoEnded ? 'Start learning' : 'Enter website'}
                  <FiArrowRight aria-hidden="true" />
                </button>

                {!videoEnded && (
                  <p className="landing__hint">Or watch the full intro video</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export { LandingPage, shouldShowLanding };
export default LandingPage;
