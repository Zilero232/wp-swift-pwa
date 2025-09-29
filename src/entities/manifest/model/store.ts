import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { validateManifest } from '../model/validation'
import type { ManifestSettings } from '../schemas'

const getDefaultManifest = (): ManifestSettings => ({
  name: '',
  short_name: '',
  description: '',
  start_url: '/',
  display: 'standalone',
  orientation: 'portrait',
  theme_color: '#000000',
  background_color: '#ffffff',
  scope: '/',
  lang: 'en',
  dir: 'ltr',
  categories: [],
  icons: [],
  screenshots: [],
  shortcuts: [],
  related_applications: [],
  prefer_related_applications: false,
})

export const useManifestStore = defineStore('manifest', () => {
  const manifest = ref<ManifestSettings>(getDefaultManifest())

  const validation = computed(() => validateManifest(manifest.value))

  const isValid = computed(() => validation.value.success)

  const manifestJson = computed(() => JSON.stringify(manifest.value, null, 2))

  const updateManifest = (updates: Partial<ManifestSettings>) => {
    manifest.value = { ...manifest.value, ...updates }
  }

  const resetManifest = () => {
    manifest.value = getDefaultManifest()
  }

  return {
    manifest,
    validation,
    isValid,
    manifestJson,
    updateManifest,
    resetManifest,
  }
})
