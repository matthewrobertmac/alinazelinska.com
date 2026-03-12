import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUsers, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { meta } from '../../data/content';

const SpeakingClub = () => {
  useEffect(() => {
    document.title = `Ukrainian Speaking Club | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const clubFeatures = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Small Groups',
      description: '3-4 students max — small enough to get real speaking time, big enough for dynamic conversation',
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: '60 Minutes',
      description: 'Full hour of guided conversation practice with themed topics and real-time corrections',
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: 'Just $12',
      description: 'Affordable group practice to supplement your 1-on-1 lessons or practice independently',
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: 'Themed Sessions',
      description: 'Each session has a topic: holidays, travel, food, current events — always something interesting to talk about',
    },
  ];

  const pastThemes = [
    { title: '🎄 Christmas Edition', description: 'Holiday vocabulary, traditions, and festive conversations' },
    { title: '🎉 New Year\'s Resolutions', description: 'Goals, aspirations, and future tense practice' },
    { title: '✈️ Travel & Adventure', description: 'Vacation stories, travel vocabulary, and future trip planning' },
    { title: '🍽️ Food & Cooking', description: 'Recipes, restaurants, and culinary conversations' },
  ];

  return (
    <div className="page-transition pt-24 pb-16">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-6">
              🗣️ Group Conversation Practice
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Ukrainian Speaking Club 🇺🇦
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-4">
              Small group conversation practice for Ukrainian learners
            </p>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Practice speaking Ukrainian in a relaxed, supportive environment with other learners at your level. Themed topics, real conversations, and friendly corrections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover-lift"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Themes */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-12"
          >
            Past Session Themes
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pastThemes.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="text-xl font-serif font-bold mb-2 text-[var(--color-accent)]">
                  {theme.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {theme.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card p-8 md:p-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              Who Should Join?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✅</span>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong>Intermediate learners</strong> who want more speaking practice between 1-on-1 lessons
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✅</span>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong>Advanced students</strong> looking to maintain fluency and learn from other learners
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✅</span>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong>Anyone who loves Ukrainian</strong> and wants a supportive community to practice with
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] mt-6 text-center italic">
              Note: The Speaking Club is best for students with at least basic Ukrainian (A2 level or higher). Complete beginners should start with 1-on-1 lessons first.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card p-8 md:p-12 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Interested in Joining? 🎉
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              I announce upcoming Speaking Club sessions on Instagram! Follow me there for dates, times, and sign-up links — or message me directly to get on the list.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/alin.a.zelinska/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Follow on Instagram for Updates
                <FiArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/contact"
                className="btn-outline inline-flex items-center gap-2"
              >
                Ask About Next Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpeakingClub;
