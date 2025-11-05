<script setup lang="ts">
import { onMounted } from 'vue';
import { Card } from 'primevue';

import BasicInfoSettings from '@/entities/manifest/ui/BasicInfoSettings.vue';
import DisplaySettings from '@/entities/manifest/ui/DisplaySettings.vue';
import AdvancedSettings from '@/entities/manifest/ui/AdvancedSettings.vue';
import CategoriesSettings from '@/entities/manifest/ui/CategoriesSettings.vue';
import RelatedAppsSettings from '@/entities/manifest/ui/RelatedAppsSettings.vue';
import ShortcutsSettings from '@/entities/manifest/ui/ShortcutsSettings.vue';
import IconsSettings from '@/entities/manifest/ui/IconsSettings.vue';
import ScreenshotsSettings from '@/entities/manifest/ui/ScreenshotsSettings.vue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

const { loadManifest } = useManifestQuery();

onMounted(() => {
  loadManifest();
});
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <div class="tw:mb-8 tw:text-center">
      <h2 class="tw:text-2xl sm:tw:text-3xl tw:font-bold tw:text-gray-800 tw:mb-2">
        Настройки Manifest
      </h2>

      <p class="tw:text-gray-600 tw:text-lg">Конфигурация веб-приложения манифеста</p>
    </div>

    <div class="tw:flex tw:flex-col tw:gap-8">
      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <Card>
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
              <i class="pi pi-info-circle tw:text-xl tw:text-blue-600"></i>
              <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">
                Основная информация
              </h3>
            </div>
          </template>

          <template #content>
            <BasicInfoSettings />
          </template>
        </Card>

        <Card>
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
              <i class="pi pi-desktop tw:text-xl tw:text-blue-600"></i>
              <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">Отображение</h3>
            </div>
          </template>

          <template #content>
            <DisplaySettings />
          </template>
        </Card>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <Card>
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
              <i class="pi pi-cog tw:text-xl tw:text-blue-600"></i>
              <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">
                Дополнительные настройки
              </h3>
            </div>
          </template>

          <template #content>
            <AdvancedSettings />
          </template>
        </Card>

        <Card>
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
              <i class="pi pi-tags tw:text-xl tw:text-blue-600"></i>
              <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">Категории</h3>
            </div>
          </template>

          <template #content>
            <CategoriesSettings />
          </template>
        </Card>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <Card>
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
              <i class="pi pi-bolt tw:text-xl tw:text-blue-600"></i>
              <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">
                Шорткаты приложения
              </h3>
            </div>
          </template>

          <template #content>
            <ShortcutsSettings />
          </template>
        </Card>

        <Card>
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
              <i class="pi pi-mobile tw:text-xl tw:text-blue-600"></i>
              <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">
                Связанные приложения
              </h3>
            </div>
          </template>

          <template #content>
            <RelatedAppsSettings />
          </template>
        </Card>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <Card>
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
              <i class="pi pi-image tw:text-xl tw:text-blue-600"></i>
              <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">
                Иконки приложения
              </h3>
            </div>
          </template>

          <template #content>
            <IconsSettings />
          </template>
        </Card>

        <Card>
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
              <i class="pi pi-camera tw:text-xl tw:text-blue-600"></i>
              <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">Скриншоты</h3>
            </div>
          </template>

          <template #content>
            <ScreenshotsSettings />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
