import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { meta, testimonials } from '../../data/content';

const RussianLessons = () => {
  useEffect(() => {
    document.title = `Russian Lessons | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const russianTestimonials = testimonials.filter(t => 
    t.lessons.toLowerCase().includes('russian')
  );

  const learnerTypes = [
    {
      icon: '🌱',
      title: 'Complete Beginners',
      description: 'Never studied Russian before? Let\'s start from the beginning. We\'ll tackle the Cyrillic alphabet, master pronunciation, and build your foundation with practical, usable Russian from day one.',
    },
    {
      icon: '🎯',
      title: 'Intermediate Learners',
      description: 'Already know the basics but stuck in the intermediate plateau? I\'ll help you break through. We\'ll work on complex grammar, natural conversation, idioms, and the cultural context that makes Russian come alive.',
    },
    {
      icon: '💼',
      title: 'Business Russian',
      description: 'Need Russian for professional purposes? I\'ll teach you business vocabulary, formal register, email etiquette, and the language skills you need for meetings, presentations, and professional relationships.',
    },
    {
      icon: '📚',
      title: 'Literature & Culture',
      description: 'Want to read Pushkin, Dostoevsky, or Akhmatova in the original? I\'ll help you develop the literary Russian skills to appreciate Russian literature and poetry as it was meant to be read.',
    },
  ];

  const whatYoullLearn = [
    'Pronunciation guides from a native speaker',
    'Grammar that actually makes sense (I promise)',
    'Real conversational Russian (not textbook Russian)',
    'Russian idioms, slang, and expressions',
    'Cultural context and etiquette',
    'Reading and writing in Cyrillic',
    'Vocabulary for your specific goals',
    'Common mistakes English speakers make (and how to fix them)',
  ];

  const faq = [
    {
      q: 'Is Russian harder than Ukrainian?',
      a: 'They\'re about the same difficulty level for English speakers. Russian has 6 cases (vs Ukrainian\'s 7), but Russian has some pronunciation challenges that Ukrainian doesn\'t have. Both are beautiful, both are worth learning, and both become approachable with the right teacher.',
    },
    {
      q: 'What\'s different about learning from a native speaker?',
      a: 'I don\'t just know the textbook version - I know how people actually speak. I can teach you the idioms, the slang, the cultural references, and the subtle differences between formal and casual speech that only native speakers truly understand. Plus, my pronunciation is authentic, not learned.',
    },
    {
      q: 'Will I understand Russian speakers after your lessons?',
      a: 'Absolutely. I teach real, practical Russian - not just grammar exercises. We\'ll work on listening comprehension, watch videos, listen to music, and practice understanding different accents and speaking speeds. Most students can understand basic conversations within 20-30 lessons.',
    },
  ];

  return (
    <div className="page-transition pt-24 pb-16">
      <SEOHead
        title="Russian Language Lessons | Native Speaker | Alina Zelinska | 5.0★"
        description="Learn Russian online with a native speaker. 500+ students, 3,500+ lessons, perfect 5.0 rating. From beginner to advanced, personalized 1-on-1 Russian lessons."
        keywords="Russian lessons, learn Russian online, Russian tutor, native Russian teacher, Russian language course"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            russianCourseSchema,
            breadcrumbSchema([
              { name: 'Home', url: 'https://alinazelinska.com' },
              { name: 'Services', url: 'https://alinazelinska.com/special-projects' },
              { name: 'Russian Lessons', url: 'https://alinazelinska.com/services/russian-lessons' }
            ])
          ]
        }}
      />
      
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-6">
              🇷🇺 Russian Language Lessons
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Learn Russian from a Native Speaker
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-4">
              500+ Students | 3,500+ Lessons Delivered | Perfect 5.0 Rating
            </p>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Master Russian with personalised lessons from someone who grew up speaking it — and knows exactly what makes it click for English speakers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/booking" className="btn-primary inline-flex items-center gap-2">
              Book a Trial Lesson
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              Ask Me Anything
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
          >
            Who This Is For
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnerTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 hover-lift"
              >
                <div className="text-5xl mb-4">{type.icon}</div>
                <h3 className="text-2xl font-serif font-bold mb-3">
                  {type.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
          >
            What You'll Learn
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whatYoullLearn.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 card p-4"
              >
                <FiCheck className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-[var(--color-text-secondary)]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
          >
            What Russian Students Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {russianTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  {testimonial.img && (
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{testimonial.lessons}</p>
                  </div>
                </div>
                <p className="text-[var(--color-text-secondary)] italic text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-12"
          >
            Russian Learning FAQ
          </motion.h2>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Master Russian? 🇷🇺
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Join 500+ students learning with a native speaker who makes Russian actually make sense.
            </p>
            <Link
              to="/booking"
              className="btn-primary inline-flex items-center gap-2"
            >
              Book Your Trial Lesson
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RussianLessons;
