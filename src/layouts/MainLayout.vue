<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import ProgressSpinner from 'primevue/progressspinner';

import { useManifestStore } from '@/entities/manifest/model/store';
import { useServiceWorkerStore } from '@/entities/service-worker/model/store';

import Header from '@/widgets/header/ui/Header.vue';
import Footer from '@/widgets/footer/ui/Footer.vue';

const saving = ref(false);

const manifestStore = useManifestStore();
const swStore = useServiceWorkerStore();

const hasChanges = computed(() => {
  // Real logic for detecting changes
  return manifestStore.manifest.name !== '' || manifestStore.manifest.description !== '' || !swStore.settings.enabled;
});

const validationStatus = computed(() => ({
  manifest: manifestStore.validation,
  serviceWorker: {
    valid: swStore.isEnabled,
    errors: [],
    warnings: swStore.isEnabled ? [] : ['Service Worker отключен'],
  },
}));

const handleSave = async () => {
  saving.value = true;
  try {
    // TODO: Implement API call to save settings to WordPress
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    console.log('Settings saved successfully');
  } catch (error) {
    console.error('Save error:', error);
  } finally {
    saving.value = false;
  }
};

const handleReset = () => {
  if (confirm('Вы уверены, что хотите сбросить все настройки?')) {
    manifestStore.resetManifest();
    swStore.resetSettings();
  }
};

onMounted(async () => {
  await manifestStore.loadManifest();
});
</script>

<template>
  <Header @save="handleSave" @reset="handleReset" :saving="saving" :has-changes="hasChanges" />

  <main>
    <Suspense>
      <template #default>
        <RouterView />
      </template>

      <template #fallback>
        <ProgressSpinner />
      </template>
    </Suspense>
  </main>

  <Footer />
</template>
