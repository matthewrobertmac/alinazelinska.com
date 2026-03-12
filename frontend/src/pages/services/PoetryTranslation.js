import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { meta } from '../../data/content';
import Breadcrumb from '../../components/Breadcrumb';
import SEOHead from '../../components/SEOHead';
import { breadcrumbSchema } from '../../utils/schemas';

const PoetryTranslation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { name: 'Services', url: '/special-projects' },
    { name: 'Poetry Translation' }
  ];

  const languagePairs = [
    { from: 'Ukrainian', to: 'English', icon: '🇺🇦 → 🇬🇧' },
    { from: 'Russian', to: 'English', icon: '🇷🇺 → 🇬🇧' },
    { from: 'English', to: 'Ukrainian', icon: '🇬🇧 → 🇺🇦' },
    { from: 'English', to: 'Russian', icon: '🇬🇧 → 🇷🇺' },
  ];

  const process = [
    { step: '1', title: 'Initial Read & Analysis', description: 'I read your poem multiple times, understanding not just the words but the emotion, rhythm, and deeper meaning.' },
    { step: '2', title: 'First Draft', description: 'I translate the content while maintaining the poetic structure, meter, and emotional core.' },
    { step: '3', title: 'Rhythm Matching', description: 'I refine the translation to match the original\'s rhythm, flow, and musicality — this is where poetry translation becomes an art.' },
    { step: '4', title: 'Cultural Adaptation', description: 'I adapt cultural references and metaphors so they resonate in the target language without losing authenticity.' },
    { step: '5', title: 'Final Polish', description: 'Multiple revisions until the translated poem gives the same chills as the original.' },
  ];

  const whatITranslate = [
    'Personal poetry collections',
    'Literary works for publication',
    'Song lyrics with emotional depth',
    'Romantic poems and love letters',
    'Cultural and historical poetry',
    'Modern experimental poetry',
    'Children\'s poetry and rhymes',
    'Memorial and tribute poems',
  ];

  return (
    <div className="page-transition pt-24 pb-16">
      <SEOHead
        title="Poetry Translation Services | Ukrainian, Russian, English | Alina Zelinska"
        description="Professional poetry translation between Ukrainian, Russian, and English. I don\'t just translate words — I carry the feeling, rhythm, and soul of your poem across languages."
        keywords="poetry translation, Ukrainian poetry translation, Russian poetry translation, literary translation, poem translator"
        schema={breadcrumbSchema([
          { name: 'Home', url: 'https://alinazelinska.com' },
          { name: 'Services', url: 'https://alinazelinska.com/special-projects' },
          { name: 'Poetry Translation', url: 'https://alinazelinska.com/services/poetry-translation' }
        ])}
      />

      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-6">
              🌙 Poetry Translation
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Poetry Translation Services
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-4">
              Ukrainian ↔ Russian ↔ English
            </p>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              I don\'t just translate words — I carry the feeling, the rhythm, and the soul of your poem across languages. Because a poem that doesn\'t move you isn\'t a poem anymore.
            </p>
          </motion.div>
        </div>
      </section>

      {/* My Philosophy */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card p-8 md:p-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              My Translation Philosophy
            </h2>
            <div className="space-y-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                Poetry translation is sacred work. When someone trusts you with their poem, they\'re trusting you with a piece of their soul. The words they chose, the rhythm they crafted, the emotions they poured in — all of it matters.
              </p>
              <p>
                I don\'t believe in literal translations. A word-for-word conversion kills the poetry. Instead, I ask: What is this poem trying to make you *feel*? What images does it paint? What music does it carry? Then I recreate that experience in the target language.
              </p>
              <p>
                Sometimes that means changing a metaphor, adjusting a rhythm, or finding a phrase that doesn\'t literally translate but *feels* right. Because at the end of the day, a translated poem should still give you chills.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Language Pairs */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-12"
          >
            Languages I Work In
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {languagePairs.map((pair, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover-lift"
              >
                <div className="text-4xl mb-3">{pair.icon}</div>
                <p className="text-lg font-semibold">
                  {pair.from} to {pair.to}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Translation Process */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-12"
          >
            My Translation Process
          </motion.h2>

          <div className="space-y-6">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 flex items-start gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Translate */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-12"
          >
            What I Translate
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whatITranslate.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 card p-4"
              >
                <FiCheck className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-[var(--color-text-secondary)]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card p-8 md:p-12 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Have a Poem That Needs Translating? 🌙
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Whether it\'s a personal collection, a literary work for publication, or a single poem close to your heart — I\'ll treat it with the care and artistry it deserves.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Let\'s Talk About Your Project
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PoetryTranslation;
