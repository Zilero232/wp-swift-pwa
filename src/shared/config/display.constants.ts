import {
  DisplayMode,
  IconPurpose,
  OrientationMode,
  RelatedApplicationPlatform,
  ScreenshotFormFactor,
} from "@/shared/types/manifest";

/**
 * Icon purpose options for dropdown
 */
export const ICON_PURPOSE_OPTIONS = [
  {
    label: "Any (normal)",
    value: IconPurpose.ANY,
  },
  {
    label: "Maskable (adaptive)",
    value: IconPurpose.MASKABLE,
  },
  {
    label: "Monochrome (monochrome)",
    value: IconPurpose.MONOCHROME,
  },
];

/**
 * Related application platforms options for dropdown
 */
export const RELATED_APPLICATION_PLATFORM_OPTIONS = [
  {
    label: "Google Play",
    value: RelatedApplicationPlatform.PLAY,
  },
  {
    label: "Apple App Store",
    value: RelatedApplicationPlatform.ITUNES,
  },
  {
    label: "Windows Store",
    value: RelatedApplicationPlatform.WINDOWS,
  },
  {
    label: "Amazon Appstore",
    value: RelatedApplicationPlatform.AMAZON,
  },
  {
    label: "Web App",
    value: RelatedApplicationPlatform.WEBAPP,
  },
];

/**
 * Screenshot form factor options for dropdown
 */
export const SCREENSHOT_FORM_FACTOR_OPTIONS = [
  {
    label: "Narrow (narrow)",
    value: ScreenshotFormFactor.NARROW,
  },
  {
    label: "Wide (wide)",
    value: ScreenshotFormFactor.WIDE,
  },
];

/**
 * Display mode options for dropdown
 */
export const DISPLAY_OPTIONS = [
  {
    label: "Fullscreen (fullscreen)",
    value: DisplayMode.FULLSCREEN,
  },
  {
    label: "Standalone (standalone)",
    value: DisplayMode.STANDALONE,
  },
  {
    label: "Minimal UI (minimal UI)",
    value: DisplayMode.MINIMAL_UI,
  },
  {
    label: "Browser (browser)",
    value: DisplayMode.BROWSER,
  },
];

/**
 * Orientation options for dropdown
 */
export const ORIENTATION_OPTIONS = [
  {
    label: "Any (any)",
    value: OrientationMode.ANY,
  },
  {
    label: "Natural (natural)",
    value: OrientationMode.NATURAL,
  },
  {
    label: "Landscape (landscape)",
    value: OrientationMode.LANDSCAPE,
  },
  {
    label: "Portrait (portrait)",
    value: OrientationMode.PORTRAIT,
  },
  {
    label: "Landscape Primary",
    value: OrientationMode.LANDSCAPE_PRIMARY,
  },
  {
    label: "Landscape Secondary",
    value: OrientationMode.LANDSCAPE_SECONDARY,
  },
  {
    label: "Portrait Primary",
    value: OrientationMode.PORTRAIT_PRIMARY,
  },
  {
    label: "Portrait Secondary",
    value: OrientationMode.PORTRAIT_SECONDARY,
  },
];
