import { z } from 'zod'
import { HexColor, UrlPath, NonEmptyString, LanguageCode } from './base'
import { DisplayModeSchema, OrientationSchema, TextDirectionSchema } from './enums'
import {
  ManifestIconSchema,
  ManifestScreenshotSchema,
  ManifestShortcutSchema,
  RelatedApplicationSchema,
} from './objects'

/**
 * Main PWA Manifest validation schema
 * Complete validation for all manifest properties
 */

export const ManifestSchema = z
  .object({
    // Required fields
    name: NonEmptyString.max(100, {
      message: 'Application name must not exceed 100 characters',
    }).describe('Full application name'),

    short_name: NonEmptyString.max(12, {
      message: 'Short name must not exceed 12 characters',
    }).describe('Short application name'),

    // Optional core fields
    description: z
      .string()
      .max(500, { message: 'Description should not exceed 500 characters' })
      .optional()
      .describe('Application description'),

    start_url: UrlPath.optional().describe('Application start URL'),
    scope: UrlPath.optional().describe('Application navigation scope'),

    // Display and behavior
    display: DisplayModeSchema.describe('Application display mode'),
    orientation: OrientationSchema.describe('Application orientation'),

    // Appearance
    theme_color: HexColor.optional().describe('Theme color'),
    background_color: HexColor.optional().describe('Background color'),

    // Localization
    lang: LanguageCode.describe('Application language'),
    dir: TextDirectionSchema.describe('Text direction'),

    // Content arrays
    categories: z
      .array(z.string().min(1))
      .max(10, { message: 'Maximum 10 categories allowed' })
      .describe('Application categories'),

    icons: z
      .array(ManifestIconSchema)
      .max(20, { message: 'Maximum 20 icons allowed' })
      .describe('Application icons'),

    screenshots: z
      .array(ManifestScreenshotSchema)
      .max(10, { message: 'Maximum 10 screenshots allowed' })
      .describe('Application screenshots'),

    shortcuts: z
      .array(ManifestShortcutSchema)
      .max(4, { message: 'Maximum 4 shortcuts allowed' })
      .describe('Application shortcuts'),

    related_applications: z
      .array(RelatedApplicationSchema)
      .max(5, { message: 'Maximum 5 related applications allowed' })
      .describe('Related applications'),

    prefer_related_applications: z.boolean().describe('Prefer related applications over PWA'),
  })
  .strict()
  .describe('PWA Manifest configuration')

// Type export
export type ManifestSettings = z.infer<typeof ManifestSchema>
