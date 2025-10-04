import { z } from 'zod';
import { NonEmptyString, MimeType, Dimensions } from './base';
import { IconPurposeSchema } from './enums';

/**
 * Complex object validation schemas
 * Nested objects used in PWA manifest
 */

export const ManifestIconSchema = z
  .object({
    src: NonEmptyString.describe('Icon source URL'),
    sizes: Dimensions.describe('Icon dimensions'),
    type: MimeType.describe('Icon MIME type'),
    purpose: IconPurposeSchema.optional().describe('Icon usage purpose'),
  })
  .strict()
  .describe('PWA icon configuration');

export const ManifestScreenshotSchema = z
  .object({
    src: NonEmptyString.describe('Screenshot source URL'),
    sizes: Dimensions.describe('Screenshot dimensions'),
    type: MimeType.describe('Screenshot MIME type'),
    label: z.string().optional().describe('Screenshot description'),
  })
  .strict()
  .describe('PWA screenshot configuration');

export const ManifestShortcutSchema = z
  .object({
    name: NonEmptyString.max(30, {
      message: 'Shortcut name should not exceed 30 characters',
    }).describe('Shortcut display name'),
    short_name: z
      .string()
      .max(12, { message: 'Short name should not exceed 12 characters' })
      .optional()
      .describe('Shortcut abbreviated name'),
    description: z
      .string()
      .max(200, { message: 'Description should not exceed 200 characters' })
      .optional()
      .describe('Shortcut description'),
    url: NonEmptyString.url({ message: 'Must be a valid URL' }).describe('Shortcut target URL'),
    icons: z.array(ManifestIconSchema).optional().describe('Shortcut icons'),
  })
  .strict()
  .describe('PWA shortcut configuration');

export const RelatedApplicationSchema = z
  .object({
    platform: NonEmptyString.describe('Application platform'),
    url: z.string().url().optional().describe('Application URL'),
    id: z.string().optional().describe('Application identifier'),
  })
  .strict()
  .describe('Related application configuration');

// Type exports
export type ManifestIcon = z.infer<typeof ManifestIconSchema>;
export type ManifestScreenshot = z.infer<typeof ManifestScreenshotSchema>;
export type ManifestShortcut = z.infer<typeof ManifestShortcutSchema>;
export type RelatedApplication = z.infer<typeof RelatedApplicationSchema>;
