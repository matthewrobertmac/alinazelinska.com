import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { meta, testimonials } from '../../data/content';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import { ukrainianCourseSchema, breadcrumbSchema } from '../../utils/schemas';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

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
    <div className="svc-page page-transition">
      <SEOHead
        title="Ukrainian Language Lessons | Native Speaker | Alina Zelinska | 5.0★"
        description="Learn Ukrainian online with Alina, a native speaker from Ukraine. 500+ students, 3,500+ lessons, perfect 5.0 rating. Beginner to advanced, personalized 1-on-1 lessons."
        keywords="Ukrainian lessons, learn Ukrainian online, Ukrainian tutor, native Ukrainian teacher, Ukrainian language course"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            ukrainianCourseSchema,
            breadcrumbSchema([
              { name: 'Home', url: 'https://alinazelinska.com' },
              { name: 'Services', url: 'https://alinazelinska.com/special-projects' },
              { name: 'Ukrainian Lessons', url: 'https://alinazelinska.com/services/ukrainian-lessons' }
            ])
          ]
        }}
      />

      <PageHero
        crumbs={[{ name: 'Services', url: '/special-projects' }, { name: 'Ukrainian Lessons' }]}
        eyebrow="Ukrainian language lessons"
        uk="Мова"
        title={
          <>
            Learn Ukrainian with a <em>native speaker.</em>
          </>
        }
        lede="One-on-one Ukrainian lessons designed around you, taught by a native speaker who makes grammar actually enjoyable."
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
            <p>From your very first Cyrillic letter to the vocabulary of your working day — lessons start wherever you are.</p>
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
              What Ukrainian students <em className="display-italic">say.</em>
            </h2>
          </motion.header>

          <div className="svc-quotes svc-quotes--three">
            {ukrainianTestimonials.slice(0, 6).map((testimonial, index) => (
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

          <motion.div {...reveal} className="svc-more">
            <Link to="/testimonials" className="btn-outline">
              Read All Testimonials <FiArrowUpRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">Good questions</p>
            <h2>
              Ukrainian learning <em className="display-italic">FAQ.</em>
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
          <p className="closing__uk" lang="uk">
            Почнімо?
          </p>
          <h2>
            Ready to start learning <em className="display-italic">Ukrainian?</em>
          </h2>
          <p className="closing__sub">
            Join 500+ students who've discovered that Ukrainian can be approachable, engaging, and genuinely fun to learn.
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

export default UkrainianLessons;
