// Shared framer-motion presets for the Ink & Rosewater pages.
export const ease = [0.16, 1, 0.3, 1];

// Fade-and-rise as a section scrolls into view
export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1, ease },
};

// Same, staggered for the i-th item of a list
export const stagger = (i) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease, delay: i * 0.07 },
});
