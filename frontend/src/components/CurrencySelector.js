import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import './CurrencySelector.css';

const CurrencySelector = ({ compact = false }) => {
  const { t } = useTranslation();
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
    <div className="currency-select" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`currency-select__trigger ${isOpen ? 'is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('widgets.currency.change')}
        data-testid="currency-selector"
      >
        <span className="currency-select__symbol">{currentInfo.symbol}</span>
        {!compact && <span className="currency-select__code">{currency}</span>}
        <FiChevronDown className="currency-select__chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="currency-select__menu" role="listbox">
          {currencies.map((code) => {
            const info = currencyInfo[code];
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={currency === code}
                onClick={() => {
                  changeCurrency(code);
                  setIsOpen(false);
                }}
                className={`currency-select__option ${currency === code ? 'is-active' : ''}`}
                data-testid={`currency-${code}`}
              >
                <span className="currency-select__symbol">{info.symbol}</span>
                <span className="currency-select__code">{code}</span>
                <span className="currency-select__name">
                  {t(`widgets.currency.names.${code}`, { defaultValue: info.name })}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
