import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext(null);

import { PRICES } from '../data/pricing';

// Base prices in EUR (from data/pricing.js)
const BASE_PRICES_EUR = {
  trial: PRICES.trial.price,
  standard: PRICES.standard.price,
  intensive: PRICES.intensive.price,
};

// Exchange rates (EUR as base)
const EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.10,
  GBP: 0.86,
  UAH: 45.50,
  PLN: 4.32,
  CAD: 1.50,
  AUD: 1.65,
  CHF: 0.95,
  JPY: 163.50,
  CNY: 7.85,
};

// Currency symbols and formatting
const CURRENCY_INFO = {
  EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  UAH: { symbol: '₴', name: 'Ukrainian Hryvnia', locale: 'uk-UA' },
  PLN: { symbol: 'zł', name: 'Polish Zloty', locale: 'pl-PL' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc', locale: 'de-CH' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('EUR');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detectUserCurrency();
  }, []);

  // PayPal charges in EUR, so EUR is shown by default. A visitor can pick another currency to see an
  // approximate conversion; no IP lookup, so no third-party request.
  const detectUserCurrency = () => {
    try {
      const savedCurrency = localStorage.getItem('preferred_currency');
      if (savedCurrency && CURRENCY_INFO[savedCurrency]) setCurrency(savedCurrency);
    } catch {}
    setLoading(false);
  };

  const changeCurrency = (newCurrency) => {
    if (CURRENCY_INFO[newCurrency]) {
      setCurrency(newCurrency);
      localStorage.setItem('preferred_currency', newCurrency);
    }
  };

  const convertPrice = (priceInEur) => {
    const rate = EXCHANGE_RATES[currency] || 1;
    return priceInEur * rate;
  };

  const formatPrice = (priceInEur) => {
    const converted = convertPrice(priceInEur);
    const info = CURRENCY_INFO[currency];
    
    // Round to 2 decimal places, or 0 for JPY
    // Whole numbers: EUR prices are round, and other currencies are approximate anyway
    const decimals = 0;
    const rounded = Math.round(converted * Math.pow(10, decimals)) / Math.pow(10, decimals);
    
    return new Intl.NumberFormat(info.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(rounded);
  };

  const getPackagePrices = () => {
    return {
      trial: {
        eur: BASE_PRICES_EUR.trial,
        converted: convertPrice(BASE_PRICES_EUR.trial),
        formatted: formatPrice(BASE_PRICES_EUR.trial),
      },
      standard: {
        eur: BASE_PRICES_EUR.standard,
        converted: convertPrice(BASE_PRICES_EUR.standard),
        formatted: formatPrice(BASE_PRICES_EUR.standard),
      },
      intensive: {
        eur: BASE_PRICES_EUR.intensive,
        converted: convertPrice(BASE_PRICES_EUR.intensive),
        formatted: formatPrice(BASE_PRICES_EUR.intensive),
      },
    };
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        isApproximate: currency !== 'EUR',
        loading,
        changeCurrency,
        convertPrice,
        formatPrice,
        getPackagePrices,
        currencies: Object.keys(CURRENCY_INFO),
        currencyInfo: CURRENCY_INFO,
        basePricesEur: BASE_PRICES_EUR,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
