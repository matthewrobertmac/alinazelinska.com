import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { contactInfo, meta } from '../data/content';

const Contact = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = `Contact | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      icon: <FiMail className="w-8 h-8" />,
      title: t('contact.emailCard.label'),
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      description: t('contact.emailCard.hint'),
    },
    {
      icon: <FiLinkedin className="w-8 h-8" />,
      title: t('contact.linkedinCard.label'),
      value: 'Connect with me',
      link: contactInfo.linkedin,
      description: t('contact.linkedinCard.hint'),
    },
    {
      icon: <FiInstagram className="w-8 h-8" />,
      title: t('contact.instagramCard.label'),
      value: '@alin.a.zelinska',
      link: contactInfo.instagram,
      description: t('contact.instagramCard.hint'),
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
              {t('contact.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t('contact.subtitle')}
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
              {t('contact.whatToExpect.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                  {t('contact.whatToExpect.languageLessons.icon')} {t('contact.whatToExpect.languageLessons.title')}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {t('contact.whatToExpect.languageLessons.description')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                  {t('contact.whatToExpect.translation.icon')} {t('contact.whatToExpect.translation.title')}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {t('contact.whatToExpect.translation.description')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                  {t('contact.whatToExpect.creativeWriting.icon')} {t('contact.whatToExpect.creativeWriting.title')}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {t('contact.whatToExpect.creativeWriting.description')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-accent)] mb-3">
                  {t('contact.whatToExpect.consulting.icon')} {t('contact.whatToExpect.consulting.title')}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {t('contact.whatToExpect.consulting.description')}
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
              {t('contact.bottomCta')}
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              data-testid="email-cta-btn"
              className="btn-primary inline-block"
            >
              {t('contact.send')} →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
