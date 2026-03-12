import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiMusic, FiSmartphone, FiCheck } from 'react-icons/fi';
import { meta } from '../data/content';

const SpecialProjects = () => {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    document.title = `Special Projects | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'all', label: 'All Projects', icon: '✨' },
    { id: 'books', label: '📚 Book Translation', icon: '📚' },
    { id: 'music', label: '🎵 Music', icon: '🎵' },
    { id: 'apps', label: '🚀 App Consulting', icon: '🚀' },
  ];

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
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Special Projects & Collaborations ✨
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Beyond the classroom — where language meets creativity, strategy, and impact.
            </p>
            <p className="text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-4">
              Teaching is my heart, but these projects are where I get to stretch creatively. From translating books that matter, to writing songs that move people, to helping tech teams build apps that actually teach effectively — this is where language becomes something bigger.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-accent)] text-white shadow-lg'
                    : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-accent)]/10 border-2 border-[var(--color-border)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Book Translation Section */}
      {(activeTab === 'all' || activeTab === 'books') && (
        <section className="section-padding bg-[var(--color-bg)]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
                Book Translation Projects 📚
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto text-center">
                Translation isn't just swapping words between languages — it's carrying meaning, tone, and soul across borders. I specialize in high-stakes, culturally significant work where accuracy and artistry both matter.
              </p>
            </motion.div>

            {/* Featured Book Project */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8 md:p-12 mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Book Cover */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg blur-xl opacity-20"></div>
                    <img
                      src="https://via.placeholder.com/300x450/3B82F6/FFFFFF?text=Management+in+Times+of+War"
                      alt="Management in Times of War Book Cover"
                      className="relative rounded-lg shadow-2xl w-full max-w-xs"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
                      Featured Translation
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-2">
                      Management in Times of War
                    </h3>
                    <p className="text-[var(--color-text-secondary)] italic mb-4">
                      Менеджмент у воєнний час
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm mb-6">
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">Translation:</span> Ukrainian → English
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">Status:</span> Published
                      </span>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      This wasn't just a translation project — it was a responsibility. "Management in Times of War" offers critical insights for leaders navigating crisis, and I wanted to make sure every strategic concept, every cultural nuance, and every ounce of urgency carried over into English.
                    </p>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      Working on this book reminded me why translation matters: words have power, especially in times that demand clarity and action.
                    </p>
                  </div>

                  <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6">
                    <h4 className="font-bold mb-3">Why This Project Mattered:</h4>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      In times of global uncertainty, Ukrainian voices deserve to be heard beyond language barriers. This translation ensures that leaders, educators, and change-makers worldwide can learn from Ukraine's resilience and strategic thinking.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Preserved technical terminology</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Cultural context adaptation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Author collaboration</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Authentic voice preservation</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Other Translation Work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <h4 className="text-xl font-serif font-bold mb-4">Other Translation Work:</h4>
              <ul className="space-y-2 text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent)]">•</span>
                  <span>Poetry collections (Ukrainian ↔ English ↔ Russian)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent)]">•</span>
                  <span>Cultural essays and articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent)]">•</span>
                  <span>Literary projects with emotional depth</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Have a manuscript that needs a translator who cares?
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Music & Songwriting Section */}
      {(activeTab === 'all' || activeTab === 'music') && (
        <section className="section-padding bg-[var(--color-bg-secondary)]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
                Songwriting & Music Creation 🎵
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto text-center">
                Words set to music hit differently. I write songs that feel like poetry, conversations, and confessions all at once — in Ukrainian, Russian, or English.
              </p>
            </motion.div>

            {/* What I Create Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: 'Original Songs',
                  description: 'From folk-inspired ballads to modern pop sensibilities, I write lyrics that tell stories. Whether it\'s heartbreak, hope, or the complicated beauty of identity, I\'m here for it.',
                  icon: '✍️',
                },
                {
                  title: 'Multilingual Lyrics',
                  description: 'Code-switching between languages isn\'t just trendy — it\'s how many of us actually live. I write songs that embrace that fluidity.',
                  icon: '🌍',
                },
                {
                  title: 'Translation & Adaptation',
                  description: 'Already have a song but need it in another language? I don\'t just translate — I adapt. The rhyme, the rhythm, the emotional punch — it all carries over.',
                  icon: '🔄',
                },
                {
                  title: 'Collaboration',
                  description: 'I work with independent artists, bands, and producers who want lyrics with substance. You bring the sound, I\'ll bring the words.',
                  icon: '🤝',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 hover-lift"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-[var(--color-accent)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Sample Lyric */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8 md:p-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-center"
            >
              <h4 className="text-2xl font-serif font-bold mb-6">Sample Lyric Excerpt</h4>
              <div className="max-w-2xl mx-auto space-y-4 text-lg">
                <p className="font-serif italic text-[var(--color-accent)] text-2xl">
                  Між зорями і снами
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  (Between the stars and dreams)
                </p>
                <p className="font-serif italic text-[var(--color-accent)] text-2xl">
                  Я знайшла себе
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  (I found myself)
                </p>
                <p className="font-serif italic text-[var(--color-accent)] text-2xl">
                  У словах, що ти мені шептав
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  (In the words you whispered to me)
                </p>
              </div>
            </motion.div>

            {/* Music CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Let's create your next song
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Language Learning App Consulting Section */}
      {(activeTab === 'all' || activeTab === 'apps') && (
        <section className="section-padding bg-[var(--color-bg)]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
                Language Learning App Consulting 🚀
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto text-center">
                Building an app? Great. Building an app that actually <em>teaches</em>? That's where I come in.
              </p>
            </motion.div>

            {/* The Problem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8 mb-12 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent border-l-4 border-[var(--color-accent)]"
            >
              <h3 className="text-2xl font-serif font-bold mb-4">The Problem Most Apps Have:</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                Here's the thing: most language apps are built by brilliant developers and designers who've never stood in front of a confused beginner trying to understand cases. They're technically impressive but pedagogically... questionable.
              </p>
              <p className="text-[var(--color-text)] font-semibold">
                You don't need another feature. You need someone who knows how humans actually learn.
              </p>
            </motion.div>

            {/* What Makes Me Different */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-2xl font-serif font-bold mb-6 text-center">What Makes Me Different:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: '👩‍🏫',
                    text: "I'm a real educator - 300+ students, 3+ years, thousands of hours in actual lessons",
                  },
                  {
                    icon: '✅',
                    text: "I know what works - Not theory. Not trends. Real results from real people.",
                  },
                  {
                    icon: '💻',
                    text: "I understand tech - I can speak both 'developer' and 'educator' fluently",
                  },
                  {
                    icon: '🤖',
                    text: "I've seen AI fail - And I know how to make it better",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 card p-4">
                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                    <p className="text-[var(--color-text-secondary)]">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: <FiBook className="w-8 h-8" />,
                  title: 'App Audits & UX Review 🔍',
                  description: "I'll use your app like a student would and tell you what's confusing, what's brilliant, and where the learning design falls apart.",
                  deliverable: 'Detailed report with prioritized recommendations',
                  color: 'from-teal-400 to-cyan-500',
                },
                {
                  icon: <FiBook className="w-8 h-8" />,
                  title: 'Curriculum & Content Development 📝',
                  description: "You focus on the tech. I'll build the learning experience: lesson progression, vocabulary selection, grammar explanations, exercises, and cultural context.",
                  deliverable: 'Complete learning curriculum, ready to implement',
                  color: 'from-blue-400 to-indigo-500',
                },
                {
                  icon: <FiSmartphone className="w-8 h-8" />,
                  title: 'AI Model Training & Evaluation 🤖',
                  description: "Using AI for conversation practice, grammar correction, or adaptive learning? I'll help you make it pedagogically sound, not just technically impressive.",
                  deliverable: 'Training data, evaluation criteria, prompt engineering',
                  color: 'from-purple-400 to-pink-500',
                },
                {
                  icon: <FiSmartphone className="w-8 h-8" />,
                  title: 'Strategic Consulting 💡',
                  description: "Feature prioritization, monetization strategies, retention tactics, and localization strategy — all aligned with actual educational outcomes.",
                  deliverable: 'Strategic roadmap with actionable steps',
                  color: 'from-rose-400 to-pink-500',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-8 hover-lift"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 text-white`}>
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-serif font-bold mb-3">
                    {service.title}
                  </h4>
                  <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="text-sm">
                    <span className="font-semibold">Deliverable:</span>
                    <span className="text-[var(--color-text-secondary)]"> {service.deliverable}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ideal Clients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8 mb-12"
            >
              <h3 className="text-2xl font-serif font-bold mb-6 text-center">Ideal Clients:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  '🚀 Startups building language learning apps',
                  '🤖 AI companies developing conversational agents',
                  '📱 Existing apps improving learning outcomes',
                  '🏢 Corporate teams creating training tools',
                  '🎓 EdTech platforms expanding into new languages',
                  '🌍 Localization agencies needing subject matter experts',
                ].map((client, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0">{client.split(' ')[0]}</span>
                    <span className="text-[var(--color-text-secondary)]">
                      {client.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why Ukrainian/Russian Apps Need Me */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8 md:p-12 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent"
            >
              <h3 className="text-2xl font-serif font-bold mb-4">
                Why Ukrainian/Russian Apps Need Me Specifically:
              </h3>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed italic">
                "Slavic languages are <strong>hard</strong> for English speakers. Cases, aspects, gendered nouns — it's a lot. Most apps either oversimplify (useless) or overwhelm (discouraging). I know how to find the middle ground because I've walked hundreds of students through it. If you're building a Ukrainian or Russian learning app, I'm not just helpful — I'm essential."
              </p>
            </motion.div>

            {/* App Consulting CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Building a language app? Let's make it actually work
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
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
              Ready to Collaborate? 🌟
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Whether it's a book that needs translating, a song that needs writing, or an app that needs an educator's touch — let's create something meaningful together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Get In Touch
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:zelinskayaalinaig@gmail.com"
                className="btn-outline inline-flex items-center gap-2"
              >
                Email Me Directly
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpecialProjects;
