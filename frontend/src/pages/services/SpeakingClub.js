import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiUsers, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { meta } from '../../data/content';
import PageHero from '../../components/PageHero';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');

const INSTAGRAM_URL = 'https://www.instagram.com/alin.a.zelinska/';

const SpeakingClub = () => {
  useEffect(() => {
    document.title = `Ukrainian Speaking Club | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const clubFeatures = [
    {
      icon: <FiUsers />,
      title: 'Small Groups',
      description: '3-4 students max — small enough to get real speaking time, big enough for dynamic conversation',
    },
    {
      icon: <FiClock />,
      title: '60 Minutes',
      description: 'Full hour of guided conversation practice with themed topics and real-time corrections',
    },
    {
      icon: <FiDollarSign />,
      title: 'Just $12',
      description: 'Affordable group practice to supplement your 1-on-1 lessons or practice independently',
    },
    {
      icon: <FiCalendar />,
      title: 'Themed Sessions',
      description: 'Each session has a topic: holidays, travel, food, current events — always something interesting to talk about',
    },
  ];

  const pastThemes = [
    { icon: '🎄', title: 'Christmas Edition', description: 'Holiday vocabulary, traditions, and festive conversations' },
    { icon: '🎉', title: 'New Year\'s Resolutions', description: 'Goals, aspirations, and future tense practice' },
    { icon: '✈️', title: 'Travel & Adventure', description: 'Vacation stories, travel vocabulary, and future trip planning' },
    { icon: '🍽️', title: 'Food & Cooking', description: 'Recipes, restaurants, and culinary conversations' },
  ];

  const whoShouldJoin = [
    { lead: 'Intermediate learners', text: 'who want more speaking practice between 1-on-1 lessons' },
    { lead: 'Advanced students', text: 'looking to maintain fluency and learn from other learners' },
    { lead: 'Anyone who loves Ukrainian', text: 'and wants a supportive community to practice with' },
  ];

  return (
    <div className="svc-page page-transition">
      <PageHero
        crumbs={[{ name: 'Services', url: '/special-projects' }, { name: 'Speaking Club' }]}
        eyebrow="Group conversation practice"
        uk="Розмова"
        title={
          <>
            Ukrainian <em>Speaking Club.</em>
          </>
        }
        lede="Small group conversation practice for Ukrainian learners. Practice speaking Ukrainian in a relaxed, supportive environment with other learners at your level. Themed topics, real conversations, and friendly corrections."
        aside={
          <div className="svc-ledger">
            <span className="svc-ledger__label">Each session</span>
            <dl>
              <div>
                <dt>3–4</dt>
                <dd>Students max</dd>
              </div>
              <div>
                <dt>60</dt>
                <dd>Minutes of guided conversation</dd>
              </div>
              <div>
                <dt>
                  <em>$12</em>
                </dt>
                <dd>Per session</dd>
              </div>
            </dl>
          </div>
        }
      >
        <div className="svc-actions">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Follow on Instagram for Updates <FiArrowUpRight />
          </a>
          <Link to="/contact" className="btn-outline">
            Ask About Next Session
          </Link>
        </div>
      </PageHero>

      {/* ─── How it works ─────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">The format</p>
            <h2>
              How it <em className="display-italic">works.</em>
            </h2>
          </motion.header>

          <ul className="svc-features">
            {clubFeatures.map((feature, index) => (
              <motion.li key={feature.title} {...stagger(index)}>
                <span className="svc-features__icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Past themes ──────────────────────────────────── */}
      <section className="page-section page-section--tint">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">From the archive</p>
            <h2>
              Past session <em className="display-italic">themes.</em>
            </h2>
          </motion.header>

          <ol className="svc-themes">
            {pastThemes.map((theme, index) => (
              <motion.li key={theme.title} {...stagger(index % 2)}>
                <span className="num">{pad(index)}</span>
                <h3>{theme.title}</h3>
                <span className="svc-themes__icon" aria-hidden="true">
                  {theme.icon}
                </span>
                <p>{theme.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Who should join ──────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <div className="split">
            <motion.header {...reveal} className="split__aside section-head">
              <p className="eyebrow">Is it for you?</p>
              <h2>
                Who should <em className="display-italic">join?</em>
              </h2>
            </motion.header>

            <motion.div {...reveal}>
              <ol className="rule-list svc-join">
                {whoShouldJoin.map((item, index) => (
                  <li key={item.lead}>
                    <span className="num">{pad(index)}</span>
                    <p>
                      <strong>{item.lead}</strong> {item.text}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="svc-note">
                <strong>Note:</strong> The Speaking Club is best for students with at least basic Ukrainian (A2 level or
                higher). Complete beginners should start with 1-on-1 lessons first.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            До зустрічі!
          </p>
          <h2>
            Interested in <em className="display-italic">joining?</em>
          </h2>
          <p className="closing__sub">
            I announce upcoming Speaking Club sessions on Instagram! Follow me there for dates, times, and sign-up links —
            or message me directly to get on the list.
          </p>
          <div className="closing__actions">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Follow on Instagram for Updates <FiArrowRight />
            </a>
            <Link to="/contact" className="btn-outline">
              Ask About Next Session
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SpeakingClub;
