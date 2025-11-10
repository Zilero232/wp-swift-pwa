/**
 * Cache strategies for different resource types
 */
export enum ENUM_CACHE_STRATEGIES {
  CACHE_FIRST = 'cacheFirst',
  NETWORK_FIRST = 'networkFirst',
  NETWORK_ONLY = 'networkOnly',
  CACHE_ONLY = 'cacheOnly',
}

/**
 * Cache strategies configuration
 */
export interface CacheStrategies {
  [extensions: string]: ENUM_CACHE_STRATEGIES;
}

/**
 * Runtime cache configuration
 */
export interface RuntimeCacheConfig {
  enabled: boolean;
  max_entries: number;
  max_age_seconds: number;
}

/**
 * Background sync configuration
 */
export interface BackgroundSyncConfig {
  enabled: boolean;
  queue_name: string;
}

/**
 * Push notifications configuration
 */
export interface PushNotificationsConfig {
  enabled: boolean;
  vapid_public_key: string;
}

/**
 * Service Worker registration configuration
 */
export interface RegistrationConfig {
  scope: string;
  update_via_cache: 'imports' | 'all' | 'none';
  type: 'classic' | 'module';
}

/**
 * Service Worker Settings
 */
export interface ServiceWorkerSettings {
  version: string;
  cache_name: string;
  offline_page: string;
  strategies: CacheStrategies;
  precache: string[];
  runtime_cache: RuntimeCacheConfig;
  registration: RegistrationConfig; // добавь это поле
  skip_patterns: string[];
  debug: boolean;
  background_sync?: BackgroundSyncConfig;
  push_notifications?: PushNotificationsConfig;
}
