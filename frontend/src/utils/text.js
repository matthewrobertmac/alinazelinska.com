import React from 'react';

// i18n strings carry their own trailing arrows and emoji (flags included); the redesign draws its own ornament.
export const clean = (s = '') =>
  s
    .replace(/\s*→\s*$/, '')
    .replace(/(\s*(\p{Extended_Pictographic}|\p{Regional_Indicator}|‍|️))+\s*$/u, '')
    .trim();

// Italicise a heading's rose accent: the clause after " — " when present, otherwise the last word.
export const accent = (text, { dash = false } = {}) => {
  const s = clean(text);
  if (dash) {
    const [head, ...rest] = s.split(' — ');
    if (!rest.length) return <em>{s}</em>;
    return (
      <>
        {head} — <em>{rest.join(' — ')}</em>
      </>
    );
  }
  const i = s.lastIndexOf(' ');
  if (i < 0) return <em>{s}</em>;
  return (
    <>
      {s.slice(0, i)} <em>{s.slice(i + 1)}</em>
    </>
  );
};
