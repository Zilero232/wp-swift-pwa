<script setup lang="ts">
import { computed } from 'vue';
import { Card, Button, ProgressSpinner } from 'primevue';
import { useRouter } from 'vue-router';

import ManifestCodePreview from '@/entities/preview/ui/ManifestCodePreview.vue';
import PWAFeatures from '@/entities/preview/ui/PWAFeatures.vue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

import { useDownload } from '@/shared/composable/useDownload';

const router = useRouter();
const { queryManifest } = useManifestQuery();

const { copyToClipboard, downloadJSON } = useDownload();

const manifestJSON = computed(() => {
  if (!queryManifest.data.value) return '';

  return JSON.stringify(queryManifest.data.value, null, 2);
});

const isLoading = computed(() => queryManifest.isPending.value);
const isEmpty = computed(() => !queryManifest.data.value || Object.keys(queryManifest.data.value).length === 0);

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

const goToManifest = () => {
  router.push('/manifest');
};
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <div class="tw:mb-8 tw:text-center">
      <h2 class="tw:text-2xl sm:tw:text-3xl tw:font-bold tw:text-gray-800 tw:mb-2">Предпросмотр PWA</h2>
      <p class="tw:text-gray-600 tw:text-lg">Просмотр манифеста и функций вашего PWA приложения</p>
    </div>

    <div v-if="isLoading" class="tw:flex tw:flex-col tw:items-center tw:justify-center tw:py-20 tw:gap-4">
      <ProgressSpinner />

      <p class="tw:text-gray-600 tw:text-lg">Загрузка манифеста...</p>
    </div>

    <div v-else-if="isEmpty" class="tw:flex tw:flex-col tw:items-center tw:justify-center tw:py-20">
      <Card class="tw:max-w-2xl tw:w-full tw:text-center">
        <template #content>
          <div class="tw:space-y-6 tw:py-8">
            <div class="tw:inline-flex tw:items-center tw:justify-center tw:w-20 tw:h-20 tw:bg-gray-100 tw:rounded-full">
              <i class="pi pi-file-edit tw:text-4xl tw:text-gray-400"></i>
            </div>
            <div class="tw:space-y-3">
              <h3 class="tw:text-2xl tw:font-bold tw:text-gray-900">Манифест не настроен</h3>
              <p class="tw:text-gray-600 tw:text-lg">Начните с настройки манифеста PWA, чтобы увидеть предпросмотр</p>
            </div>
            <Button
              label="Настроить манифест"
              icon="pi pi-arrow-right"
              icon-pos="right"
              size="large"
              class="tw:px-8 tw:py-3 tw:font-semibold"
              @click="goToManifest"
            />
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="tw:flex tw:flex-col tw:gap-8">
      <Card>
        <template #header>
          <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0 tw:flex-wrap">
            <i class="pi pi-file-code tw:text-xl tw:text-blue-600"></i>
            <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800 tw:flex-1">manifest.json</h3>

            <div class="tw:flex tw:gap-2 tw:items-center">
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
          <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
            <i class="pi pi-check-circle tw:text-xl tw:text-green-600"></i>
            <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">Возможности PWA</h3>
          </div>
        </template>

        <template #content>
          <PWAFeatures />
        </template>
      </Card>
    </div>
  </div>
</template>
