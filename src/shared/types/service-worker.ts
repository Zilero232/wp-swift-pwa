/**
 * Cache strategies for different resource types
 */
export type CacheStrategy = 'cacheFirst' | 'networkFirst' | 'networkOnly' | 'cacheOnly';

/**
 * Cache strategies configuration
 */
export interface CacheStrategies {
  [extensions: string]: CacheStrategy;
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
}

/**
 * Push notifications configuration
 */
export interface PushNotificationsConfig {
  enabled: boolean;
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
  background_sync?: BackgroundSyncConfig;
  push_notifications?: PushNotificationsConfig;
}
