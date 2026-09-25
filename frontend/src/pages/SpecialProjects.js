import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiBook, FiMusic, FiSmartphone, FiCheck } from 'react-icons/fi';
import { meta } from '../data/content';
import PageHero from '../components/PageHero';
import { clean } from '../utils/text';
import './special-projects.css';
import { reveal, stagger } from '../utils/motion';

// Strip leading emoji ("📚 Book Translation" → "Book Translation"); trailing ones go via clean().
const stripLead = (s) => clean(s).replace(/^[\s\p{Extended_Pictographic}‍️]+/u, '');

const pad = (n) => String(n).padStart(2, '0');

const SpecialProjects = () => {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    document.title = `Special Projects | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'all', label: 'All Projects', icon: '✨' },
    { id: 'books', label: '📚 Book Translation', icon: '📚' },
    { id: 'music', label: '🎵 Music', icon: '🎵' },
    { id: 'apps', label: '🚀 App Consulting', icon: '🚀' },
  ];

  return (
    <div className="sp-page page-transition">
      <PageHero
        crumbs={[{ name: 'Special Projects' }]}
        eyebrow="Beyond the classroom"
        uk="Проєкти"
        title={
          <>
            Special projects &amp; <em>collaborations.</em>
          </>
        }
        lede="Beyond the classroom — where language meets creativity, strategy, and impact."
      >
        <p className="sp-intro">
          Teaching is my heart, but these projects are where I get to stretch creatively. From translating books that
          matter, to writing songs that move people, to helping tech teams build apps that actually teach effectively —
          this is where language becomes something bigger.
        </p>
      </PageHero>

      {/* ─── Index / filter ───────────────────────────────── */}
      <nav className="sp-index" aria-label="Filter projects">
        <div className="section-shell">
          <ul className="sp-index__list" role="tablist">
            {tabs.map((tab, index) => (
              <li key={tab.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`sp-index__tab ${activeTab === tab.id ? 'is-active' : ''}`}
                >
                  <span className="num">{pad(index)}</span>
                  <span>{stripLead(tab.label)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ─── 01 · Book translation ────────────────────────── */}
      {(activeTab === 'all' || activeTab === 'books') && (
        <section className="page-section sp-chapter">
          <div className="section-shell">
            <motion.header {...reveal} className="section-head section-head--split">
              <div>
                <p className="eyebrow">01 · Translation</p>
                <h2>{clean('Book Translation Projects 📚')}</h2>
              </div>
              <p>
                Translation isn't just swapping words between languages — it's carrying meaning, tone, and soul across
                borders. I specialize in high-stakes, culturally significant work where accuracy and artistry both
                matter.
              </p>
            </motion.header>

            {/* Featured Book Project */}
            <motion.article {...reveal} className="sp-feature">
              <div className="sp-feature__cover">
                <div className="sp-feature__frame">
                  <img
                    src="https://via.placeholder.com/300x450/3B82F6/FFFFFF?text=Management+in+Times+of+War"
                    alt="Management in Times of War Book Cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="sp-feature__fallback" aria-hidden="true">
                    <FiBook />
                    <span>Management in Times of War</span>
                  </span>
                </div>
              </div>

              <div className="sp-feature__body">
                <span className="chip">Featured Translation</span>
                <h3>Management in Times of War</h3>
                <p className="sp-feature__uk" lang="uk">
                  Менеджмент у воєнний час
                </p>

                <dl className="sp-feature__meta">
                  <div>
                    <dt>Translation:</dt>
                    <dd>Ukrainian → English</dd>
                  </div>
                  <div>
                    <dt>Status:</dt>
                    <dd>Published</dd>
                  </div>
                </dl>

                <div className="prose-ink sp-feature__prose">
                  <p>
                    This wasn't just a translation project — it was a responsibility. "Management in Times of War"
                    offers critical insights for leaders navigating crisis, and I wanted to make sure every strategic
                    concept, every cultural nuance, and every ounce of urgency carried over into English.
                  </p>
                  <p>
                    Working on this book reminded me why translation matters: words have power, especially in times
                    that demand clarity and action.
                  </p>
                </div>

                <aside className="sp-pull">
                  <h4>Why This Project Mattered:</h4>
                  <p>
                    In times of global uncertainty, Ukrainian voices deserve to be heard beyond language barriers. This
                    translation ensures that leaders, educators, and change-makers worldwide can learn from Ukraine's
                    resilience and strategic thinking.
                  </p>
                </aside>

                <ul className="sp-checks">
                  {[
                    'Preserved technical terminology',
                    'Cultural context adaptation',
                    'Author collaboration',
                    'Authentic voice preservation',
                  ].map((item) => (
                    <li key={item}>
                      <FiCheck aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>

            {/* Other Translation Work */}
            <div className="split sp-other">
              <motion.header {...reveal} className="split__aside section-head">
                <p className="eyebrow">Also on my desk</p>
                <h3 className="sp-subhead">Other Translation Work:</h3>
              </motion.header>
              <div>
                <ol className="rule-list sp-rows">
                  {[
                    'Poetry collections (Ukrainian ↔ English ↔ Russian)',
                    'Cultural essays and articles',
                    'Literary projects with emotional depth',
                  ].map((item, index) => (
                    <motion.li key={item} {...stagger(index)}>
                      <span className="num">{pad(index + 1)}</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ol>
                <motion.div {...reveal} className="sp-cta">
                  <Link to="/contact" className="btn-primary sp-cta__btn">
                    Have a manuscript that needs a translator who cares?
                    <FiArrowRight />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 02 · Music & songwriting ─────────────────────── */}
      {(activeTab === 'all' || activeTab === 'music') && (
        <section className="page-section page-section--tint sp-chapter">
          <div className="section-shell">
            <motion.header {...reveal} className="section-head section-head--split">
              <div>
                <p className="eyebrow">
                  02 · Music <FiMusic aria-hidden="true" />
                </p>
                <h2>{clean('Songwriting & Music Creation 🎵')}</h2>
              </div>
              <p>
                Words set to music hit differently. I write songs that feel like poetry, conversations, and confessions
                all at once — in Ukrainian, Russian, or English.
              </p>
            </motion.header>

            <ol className="sp-grid-list">
              {[
                {
                  title: 'Original Songs',
                  description: 'From folk-inspired ballads to modern pop sensibilities, I write lyrics that tell stories. Whether it\'s heartbreak, hope, or the complicated beauty of identity, I\'m here for it.',
                  icon: '✍️',
                },
                {
                  title: 'Multilingual Lyrics',
                  description: 'Code-switching between languages isn\'t just trendy — it\'s how many of us actually live. I write songs that embrace that fluidity.',
                  icon: '🌍',
                },
                {
                  title: 'Translation & Adaptation',
                  description: 'Already have a song but need it in another language? I don\'t just translate — I adapt. The rhyme, the rhythm, the emotional punch — it all carries over.',
                  icon: '🔄',
                },
                {
                  title: 'Collaboration',
                  description: 'I work with independent artists, bands, and producers who want lyrics with substance. You bring the sound, I\'ll bring the words.',
                  icon: '🤝',
                },
              ].map((item, index) => (
                <motion.li key={item.title} {...stagger(index % 2)}>
                  <span className="num">{pad(index + 1)}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="sp-grid-list__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                </motion.li>
              ))}
            </ol>

            {/* Sample Lyric */}
            <motion.figure {...reveal} className="sp-lyric">
              <figcaption className="eyebrow">Sample Lyric Excerpt</figcaption>
              <blockquote>
                {[
                  ['Між зорями і снами', 'Between the stars and dreams'],
                  ['Я знайшла себе', 'I found myself'],
                  ['У словах, що ти мені шептав', 'In the words you whispered to me'],
                ].map(([uk, en]) => (
                  <p key={uk}>
                    <span className="sp-lyric__uk" lang="uk">
                      {uk}
                    </span>
                    <span className="sp-lyric__en">({en})</span>
                  </p>
                ))}
              </blockquote>
            </motion.figure>

            <motion.div {...reveal} className="sp-cta sp-cta--center">
              <Link to="/contact" className="btn-primary sp-cta__btn">
                Let's create your next song
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── 03 · Language app consulting ─────────────────── */}
      {(activeTab === 'all' || activeTab === 'apps') && (
        <section className="page-section sp-chapter">
          <div className="section-shell">
            <motion.header {...reveal} className="section-head section-head--split">
              <div>
                <p className="eyebrow">
                  03 · EdTech <FiSmartphone aria-hidden="true" />
                </p>
                <h2>{clean('Language Learning App Consulting 🚀')}</h2>
              </div>
              <p>
                Building an app? Great. Building an app that actually <em className="sp-em">teaches</em>? That's where I
                come in.
              </p>
            </motion.header>

            {/* The Problem */}
            <div className="split sp-block">
              <motion.header {...reveal} className="split__aside section-head">
                <p className="eyebrow">The problem</p>
                <h3 className="sp-subhead">The Problem Most Apps Have:</h3>
              </motion.header>
              <motion.div {...reveal} className="prose-ink sp-problem">
                <p>
                  Here's the thing: most language apps are built by brilliant developers and designers who've never
                  stood in front of a confused beginner trying to understand cases. They're technically impressive but
                  pedagogically... questionable.
                </p>
                <p className="sp-problem__punch">
                  You don't need another feature. You need someone who knows how humans actually learn.
                </p>
              </motion.div>
            </div>

            {/* What Makes Me Different */}
            <div className="split sp-block">
              <motion.header {...reveal} className="split__aside section-head">
                <p className="eyebrow">Credentials</p>
                <h3 className="sp-subhead">What Makes Me Different:</h3>
              </motion.header>
              <ul className="rule-list sp-diff">
                {[
                  {
                    icon: '👩‍🏫',
                    text: "I'm a real educator - 300+ students, 3+ years, thousands of hours in actual lessons",
                  },
                  {
                    icon: '✅',
                    text: "I know what works - Not theory. Not trends. Real results from real people.",
                  },
                  {
                    icon: '💻',
                    text: "I understand tech - I can speak both 'developer' and 'educator' fluently",
                  },
                  {
                    icon: '🤖',
                    text: "I've seen AI fail - And I know how to make it better",
                  },
                ].map((item, index) => {
                  const [lead, ...rest] = item.text.split(' - ');
                  return (
                    <motion.li key={item.text} {...stagger(index)}>
                      <span className="num">{pad(index + 1)}</span>
                      <p>
                        <strong>{lead}</strong>
                        {rest.length > 0 && <span> — {rest.join(' - ')}</span>}
                      </p>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Services — editorial index */}
            <motion.header {...reveal} className="section-head sp-services-head">
              <p className="eyebrow">Services</p>
              <h3 className="sp-subhead">How we can work together</h3>
            </motion.header>
            <ol className="sp-services">
              {[
                {
                  icon: <FiBook />,
                  title: 'App Audits & UX Review 🔍',
                  description: "I'll use your app like a student would and tell you what's confusing, what's brilliant, and where the learning design falls apart.",
                  deliverable: 'Detailed report with prioritized recommendations',
                },
                {
                  icon: <FiBook />,
                  title: 'Curriculum & Content Development 📝',
                  description: "You focus on the tech. I'll build the learning experience: lesson progression, vocabulary selection, grammar explanations, exercises, and cultural context.",
                  deliverable: 'Complete learning curriculum, ready to implement',
                },
                {
                  icon: <FiSmartphone />,
                  title: 'AI Model Training & Evaluation 🤖',
                  description: "Using AI for conversation practice, grammar correction, or adaptive learning? I'll help you make it pedagogically sound, not just technically impressive.",
                  deliverable: 'Training data, evaluation criteria, prompt engineering',
                },
                {
                  icon: <FiSmartphone />,
                  title: 'Strategic Consulting 💡',
                  description: "Feature prioritization, monetization strategies, retention tactics, and localization strategy — all aligned with actual educational outcomes.",
                  deliverable: 'Strategic roadmap with actionable steps',
                },
              ].map((service, index) => (
                <motion.li key={service.title} {...stagger(index)} className="sp-service">
                  <span className="sp-service__num">{pad(index + 1)}</span>
                  <h4>{clean(service.title)}</h4>
                  <p className="sp-service__desc">{service.description}</p>
                  <p className="sp-service__deliverable">
                    <span className="sp-service__icon" aria-hidden="true">
                      {service.icon}
                    </span>
                    <span>
                      <span className="field-label">Deliverable:</span>
                      {service.deliverable}
                    </span>
                  </p>
                </motion.li>
              ))}
            </ol>

            {/* Ideal Clients */}
            <motion.div {...reveal} className="sp-clients">
              <p className="eyebrow">Who it's for</p>
              <h3 className="sp-subhead">Ideal Clients:</h3>
              <ul>
                {[
                  '🚀 Startups building language learning apps',
                  '🤖 AI companies developing conversational agents',
                  '📱 Existing apps improving learning outcomes',
                  '🏢 Corporate teams creating training tools',
                  '🎓 EdTech platforms expanding into new languages',
                  '🌍 Localization agencies needing subject matter experts',
                ].map((client) => (
                  <li key={client}>
                    <span className="sp-clients__icon" aria-hidden="true">
                      {client.split(' ')[0]}
                    </span>
                    <span>{client.split(' ').slice(1).join(' ')}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Why Ukrainian/Russian Apps Need Me */}
            <motion.figure {...reveal} className="sp-quote">
              <figcaption className="eyebrow">Why Ukrainian/Russian Apps Need Me Specifically:</figcaption>
              <blockquote>
                "Slavic languages are <strong>hard</strong> for English speakers. Cases, aspects, gendered nouns — it's
                a lot. Most apps either oversimplify (useless) or overwhelm (discouraging). I know how to find the
                middle ground because I've walked hundreds of students through it. If you're building a Ukrainian or
                Russian learning app, I'm not just helpful — I'm essential."
              </blockquote>
            </motion.figure>

            <motion.div {...reveal} className="sp-cta sp-cta--center">
              <Link to="/contact" className="btn-primary sp-cta__btn">
                Building a language app? Let's make it actually work
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── Closing ──────────────────────────────────────── */}
      <section className="closing">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk" lang="uk">
            Створімо щось разом.
          </p>
          <h2>
            Ready to <em className="display-italic">collaborate?</em>
          </h2>
          <p className="closing__sub">
            Whether it's a book that needs translating, a song that needs writing, or an app that needs an educator's
            touch — let's create something meaningful together.
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

export default SpecialProjects;
