import React from 'react';
import { Link } from '../../i18n/routing';

// Article text carries a little inline markup: **bold**, *italic* and [text](/internal/path).
// Internal paths are unprefixed; Link adds the current language.
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

// Stress marks (a combining acute after the vowel) sit badly in the display serif,
// so the stressed vowel is drawn in the accent colour instead
export const stressed = (text = '') =>
  String(text)
    .split(/(\S\u0301)/)
    .filter(Boolean)
    .map((part, i) =>
      part.length === 2 && part[1] === '\u0301' ? (
        <span key={i} className="stress">
          {part[0]}
        </span>
      ) : (
        part
      )
    );

const wrap = (children, i, Tag) => <Tag key={i}>{stressed(children)}</Tag>;

export const inline = (text = '') =>
  String(text)
    .split(TOKEN)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return wrap(part.slice(2, -2), i, 'strong');
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        return href.startsWith('/') ? (
          <Link key={i} to={href}>
            {stressed(label)}
          </Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
      if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return wrap(part.slice(1, -1), i, 'em');
      return <React.Fragment key={i}>{stressed(part)}</React.Fragment>;
    });

// Plain text for meta tags and structured data
export const plain = (text = '') =>
  String(text)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\u0301/g, '');
