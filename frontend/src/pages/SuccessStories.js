import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { meta } from '../data/content';
import PageHero from '../components/PageHero';
import './success-stories.css';
import { reveal, stagger } from '../utils/motion';

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
    <div className="stories-page page-transition">
      <PageHero
        crumbs={[{ name: 'Success Stories' }]}
        eyebrow="Success stories"
        uk="Історії"
        title={
          <>
            Real Students, Real <em>Results</em>
          </>
        }
        lede="These are real people who started exactly where you are now. Here's how they transformed their language skills (and confidence!) with personalized lessons."
      >
        <ol className="story-index">
          {stories.map((story, index) => (
            <li key={story.name}>
              <span className="num">{String(index + 1).padStart(2, '0')}</span>
              <span>
                {story.name} <small>{story.level}</small>
              </span>
            </li>
          ))}
        </ol>
      </PageHero>

      {/* ─── Stories ──────────────────────────────────────── */}
      {stories.map((story, index) => (
        <section key={index} className={`page-section story ${index % 2 ? 'page-section--tint' : ''}`}>
          <div className="section-shell">
            <div className="split">
              <motion.header {...reveal} className="split__aside story__aside">
                <span className="num story__num">{String(index + 1).padStart(2, '0')}</span>
                <div className="story__who">
                  <span className="story__avatar">
                    <img src={story.image} alt={story.name} loading="lazy" />
                  </span>
                  <div>
                    <h2>{story.name}</h2>
                    <p className="story__country">{story.country}</p>
                  </div>
                </div>
                <span className="chip">Learning {story.language}</span>

                <dl className="story__facts">
                  <div>
                    <dt>Duration</dt>
                    <dd>{story.duration}</dd>
                  </div>
                  <div>
                    <dt>Lessons</dt>
                    <dd>{story.lessons} lessons</dd>
                  </div>
                  <div>
                    <dt>Progress</dt>
                    <dd>{story.level}</dd>
                  </div>
                </dl>
              </motion.header>

              <div>
                <motion.blockquote {...reveal} className="story__quote">
                  <span className="story__mark" aria-hidden="true">
                    “
                  </span>
                  <p>{story.story}</p>
                </motion.blockquote>

                {/* Achievement Highlights */}
                <dl className="story__highlights">
                  {[
                    ['Goal', story.goal],
                    ['Achievement', story.achievement],
                    ['Favorite Part', story.favorite],
                  ].map(([label, value], i) => (
                    <motion.div key={label} {...stagger(i)}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Твоя історія — наступна.
          </p>
          <h2>
            Ready to Write Your Own Success <em className="display-italic">Story?</em>
          </h2>
          <p className="closing__sub">
            These students started where you are right now. Let's create your transformation together!
          </p>
          <div className="closing__actions">
            <Link to="/booking" className="btn-primary">
              Book Your Trial Lesson <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-outline">
              Ask Me Anything <FiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SuccessStories;
