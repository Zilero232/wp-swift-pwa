import { ref } from 'vue';
import { defineStore } from 'pinia';

import { manifestAPI } from '@/services/manifest.service';

import type { ManifestSettings } from '../schemas';
import { validateManifest, type ValidationResult } from './validation';

export const useManifestStore = defineStore('manifest', () => {
  const manifest = ref<ManifestSettings>();
  const validation = ref<ValidationResult>();

  const validate = () => {
    validation.value = validateManifest(manifest.value);
  };

  const loadManifest = async () => {
    try {
      const { data } = await manifestAPI.getManifest();

      manifest.value = data;
    } catch (err) {
      console.error('Failed to load manifest:', err);
    }
  };

  const updateManifest = (updates: Partial<ManifestSettings>) => {
    manifest.value = { ...manifest.value, ...updates } as ManifestSettings;
  };

  const resetManifest = () => {
    manifest.value = undefined;
  };

  return {
    manifest,
    validation,
    validate,
    loadManifest,
    updateManifest,
    resetManifest,
  };
});
