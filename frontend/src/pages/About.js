import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { dataabout, meta, worktimeline, skills, services, funFacts, favouriteWords } from '../data/content';

const VIDEO_URL = 'https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/kodpfas7_copy_F5503918-139B-4C1A-89CB-371F6DF38D88%20%281%29.mp4';

const About = () => {
  const { t, i18n } = useTranslation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    document.title = `About | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="page-transition pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1
              className="text-5xl md:text-6xl font-serif font-bold mb-6"
              data-testid="about-title"
            >
              {dataabout.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Photo Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-3xl blur-2xl opacity-20"></div>
                <img
                  src="https://customer-assets.emergentagent.com/job_tutor-portfolio-1/artifacts/n2vsu8vg_lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit.%20lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscit%20elit%20%281%29.jpeg"
                  alt="Alina Zelinska"
                  className="relative rounded-3xl w-full h-auto object-cover shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(255, 145, 164, 0.3))',
                  }}
                />
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              {dataabout.aboutme.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-6"
                  data-testid={`about-paragraph-${index}`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>

          {/* Video Introduction Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">
              {t('about.videoHeading')}
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  className="w-full"
                  playsInline
                  muted={isMuted}
                  loop
                  poster=""
                />
                
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    {isPlaying ? (
                      <FiPause className="w-8 h-8 text-pink-500" />
                    ) : (
                      <FiPlay className="w-8 h-8 text-pink-500 ml-1" />
                    )}
                  </button>
                </div>
                
                {/* Bottom Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? <FiVolumeX className="w-5 h-5" /> : <FiVolume2 className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Play indicator when paused */}
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={togglePlay}
                  >
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <FiPlay className="w-10 h-10 text-pink-500 ml-1" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-center text-[var(--color-text-secondary)] mt-4 text-sm">
                {t('about.videoCaption')}
              </p>
            </div>
          </motion.div>

          {/* Fun Facts Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">
              {t('about.funFacts.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 flex items-start gap-4"
                >
                  <span className="text-3xl flex-shrink-0">{fact.icon}</span>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {fact.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Favourite Words Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
              {t('about.favouriteWords.title')}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] text-center mb-8 max-w-2xl mx-auto">
              {t('about.favouriteWords.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {favouriteWords.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 text-center hover-lift"
                >
                  <h3 className="text-3xl font-serif font-bold text-[var(--color-accent)] mb-2">
                    {item.word}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] italic mb-1">
                    {item.transliteration}
                  </p>
                  <p className="text-lg font-semibold mb-3">
                    {item.translation}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.explanation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Timeline */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
            data-testid="work-timeline-title"
          >
            {t('about.experience')}
          </motion.h2>

          <div className="space-y-8">
            {worktimeline.map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover-lift"
                data-testid={`work-item-${index}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-2xl font-serif font-semibold text-[var(--color-accent)] mb-2">
                      {work.jobtitle}
                    </h3>
                    <p className="text-lg text-[var(--color-text)]">{work.where}</p>
                  </div>
                  <div className="text-[var(--color-text-secondary)] font-medium">
                    {work.date}
                  </div>
                </div>
                {work.description && (
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {work.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
            data-testid="skills-title"
          >
            {t('about.skills')}
          </motion.h2>

          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
                data-testid={`skill-item-${index}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  <span className="text-[var(--color-accent)] font-bold text-lg">
                    {skill.value}%
                  </span>
                </div>
                <div className="w-full bg-[var(--color-bg)] rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
            data-testid="services-title"
          >
            {t('about.services')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover-lift"
                data-testid={`service-item-${index}`}
              >
                <h3 className="text-2xl font-serif font-semibold text-[var(--color-accent)] mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
