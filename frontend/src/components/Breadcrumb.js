import React from 'react';
import { Link } from '../i18n/routing';
import { useTranslation } from 'react-i18next';
import './PageHero.css';

const Breadcrumb = ({ items }) => {
  const { t } = useTranslation();
  return (
    <nav className="breadcrumb" aria-label={t('breadcrumb.label')}>
      <Link to="/">{t('nav.home')}</Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="breadcrumb__sep" aria-hidden="true">
            ✦
          </span>
          {item.url ? (
            <Link to={item.url}>{item.name}</Link>
          ) : (
            <span aria-current="page">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
