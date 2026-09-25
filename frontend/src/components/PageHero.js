import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from './Breadcrumb';
import './PageHero.css';
import { ease } from '../utils/motion';

// Shared opening for inner pages: breadcrumb, eyebrow, display title, lede.
// `title` may contain <em> for the italic rose accent; `children` render below the lede (actions, stats…);
// `aside` renders in a right-hand column on wide screens.
const PageHero = ({ crumbs, eyebrow, title, lede, children, aside, uk, testId, compact = false }) => (
  <section className={`page-hero ${compact ? 'page-hero--compact' : ''} ${aside ? 'page-hero--split' : ''}`}>
    <div className="page-hero__aura" aria-hidden="true" />
    {uk && (
      <span className="page-hero__watermark" lang="uk" aria-hidden="true">
        {uk}
      </span>
    )}

    <div className="page-hero__inner">
      <div className="page-hero__copy">
        {crumbs && <Breadcrumb items={crumbs} />}

        {eyebrow && (
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            {eyebrow}
          </motion.p>
        )}

        <h1 className="page-hero__title" data-testid={testId}>
          <motion.span
            className="block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
          >
            {title}
          </motion.span>
        </h1>

        {lede && (
          <motion.p
            className="page-hero__lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.45 }}
          >
            {lede}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="page-hero__extra"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.6 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {aside && (
        <motion.div
          className="page-hero__aside"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.35 }}
        >
          {aside}
        </motion.div>
      )}
    </div>
  </section>
);

export default PageHero;
