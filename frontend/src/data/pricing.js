// Single source of truth for prices. PayPal charges in EUR; other currencies are shown only as
// an approximate conversion. Used by the price table, booking, service pages and structured data.
export const PRICE_CURRENCY = 'EUR';

export const PRICES = {
  trial: { price: 15, minutes: 30, lessons: 1 },
  standard: { price: 30, minutes: 60, lessons: 1 },
  // 5 × 60 min for €120 → €24 per lesson, 20% off the standard price
  intensive: { price: 120, minutes: 60, lessons: 5 },
  // Small-group Ukrainian speaking club (3–4 students)
  speakingClub: { price: 11, minutes: 60, lessons: 1 },
};

export const perLesson = (key) => PRICES[key].price / PRICES[key].lessons;
export const savingPercent = (key) =>
  Math.round((1 - perLesson(key) / PRICES.standard.price) * 100);
