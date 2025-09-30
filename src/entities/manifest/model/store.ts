import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { validateManifest } from '../model/validation';
import type { ManifestSettings } from '../schemas';
import { manifestAPI } from '@/services/manifest.service';

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
});

export const useManifestStore = defineStore('manifest', () => {
  const manifest = ref<ManifestSettings>(getDefaultManifest());

  const validation = computed(() => validateManifest(manifest.value));
  const isValid = computed(() => validation.value.success);
  const manifestJson = computed(() => JSON.stringify(manifest.value, null, 2));

  const loadManifest = async () => {
    try {
      const data = await manifestAPI.getManifest();

      manifest.value = { ...getDefaultManifest(), ...data };
    } catch (err) {
      console.error('Failed to load manifest:', err);
    }
  };

  const updateManifest = (updates: Partial<ManifestSettings>) => {
    manifest.value = { ...manifest.value, ...updates };
  };

  const resetManifest = () => {
    manifest.value = getDefaultManifest();
  };

  return {
    isValid,
    manifest,
    validation,
    manifestJson,
    loadManifest,
    updateManifest,
    resetManifest,
  };
});
