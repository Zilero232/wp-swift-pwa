export type CacheStrategy =
  | 'cache_first'
  | 'network_first'
  | 'cache_only'
  | 'network_only'
  | 'stale_while_revalidate'

export interface CacheResources {
  pages: boolean
  images: boolean
  scripts: boolean
  styles: boolean
  fonts: boolean
}

export interface ServiceWorkerSettings {
  enabled: boolean
  cache_strategy: CacheStrategy
  cache_version: string
  offline_page: string
  cache_resources: CacheResources
  exclude_patterns: string[]
  network_timeout: number
  background_sync: boolean
  push_notifications: boolean
}

export interface ServiceWorkerValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}
