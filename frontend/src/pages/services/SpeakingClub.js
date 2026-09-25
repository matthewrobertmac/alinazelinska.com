import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiUsers, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import PageHero from '../../components/PageHero';
import './services.css';
import { reveal, stagger } from '../../utils/motion';

const pad = (i) => String(i + 1).padStart(2, '0');

const INSTAGRAM_URL = 'https://www.instagram.com/alin.a.zelinska/';

const SpeakingClub = () => {
  const { t } = useTranslation();
  const p = (k, o) => t(`services.speakingClub.${k}`, o);
  const s = (k) => t(`services.shared.${k}`);

  useEffect(() => {
    document.title = `${p('docTitle')} | ${s('siteTitle')}`;
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const FEATURE_ICONS = [<FiUsers />, <FiClock />, <FiDollarSign />, <FiCalendar />];
  const clubFeatures = p('features', { returnObjects: true }).map((feature, index) => ({
    ...feature,
    icon: FEATURE_ICONS[index],
  }));

  const THEME_ICONS = ['🎄', '🎉', '✈️', '🍽️'];
  const pastThemes = p('themes', { returnObjects: true }).map((theme, index) => ({
    ...theme,
    icon: THEME_ICONS[index],
  }));

  const whoShouldJoin = p('join', { returnObjects: true });

  return (
    <div className="svc-page page-transition">
      <PageHero
        crumbs={[{ name: s('services'), url: '/special-projects' }, { name: p('crumb') }]}
        eyebrow={p('eyebrow')}
        uk="Розмова"
        title={
          <>
            {p('title')} <em>{p('titleAccent')}</em>
          </>
        }
        lede={p('lede')}
        aside={
          <div className="svc-ledger">
            <span className="svc-ledger__label">{p('ledgerLabel')}</span>
            <dl>
              <div>
                <dt>3–4</dt>
                <dd>{p('ledgerStudents')}</dd>
              </div>
              <div>
                <dt>60</dt>
                <dd>{p('ledgerMinutes')}</dd>
              </div>
              <div>
                <dt>
                  <em>$12</em>
                </dt>
                <dd>{p('ledgerPrice')}</dd>
              </div>
            </dl>
          </div>
        }
      >
        <div className="svc-actions">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {p('followInstagram')} <FiArrowUpRight />
          </a>
          <Link to="/contact" className="btn-outline">
            {p('askNext')}
          </Link>
        </div>
      </PageHero>

      {/* ─── How it works ─────────────────────────────────── */}
      <section className="page-section">
        <div className="section-shell">
          <motion.header {...reveal} className="section-head">
            <p className="eyebrow">{p('formatEyebrow')}</p>
            <h2>
              {p('formatTitle')} <em className="display-italic">{p('formatAccent')}</em>
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
            <p className="eyebrow">{p('themesEyebrow')}</p>
            <h2>
              {p('themesTitle')} <em className="display-italic">{p('themesAccent')}</em>
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
              <p className="eyebrow">{p('joinEyebrow')}</p>
              <h2>
                {p('joinTitle')} <em className="display-italic">{p('joinAccent')}</em>
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
                <strong>{p('noteLabel')}</strong> {p('note')}
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
            {p('closingTitle')} <em className="display-italic">{p('closingAccent')}</em>
          </h2>
          <p className="closing__sub">
            {p('closingSub')}
          </p>
          <div className="closing__actions">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {p('followInstagram')} <FiArrowRight />
            </a>
            <Link to="/contact" className="btn-outline">
              {p('askNext')}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SpeakingClub;
