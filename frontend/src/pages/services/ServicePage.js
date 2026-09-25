import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import PriceTable from '../../components/blocks/PriceTable';
import ReviewStrip from '../../components/blocks/ReviewStrip';
import GuideCTA from '../../components/blocks/GuideCTA';
import { Link, SITE_URL, localizePath, useLangPath } from '../../i18n/routing';
import { PRICES, perLesson, savingPercent } from '../../data/pricing';
import { serviceSchema, breadcrumbSchema, generateFAQSchema } from '../../utils/schemas';
import { clean } from '../../utils/text';
import { reveal, stagger } from '../../utils/motion';
import './services.css';

// Shared template for every service page. Copy lives in locales/*/services.json under
// services.<id>; prices come only from data/pricing.js and are interpolated as {{trial}}, {{standard}}…

const eur = (value) => `€${value}`;
export const PRICE_VARS = {
  trial: eur(PRICES.trial.price),
  trialMinutes: PRICES.trial.minutes,
  standard: eur(PRICES.standard.price),
  pack: eur(PRICES.intensive.price),
  packLessons: PRICES.intensive.lessons,
  packLesson: eur(perLesson('intensive')),
  packSaving: savingPercent('intensive'),
  club: eur(PRICES.speakingClub.price),
  clubMinutes: PRICES.speakingClub.minutes,
};

// Where each related-page card points (labels in services.shared.related.<key>)
const RELATED_PATHS = {
  ukrainian: '/services/ukrainian-lessons',
  ufrs: '/services/ukrainian-for-russian-speakers',
  english: '/services/english-lessons',
  russian: '/services/russian-lessons',
  club: '/services/speaking-club',
  writing: '/services/writing-translation',
  about: '/about',
  learn: '/learn',
  testimonials: '/testimonials',
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const pad = (i) => String(i + 1).padStart(2, '0');
const list = (value) => (Array.isArray(value) ? value : []);

// Strings mark their rose accent with *asterisks*
export const emphasise = (text, className) =>
  clean(text)
    .split(/\*(.+?)\*/)
    .map((part, i) =>
      i % 2 ? (
        <em key={i} className={className}>
          {part}
        </em>
      ) : (
        part
      )
    );

const SectionHead = ({ section, split }) => (
  <motion.header {...reveal} className={`section-head ${split && section.intro ? 'section-head--split' : ''}`}>
    <div>
      {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
      <h2>{emphasise(section.title, 'display-italic')}</h2>
    </div>
    {section.intro && <p>{section.intro}</p>}
  </motion.header>
);

// One content section; `kind` picks the layout
const Section = ({ section, tint }) => {
  const items = list(section.items);
  let body = null;

  if (section.kind === 'cards') {
    body = (
      <div className={`svc-cards ${items.length === 3 || items.length > 4 ? 'svc-cards--three' : ''}`}>
        {items.map((item, index) => (
          <motion.article key={item.title} className="svc-card" {...stagger(index % 3)}>
            <span className="num">{ROMAN[index]}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    );
  } else if (section.kind === 'checks') {
    body = (
      <ol className="svc-checks svc-checks--cols">
        {items.map((item, index) => (
          <motion.li key={item} {...stagger(index % 4)}>
            <span className="num">{pad(index)}</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ol>
    );
  } else if (section.kind === 'rows') {
    body = (
      <ol className="rule-list svc-steps">
        {items.map((item, index) => (
          <motion.li key={item.title} {...stagger(index % 3)}>
            <span className="num">{pad(index)}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.example && (
              <p className="svc-example">
                <span className="svc-example__wrong">{item.example.wrong}</span>
                <FiArrowRight aria-hidden="true" />
                <span className="svc-example__right">{item.example.right}</span>
              </p>
            )}
          </motion.li>
        ))}
      </ol>
    );
  } else if (section.kind === 'feature') {
    body = (
      <motion.article {...reveal} className="svc-feature">
        <div className="svc-feature__head">
          {section.chip && <span className="chip">{section.chip}</span>}
          <h3>{section.name}</h3>
          {section.original && (
            <p className="svc-feature__original" lang="uk">
              {section.original}
            </p>
          )}
          <dl>
            {list(section.meta).map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="prose-ink">
          {list(section.paragraphs).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.article>
    );
  }

  return (
    <section className={`page-section ${tint ? 'page-section--tint' : ''}`}>
      <div className="section-shell">
        <SectionHead section={section} split={section.kind !== 'feature'} />
        {body}
        {section.note && (
          <motion.p {...reveal} className="svc-note">
            {section.note}
          </motion.p>
        )}
      </div>
    </section>
  );
};

const ServicePage = ({
  id,
  serviceType,
  watermark,
  packages = ['trial', 'standard', 'intensive'],
  highlight = 'trial',
  reviews = [],
  related = [],
  guide = [],
  actions,
  closingActions,
}) => {
  const { t, i18n } = useTranslation();
  const { lng, path } = useLangPath();
  const has = (k) => i18n.exists(`services.${id}.${k}`);
  const p = (k, o) => t(`services.${id}.${k}`, { ...PRICE_VARS, ...o });
  const s = (k, o) => t(`services.shared.${k}`, { ...PRICE_VARS, ...o });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const url = `${SITE_URL}${localizePath(path, lng)}`;
  const sections = list(p('sections', { returnObjects: true }));
  const faq = list(p('faq.items', { returnObjects: true }));
  const ledger = has('ledger') ? p('ledger', { returnObjects: true }) : s('ledger', { returnObjects: true });
  const hasPrices = packages && packages.length > 0;

  const heroActions = actions || [
    { to: '/booking', label: s('bookTrial'), primary: true },
    { to: '/contact', label: s('askQuestion') },
  ];
  const endActions = closingActions || [{ to: '/booking', label: s('bookTrial'), primary: true }];

  const renderAction = (action, arrow) => {
    const className = action.primary ? 'btn-primary' : 'btn-outline';
    const icon = action.primary ? <FiArrowRight /> : arrow;
    if (action.href) {
      const external = action.href.startsWith('http');
      return (
        <a key={action.href} href={action.href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {action.label} {external ? <FiArrowUpRight /> : icon}
        </a>
      );
    }
    return (
      <Link key={action.to} to={action.to} className={className}>
        {action.label} {icon}
      </Link>
    );
  };

  const graph = [
    serviceSchema({
      name: p('schema.name'),
      description: p('seo.description'),
      url,
      lng,
      serviceType,
      offers: hasPrices ? packages.map((key) => ({ key, name: t(`widgets.prices.plans.${key}.name`) })) : [],
    }),
    breadcrumbSchema([
      { name: t('nav.home'), url: `${SITE_URL}${localizePath('/', lng)}` },
      { name: p('crumb'), url },
    ]),
  ];
  if (faq.length) graph.push(generateFAQSchema(faq));

  return (
    <div className="svc-page page-transition">
      <SEOHead title={p('seo.title')} description={p('seo.description')} schema={{ '@context': 'https://schema.org', '@graph': graph }} />

      <PageHero
        crumbs={[{ name: p('crumb') }]}
        eyebrow={p('eyebrow')}
        uk={watermark}
        testId={`svc-title-${id}`}
        title={emphasise(p('title'))}
        lede={p('lede')}
        aside={
          ledger && (
            <div className="svc-ledger">
              <span className="svc-ledger__label">{ledger.label}</span>
              <dl>
                {list(ledger.items).map((row) => (
                  <div key={row.label}>
                    <dt>{row.accent ? <em>{row.value}</em> : row.value}</dt>
                    <dd>{row.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        }
      >
        <div className="svc-actions">{heroActions.map((action) => renderAction(action))}</div>
      </PageHero>

      {sections.map((section, index) => (
        <Section key={section.title} section={section} tint={index % 2 === 1} />
      ))}

      {hasPrices && (
        <section className={`page-section ${sections.length % 2 === 1 ? 'page-section--tint' : ''}`} id="prices">
          <div className="section-shell">
            <SectionHead section={p('prices', { returnObjects: true })} split />
            <PriceTable packages={packages} highlight={highlight} />
            {has('prices.note') && (
              <motion.p {...reveal} className="svc-note">
                {p('prices.note')}
              </motion.p>
            )}
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="page-section">
          <div className="section-shell">
            <SectionHead section={p('reviews', { returnObjects: true })} />
            <ReviewStrip indices={reviews} />
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section className="page-section page-section--tint">
          <div className="section-shell">
            <SectionHead section={{ eyebrow: s('faqEyebrow'), title: p('faq.title') }} />
            <ol className="rule-list svc-faq">
              {faq.map((item, index) => (
                <motion.li key={item.q} {...stagger(index % 3)}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {(related.length > 0 || guide.includes(lng)) && (
        <section className="page-section">
          <div className="section-shell">
            {guide.includes(lng) && (
              <motion.div {...reveal} className="svc-guide">
                <GuideCTA />
              </motion.div>
            )}
            {related.length > 0 && (
              <>
                <SectionHead section={{ eyebrow: s('relatedEyebrow'), title: s('relatedTitle') }} />
                <ul className="svc-related">
                  {related.map((key, index) => (
                    <motion.li key={key} {...stagger(index)}>
                      <Link to={RELATED_PATHS[key]} className="svc-related__link">
                        <span className="svc-related__title">{s(`related.${key}.title`)}</span>
                        <span className="svc-related__text">{s(`related.${key}.text`)}</span>
                        <FiArrowUpRight className="svc-related__icon" aria-hidden="true" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      <section className="closing closing--long">
        <motion.div {...reveal} className="closing__inner">
          <p className="closing__uk">{p('closing.kicker')}</p>
          <h2>{emphasise(p('closing.title'), 'display-italic')}</h2>
          <p className="closing__sub">{p('closing.sub')}</p>
          <div className="closing__actions">{endActions.map((action) => renderAction(action, <FiArrowRight />))}</div>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicePage;
