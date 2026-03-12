import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { meta, testimonials } from '../../data/content';

const UkrainianLessons = () => {
  useEffect(() => {
    document.title = `Ukrainian Lessons | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  // Filter Ukrainian testimonials
  const ukrainianTestimonials = testimonials.filter(t => 
    t.lessons.toLowerCase().includes('ukrainian')
  );

  const learnerTypes = [
    {
      icon: '🌱',
      title: 'Complete Beginners',
      description: 'Starting from zero? Perfect! We\'ll begin with the Cyrillic alphabet, basic pronunciation, and essential phrases. Most students can introduce themselves and have simple conversations within 5-10 lessons.',
    },
    {
      icon: '🏠',
      title: 'Heritage Speakers',
      description: 'Grew up hearing Ukrainian at home? I\'ll help you turn that passive understanding into active fluency. We\'ll formalize your grammar, expand your vocabulary, and build your confidence in speaking and writing.',
    },
    {
      icon: '🚀',
      title: 'Intermediate Learners',
      description: 'Already know the basics? Let\'s take you to the next level. We\'ll work on complex grammar, natural conversation, idioms, and cultural nuances that textbooks don\'t teach.',
    },
    {
      icon: '💼',
      title: 'Professionals',
      description: 'Need Ukrainian for work or relocation? I\'ll teach you professional vocabulary, business etiquette, email writing, and the practical language you\'ll actually use in real situations.',
    },
  ];

  const whatYoullLearn = [
    'Conversation skills from day one (not just memorization)',
    'Grammar explained naturally through real examples',
    'Ukrainian culture, history, and context',
    'Reading and writing in Cyrillic script',
    'Pronunciation coaching for authentic accent',
    'Vocabulary tailored to YOUR life and interests',
    'Common mistakes Ukrainian learners make (and how to avoid them)',
    'Comparisons with Russian (if you\'re learning both)',
  ];

  const faq = [
    {
      q: 'How hard is Ukrainian to learn?',
      a: 'For English speakers, Ukrainian is considered moderately difficult. The Cyrillic alphabet takes a few lessons to master, and the case system (7 cases!) can be challenging. But here\'s the good news: Ukrainian pronunciation is very consistent, the grammar follows logical patterns, and the language is beautiful to speak. With the right approach, you\'ll be surprised how quickly it clicks.',
    },
    {
      q: 'Do I need to learn Cyrillic first?',
      a: 'We learn it together from the start! I don\'t believe in spending weeks just on the alphabet. We learn Cyrillic while learning real words and phrases, so you\'re actually communicating from lesson one. Most students can read basic Cyrillic within 3-5 lessons.',
    },
    {
      q: 'Is Ukrainian similar to Russian?',
      a: 'Yes and no. They share the Cyrillic alphabet and some vocabulary (they\'re both Slavic languages), but they\'re distinct. Ukrainian has softer pronunciation, different grammar patterns, and unique vocabulary. If you speak Russian, learning Ukrainian is easier - but they\'re not mutually intelligible. Think Spanish and Portuguese.',
    },
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
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              🇺🇦 Ukrainian Language Lessons
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Learn Ukrainian with a Native Speaker
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-4">
              500+ Students | 3,500+ Lessons Delivered | Perfect 5.0 Rating
            </p>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              One-on-one Ukrainian lessons designed around you, taught by a native speaker who makes grammar actually enjoyable.
            </p>
          </motion.div>

          {/* CTA Buttons */}
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

      {/* Student Testimonials */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
          >
            What Ukrainian Students Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ukrainianTestimonials.slice(0, 6).map((testimonial, index) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/testimonials" className="btn-outline inline-flex items-center gap-2">
              Read All Testimonials
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
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
            Ukrainian Learning FAQ
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
              Ready to Start Learning Ukrainian? 🌻
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Join 500+ students who've discovered that Ukrainian can be approachable, engaging, and genuinely fun to learn.
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

export default UkrainianLessons;
