<script setup lang="ts">
import {
 Card, Tabs, TabList, Tab, TabPanels, TabPanel 
} from 'primevue';

import ManifestCodePreview from '@/entities/preview/ui/ManifestCodePreview.vue';
import ServiceWorkerCodePreview from '@/entities/preview/ui/ServiceWorkerCodePreview.vue';
import PreviewActionsBar from '@/entities/preview/ui/PreviewActionsBar.vue';

import {
 useManifestQuery 
} from '@/entities/manifest/model/useManifestQuery';

import {
 usePreviewManifest 
} from '@/entities/preview/model/usePreviewManifest';
import {
 usePreviewServiceWorker 
} from '@/entities/preview/model/usePreviewServiceWorker';
import {
 usePreviewTabs 
} from '@/entities/preview/model/usePreviewTabs';

import PageHeader from '@/shared/ui/PageHeader.vue';
import LoadingSpinner from '@/shared/ui/LoadingSpinner.vue';

import {
 FILE_NAMES 
} from '@/shared/config/files.constants';

const {
 loadManifest 
} = useManifestQuery();

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

const {
 activeTabValue, setActiveTab 
} = usePreviewTabs({
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
    <PageHeader
      title="Предпросмотр PWA"
      description="Просмотр файлов и функций вашего PWA приложения"
    />

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
          <TabList>
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

          <LoadingSpinner v-if="isLoadingManifest || isLoadingServiceWorker" />

          <TabPanels v-else>
            <TabPanel :value="FILE_NAMES.MANIFEST">
              <PreviewActionsBar
                title="Manifest файл"
                description="Конфигурация веб-приложения"
                :has-data="hasManifestData"
                :is-loading="isLoadingManifest"
                @copy="copyManifest"
                @download="downloadManifest"
              />

              <ManifestCodePreview :manifest-json="manifestJSON" />
            </TabPanel>

            <TabPanel :value="FILE_NAMES.SERVICE_WORKER">
              <PreviewActionsBar
                title="Service Worker файл"
                description="Код для кэширования и офлайн-режима"
                :has-data="hasServiceWorkerData"
                :is-loading="isLoadingServiceWorker"
                @copy="copyServiceWorker"
                @download="downloadServiceWorker"
              />

              <ServiceWorkerCodePreview :code="serviceWorkerCode" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
