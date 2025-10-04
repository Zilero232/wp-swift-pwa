<script setup lang="ts">
import { Card, Button } from 'primevue';

import ManifestCodePreview from '@/entities/preview/ui/ManifestCodePreview.vue';
import BrowserCompatibility from '@/entities/preview/ui/BrowserCompatibility.vue';
import { useManifestStore } from '@/entities/manifest/model/store';
import { PWA_FEATURES } from '@/shared/config/constants';

const manifestStore = useManifestStore();

const pwaFeatures = PWA_FEATURES;

const copyManifest = async () => {
  try {
    await navigator.clipboard.writeText(manifestStore.manifest);
    // TODO: Показать уведомление об успешном копировании
  } catch (error) {
    console.error('Error copying manifest:', error);
  }
};

const downloadManifest = () => {
  const blob = new Blob([manifestStore.manifest], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'manifest.json';
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="p-4 sm:p-8">
    <div class="mb-8 text-center">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Предпросмотр PWA</h2>

      <p class="text-gray-600 text-lg">Просмотр манифеста и функций вашего PWA приложения</p>
    </div>

    <div class="flex flex-col gap-8">
      <Card>
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0 flex-wrap">
            <i class="pi pi-file-code text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800 flex-1">Manifest.json</h3>
            <div class="flex gap-2 items-center">
              <Button icon="pi pi-copy" text v-tooltip="'Копировать'" @click="copyManifest" />
              <Button icon="pi pi-download" text v-tooltip="'Скачать'" @click="downloadManifest" />
            </div>
          </div>
        </template>

        <template #content>
          <ManifestCodePreview
            :manifest="manifestStore.manifest"
            :validation="manifestStore.validation"
          />
        </template>
      </Card>

      <Card>
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <i class="pi pi-check-circle text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800">PWA функции</h3>
          </div>
        </template>

        <template #content>
          <BrowserCompatibility :features="pwaFeatures" />
        </template>
      </Card>
    </div>
  </div>
</template>
