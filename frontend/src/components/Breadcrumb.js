import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-8" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors"
      >
        <FiHome className="w-4 h-4" />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <FiChevronRight className="w-4 h-4" />
          {item.url ? (
            <Link 
              to={item.url} 
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-[var(--color-text)]">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
