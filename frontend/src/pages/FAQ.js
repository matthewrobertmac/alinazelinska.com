import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import { meta } from '../data/content';
import PageHero from '../components/PageHero';
import SEOHead from '../components/SEOHead';
import { generateFAQSchema } from '../utils/schemas';
import './faq.css';
import { ease, reveal } from '../utils/motion';

const stagger = (i) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease, delay: i * 0.05 },
});

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do lessons work?",
          a: "All lessons are conducted one-on-one via video call (Zoom or Google Meet). After booking, I'll send you a confirmation email with the meeting link and instructions. We'll meet at your scheduled time, and I'll guide you through an engaging, conversational lesson tailored to your goals."
        },
        {
          q: "What if I've never studied Ukrainian/Russian before?",
          a: "Perfect! I love working with complete beginners. We'll start exactly where you are — no pressure, no judgment. I'll make sure you feel comfortable and confident from day one. Many of my students started with zero experience and are now having real conversations!"
        },
        {
          q: "Do I need any materials or textbooks?",
          a: "Nope! I provide everything you need — lesson materials, exercises, and resources. All you need is a computer or tablet with internet, a notebook if you like taking handwritten notes, and a willingness to learn. I'll send you any digital materials before or after each lesson."
        },
        {
          q: "What platform do we use for lessons?",
          a: "I primarily use Zoom or Google Meet — whichever you're more comfortable with. Both are free, easy to use, and work great for interactive lessons. I'll send you the meeting link once we schedule your lesson."
        }
      ]
    },
    {
      category: "Scheduling & Booking",
      questions: [
        {
          q: "How do I schedule my first lesson?",
          a: "Don't pay just yet! First, send me a message on Instagram (@alin.a.zelinska) or email me at zelinskayaalinaig@gmail.com. We'll chat about your goals, find a time that works for both of us, and then you can complete your booking. This way, we make sure everything is perfectly coordinated!"
        },
        {
          q: "What if I need to reschedule?",
          a: "Life happens! Just let me know at least 24 hours in advance, and we'll find a new time that works for you. I'm pretty flexible and want to make sure you get the most out of every lesson."
        },
        {
          q: "What time zones do you work with?",
          a: "I work with students all over the world! I'm based in Sliema, Malta (CET/CEST) — but I teach students worldwide online, so your timezone is never a problem. I'm flexible with scheduling to accommodate different time zones. Just let me know where you are, and we'll figure it out."
        },
        {
          q: "Can I book a trial lesson first?",
          a: "Absolutely! The 30-minute trial lesson is perfect for first-time students. We'll get to know each other, I'll assess your current level, and we'll create a personalized plan. It's a no-pressure way to see if we're a good fit!"
        }
      ]
    },
    {
      category: "Lessons & Learning",
      questions: [
        {
          q: "What's your teaching methodology?",
          a: "I use a communicative approach — meaning we focus on real conversation from day one, not just memorising rules. Every lesson is built around your specific goals. If you're learning for travel, we practise travel scenarios. If you want to connect with family, we work on the phrases and topics that matter to you. I weave in grammar naturally through conversation, use authentic materials (songs, articles, social media posts), and always explain the cultural context behind the language. My students don't just learn words — they learn how to think in their target language."
        },
        {
          q: "What results can I expect?",
          a: "Every student is different, but here's a general guide: After 5-10 lessons, complete beginners can typically introduce themselves, handle basic conversations, and read simple texts. After 20-30 lessons, you'll be holding real conversations, understanding native speakers at a natural pace, and feeling genuinely confident. After 50+ lessons, most students are functionally fluent for daily life. I've had students go from zero to ordering confidently in restaurants within a month, and heritage speakers who went from 'I understand but can't speak' to fluent conversations in 3-4 months."
        },
        {
          q: "How are online lessons structured?",
          a: "We meet on Zoom (or your preferred platform). Each lesson typically includes: a warm-up conversation to get you thinking in the language, a focused topic or skill we're working on that day, interactive exercises and real-time corrections, and a recap of what you've learned. I share all materials digitally — vocabulary lists, grammar notes, homework — so you always have something to practise between lessons. And yes, you can message me between sessions if you have questions."
        },
        {
          q: "How quickly will I learn?",
          a: "Everyone's different! It depends on your goals, how much time you practice between lessons, and your previous language experience. That said, most students start having basic conversations within 2-3 months of regular lessons. I focus on practical, real-world language — not just textbook theory."
        },
        {
          q: "Do you assign homework?",
          a: "Only if you want it! Some students love homework, others don't have the time. I always offer practice exercises and materials, but they're optional. The more you practice between lessons, the faster you'll progress — but I'll never pressure you."
        },
        {
          q: "Can you help me prepare for an exam or certification?",
          a: "Yes! Whether it's a university exam, language proficiency test, or work requirement, I can create a customized study plan to help you prepare. Just let me know what you're working toward."
        },
        {
          q: "I'm a heritage speaker — can you help me?",
          a: "Definitely! Many of my students grew up hearing Ukrainian or Russian at home but never formally learned it. I'll help you turn that passive knowledge into active fluency and fill in any grammar or writing gaps."
        },
        {
          q: "Do you teach children?",
          a: "I primarily work with adult learners (18+), as my teaching style is designed for mature students who can engage in complex conversations. However, I'm happy to work with motivated teenagers (16+) who are serious about learning. For younger children, I'd recommend finding a tutor who specializes in teaching kids."
        },
        {
          q: "What's the difference between Ukrainian and Russian?",
          a: "Great question! While they share the Cyrillic alphabet and some vocabulary (they're both Slavic languages), they're distinct languages with different pronunciation, grammar, and vocabulary. Think of them like Spanish and Portuguese — similar roots, but definitely not the same. Ukrainian has softer sounds and some unique letters. If you speak one, learning the other becomes easier, but they're separate languages that deserve their own study."
        },
        {
          q: "Can I switch between languages?",
          a: "Absolutely! Some students study both Ukrainian and Russian with me, either alternating lessons or focusing on one and then the other. Just let me know what you want to work on. I'm fluent in both, so we can adapt as your needs change."
        }
      ]
    },
    {
      category: "Payments & Policies",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "I accept PayPal (including credit/debit cards through PayPal). Payment is simple and secure. Once we've scheduled your lesson via email or Instagram, you can complete your booking online."
        },
        {
          q: "Can I get a refund?",
          a: "If you're not satisfied after your first lesson, I'll refund you — no questions asked. For lesson packages, unused lessons can be refunded within 30 days of purchase. I want you to feel confident in your investment!"
        },
        {
          q: "Do you offer discounts?",
          a: "Yes! The Intensive Pack (5 lessons) already includes a discount. I also occasionally run seasonal promotions. If you're booking for multiple people (like a family or study group), reach out — we can work something out!"
        },
        {
          q: "What currency do you charge in?",
          a: "Prices are listed in EUR, but you can pay in USD, GBP, or other major currencies through PayPal. The site shows converted prices for your convenience, but the final amount may vary slightly based on current exchange rates."
        }
      ]
    },
    {
      category: "Technical & Other",
      questions: [
        {
          q: "What if I have technical issues during a lesson?",
          a: "Don't worry! If your internet cuts out or you have tech problems, we'll pause and reschedule the remaining time — no charge. I always test my setup before lessons, but sometimes things happen. We'll figure it out together."
        },
        {
          q: "Do you record lessons?",
          a: "Only if you'd like me to! Some students find it helpful to review lessons later. Just let me know, and I can record and send you the video. Otherwise, lessons aren't recorded."
        },
        {
          q: "Can I bring a friend to a lesson?",
          a: "Sure! If you want to learn with a friend or family member, we can arrange group lessons. Just message me first so we can discuss pricing and logistics."
        },
        {
          q: "I have a question that's not listed here!",
          a: "No problem! Send me a message on Instagram (@alin.a.zelinska) or email me at zelinskayaalinaig@gmail.com. I'm happy to answer any questions you have. Seriously — don't hesitate to reach out!"
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Flatten all FAQs for schema
  const allFAQs = faqs.flatMap(section => section.questions);

  return (
    <div className="faq-page page-transition">
      <SEOHead
        title="FAQ | Ukrainian Lessons with Alina Zelinska | All Your Questions Answered"
        description="Common questions about learning Ukrainian, Russian, and English with Alina Zelinska. Booking, pricing, lesson format, and more. 100% response rate."
        keywords="Ukrainian lessons FAQ, Ukrainian tutor questions, learn Ukrainian online, Russian lessons questions"
        schema={generateFAQSchema(allFAQs)}
        hreflang={[
          { lang: 'en', url: 'https://alinazelinska.com/faq' },
          { lang: 'x-default', url: 'https://alinazelinska.com/faq' }
        ]}
      />

      <PageHero
        crumbs={[{ name: 'FAQ' }]}
        eyebrow={`${allFAQs.length} questions · ${faqs.length} topics`}
        uk="Питання"
        title={
          <>
            Questions? I’ve got <em>answers.</em>
          </>
        }
        lede="Everything you need to know about lessons, booking, and learning with me. Don't see your question? Just ask!"
      >
        <nav className="faq-index" aria-label="FAQ topics">
          {faqs.map((section, sectionIndex) => (
            <button key={section.category} type="button" onClick={() => jumpTo(`faq-${slug(section.category)}`)}>
              <span className="num">{String(sectionIndex + 1).padStart(2, '0')}</span>
              {section.category}
            </button>
          ))}
        </nav>
      </PageHero>

      {/* ─── FAQ groups ───────────────────────────────────── */}
      {faqs.map((section, sectionIndex) => (
        <section
          key={section.category}
          id={`faq-${slug(section.category)}`}
          className={`page-section faq-group ${sectionIndex % 2 ? 'page-section--tint' : ''}`}
        >
          <div className="section-shell">
            <div className="split">
              <motion.header {...reveal} className="split__aside section-head faq-group__head">
                <span className="num faq-group__num">{String(sectionIndex + 1).padStart(2, '0')}</span>
                <h2>{section.category}</h2>
                <p className="faq-group__count">
                  {section.questions.length} {section.questions.length === 1 ? 'question' : 'questions'}
                </p>
              </motion.header>

              <ul className="faq-list">
                {section.questions.map((faq, qIndex) => {
                  const globalIndex = `${sectionIndex}-${qIndex}`;
                  const isOpen = openIndex === globalIndex;
                  const panelId = `faq-panel-${globalIndex}`;
                  const buttonId = `faq-button-${globalIndex}`;

                  return (
                    <motion.li key={qIndex} {...stagger(qIndex)} className={isOpen ? 'is-open' : ''}>
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          onClick={() => toggleQuestion(globalIndex)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="faq-q"
                        >
                          <span>{faq.q}</span>
                          <span className="faq-q__icon" aria-hidden="true" />
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className="faq-a"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease }}
                          >
                            <p>{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Питай сміливо.
          </p>
          <h2>
            Still have <em className="display-italic">questions?</em>
          </h2>
          <p className="closing__sub">I'm here to help! Drop me a message and I'll get back to you ASAP.</p>
          <div className="closing__actions">
            <a
              href="https://www.instagram.com/alin.a.zelinska/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Message me on Instagram <FiArrowUpRight />
            </a>
            <a href="mailto:zelinskayaalinaig@gmail.com" className="btn-outline">
              Send me an email <FiMail />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FAQ;
