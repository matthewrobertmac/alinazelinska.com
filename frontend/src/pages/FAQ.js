import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { meta } from '../data/content';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    document.title = `FAQ | ${meta.title}`;
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
          a: "I work with students all over the world! I'm based in Poland (CET/CEST), but I'm flexible with scheduling to accommodate different time zones. Just let me know where you are, and we'll figure it out."
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

  return (
    <div className="page-transition pt-24 pb-16">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Questions? I've Got Answers 💬
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Everything you need to know about lessons, booking, and learning with me. Don't see your question? Just ask!
            </p>
          </motion.div>

          {/* FAQ Sections */}
          {faqs.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-serif font-bold mb-6 text-[var(--color-accent)]">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, qIndex) => {
                  const globalIndex = `${sectionIndex}-${qIndex}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div
                      key={qIndex}
                      className="card overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[var(--color-bg-secondary)] transition-colors"
                      >
                        <span className="text-lg font-semibold pr-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <FiChevronUp className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0" />
                        ) : (
                          <FiChevronDown className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-4 text-[var(--color-text-secondary)] leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16 card p-8 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent"
          >
            <h3 className="text-2xl font-serif font-bold mb-4">
              Still have questions? 🤔
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              I'm here to help! Drop me a message and I'll get back to you ASAP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/alin.a.zelinska/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Message me on Instagram
              </a>
              <a
                href="mailto:zelinskayaalinaig@gmail.com"
                className="btn-outline inline-flex items-center gap-2"
              >
                Send me an email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
