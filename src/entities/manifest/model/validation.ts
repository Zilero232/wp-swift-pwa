import { ManifestSchema, type ManifestSettings } from '../schemas'

/**
 * Validation utilities for PWA Manifest
 * Business logic validation with warnings and error handling
 */

export interface ValidationResult {
  success: boolean
  data?: ManifestSettings
  errors: string[]
  warnings: string[]
}

/**
 * Validates manifest data and returns structured result
 */
export function validateManifest(data: unknown): ValidationResult {
  const warnings: string[] = []

  // Primary Zod validation
  const result = ManifestSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`),
      warnings,
    }
  }

  const manifest = result.data

  // Business logic warnings
  addBusinessLogicWarnings(manifest, warnings)

  return {
    success: true,
    data: manifest,
    errors: [],
    warnings,
  }
}

/**
 * Add business logic warnings
 */
function addBusinessLogicWarnings(manifest: ManifestSettings, warnings: string[]): void {
  // Short name length warning
  if (manifest.short_name.length > 12) {
    warnings.push('Short name longer than 12 characters may be truncated on some devices')
  }

  // Icons recommendations
  if (manifest.icons.length === 0) {
    warnings.push('Adding at least one icon is highly recommended for better user experience')
  }

  const hasRecommendedSizes = manifest.icons.some((icon) =>
    ['192x192', '512x512'].includes(icon.sizes),
  )

  if (manifest.icons.length > 0 && !hasRecommendedSizes) {
    warnings.push('Consider adding icons with sizes 192x192 and 512x512 for better compatibility')
  }

  // Color contrast warning
  if (
    manifest.theme_color &&
    manifest.background_color &&
    manifest.theme_color === manifest.background_color
  ) {
    warnings.push(
      'Theme color and background color are identical - consider using different colors',
    )
  }

  // PWA best practices
  if (manifest.display === 'browser') {
    warnings.push('Consider using "standalone" display mode for better PWA experience')
  }

  if (!manifest.start_url) {
    warnings.push('Setting a start_url is recommended for consistent app launching')
  }
}

/**
 * Type guard for runtime checking
 */
export const isValidManifest = (data: unknown): data is ManifestSettings => {
  return ManifestSchema.safeParse(data).success
}

/**
 * Partial validation for form fields
 */
export function validateField<K extends keyof ManifestSettings>(
  field: K,
  value: ManifestSettings[K],
): { valid: boolean; error?: string } {
  const fieldSchema = ManifestSchema.shape[field]
  const result = fieldSchema.safeParse(value)

  return {
    valid: result.success,
    error: result.success ? undefined : result.error.issues[0]?.message,
  }
}

/**
 * Validate specific array of icons
 */
export function validateIcons(icons: unknown[]): ValidationResult {
  const warnings: string[] = []
  const errors: string[] = []

  // Check each icon
  icons.forEach((icon, index) => {
    const result = ManifestSchema.shape.icons.element.safeParse(icon)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push(`Icon ${index + 1}: ${issue.message}`)
      })
    }
  })

  return {
    success: errors.length === 0,
    errors,
    warnings,
  }
}
