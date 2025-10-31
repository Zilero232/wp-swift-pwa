<script setup lang="ts">
import { computed } from 'vue';
import { Card, Button } from 'primevue';

import ManifestCodePreview from '@/entities/preview/ui/ManifestCodePreview.vue';
import PWAFeatures from '@/entities/preview/ui/PWAFeatures.vue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

import { useDownload } from '@/shared/composable/useDownload';

const { queryManifest } = useManifestQuery();

const { copyToClipboard, downloadJSON } = useDownload();

const manifestJSON = computed(() => {
  if (!queryManifest.data.value) return '';

  return JSON.stringify(queryManifest.data.value, null, 2);
});

const copyManifest = () => {
  copyToClipboard(manifestJSON.value, {
    successMessage: 'Манифест скопирован в буфер обмена',
    errorMessage: 'Ошибка копирования манифеста',
  });
};

const downloadManifest = () => {
  if (!queryManifest.data.value) return;

  downloadJSON(queryManifest.data.value, 'manifest.json', {
    successMessage: 'Манифест успешно загружен',
    errorMessage: 'Ошибка загрузки манифеста',
  });
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
            <h3 class="text-xl font-semibold text-gray-800 flex-1">manifest.json</h3>

            <div class="flex gap-2 items-center">
              <Button icon="pi pi-copy" text rounded v-tooltip.top="'Копировать'" @click="copyManifest" :disabled="!manifestJSON" />

              <Button icon="pi pi-download" text rounded v-tooltip.top="'Скачать'" @click="downloadManifest" :disabled="!manifestJSON" />
            </div>
          </div>
        </template>

        <template #content>
          <ManifestCodePreview :manifest-json="manifestJSON" />
        </template>
      </Card>

      <Card>
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <i class="pi pi-check-circle text-xl text-green-600"></i>
            <h3 class="text-xl font-semibold text-gray-800">Возможности PWA</h3>
          </div>
        </template>

        <template #content>
          <PWAFeatures />
        </template>
      </Card>
    </div>
  </div>
</template>
