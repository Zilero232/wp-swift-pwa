/**
 * Manifest validation schemas
 * Centralized export for all validation schemas and types
 */

// Export schemas
export { ManifestSchema } from './manifest';

export {
  ManifestIconSchema,
  ManifestScreenshotSchema,
  ManifestShortcutSchema,
  RelatedApplicationSchema,
} from './objects';

export {
  DisplayModeSchema,
  OrientationSchema,
  TextDirectionSchema,
  IconPurposeSchema,
} from './enums';

export { HexColor, UrlPath, NonEmptyString, MimeType, Dimensions, LanguageCode } from './base';

// Export types
export type { ManifestSettings } from './manifest';
export type {
  ManifestIcon,
  ManifestScreenshot,
  ManifestShortcut,
  RelatedApplication,
} from './objects';
export type { DisplayMode, Orientation, TextDirection, IconPurpose } from './enums';
