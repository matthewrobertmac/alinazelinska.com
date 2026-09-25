import React from 'react';
import { motion } from 'framer-motion';
import { ease } from '../utils/motion';

const badges = [
  { value: '5.0', label: 'Perfect rating', note: 'across 3,500+ lessons' },
  { value: '500+', label: 'Students', note: 'in 30+ countries' },
  { value: '3,500+', label: 'Lessons', note: 'delivered online' },
  { value: '100%', label: 'Attendance', note: 'every lesson since 2022' },
];

const TrustBadges = () => (
  <dl className="trust-row">
    {badges.map((badge, index) => (
      <motion.div
        key={badge.label}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease, delay: index * 0.08 }}
      >
        <dt>{badge.value}</dt>
        <dd>
          <strong>{badge.label}</strong>
          <span>{badge.note}</span>
        </dd>
      </motion.div>
    ))}
  </dl>
);

export default TrustBadges;
