/**
 * Cache strategies for different resource types
 */
export enum ENUM_CACHE_STRATEGIES {
  CACHE_FIRST = "cacheFirst",
  NETWORK_FIRST = "networkFirst",
  NETWORK_ONLY = "networkOnly",
  CACHE_ONLY = "cacheOnly",
  STALE_WHILE_REVALIDATE = "staleWhileRevalidate",
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
 * Service Worker Settings
 */
export interface ServiceWorkerSettings {
  version: string;
  cache_name: string;
  offline_page: string;
  strategy: string;
  precache: string[];
  skip_patterns: string[];
  background_sync?: BackgroundSyncConfig;
  push_notifications?: PushNotificationsConfig;
}
