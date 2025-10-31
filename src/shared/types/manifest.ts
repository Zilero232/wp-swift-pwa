/**
 * Display modes for PWA
 */
export enum DisplayMode {
  FULLSCREEN = 'fullscreen',
  STANDALONE = 'standalone',
  MINIMAL_UI = 'minimal-ui',
  BROWSER = 'browser',
}

/**
 * Screen orientation options
 */
export enum OrientationMode {
  ANY = 'any',
  NATURAL = 'natural',
  LANDSCAPE = 'landscape',
  LANDSCAPE_PRIMARY = 'landscape-primary',
  LANDSCAPE_SECONDARY = 'landscape-secondary',
  PORTRAIT = 'portrait',
  PORTRAIT_PRIMARY = 'portrait-primary',
  PORTRAIT_SECONDARY = 'portrait-secondary',
}

/**
 * Text direction
 */
export enum TextDirection {
  LTR = 'ltr',
  RTL = 'rtl',
  AUTO = 'auto',
}

/**
 * Icon purpose types
 */
export enum IconPurpose {
  ANY = 'any',
  MASKABLE = 'maskable',
  MONOCHROME = 'monochrome',
}

/**
 * Related application platforms
 */
export enum RelatedApplicationPlatform {
  PLAY = 'play',
  ITUNES = 'itunes',
  WINDOWS = 'windows',
  AMAZON = 'amazon',
  FACEBOOK = 'facebook',
  WEBAPP = 'webapp',
}

/**
 * Form factors
 */
export enum ScreenshotFormFactor {
  NARROW = 'narrow',
  WIDE = 'wide',
}

/**
 * Manifest icon
 */
export interface ManifestIcon {
  src: string;
  sizes?: string;
  type?: string;
  purpose?: string;
}

/**
 * Manifest screenshot
 */
export interface ManifestScreenshot {
  src: string;
  sizes?: string;
  type?: string;
  label?: string;
  form_factor?: ScreenshotFormFactor;
}

/**
 * Manifest shortcut
 */
export interface ManifestShortcut {
  name: string;
  short_name?: string;
  description?: string;
  url: string;
}

/**
 * Related application
 */
export interface RelatedApplication {
  platform: string;
  url?: string;
  id?: string;
}

/**
 * Complete PWA Manifest Settings
 */
export interface ManifestSettings {
  // Basic info
  name: string;
  short_name?: string;
  description?: string;

  // Display
  display?: string;
  orientation?: string;
  theme_color?: string;
  background_color?: string;

  // Navigation
  start_url?: string;
  scope?: string;

  // Localization
  lang?: string;
  dir?: string;

  // Categories
  categories?: string[];

  // Visual assets
  icons?: ManifestIcon[];
  screenshots?: ManifestScreenshot[];
  shortcuts?: ManifestShortcut[];

  // Related applications
  related_applications?: RelatedApplication[];
  prefer_related_applications?: boolean;
}
