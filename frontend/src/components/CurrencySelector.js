import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector = ({ compact = false }) => {
  const { currency, changeCurrency, currencies, currencyInfo } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentInfo = currencyInfo[currency];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-all duration-300"
        aria-label="Change currency"
        data-testid="currency-selector"
      >
        <span className="font-medium">{currentInfo.symbol}</span>
        {!compact && <span className="text-sm hidden sm:inline">{currency}</span>}
        <FiChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto">
          {currencies.map((code) => {
            const info = currencyInfo[code];
            return (
              <button
                key={code}
                onClick={() => {
                  changeCurrency(code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-[var(--color-bg-secondary)] transition-colors ${
                  currency === code ? 'bg-[var(--color-bg-secondary)] text-[var(--color-accent)]' : ''
                }`}
                data-testid={`currency-${code}`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-medium w-8">{info.symbol}</span>
                  <span className="text-sm">{code}</span>
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">{info.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
