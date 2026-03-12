import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiTrendingUp } from 'react-icons/fi';
import { meta } from '../data/content';

const SuccessStories = () => {
  useEffect(() => {
    document.title = `Success Stories | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const stories = [
    {
      name: "Maria",
      country: "USA",
      language: "Ukrainian",
      duration: "3 months",
      lessons: 24,
      level: "Zero to Conversational",
      image: "https://ui-avatars.com/api/?name=Maria&size=200&background=FF91A4&color=fff&bold=true",
      story: "I started learning Ukrainian to connect with my grandmother. Alina made it so approachable and fun! Within 3 months, I was having real conversations with my family. She didn't just teach me grammar — she taught me the culture, the emotion behind the words. Now I can call my бабуся and actually understand what she's saying!",
      goal: "Connect with family",
      achievement: "Having full conversations with grandmother",
      favorite: "Learning how to express emotions in Ukrainian — there are so many beautiful words!"
    },
    {
      name: "James",
      country: "UK",
      language: "Russian",
      duration: "6 months",
      lessons: 48,
      level: "Beginner to Intermediate",
      image: "https://ui-avatars.com/api/?name=James&size=200&background=9333EA&color=fff&bold=true",
      story: "I needed Russian for work, but textbooks were killing my motivation. Alina changed everything. She made lessons practical and engaging — we talked about real situations I'd encounter. Now I can handle business meetings in Russian and even crack jokes with colleagues. Best investment I've made!",
      goal: "Professional fluency",
      achievement: "Conducting business meetings in Russian",
      favorite: "The way Alina explains cases — finally makes sense!"
    },
    {
      name: "Sophie",
      country: "Canada",
      language: "Ukrainian",
      duration: "4 months",
      lessons: 32,
      level: "Heritage Speaker to Fluent",
      image: "https://ui-avatars.com/api/?name=Sophie&size=200&background=FF91A4&color=fff&bold=true",
      story: "I grew up hearing Ukrainian at home but never formally learned it. I could understand my parents but couldn't speak back. Alina helped me turn that passive knowledge into active fluency. Now I can finally respond in Ukrainian instead of English — my parents were so emotional when I did it for the first time!",
      goal: "Speak fluently with parents",
      achievement: "Full conversations in Ukrainian",
      favorite: "Finally understanding all those grammar rules I never learned as a kid"
    }
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
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Real Students, Real Results ✨
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              These are real people who started exactly where you are now. Here's how they transformed their language skills (and confidence!) with personalized lessons.
            </p>
          </motion.div>

          {/* Success Stories */}
          <div className="space-y-16">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="card p-8 md:p-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Student Photo & Stats */}
                  <div className="text-center md:text-left">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-32 h-32 rounded-full mx-auto md:mx-0 mb-4 shadow-lg"
                    />
                    <h3 className="text-2xl font-serif font-bold mb-2">{story.name}</h3>
                    <p className="text-[var(--color-text-secondary)] mb-4">{story.country}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <FiClock className="w-5 h-5 text-[var(--color-accent)]" />
                        <span className="text-sm">{story.duration} • {story.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <FiTrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
                        <span className="text-sm font-semibold">{story.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="md:col-span-2">
                    <div className="mb-6">
                      <span className="inline-block px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full text-sm font-medium mb-4">
                        Learning {story.language}
                      </span>
                      <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] italic mb-6">
                        "{story.story}"
                      </p>
                    </div>

                    {/* Achievement Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[var(--color-bg-secondary)] rounded-lg">
                      <div>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-1">Goal:</p>
                        <p className="font-semibold">{story.goal}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-1">Achievement:</p>
                        <p className="font-semibold">{story.achievement}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-1">Favorite Part:</p>
                        <p className="font-semibold">{story.favorite}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16 card p-8 md:p-12 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Write Your Own Success Story? 🌟
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
              These students started where you are right now. Let's create your transformation together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="btn-primary inline-flex items-center gap-2"
              >
                Book Your Trial Lesson
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="btn-outline inline-flex items-center gap-2"
              >
                Ask Me Anything
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
