<script setup lang="ts">
import { Card } from 'primevue';

import { useManifestStore } from '@/entities/manifest/model/store';

import BasicInfo from '@/entities/manifest/ui/BasicInfo.vue';
import DisplaySettings from '@/entities/manifest/ui/DisplaySettings.vue';
import AdvancedSettings from '@/entities/manifest/ui/AdvancedSettings.vue';
import CategoriesSettings from '@/entities/manifest/ui/CategoriesSettings.vue';
import RelatedAppsSettings from '@/entities/manifest/ui/RelatedAppsSettings.vue';
import IconManager from '@/entities/manifest/ui/IconManager.vue';

import type { ManifestSettings } from '@/entities/manifest/schemas';

const manifestStore = useManifestStore();

const updateManifestField = (field: keyof ManifestSettings, value: unknown) => {
  manifestStore.updateManifest({ [field]: value });
};
</script>

<template>
  <div class="p-4 sm:p-8">
    <div class="mb-8 text-center">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Настройки Manifest</h2>
      <p class="text-gray-600 text-lg">Конфигурация веб-приложения манифеста</p>
    </div>

    <div class="flex flex-col gap-8">
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card>
          <template #header>
            <div class="flex items-center gap-3 p-6 pb-0">
              <i class="pi pi-info-circle text-xl text-blue-600"></i>
              <h3 class="text-xl font-semibold text-gray-800">Основная информация</h3>
            </div>
          </template>

          <template #content>
            <BasicInfo :manifest="manifestStore.manifest" :errors="manifestStore.validation.errors" @update:field="updateManifestField" />
          </template>
        </Card>

        <Card>
          <template #header>
            <div class="flex items-center gap-3 p-6 pb-0">
              <i class="pi pi-desktop text-xl text-blue-600"></i>
              <h3 class="text-xl font-semibold text-gray-800">Отображение</h3>
            </div>
          </template>

          <template #content>
            <DisplaySettings :manifest="manifestStore.manifest" :errors="manifestStore.validation.errors" @update:field="updateManifestField" />
          </template>
        </Card>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card>
          <template #header>
            <div class="flex items-center gap-3 p-6 pb-0">
              <i class="pi pi-cog text-xl text-blue-600"></i>
              <h3 class="text-xl font-semibold text-gray-800">Дополнительные настройки</h3>
            </div>
          </template>

          <template #content>
            <AdvancedSettings :manifest="manifestStore.manifest" :errors="manifestStore.validation.errors" @update:field="updateManifestField" />
          </template>
        </Card>

        <Card>
          <template #header>
            <div class="flex items-center gap-3 p-6 pb-0">
              <i class="pi pi-tags text-xl text-blue-600"></i>
              <h3 class="text-xl font-semibold text-gray-800">Категории</h3>
            </div>
          </template>

          <template #content>
            <CategoriesSettings :manifest="manifestStore.manifest" :errors="manifestStore.validation.errors" @update:field="updateManifestField" />
          </template>
        </Card>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card>
          <template #header>
            <div class="flex items-center gap-3 p-6 pb-0">
              <i class="pi pi-image text-xl text-blue-600"></i>
              <h3 class="text-xl font-semibold text-gray-800">Иконки приложения</h3>
            </div>
          </template>

          <template #content>
            <IconManager :icons="manifestStore.manifest.icons" @update:icons="updateManifestField('icons', $event)" />
          </template>
        </Card>

        <Card>
          <template #header>
            <div class="flex items-center gap-3 p-6 pb-0">
              <i class="pi pi-mobile text-xl text-blue-600"></i>
              <h3 class="text-xl font-semibold text-gray-800">Связанные приложения</h3>
            </div>
          </template>

          <template #content>
            <RelatedAppsSettings :manifest="manifestStore.manifest" :errors="manifestStore.validation.errors" @update:field="updateManifestField" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
