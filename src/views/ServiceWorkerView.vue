<script setup lang="ts">
import {
 toValue, onMounted 
} from 'vue';

import BasicSettings from '@/entities/service-worker/ui/BasicSettings.vue';
import RegistrationSettings from '@/entities/service-worker/ui/RegistrationSettings.vue';
import SkipPatternsSettings from '@/entities/service-worker/ui/SkipPatternsSettings.vue';
import CacheStrategiesSettings from '@/entities/service-worker/ui/CacheStrategiesSettings.vue';
import RuntimeCacheSettings from '@/entities/service-worker/ui/RuntimeCacheSettings.vue';
import AdvancedSettings from '@/entities/service-worker/ui/AdvancedSettings.vue';

import {
 useServiceWorkerQuery 
} from '@/entities/service-worker/model/useServiceWorkerQuery';

import PageHeader from '@/shared/ui/PageHeader.vue';
import LoadingSpinner from '@/shared/ui/LoadingSpinner.vue';
import CardSection from '@/shared/ui/CardSection.vue';

const {
 queryServiceWorker, loadServiceWorker 
} = useServiceWorkerQuery();

onMounted(() => {
  loadServiceWorker();
});
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <PageHeader
      title="Настройки Service Worker"
      description="Конфигурация кэширования и офлайн-функциональности"
    />

    <LoadingSpinner v-if="toValue(queryServiceWorker.isPending)" />

    <div v-else class="tw:flex tw:flex-col tw:gap-8">
      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Основные параметры" icon="pi pi-cog">
          <BasicSettings />
        </CardSection>

        <CardSection title="Настройки регистрации" icon="pi pi-globe">
          <RegistrationSettings />
        </CardSection>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Исключения (Skip Patterns)" icon="pi pi-ban">
          <SkipPatternsSettings />
        </CardSection>

        <CardSection title="Runtime Cache" icon="pi pi-database">
          <RuntimeCacheSettings />
        </CardSection>
      </div>

      <CardSection title="Стратегии кэширования" icon="pi pi-sitemap">
        <CacheStrategiesSettings />
      </CardSection>

      <CardSection title="Дополнительные настройки" icon="pi pi-sliders-h">
        <AdvancedSettings />
      </CardSection>
    </div>
  </div>
</template>
