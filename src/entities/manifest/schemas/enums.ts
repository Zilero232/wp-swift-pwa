import { z } from 'zod';

/**
 * Enum validation schemas
 * All enumerated values used in PWA manifest
 */

export const DisplayModeSchema = z.enum(['fullscreen', 'standalone', 'minimal-ui', 'browser'], {
  error: () => ({
    message: 'Display mode must be one of: fullscreen, standalone, minimal-ui, browser',
  }),
});

export const OrientationSchema = z.enum(
  [
    'any',
    'natural',
    'landscape',
    'portrait',
    'portrait-primary',
    'portrait-secondary',
    'landscape-primary',
    'landscape-secondary',
  ],
  {
    error: () => ({ message: 'Invalid orientation value' }),
  },
);

export const TextDirectionSchema = z.enum(['ltr', 'rtl', 'auto'], {
  error: () => ({ message: 'Text direction must be ltr, rtl, or auto' }),
});

export const IconPurposeSchema = z.enum(['any', 'maskable', 'monochrome'], {
  error: () => ({ message: 'Icon purpose must be any, maskable, or monochrome' }),
});

// Type exports for convenience
export type DisplayMode = z.infer<typeof DisplayModeSchema>;
export type Orientation = z.infer<typeof OrientationSchema>;
export type TextDirection = z.infer<typeof TextDirectionSchema>;
export type IconPurpose = z.infer<typeof IconPurposeSchema>;
