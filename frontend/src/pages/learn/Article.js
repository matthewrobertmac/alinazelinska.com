import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiClock } from 'react-icons/fi';
import PageHero from '../../components/PageHero';
import SEOHead from '../../components/SEOHead';
import GuideCTA from '../../components/blocks/GuideCTA';
import { ARTICLES, SITE_URL, Link, localizePath, useLangPath } from '../../i18n/routing';
import { getArticle } from '../../content/articles';
import { articleSchema, breadcrumbSchema, generateFAQSchema } from '../../utils/schemas';
import { PRICES } from '../../data/pricing';
import { reveal } from '../../utils/motion';
import { inline, plain } from './inline';
import './learn.css';

const pad = (i) => String(i + 1).padStart(2, '0');
const sectionId = (i) => `section-${i + 1}`;

const Block = ({ block, labels, t }) => {
  if (block.p) return <p>{inline(block.p)}</p>;
  if (block.h3) return <h3>{inline(block.h3)}</h3>;
  if (block.list) {
    const Tag = block.ordered ? 'ol' : 'ul';
    return (
      <Tag className={`article-list ${block.ordered ? 'article-list--ordered' : ''}`}>
        {block.list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </Tag>
    );
  }
  if (block.example) {
    const { a, b, note, aLabel, bLabel } = block.example;
    return (
      <figure className="article-example">
        <div className="article-example__pair">
          {a && (
            <div className="article-example__a">
              <span>{aLabel || labels.a || t('learn.article.labelA')}</span>
              <p>{inline(a)}</p>
            </div>
          )}
          <div className="article-example__b">
            <span>{bLabel || labels.b || t('learn.article.labelB')}</span>
            <p>{inline(b)}</p>
          </div>
        </div>
        {note && <figcaption>{inline(note)}</figcaption>}
      </figure>
    );
  }
  if (block.tip) {
    return (
      <aside className="article-tip">
        <span className="article-tip__label">{t('learn.article.tip')}</span>
        <p>{inline(block.tip)}</p>
      </aside>
    );
  }
  return null;
};

const Article = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { lng } = useLangPath();
  const article = getArticle(slug, lng);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Not written for this language's readers: send them to their own learning hub
  if (!article) return <Navigate to={localizePath('/learn', lng)} replace />;

  const url = `${SITE_URL}${localizePath(`/learn/${slug}`, lng)}`;
  const sections = article.sections || [];
  const faq = article.faq || [];
  const related = (article.related || [])
    .map((other) => ({ slug: other, article: getArticle(other, lng) }))
    .filter((item) => item.article);
  const serviceKey = (article.service || '').replace('/services/', '');
  const date = new Intl.DateTimeFormat(lng, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(article.datePublished)
  );
  const trialPrice = `€${PRICES.trial.price}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      articleSchema({
        headline: plain(article.h1),
        description: article.description,
        url,
        lng,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
      }),
      breadcrumbSchema([
        { name: t('nav.home'), url: `${SITE_URL}${localizePath('/', lng)}` },
        { name: t('learn.crumb'), url: `${SITE_URL}${localizePath('/learn', lng)}` },
        { name: plain(article.h1), url },
      ]),
      ...(faq.length ? [generateFAQSchema(faq)] : []),
    ],
  };

  return (
    <div className="learn-page article-page page-transition">
      <SEOHead
        title={article.title}
        description={article.description}
        type="article"
        languages={ARTICLES[slug]}
        schema={schema}
      />

      <PageHero
        compact
        crumbs={[{ name: t('learn.crumb'), url: '/learn' }, { name: plain(article.h1) }]}
        eyebrow={t('learn.article.eyebrow')}
        uk="Мова"
        title={inline(article.h1)}
        lede={inline(article.lede)}
      >
        <p className="article-meta">
          <span>{t('learn.article.by')}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.datePublished}>{date}</time>
          <span aria-hidden="true">·</span>
          <span>
            <FiClock aria-hidden="true" /> {t('learn.readTime', { minutes: article.readingMinutes })}
          </span>
        </p>
      </PageHero>

      <div className="section-shell article-layout">
        {sections.length > 2 && (
          <nav className="article-toc" aria-label={t('learn.article.contents')}>
            <details open>
              <summary>{t('learn.article.contents')}</summary>
              <ol>
                {sections.map((section, i) => (
                  <li key={i}>
                    <a href={`#${sectionId(i)}`}>
                      <span className="num">{pad(i)}</span> {plain(section.h2)}
                    </a>
                  </li>
                ))}
                {faq.length > 0 && (
                  <li>
                    <a href="#faq">
                      <span className="num">{pad(sections.length)}</span> {t('learn.article.faq')}
                    </a>
                  </li>
                )}
              </ol>
            </details>
          </nav>
        )}

        <article className="article-body">
          {sections.map((section, i) => (
            <section key={i} id={sectionId(i)} className="article-section">
              <h2>{inline(section.h2)}</h2>
              {(section.blocks || []).map((block, j) => (
                <Block key={j} block={block} labels={article.exampleLabels || {}} t={t} />
              ))}
            </section>
          ))}

          {faq.length > 0 && (
            <section id="faq" className="article-section article-faq">
              <h2>{t('learn.article.faq')}</h2>
              <dl>
                {faq.map((item, i) => (
                  <div key={i}>
                    <dt>{item.q}</dt>
                    <dd>{inline(item.a)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <motion.aside {...reveal} className="article-trial">
            <p className="eyebrow">{t('learn.article.trial.eyebrow')}</p>
            <h2>{t('learn.article.trial.title')}</h2>
            <p>{t('learn.article.trial.text', { price: trialPrice, minutes: PRICES.trial.minutes })}</p>
            <div className="article-trial__actions">
              <Link to="/booking" className="btn-primary">
                {t('learn.article.trial.cta', { price: trialPrice })} <FiArrowRight />
              </Link>
              {article.service && (
                <Link to={article.service} className="btn-outline">
                  {t(`learn.services.${serviceKey}`)} <FiArrowUpRight />
                </Link>
              )}
            </div>
          </motion.aside>
        </article>
      </div>

      <section className="page-section page-section--tint article-after">
        <div className="section-shell">
          <GuideCTA />

          {related.length > 0 && (
            <div className="article-related">
              <h2>{t('learn.article.related')}</h2>
              <ul className="learn-cards">
                {related.map(({ slug: other, article: item }) => (
                  <li key={other}>
                    <Link to={`/learn/${other}`} className="learn-card">
                      <span className="learn-card__meta">
                        {t('learn.readTime', { minutes: item.readingMinutes })}
                      </span>
                      <h3>{plain(item.h1)}</h3>
                      <p>{plain(item.lede)}</p>
                      <span className="learn-card__more">
                        {t('learn.hub.read')} <FiArrowRight />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Article;
