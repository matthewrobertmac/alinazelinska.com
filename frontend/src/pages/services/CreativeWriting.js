import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import { breadcrumbSchema } from '../../utils/schemas';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const CreativeWriting = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { name: 'Services', url: '/special-projects' },
    { name: 'Creative Writing' }
  ];

  const services = [
    {
      icon: '📝',
      title: 'Brand Copy & Content',
      description: 'Website copy, about pages, service descriptions, taglines — words that make people stop scrolling and actually read. I write copy that sounds like a real human wrote it, because a real human did.',
    },
    {
      icon: '📱',
      title: 'Social Media Content',
      description: 'Captions, carousel posts, video scripts, and content that actually gets engagement. Whether you need educational content, brand storytelling, or just posts that don\'t sound robotic — I\'ve got you.',
    },
    {
      icon: '🎵',
      title: 'Song Lyrics',
      description: 'Original songs in Ukrainian, Russian, or English. From heartfelt ballads to catchy hooks, I write lyrics that tell stories and make people feel something.',
    },
    {
      icon: '🌿',
      title: 'Poetry & Literary Work',
      description: 'Original poetry, creative essays, literary pieces — writing that moves people. I write in three languages and love projects that let me stretch creatively.',
    },
    {
      icon: '✉️',
      title: 'Ghostwriting',
      description: 'Blog posts, articles, thought leadership pieces — I\'ll write in your voice, for your audience, with your message. You get the credit, I get the creative satisfaction.',
    },
    {
      icon: '🌐',
      title: 'Multilingual Projects',
      description: 'Need content in multiple languages? I can write or adapt copy across Ukrainian, Russian, English, Spanish, and German — maintaining brand voice across cultures.',
    },
  ];

  const style = [
    'Warm and conversational (like we\'re having coffee)',
    'Authentic and unpretentious (no corporate jargon)',
    'Culturally aware (I bring multilingual perspective)',
    'Story-driven (people remember stories, not facts)',
    'Emotionally resonant (words should make you feel something)',
    'Rhythmic and musical (even prose should have flow)',
  ];

  return (
    <div className="svc-page page-transition">
      <SEOHead
        title="Creative Writing & Ghostwriting Services | Alina Zelinska"
        description="Multilingual creative writer and ghostwriter. Brand copy, social media content, song lyrics, poetry — words that stick and stories that sparkle."
        keywords="creative writing, ghostwriter, multilingual copywriter, Ukrainian writer, brand storytelling"
        schema={breadcrumbSchema([
          { name: 'Home', url: 'https://alinazelinska.com' },
          { name: 'Services', url: 'https://alinazelinska.com/special-projects' },
          { name: 'Creative Writing', url: 'https://alinazelinska.com/services/creative-writing' }
        ])}
      />

      <PageHero
        crumbs={breadcrumbItems}
        eyebrow="Creative writing & ghostwriting"
        uk="Перо"
        title={
          <>
            Words that stick, stories that <em>sparkle.</em>
          </>
        }
        lede="From brand copy to original poetry, from social media captions to song lyrics — if it involves words, I’m genuinely in. I write in three languages and bring a multilingual ear to everything I create."
      >
        <div className="svc-actions">
          <Link to="/contact" className="btn-primary">
            Get In Touch <FiArrowRight />
          </Link>
          <a href="mailto:zelinskayaalinaig@gmail.com" className="btn-outline">
            Email Me Directly
          </a>
        </div>
      </PageHero>

      {/* ─── What I write ─────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">Commissions</p>
            <h2>
              What I <em className="display-italic">write.</em>
            </h2>
          </motion.header>

          <div className="svc-cards svc-cards--three">
            {services.map((service, index) => (
              <motion.article key={service.title} className="svc-card" {...stagger(index % 3)}>
                <span className="num">{ROMAN[index]}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── My style ─────────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">Voice</p>
              <h2>
                My writing <em className="display-italic">style.</em>
              </h2>
            </motion.header>

            <ol className="svc-checks">
              {style.map((item, index) => (
                <motion.li key={item} {...stagger(index % 3)}>
                  <span className="num">{pad(index)}</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Напишімо щось гарне.
          </p>
          <h2>
            Let’s create something <em className="display-italic">beautiful.</em>
          </h2>
          <p className="closing__sub">
            Whether you need a single piece or ongoing content creation, I’d love to hear about your project. Let’s make
            something that actually sounds like you.
          </p>
          <div className="closing__actions">
            <Link to="/contact" className="btn-primary">
              Get In Touch <FiArrowRight />
            </Link>
            <a href="mailto:zelinskayaalinaig@gmail.com" className="btn-outline">
              Email Me Directly <FiArrowUpRight />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CreativeWriting;
