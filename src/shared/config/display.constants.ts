import {
  DisplayMode,
  IconPurpose,
  OrientationMode,
  RelatedApplicationPlatform,
  ScreenshotFormFactor,
} from '@/shared/types/manifest';

/**
 * Icon purpose options for dropdown
 */
export const ICON_PURPOSE_OPTIONS = [
  {
    label: 'Any (обычная)',
    value: IconPurpose.ANY,
  },
  {
    label: 'Maskable (адаптивная)',
    value: IconPurpose.MASKABLE,
  },
  {
    label: 'Monochrome (монохромная)',
    value: IconPurpose.MONOCHROME,
  },
];

/**
 * Related application platforms options for dropdown
 */
export const RELATED_APPLICATION_PLATFORM_OPTIONS = [
  {
    label: 'Google Play',
    value: RelatedApplicationPlatform.PLAY,
  },
  {
    label: 'Apple App Store',
    value: RelatedApplicationPlatform.ITUNES,
  },
  {
    label: 'Windows Store',
    value: RelatedApplicationPlatform.WINDOWS,
  },
  {
    label: 'Amazon Appstore',
    value: RelatedApplicationPlatform.AMAZON,
  },
  {
    label: 'Web App',
    value: RelatedApplicationPlatform.WEBAPP,
  },
];

/**
 * Screenshot form factor options for dropdown
 */
export const SCREENSHOT_FORM_FACTOR_OPTIONS = [
  {
    label: 'Narrow (Узкий)',
    value: ScreenshotFormFactor.NARROW,
  },
  {
    label: 'Wide (Широкий)',
    value: ScreenshotFormFactor.WIDE,
  },
];

/**
 * Display mode options for dropdown
 */
export const DISPLAY_OPTIONS = [
  {
    label: 'Fullscreen (Полный экран)',
    value: DisplayMode.FULLSCREEN,
  },
  {
    label: 'Standalone (Отдельное приложение)',
    value: DisplayMode.STANDALONE,
  },
  {
    label: 'Minimal UI (Минимальный UI)',
    value: DisplayMode.MINIMAL_UI,
  },
  {
    label: 'Browser (Браузер)',
    value: DisplayMode.BROWSER,
  },
];

/**
 * Orientation options for dropdown
 */
export const ORIENTATION_OPTIONS = [
  {
    label: 'Any (Любая)',
    value: OrientationMode.ANY,
  },
  {
    label: 'Natural (Естественная)',
    value: OrientationMode.NATURAL,
  },
  {
    label: 'Landscape (Альбомная)',
    value: OrientationMode.LANDSCAPE,
  },
  {
    label: 'Portrait (Портретная)',
    value: OrientationMode.PORTRAIT,
  },
  {
    label: 'Landscape Primary',
    value: OrientationMode.LANDSCAPE_PRIMARY,
  },
  {
    label: 'Landscape Secondary',
    value: OrientationMode.LANDSCAPE_SECONDARY,
  },
  {
    label: 'Portrait Primary',
    value: OrientationMode.PORTRAIT_PRIMARY,
  },
  {
    label: 'Portrait Secondary',
    value: OrientationMode.PORTRAIT_SECONDARY,
  },
];
