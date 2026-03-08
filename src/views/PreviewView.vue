<script setup lang="ts">
import { Card, Tabs, TabList, Tab, TabPanels, TabPanel } from "primevue";
import { defineAsyncComponent } from "vue";

import { usePreviewManifest } from "@/entities/preview/model/usePreviewManifest";
import { usePreviewServiceWorker } from "@/entities/preview/model/usePreviewServiceWorker";
import { usePreviewTabs } from "@/entities/preview/model/usePreviewTabs";
import PreviewActionsBar from "@/entities/preview/ui/PreviewActionsBar.vue";
import { FILE_NAMES } from "@/shared/config/files.constants";
import LoadingSpinner from "@/shared/ui/LoadingSpinner.vue";
import PageHeader from "@/shared/ui/PageHeader.vue";

const ManifestCodePreview = defineAsyncComponent(
  () => import("@/entities/preview/ui/ManifestCodePreview.vue"),
);

const ServiceWorkerCodePreview = defineAsyncComponent(
  () => import("@/entities/preview/ui/ServiceWorkerCodePreview.vue"),
);

const { isLoadingManifest, hasManifestData, manifestJSON, copyManifest, downloadManifest } =
  usePreviewManifest();

const {
  isLoadingServiceWorker,
  hasServiceWorkerData,
  serviceWorkerCode,
  copyServiceWorker,
  downloadServiceWorker,
} = usePreviewServiceWorker();

const { activeTabValue, setActiveTab } = usePreviewTabs({
  onManifestTab: () => {
    // TODO: Load manifest.
  },
  onServiceWorkerTab: () => {
    // TODO: Load service worker code.
  },
});
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <PageHeader
      title="Preview PWA"
      description="Preview of files and functions of your PWA application"
    />

    <Card>
      <template #header>
        <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
          <i class="pi pi-file-code tw:text-xl tw:text-blue-600"></i>

          <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800 tw:flex-1">Preview files</h3>
        </div>
      </template>

      <template #content>
        <Tabs :value="activeTabValue" class="tw:w-full" @update:value="setActiveTab">
          <TabList>
            <Tab :value="FILE_NAMES.MANIFEST">
              <div class="tw:flex tw:items-center tw:gap-2">
                <i class="pi pi-file-edit"></i>

                <span>Manifest file</span>
              </div>
            </Tab>

            <Tab :value="FILE_NAMES.SERVICE_WORKER">
              <div class="tw:flex tw:items-center tw:gap-2">
                <i class="pi pi-code"></i>

                <span>Service Worker file</span>
              </div>
            </Tab>
          </TabList>

          <LoadingSpinner v-if="isLoadingManifest || isLoadingServiceWorker" />

          <TabPanels v-else>
            <TabPanel :value="FILE_NAMES.MANIFEST">
              <PreviewActionsBar
                title="Manifest file"
                description="Configuration of web application"
                :has-data="hasManifestData"
                :is-loading="isLoadingManifest"
                @copy="copyManifest"
                @download="downloadManifest"
              />

              <ManifestCodePreview :manifest-json="manifestJSON" />
            </TabPanel>

            <TabPanel :value="FILE_NAMES.SERVICE_WORKER">
              <PreviewActionsBar
                title="Service Worker file"
                description="Code for caching and offline mode"
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
