<script setup lang="ts">
import {
  Card,
  Button,
  ProgressSpinner,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from 'primevue';

import ManifestCodePreview from '@/entities/preview/ui/ManifestCodePreview.vue';
import ServiceWorkerCodePreview from '@/entities/preview/ui/ServiceWorkerCodePreview.vue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

import { usePreviewManifest } from '@/entities/preview/model/usePreviewManifest';
import { usePreviewServiceWorker } from '@/entities/preview/model/usePreviewServiceWorker';
import { usePreviewTabs } from '@/entities/preview/model/usePreviewTabs';

import { FILE_NAMES } from '@/shared/config/files.constants';

const { loadManifest } = useManifestQuery();

const {
  isLoadingManifest,
  hasManifestData,
  manifestJSON,
  copyManifest,
  downloadManifest,
} = usePreviewManifest();

const {
  isLoadingServiceWorker,
  hasServiceWorkerData,
  serviceWorkerCode,
  copyServiceWorker,
  downloadServiceWorker,
  loadServiceWorkerCode,
} = usePreviewServiceWorker();

const { activeTabValue, setActiveTab } = usePreviewTabs({
  onManifestTab: () => {
    loadManifest();
  },
  onServiceWorkerTab: () => {
    loadServiceWorkerCode();
  },
});
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <div class="tw:mb-8 tw:text-center">
      <h2 class="tw:text-2xl sm:tw:text-3xl tw:font-bold tw:text-gray-800 tw:mb-2">
        Предпросмотр PWA
      </h2>

      <p class="tw:text-gray-600 tw:text-lg">
        Просмотр файлов и функций вашего PWA приложения
      </p>
    </div>

    <Card>
      <template #header>
        <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
          <i class="pi pi-file-code tw:text-xl tw:text-blue-600"></i>

          <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800 tw:flex-1">
            Просмотр файлов
          </h3>
        </div>
      </template>

      <template #content>
        <Tabs :value="activeTabValue" class="tw:w-full" @update:value="setActiveTab">
          <TabList class="tw:mb-4">
            <Tab :value="FILE_NAMES.MANIFEST">
              <div class="tw:flex tw:items-center tw:gap-2">
                <i class="pi pi-file-edit"></i>

                <span>Manifest файл</span>
              </div>
            </Tab>

            <Tab :value="FILE_NAMES.SERVICE_WORKER">
              <div class="tw:flex tw:items-center tw:gap-2">
                <i class="pi pi-code"></i>

                <span>Service Worker файл</span>
              </div>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel :value="FILE_NAMES.MANIFEST">
              <div class="tw:space-y-4">
                <div class="tw:flex tw:items-center tw:justify-between tw:mb-4">
                  <div>
                    <h4 class="tw:font-semibold tw:text-gray-800">Manifest файл</h4>
                    <p class="tw:text-sm tw:text-gray-600">Конфигурация веб-приложения</p>
                  </div>

                  <div class="tw:flex tw:gap-2">
                    <Button
                      icon="pi pi-copy"
                      text
                      rounded
                      v-tooltip.top="'Копировать'"
                      :disabled="!hasManifestData"
                      @click="copyManifest"
                    />

                    <Button
                      icon="pi pi-download"
                      text
                      rounded
                      v-tooltip.top="'Скачать'"
                      :disabled="!hasManifestData"
                      @click="downloadManifest"
                    />
                  </div>
                </div>

                <div
                  v-if="isLoadingManifest"
                  class="tw:flex tw:items-center tw:justify-center tw:py-12"
                >
                  <ProgressSpinner />
                </div>

                <ManifestCodePreview v-else :manifest-json="manifestJSON" />
              </div>
            </TabPanel>

            <TabPanel :value="FILE_NAMES.SERVICE_WORKER">
              <div class="tw:space-y-4">
                <div class="tw:flex tw:items-center tw:justify-between tw:mb-4">
                  <div>
                    <h4 class="tw:font-semibold tw:text-gray-800">Service Worker файл</h4>

                    <p class="tw:text-sm tw:text-gray-600">
                      Код для кэширования и офлайн-режима
                    </p>
                  </div>

                  <div class="tw:flex tw:gap-2">
                    <Button
                      icon="pi pi-copy"
                      text
                      rounded
                      v-tooltip.top="'Копировать'"
                      :disabled="!hasServiceWorkerData"
                      :loading="isLoadingServiceWorker"
                      @click="copyServiceWorker"
                    />

                    <Button
                      icon="pi pi-download"
                      text
                      rounded
                      v-tooltip.top="'Скачать'"
                      :disabled="!hasServiceWorkerData"
                      :loading="isLoadingServiceWorker"
                      @click="downloadServiceWorker"
                    />
                  </div>
                </div>

                <div
                  v-if="isLoadingServiceWorker"
                  class="tw:flex tw:items-center tw:justify-center tw:py-12"
                >
                  <ProgressSpinner />
                </div>

                <ServiceWorkerCodePreview v-else :code="serviceWorkerCode" />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
