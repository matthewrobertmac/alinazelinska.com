import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { meta } from '../../data/content';
import Breadcrumb from '../../components/Breadcrumb';
import SEOHead from '../../components/SEOHead';
import { breadcrumbSchema } from '../../utils/schemas';

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
    <div className="page-transition pt-24 pb-16">
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

      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-6">
              ✨ Creative Writing & Ghostwriting
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Words That Stick, Stories That Sparkle
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              From brand copy to original poetry, from social media captions to song lyrics — if it involves words, I\'m genuinely in. I write in three languages and bring a multilingual ear to everything I create.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What I Write */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-12"
          >
            What I Write
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover-lift"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-3 text-[var(--color-accent)]">
                  {service.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* My Style */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold text-center mb-12"
          >
            My Writing Style
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {style.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 card p-4"
              >
                <span className="text-[var(--color-accent)] text-xl flex-shrink-0">✓</span>
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
              Let\'s Create Something Beautiful ✨
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Whether you need a single piece or ongoing content creation, I\'d love to hear about your project. Let\'s make something that actually sounds like you.
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

export default CreativeWriting;
