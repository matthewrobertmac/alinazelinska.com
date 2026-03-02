import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { contactInfo, meta } from '../data/content';

const Contact = () => {
  useEffect(() => {
    document.title = `Contact | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      icon: <FiMail className="w-8 h-8" />,
      title: 'Email',
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      description: 'Send me an email',
    },
    {
      icon: <FiLinkedin className="w-8 h-8" />,
      title: 'LinkedIn',
      value: 'Connect with me',
      link: contactInfo.linkedin,
      description: 'Professional network',
    },
    {
      icon: <FiInstagram className="w-8 h-8" />,
      title: 'Instagram',
      value: '@alin.a.zelinska',
      link: contactInfo.instagram,
      description: 'Follow my journey',
    },
  ];

  return (
    <div className="page-transition pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1
              className="text-5xl md:text-6xl font-serif font-bold mb-6"
              data-testid="contact-title"
            >
              Let's Connect
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Whether you're interested in language lessons, poetry translation, creative writing,
              or just want to say hello, I'd love to hear from you!
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover-lift text-center p-8 block no-underline"
                data-testid={`contact-method-${index}`}
              >
                <div className="text-[var(--color-accent)] mb-4 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">
                  {method.title}
                </h3>
                <p className="text-[var(--color-text)] mb-2 break-words">
                  {method.value}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {method.description}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-8 md:p-12 text-center bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg)]"
          >
            <h2 className="text-3xl font-serif font-bold mb-6">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                  📚 Language Lessons
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Personalized tutoring in Ukrainian, Russian, and English. Interactive
                  and engaging lessons tailored to your learning style and goals.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                  📝 Translation Services
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Specialized in poetry translation with a deep understanding of linguistic
                  nuances and cultural context.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                  ✨ Creative Writing
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  From social media content to creative projects, I bring words to life
                  with passion and expertise.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                  💻 Consulting
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Available for language learning app consulting and educational
                  technology projects.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-[var(--color-text-secondary)] mb-6">
              Ready to start your language learning journey or collaborate on a project?
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              data-testid="email-cta-btn"
              className="btn-primary inline-block"
            >
              Send me an email
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
