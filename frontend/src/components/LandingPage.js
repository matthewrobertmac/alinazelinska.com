import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiVolume2, FiVolumeX, FiArrowRight } from 'react-icons/fi';

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-800 mb-4">
            <span className="text-pink-500">Alina</span> Zelinska
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Ukrainian • Russian • English Language Tutor
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mx-auto"
          style={{ maxWidth: '600px' }}
        >
          {/* Video */}
          <video
            ref={videoRef}
            src={VIDEO_URL}
            className="w-full rounded-3xl"
            playsInline
            muted={isMuted}
            onEnded={handleVideoEnd}
            poster=""
          />

          {/* Play Overlay */}
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
              onClick={handlePlay}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
              >
                <FiPlay className="w-10 h-10 md:w-12 md:h-12 text-pink-500 ml-1" />
              </motion.div>
              <p className="absolute bottom-6 text-white text-lg font-medium">Tap to play</p>
            </motion.div>
          )}

          {/* Mute Button */}
          {isPlaying && !videoEnded && (
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              {isMuted ? <FiVolumeX className="w-5 h-5" /> : <FiVolume2 className="w-5 h-5" />}
            </button>
          )}
        </motion.div>

        {/* Enter Button */}
        <AnimatePresence>
          {(videoEnded || showSkip) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
              >
                {videoEnded ? 'Start Learning' : 'Enter Website'}
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
              
              {!videoEnded && (
                <p className="mt-4 text-gray-500 text-sm">
                  Or watch the full intro video
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-10 -left-10 text-6xl opacity-20"
        >
          🇺🇦
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-10 -right-10 text-6xl opacity-20"
        >
          📚
        </motion.div>
      </div>
    </motion.div>
  );
};

export { LandingPage, shouldShowLanding };
export default LandingPage;
