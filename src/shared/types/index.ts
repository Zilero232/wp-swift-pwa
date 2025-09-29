export interface APIResponse<T = unknown> {
  data: T
  success: boolean
  message?: string
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}
