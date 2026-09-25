import React from 'react';
import { Link } from 'react-router-dom';
import './PageHero.css';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>

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
