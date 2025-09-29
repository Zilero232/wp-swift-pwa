// Plugin Information
export const PLUGIN_NAME = 'Swift PWA'
export const PLUGIN_VERSION = '1.0.0'
export const PLUGIN_SLUG = 'swift-pwa'

// Cache Strategies for Service Worker
export const CACHE_STRATEGIES = [
  { label: 'Cache First', value: 'cache_first' },
  { label: 'Network First', value: 'network_first' },
  { label: 'Cache Only', value: 'cache_only' },
  { label: 'Network Only', value: 'network_only' },
  { label: 'Stale While Revalidate', value: 'stale_while_revalidate' },
]

// Icon Types for Manifest Icons
export const ICON_TYPES = [
  { label: 'PNG', value: 'image/png' },
  { label: 'JPEG', value: 'image/jpeg' },
  { label: 'SVG', value: 'image/svg+xml' },
  { label: 'WebP', value: 'image/webp' },
  { label: 'ICO', value: 'image/x-icon' },
  { label: 'GIF', value: 'image/gif' },
]

// Icon Purposes for Manifest Icons
export const ICON_PURPOSES = [
  { label: 'Any', value: 'any' },
  { label: 'Maskable', value: 'maskable' },
  { label: 'Monochrome', value: 'monochrome' },
]

// Display Modes for PWA Manifest
export const DISPLAY_OPTIONS = [
  { label: 'Standalone', value: 'standalone' },
  { label: 'Fullscreen', value: 'fullscreen' },
  { label: 'Minimal UI', value: 'minimal-ui' },
  { label: 'Browser', value: 'browser' },
]

// Orientation Options for PWA Manifest
export const ORIENTATION_OPTIONS = [
  { label: 'Any', value: 'any' },
  { label: 'Natural', value: 'natural' },
  { label: 'Portrait', value: 'portrait' },
  { label: 'Landscape', value: 'landscape' },
  { label: 'Portrait Primary', value: 'portrait-primary' },
  { label: 'Portrait Secondary', value: 'portrait-secondary' },
  { label: 'Landscape Primary', value: 'landscape-primary' },
  { label: 'Landscape Secondary', value: 'landscape-secondary' },
]

// Text Direction Options
export const TEXT_DIRECTION_OPTIONS = [
  { label: 'Left to Right', value: 'ltr' },
  { label: 'Right to Left', value: 'rtl' },
  { label: 'Auto', value: 'auto' },
]

// Device Configurations for Preview
export const DEVICE_CONFIGS = [
  {
    label: 'iPhone 12',
    value: 'iphone-12',
    width: 390,
    height: 844,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    pixelRatio: 3,
  },
  {
    label: 'iPhone 12 Pro Max',
    value: 'iphone-12-pro-max',
    width: 428,
    height: 926,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    pixelRatio: 3,
  },
  {
    label: 'Samsung Galaxy S21',
    value: 'galaxy-s21',
    width: 384,
    height: 854,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36',
    pixelRatio: 2.75,
  },
  {
    label: 'iPad Pro',
    value: 'ipad-pro',
    width: 1024,
    height: 1366,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    pixelRatio: 2,
  },
  {
    label: 'Desktop',
    value: 'desktop',
    width: 1920,
    height: 1080,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    pixelRatio: 1,
  },
]

// PWA Features for Compatibility Check
export const PWA_FEATURES = [
  'Web App Manifest',
  'Service Worker',
  'Offline Functionality',
  'App Installation',
  'Push Notifications',
  'Responsive Design',
  'HTTPS Required',
  'App Shortcuts',
]

// Common Icon Sizes
export const COMMON_ICON_SIZES = [
  '72x72',
  '96x96',
  '128x128',
  '144x144',
  '152x152',
  '192x192',
  '384x384',
  '512x512',
]

// Default Exclude Patterns for Service Worker
export const DEFAULT_EXCLUDE_PATTERNS = [
  '/wp-admin/',
  '/wp-login.php',
  '/wp-json/',
  '*.php',
  '/preview/',
]

// Network Timeout Options (in milliseconds)
export const NETWORK_TIMEOUT_OPTIONS = [
  { label: '3 seconds', value: 3000 },
  { label: '5 seconds', value: 5000 },
  { label: '10 seconds', value: 10000 },
  { label: '15 seconds', value: 15000 },
  { label: '30 seconds', value: 30000 },
]

// Language Options (common languages)
export const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'en' },
  { label: 'Русский', value: 'ru' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
  { label: '中文', value: 'zh' },
  { label: '日本語', value: 'ja' },
  { label: 'العربية', value: 'ar' },
]

// App Categories for Manifest
export const APP_CATEGORIES = [
  'business',
  'education',
  'entertainment',
  'finance',
  'fitness',
  'food',
  'games',
  'government',
  'health',
  'kids',
  'lifestyle',
  'magazines',
  'medical',
  'music',
  'navigation',
  'news',
  'personalization',
  'photo',
  'politics',
  'productivity',
  'security',
  'shopping',
  'social',
  'sports',
  'travel',
  'utilities',
  'weather',
]

// Related Application Platforms
export const RELATED_APP_PLATFORMS = [
  { label: 'Google Play Store', value: 'play' },
  { label: 'Apple App Store', value: 'itunes' },
  { label: 'Microsoft Store', value: 'windows' },
  { label: 'Chrome Web Store', value: 'chrome_web_store' },
  { label: 'Amazon Appstore', value: 'amazon' },
]

// API Endpoints
export const API_ENDPOINTS = {
  SAVE_MANIFEST: '/wp-json/swift-pwa-api/v1/manifest',
  SAVE_SERVICE_WORKER: '/wp-json/swift-pwa-api/v1/service-worker',
  TEST_INSTALLATION: '/wp-json/swift-pwa-api/v1/test/installation',
  GENERATE_MANIFEST: '/wp-json/swift-pwa-api/v1/generate/manifest',
  GENERATE_SERVICE_WORKER: '/wp-json/swift-pwa-api/v1/generate/service-worker',
}

// Validation Rules
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 45,
  SHORT_NAME_MAX_LENGTH: 12,
  DESCRIPTION_MAX_LENGTH: 300,
  START_URL_PATTERN: /^\/.*$/,
  COLOR_PATTERN: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  ICON_MIN_SIZE: 48,
  REQUIRED_ICON_SIZES: ['192x192', '512x512'],
}

// Default Values
export const DEFAULT_VALUES = {
  THEME_COLOR: '#000000',
  BACKGROUND_COLOR: '#ffffff',
  START_URL: '/',
  SCOPE: '/',
  DISPLAY: 'standalone',
  ORIENTATION: 'portrait',
  LANG: 'en',
  DIR: 'ltr',
  CACHE_VERSION: '1.0.0',
  NETWORK_TIMEOUT: 5000,
}
