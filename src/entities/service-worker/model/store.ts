import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ServiceWorkerSettings } from '@/shared/types/service-worker'

const getDefaultSettings = (): ServiceWorkerSettings => ({
  enabled: true,
  cache_strategy: 'cache_first',
  cache_version: '1.0.0',
  offline_page: '',
  cache_resources: {
    pages: true,
    images: true,
    scripts: true,
    styles: true,
    fonts: true,
  },
  exclude_patterns: ['/wp-admin/', '/wp-login.php'],
  network_timeout: 5000,
  background_sync: false,
  push_notifications: false,
})

export const useServiceWorkerStore = defineStore('serviceWorker', () => {
  const settings = ref<ServiceWorkerSettings>(getDefaultSettings())

  const isEnabled = computed(() => settings.value.enabled)

  const cacheResourcesCount = computed(() => {
    return Object.values(settings.value.cache_resources).filter(Boolean).length
  })

  const updateSettings = (updates: Partial<ServiceWorkerSettings>) => {
    settings.value = { ...settings.value, ...updates }
  }

  const updateCacheResources = (resources: Partial<ServiceWorkerSettings['cache_resources']>) => {
    settings.value.cache_resources = { ...settings.value.cache_resources, ...resources }
  }

  const addExcludePattern = (pattern: string) => {
    if (!settings.value.exclude_patterns.includes(pattern)) {
      settings.value.exclude_patterns.push(pattern)
    }
  }

  const removeExcludePattern = (index: number) => {
    settings.value.exclude_patterns.splice(index, 1)
  }

  const resetSettings = () => {
    settings.value = getDefaultSettings()
  }

  return {
    settings,
    isEnabled,
    cacheResourcesCount,
    updateSettings,
    updateCacheResources,
    addExcludePattern,
    removeExcludePattern,
    resetSettings,
  }
})
