import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import { breadcrumbSchema } from '../../utils/schemas';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');

// Philosophy copy uses *word* for emphasis
const emphasise = (text) =>
  text.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

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

  const philosophy = [
    'Poetry translation is sacred work. When someone trusts you with their poem, they’re trusting you with a piece of their soul. The words they chose, the rhythm they crafted, the emotions they poured in — all of it matters.',
    'I don’t believe in literal translations. A word-for-word conversion kills the poetry. Instead, I ask: What is this poem trying to make you *feel*? What images does it paint? What music does it carry? Then I recreate that experience in the target language.',
    'Sometimes that means changing a metaphor, adjusting a rhythm, or finding a phrase that doesn’t literally translate but *feels* right. Because at the end of the day, a translated poem should still give you chills.',
  ];

  return (
    <div className="svc-page page-transition">
      <SEOHead
        title="Poetry Translation Services | Ukrainian, Russian, English | Alina Zelinska"
        description="Professional poetry translation between Ukrainian, Russian, and English. I don't just translate words — I carry the feeling, rhythm, and soul of your poem across languages."
        keywords="poetry translation, Ukrainian poetry translation, Russian poetry translation, literary translation, poem translator"
        schema={breadcrumbSchema([
          { name: 'Home', url: 'https://alinazelinska.com' },
          { name: 'Services', url: 'https://alinazelinska.com/special-projects' },
          { name: 'Poetry Translation', url: 'https://alinazelinska.com/services/poetry-translation' }
        ])}
      />

      <PageHero
        crumbs={breadcrumbItems}
        eyebrow="Poetry translation"
        uk="Вірш"
        title={
          <>
            Poetry translation <em>services.</em>
          </>
        }
        lede="I don’t just translate words — I carry the feeling, the rhythm, and the soul of your poem across languages. Because a poem that doesn’t move you isn’t a poem anymore."
      >
        <p className="svc-pairs-line">
          Ukrainian <span aria-hidden="true">↔</span> Russian <span aria-hidden="true">↔</span> English
        </p>
        <div className="svc-actions">
          <Link to="/contact" className="btn-primary">
            Let’s Talk About Your Project <FiArrowRight />
          </Link>
        </div>
      </PageHero>

      {/* ─── Philosophy ───────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">How I think about it</p>
              <h2>
                My translation <em className="display-italic">philosophy.</em>
              </h2>
            </motion.header>

            <motion.div {...reveal} className="prose-ink svc-prose">
              {philosophy.map((paragraph, index) => (
                <p key={index}>{emphasise(paragraph)}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Language pairs ───────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">Language pairs</p>
            <h2>
              Languages I <em className="display-italic">work in.</em>
            </h2>
          </motion.header>

          <ul className="svc-pairs">
            {languagePairs.map((pair, index) => (
              <motion.li key={`${pair.from}-${pair.to}`} {...stagger(index % 2)}>
                <span>{pair.from}</span>
                <span className="svc-pairs__arrow" aria-hidden="true">
                  <FiArrowRight />
                </span>
                <span className="sr-only">to</span>
                <span className="svc-pairs__to">{pair.to}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Process ──────────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">Step by step</p>
              <h2>
                My translation <em className="display-italic">process.</em>
              </h2>
            </motion.header>

            <ol className="rule-list svc-steps">
              {process.map((item, index) => (
                <motion.li key={item.step} {...stagger(index)}>
                  <span className="num">{pad(Number(item.step) - 1)}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── What I translate ─────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">Commissions</p>
            <h2>
              What I <em className="display-italic">translate.</em>
            </h2>
          </motion.header>

          <ol className="svc-checks svc-checks--cols">
            {whatITranslate.map((item, index) => (
              <motion.li key={item} {...stagger(index % 2)}>
                <span className="num">{pad(index)}</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Слово за словом.
          </p>
          <h2>
            Have a poem that needs <em className="display-italic">translating?</em>
          </h2>
          <p className="closing__sub">
            Whether it’s a personal collection, a literary work for publication, or a single poem close to your heart —
            I’ll treat it with the care and artistry it deserves.
          </p>
          <div className="closing__actions">
            <Link to="/contact" className="btn-primary">
              Let’s Talk About Your Project <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PoetryTranslation;
