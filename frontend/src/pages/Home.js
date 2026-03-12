import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingWords from '../components/FloatingWords';
import QuizWidget from '../components/QuizWidget';
import TrustBadges from '../components/TrustBadges';
import LazyImage from '../components/LazyImage';
import SEOHead from '../components/SEOHead';
import { introdata, meta, whoITeach } from '../data/content';
import { personSchema, organizationSchema, aggregateRatingSchema } from '../utils/schemas';
import { FiArrowRight } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

const Home = () => {
  const { t } = useTranslation();
  const [showHeart, setShowHeart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = meta.title;
  }, []);

  const handleBookClick = (e) => {
    e.preventDefault();
    setShowHeart(true);
    setTimeout(() => {
      navigate('/booking');
    }, 800);
  };

  return (
    <div className="relative min-h-screen page-transition">
      <SEOHead
        title="Alina Zelinska | Ukrainian Tutor Online from Malta | 5.0★ Rating"
        description="Learn Ukrainian with Alina Zelinska, a native Ukrainian tutor based in Malta. 500+ students, 5.0★ rating, 3,500+ lessons. Book your first lesson today."
        keywords="Ukrainian tutor, learn Ukrainian online, Ukrainian lessons, native Ukrainian teacher, Ukrainian language, Ukrainian course"
        schema={{
          \"@context\": \"https://schema.org\",
          \"@graph\": [personSchema, organizationSchema, aggregateRatingSchema]
        }}
        hreflang={[
          { lang: 'en', url: 'https://alinazelinska.com/' },
          { lang: 'uk', url: 'https://alinazelinska.com/?lang=uk' },
          { lang: 'ru', url: 'https://alinazelinska.com/?lang=ru' },
          { lang: 'x-default', url: 'https://alinazelinska.com/' }
        ]}
      />
      
      {/* Floating Words Background */}
      <FloatingWords />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight"
              data-testid="hero-title"
            >
              {introdata.title}
            </h1>

            <div className="text-2xl md:text-3xl lg:text-4xl font-serif text-[var(--color-accent)] min-h-[80px]">
              <Typewriter
                options={{
                  strings: introdata.animated,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 80,
                }}
              />
            </div>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
              {introdata.description}
            </p>

            {/* Social Proof Line */}
            <p className="text-base md:text-lg text-[var(--color-accent)] font-medium">
              {introdata.socialProof}
            </p>

            {/* SEO Tagline */}
            <p className="text-sm text-[var(--color-text-secondary)] opacity-80">
              {introdata.seoTagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleBookClick}
                data-testid="book-lesson-btn"
                className="relative btn-primary text-center flex items-center justify-center gap-2"
              >
                Book a Lesson
                <FiArrowRight className="w-5 h-5" />
                
                {/* Simple Red Heart Animation */}
                <AnimatePresence>
                  {showHeart && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 0],
                        y: [0, -30, -50],
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute -top-2 right-1/2 translate-x-1/2 pointer-events-none z-20"
                    >
                      <span className="text-2xl">❤️</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <Link
                to="/testimonials"
                data-testid="view-testimonials-btn"
                className="btn-outline text-center flex items-center justify-center gap-2"
              >
                {t('home.viewTestimonials')}
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                data-testid="contact-me-btn"
                className="btn-outline text-center flex items-center justify-center gap-2"
              >
                {t('home.getInTouch')}
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <LazyImage
                src={introdata.image}
                alt="Alina Zelinska"
                data-testid="hero-image"
                className="relative rounded-3xl w-full h-auto object-cover shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(255, 145, 164, 0.3))',
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section - Separate and Centered */}
      <section className="relative py-8 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TrustBadges variant="compact" />
          </motion.div>
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="relative py-16 px-6 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {t('home.whatIOffer.title')}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t('home.whatIOffer.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: t('home.whatIOffer.conversationalUkrainian.title'),
                description: t('home.whatIOffer.conversationalUkrainian.description'),
                icon: '🗣️',
              },
              {
                title: t('home.whatIOffer.professionalUkrainian.title'),
                description: t('home.whatIOffer.professionalUkrainian.description'),
                icon: '💼',
              },
              {
                title: t('home.whatIOffer.examPrep.title'),
                description: t('home.whatIOffer.examPrep.description'),
                icon: '📚',
              },
              {
                title: t('home.whatIOffer.poetryTranslation.title'),
                description: t('home.whatIOffer.poetryTranslation.description'),
                icon: '🌙',
              },
              {
                title: t('home.whatIOffer.creativeWriting.title'),
                description: t('home.whatIOffer.creativeWriting.description'),
                icon: '✨',
              },
              {
                title: t('home.whatIOffer.russianLessons.title'),
                description: t('home.whatIOffer.russianLessons.description'),
                icon: '🇷🇺',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover-lift text-center p-8"
                data-testid={`service-card-${index}`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-serif font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/about" className="btn-outline" data-testid="learn-more-btn">
              {t('home.whatIOffer.learnMore')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Who I Teach Section */}
      <section className="relative py-16 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)] z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {t('home.whoITeach.title')}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
              {t('home.whoITeach.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoITeach.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover-lift text-center p-8"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-serif font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="relative py-16 px-6 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Find Your Perfect Package 🎯
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Not sure where to start? Take this quick 30-second quiz and I'll recommend the best option for you!
            </p>
          </motion.div>

          <QuizWidget />
        </div>
      </section>

      {/* TikTok CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-hover)]/5 border-y border-[var(--color-border)] z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaTiktok className="w-10 h-10 text-[var(--color-accent)]" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold">
                {t('home.tiktok.title')}
              </h2>
            </div>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
              {t('home.tiktok.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/tiktok"
                className="btn-primary flex items-center gap-2"
                data-testid="tiktok-gallery-btn"
              >
                <FaTiktok className="w-5 h-5" />
                {t('home.tiktok.viewVideos')}
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://www.tiktok.com/@movalina.study"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
                data-testid="follow-tiktok-btn"
              >
                {t('home.tiktok.follow')}
                <FiArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
