import { z } from 'zod';

/**
 * Base validation schemas
 * Reusable primitives for complex validations
 */

export const HexColor = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Color must be a valid hex color (e.g., #ff0000 or #f00)',
  })
  .describe('Hex color value');

export const UrlPath = z
  .string()
  .startsWith('/', { message: 'URL path must start with "/"' })
  .describe('URL path starting with /');

export const NonEmptyString = z
  .string()
  .min(1, { message: 'This field is required' })
  .describe('Non-empty string');

export const MimeType = z
  .string()
  .regex(/^image\/\w+$/, {
    message: 'Type must be a valid MIME type (e.g., "image/png")',
  })
  .describe('Image MIME type');

export const Dimensions = z
  .string()
  .regex(/^\d+x\d+$/, {
    message: 'Sizes must be in format "WIDTHxHEIGHT" (e.g., "192x192")',
  })
  .describe('Image dimensions');

export const LanguageCode = z
  .string()
  .min(2, { message: 'Language code must be at least 2 characters' })
  .max(10, { message: 'Language code must not exceed 10 characters' })
  .regex(/^[a-z]{2}(-[A-Z]{2})?$/, {
    message: 'Language must be a valid locale code (e.g., "en", "en-US")',
  })
  .describe('Application language');
