/**
 * PWA application categories
 */
export const APP_CATEGORIES = [
  'business',
  'education',
  'entertainment',
  'finance',
  'fitness',
  'food',
  'games',
  'health',
  'lifestyle',
  'news',
  'productivity',
  'shopping',
  'social',
  'sports',
  'travel',
  'utilities',
];

/**
 * Category type for TypeScript
 */
export type AppCategory = (typeof APP_CATEGORIES)[number];
