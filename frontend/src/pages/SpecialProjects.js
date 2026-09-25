import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../i18n/routing';
import { FiArrowRight, FiArrowUpRight, FiBook, FiMusic, FiSmartphone, FiCheck } from 'react-icons/fi';
import { useTranslation, Trans } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import { clean } from '../utils/text';
import './special-projects.css';
import { reveal, stagger } from '../utils/motion';

const pad = (n) => String(n).padStart(2, '0');

// Language-neutral bits of the page; the words themselves live in locales/<lang>/specialProjects.json.
const MUSIC_ICONS = ['✍️', '🌍', '🔄', '🤝'];
const SERVICE_ICONS = [<FiBook />, <FiBook />, <FiSmartphone />, <FiSmartphone />];
const CLIENT_ICONS = ['🚀', '🤖', '📱', '🏢', '🎓', '🌍'];
// The sample lyric stays in Ukrainian in every language; its gloss is translated.
const LYRIC = ['Між зорями і снами', 'Я знайшла себе', 'У словах, що ти мені шептав'];

const SpecialProjects = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const list = (key) => t(`specialProjects.${key}`, { returnObjects: true });
  const isEn = i18n.resolvedLanguage === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = ['all', 'books', 'music', 'apps'];

  return (
    <div className="sp-page page-transition">
      <SEOHead title={t('specialProjects.seo.title')} description={t('specialProjects.seo.description')} />
      <PageHero
        crumbs={[{ name: t('specialProjects.hero.crumb') }]}
        eyebrow={t('specialProjects.hero.eyebrow')}
        uk="Проєкти"
        title={
          <>
            {t('specialProjects.hero.titleLead')} <em>{t('specialProjects.hero.titleAccent')}</em>
          </>
        }
        lede={t('specialProjects.hero.lede')}
      >
        <p className="sp-intro">{t('specialProjects.hero.intro')}</p>
      </PageHero>

      {/* ─── Index / filter ───────────────────────────────── */}
      <nav className="sp-index" aria-label={t('specialProjects.tabs.label')}>
        <div className="section-shell">
          <ul className="sp-index__list" role="tablist">
            {tabs.map((tab, index) => (
              <li key={tab}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`sp-index__tab ${activeTab === tab ? 'is-active' : ''}`}
                >
                  <span className="num">{pad(index)}</span>
                  <span>{t(`specialProjects.tabs.${tab}`)}</span>
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
                <p className="eyebrow">{t('specialProjects.books.eyebrow')}</p>
                <h2>{clean(t('specialProjects.books.title'))}</h2>
              </div>
              <p>{t('specialProjects.books.intro')}</p>
            </motion.header>

            {/* Featured Book Project */}
            <motion.article {...reveal} className="sp-feature">
              <div className="sp-feature__cover">
                <div className="sp-feature__frame">
                  <img
                    src="https://via.placeholder.com/300x450/3B82F6/FFFFFF?text=Management+in+Times+of+War"
                    alt={t('specialProjects.books.coverAlt')}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="sp-feature__fallback" aria-hidden="true">
                    <FiBook />
                    <span>{t('specialProjects.books.bookTitle')}</span>
                  </span>
                </div>
              </div>

              <div className="sp-feature__body">
                <span className="chip">{t('specialProjects.books.chip')}</span>
                <h3>{t('specialProjects.books.bookTitle')}</h3>
                <p className="sp-feature__uk" lang={isEn ? 'uk' : undefined}>
                  {t('specialProjects.books.bookSubtitle')}
                </p>

                <dl className="sp-feature__meta">
                  <div>
                    <dt>{t('specialProjects.books.translationLabel')}</dt>
                    <dd>{t('specialProjects.books.translation')}</dd>
                  </div>
                  <div>
                    <dt>{t('specialProjects.books.statusLabel')}</dt>
                    <dd>{t('specialProjects.books.status')}</dd>
                  </div>
                </dl>

                <div className="prose-ink sp-feature__prose">
                  {list('books.prose').map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>

                <aside className="sp-pull">
                  <h4>{t('specialProjects.books.whyTitle')}</h4>
                  <p>{t('specialProjects.books.why')}</p>
                </aside>

                <ul className="sp-checks">
                  {list('books.checks').map((item) => (
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
                <p className="eyebrow">{t('specialProjects.books.other.eyebrow')}</p>
                <h3 className="sp-subhead">{t('specialProjects.books.other.title')}</h3>
              </motion.header>
              <div>
                <ol className="rule-list sp-rows">
                  {list('books.other.items').map((item, index) => (
                    <motion.li key={item} {...stagger(index)}>
                      <span className="num">{pad(index + 1)}</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ol>
                <motion.div {...reveal} className="sp-cta">
                  <Link to="/contact" className="btn-primary sp-cta__btn">
                    {t('specialProjects.books.other.cta')}
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
                  {t('specialProjects.music.eyebrow')} <FiMusic aria-hidden="true" />
                </p>
                <h2>{clean(t('specialProjects.music.title'))}</h2>
              </div>
              <p>{t('specialProjects.music.intro')}</p>
            </motion.header>

            <ol className="sp-grid-list">
              {list('music.items').map((item, index) => (
                <motion.li key={item.title} {...stagger(index % 2)}>
                  <span className="num">{pad(index + 1)}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="sp-grid-list__icon" aria-hidden="true">
                    {MUSIC_ICONS[index]}
                  </span>
                </motion.li>
              ))}
            </ol>

            {/* Sample Lyric */}
            <motion.figure {...reveal} className="sp-lyric">
              <figcaption className="eyebrow">{t('specialProjects.music.lyricCaption')}</figcaption>
              <blockquote>
                {LYRIC.map((uk, index) => [uk, list('music.lyricTranslations')[index]]).map(([uk, gloss]) => (
                  <p key={uk}>
                    <span className="sp-lyric__uk" lang="uk">
                      {uk}
                    </span>
                    {gloss && <span className="sp-lyric__en">({gloss})</span>}
                  </p>
                ))}
              </blockquote>
            </motion.figure>

            <motion.div {...reveal} className="sp-cta sp-cta--center">
              <Link to="/contact" className="btn-primary sp-cta__btn">
                {t('specialProjects.music.cta')}
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
                  {t('specialProjects.apps.eyebrow')} <FiSmartphone aria-hidden="true" />
                </p>
                <h2>{clean(t('specialProjects.apps.title'))}</h2>
              </div>
              <p>
                <Trans i18nKey="specialProjects.apps.intro" components={{ em: <em className="sp-em" /> }} />
              </p>
            </motion.header>

            {/* The Problem */}
            <div className="split sp-block">
              <motion.header {...reveal} className="split__aside section-head">
                <p className="eyebrow">{t('specialProjects.apps.problem.eyebrow')}</p>
                <h3 className="sp-subhead">{t('specialProjects.apps.problem.title')}</h3>
              </motion.header>
              <motion.div {...reveal} className="prose-ink sp-problem">
                <p>{t('specialProjects.apps.problem.body')}</p>
                <p className="sp-problem__punch">{t('specialProjects.apps.problem.punch')}</p>
              </motion.div>
            </div>

            {/* What Makes Me Different */}
            <div className="split sp-block">
              <motion.header {...reveal} className="split__aside section-head">
                <p className="eyebrow">{t('specialProjects.apps.diff.eyebrow')}</p>
                <h3 className="sp-subhead">{t('specialProjects.apps.diff.title')}</h3>
              </motion.header>
              <ul className="rule-list sp-diff">
                {list('apps.diff.items').map((item, index) => (
                  <motion.li key={item.lead} {...stagger(index)}>
                    <span className="num">{pad(index + 1)}</span>
                    <p>
                      <strong>{item.lead}</strong>
                      {item.text && <span> — {item.text}</span>}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Services — editorial index */}
            <motion.header {...reveal} className="section-head sp-services-head">
              <p className="eyebrow">{t('specialProjects.apps.services.eyebrow')}</p>
              <h3 className="sp-subhead">{t('specialProjects.apps.services.title')}</h3>
            </motion.header>
            <ol className="sp-services">
              {list('apps.services.items').map((service, index) => (
                <motion.li key={service.title} {...stagger(index)} className="sp-service">
                  <span className="sp-service__num">{pad(index + 1)}</span>
                  <h4>{clean(service.title)}</h4>
                  <p className="sp-service__desc">{service.description}</p>
                  <p className="sp-service__deliverable">
                    <span className="sp-service__icon" aria-hidden="true">
                      {SERVICE_ICONS[index]}
                    </span>
                    <span>
                      <span className="field-label">{t('specialProjects.apps.services.deliverableLabel')}</span>
                      {service.deliverable}
                    </span>
                  </p>
                </motion.li>
              ))}
            </ol>

            {/* Ideal Clients */}
            <motion.div {...reveal} className="sp-clients">
              <p className="eyebrow">{t('specialProjects.apps.clients.eyebrow')}</p>
              <h3 className="sp-subhead">{t('specialProjects.apps.clients.title')}</h3>
              <ul>
                {list('apps.clients.items').map((client, index) => (
                  <li key={client}>
                    <span className="sp-clients__icon" aria-hidden="true">
                      {CLIENT_ICONS[index]}
                    </span>
                    <span>{client}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Why Ukrainian/Russian Apps Need Me */}
            <motion.figure {...reveal} className="sp-quote">
              <figcaption className="eyebrow">{t('specialProjects.apps.why.caption')}</figcaption>
              <blockquote>
                <Trans i18nKey="specialProjects.apps.why.quote" components={{ strong: <strong /> }} />
              </blockquote>
            </motion.figure>

            <motion.div {...reveal} className="sp-cta sp-cta--center">
              <Link to="/contact" className="btn-primary sp-cta__btn">
                {t('specialProjects.apps.cta')}
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
            {t('specialProjects.closing.titleLead')}{' '}
            <em className="display-italic">{t('specialProjects.closing.titleAccent')}</em>
          </h2>
          <p className="closing__sub">{t('specialProjects.closing.sub')}</p>
          <div className="closing__actions">
            <Link to="/contact" className="btn-primary">
              {t('specialProjects.closing.primary')} <FiArrowRight />
            </Link>
            <a href="mailto:zelinskayaalinaig@gmail.com" className="btn-outline">
              {t('specialProjects.closing.email')} <FiArrowUpRight />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SpecialProjects;
