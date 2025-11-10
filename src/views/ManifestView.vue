<script setup lang="ts">
import {
 toValue, onMounted 
} from 'vue';

import PageHeader from '@/shared/ui/PageHeader.vue';
import LoadingSpinner from '@/shared/ui/LoadingSpinner.vue';
import CardSection from '@/shared/ui/CardSection.vue';

import BasicInfoSettings from '@/entities/manifest/ui/BasicInfoSettings.vue';
import DisplaySettings from '@/entities/manifest/ui/DisplaySettings.vue';
import AdvancedSettings from '@/entities/manifest/ui/AdvancedSettings.vue';
import CategoriesSettings from '@/entities/manifest/ui/CategoriesSettings.vue';
import RelatedAppsSettings from '@/entities/manifest/ui/RelatedAppsSettings.vue';
import ShortcutsSettings from '@/entities/manifest/ui/ShortcutsSettings.vue';
import IconsSettings from '@/entities/manifest/ui/IconsSettings.vue';
import ScreenshotsSettings from '@/entities/manifest/ui/ScreenshotsSettings.vue';

import {
 useManifestQuery 
} from '@/entities/manifest/model/useManifestQuery';

const {
 queryManifest, loadManifest 
} = useManifestQuery();

onMounted(() => {
  loadManifest();
});
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <PageHeader
      title="Настройки Manifest"
      description="Конфигурация веб-приложения манифеста"
    />

    <LoadingSpinner v-if="toValue(queryManifest.isPending)" />

    <div v-else class="tw:flex tw:flex-col tw:gap-8">
      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Основная информация" icon="pi pi-info-circle">
          <BasicInfoSettings />
        </CardSection>

        <CardSection title="Отображение" icon="pi pi-desktop">
          <DisplaySettings />
        </CardSection>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Дополнительные настройки" icon="pi pi-cog">
          <AdvancedSettings />
        </CardSection>

        <CardSection title="Категории" icon="pi pi-tags">
          <CategoriesSettings />
        </CardSection>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Шорткаты приложения" icon="pi pi-bolt">
          <ShortcutsSettings />
        </CardSection>

        <CardSection title="Связанные приложения" icon="pi pi-mobile">
          <RelatedAppsSettings />
        </CardSection>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Иконки приложения" icon="pi pi-image">
          <IconsSettings />
        </CardSection>

        <CardSection title="Скриншоты приложения" icon="pi pi-camera">
          <ScreenshotsSettings />
        </CardSection>
      </div>
    </div>
  </div>
</template>
