import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiUsers, FiGlobe, FiClock } from 'react-icons/fi';

const TrustBadges = ({ variant = 'default' }) => {
  const badges = [
    {
      icon: <FiStar className="w-6 h-6" />,
      title: "5-Star Rated",
      description: "200+ verified reviews",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "300+ Students",
      description: "One-on-one lessons",
      color: "from-[var(--color-accent)] to-pink-600"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "30+ Countries",
      description: "Worldwide students",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "3+ Years",
      description: "Teaching experience",
      color: "from-purple-400 to-pink-500"
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] rounded-full"
          >
            <div className={`p-2 rounded-full bg-gradient-to-br ${badge.color}`}>
              <div className="text-white">
                {badge.icon}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm">{badge.title}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="card p-6 text-center hover-lift"
        >
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto mb-3`}>
            <div className="text-white">
              {badge.icon}
            </div>
          </div>
          <h3 className="font-bold mb-1">{badge.title}</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustBadges;
