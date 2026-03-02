import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext(null);

// Base prices in EUR
const BASE_PRICES_EUR = {
  trial: 15,      // 30-minute trial
  standard: 30,   // 60-minute lesson
  intensive: 120, // 5 x 60-minute lessons
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

// Country to currency mapping
const COUNTRY_CURRENCY = {
  US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD',
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR', IE: 'EUR', FI: 'EUR',
  UA: 'UAH', PL: 'PLN', CH: 'CHF', JP: 'JPY', CN: 'CNY',
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('EUR');
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detectUserCurrency();
  }, []);

  const detectUserCurrency = async () => {
    // Check localStorage first
    const savedCurrency = localStorage.getItem('preferred_currency');
    if (savedCurrency && CURRENCY_INFO[savedCurrency]) {
      setCurrency(savedCurrency);
      setLoading(false);
      return;
    }

    // Try to detect from browser/geolocation
    try {
      // Use free IP geolocation API
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        const detectedCountry = data.country_code;
        setCountry(detectedCountry);
        
        const detectedCurrency = COUNTRY_CURRENCY[detectedCountry] || 'EUR';
        setCurrency(detectedCurrency);
        localStorage.setItem('preferred_currency', detectedCurrency);
      }
    } catch (error) {
      console.log('Could not detect location, defaulting to EUR');
      // Fallback: try to detect from browser language
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('en-US')) setCurrency('USD');
      else if (browserLang.startsWith('en-GB')) setCurrency('GBP');
      else if (browserLang.startsWith('uk')) setCurrency('UAH');
      else if (browserLang.startsWith('pl')) setCurrency('PLN');
      else if (browserLang.startsWith('ja')) setCurrency('JPY');
      else if (browserLang.startsWith('zh')) setCurrency('CNY');
    } finally {
      setLoading(false);
    }
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
    const decimals = currency === 'JPY' ? 0 : 2;
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
        country,
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
