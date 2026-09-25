import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { meta, testimonials } from '../../data/content';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import { russianCourseSchema, breadcrumbSchema } from '../../utils/schemas';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

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
    <div className="svc-page page-transition">
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

      <PageHero
        crumbs={[{ name: 'Services', url: '/special-projects' }, { name: 'Russian Lessons' }]}
        eyebrow="Russian language lessons"
        uk="Слово"
        title={
          <>
            Learn Russian from a <em>native speaker.</em>
          </>
        }
        lede="Master Russian with personalised lessons from someone who grew up speaking it — and knows exactly what makes it click for English speakers."
        aside={
          <div className="svc-ledger">
            <span className="svc-ledger__label">1-on-1 · online · all levels</span>
            <dl>
              <div>
                <dt>500+</dt>
                <dd>Students</dd>
              </div>
              <div>
                <dt>3,500+</dt>
                <dd>Lessons delivered</dd>
              </div>
              <div>
                <dt>
                  <em>5.0</em>
                </dt>
                <dd>Perfect rating</dd>
              </div>
            </dl>
          </div>
        }
      >
        <div className="svc-actions">
          <Link to="/booking" className="btn-primary">
            Book a Trial Lesson <FiArrowRight />
          </Link>
          <Link to="/contact" className="btn-outline">
            Ask Me Anything
          </Link>
        </div>
      </PageHero>

      {/* ─── Who this is for ──────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head section-head--split">
            <div>
              <p className="eyebrow">Who it’s for</p>
              <h2>
                Who this is <em className="display-italic">for.</em>
              </h2>
            </div>
            <p>From the Cyrillic alphabet to Pushkin in the original — lessons start wherever you are.</p>
          </motion.header>

          <div className="svc-cards">
            {learnerTypes.map((type, index) => (
              <motion.article key={type.title} className="svc-card" {...stagger(index)}>
                <span className="num">{ROMAN[index]}</span>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What you'll learn ────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">Inside the lessons</p>
              <h2>
                What you’ll <em className="display-italic">learn.</em>
              </h2>
            </motion.header>

            <ol className="svc-checks">
              {whatYoullLearn.map((item, index) => (
                <motion.li key={item} {...stagger(index % 4)}>
                  <span className="num">{pad(index)}</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Student testimonials ─────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">In their words</p>
            <h2>
              What Russian students <em className="display-italic">say.</em>
            </h2>
          </motion.header>

          <div className="svc-quotes">
            {russianTestimonials.map((testimonial, index) => (
              <motion.figure key={testimonial.name + index} className="svc-quote" {...stagger(index % 3)}>
                <blockquote>{testimonial.text}</blockquote>
                <figcaption>
                  {testimonial.img && <img src={testimonial.img} alt={testimonial.name} />}
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.lessons}</span>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">Good questions</p>
            <h2>
              Russian learning <em className="display-italic">FAQ.</em>
            </h2>
          </motion.header>

          <ol className="rule-list svc-faq">
            {faq.map((item, index) => (
              <motion.li key={item.q} {...stagger(index)}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="ru">
            Начнём?
          </p>
          <h2>
            Ready to master <em className="display-italic">Russian?</em>
          </h2>
          <p className="closing__sub">
            Join 500+ students learning with a native speaker who makes Russian actually make sense.
          </p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              Book Your Trial Lesson <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default RussianLessons;
