<script setup lang="ts">
import { onMounted } from 'vue';
import { Card } from 'primevue';
import { useRouter } from 'vue-router';

import BasicSettings from '@/entities/service-worker/ui/BasicSettings.vue';
import CacheStrategiesSettings from '@/entities/service-worker/ui/CacheStrategiesSettings.vue';
import RuntimeCacheSettings from '@/entities/service-worker/ui/RuntimeCacheSettings.vue';

import { useServiceWorkerQuery } from '@/entities/service-worker/model/useServiceWorkerQuery';

const router = useRouter();

const { loadServiceWorker } = useServiceWorkerQuery();

onMounted(() => {
  loadServiceWorker();
});
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <div class="tw:mb-8 tw:text-center">
      <h2 class="tw:text-2xl sm:tw:text-3xl tw:font-bold tw:text-gray-800 tw:mb-2">
        Настройки Service Worker
      </h2>

      <p class="tw:text-gray-600 tw:text-lg">
        Конфигурация кэширования и офлайн-функциональности
      </p>
    </div>

    <div class="tw:flex tw:flex-col tw:gap-8">
      <Card>
        <template #header>
          <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
            <i class="pi pi-cog tw:text-xl tw:text-blue-600"></i>
            <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">
              Основные параметры
            </h3>
          </div>
        </template>

        <template #content>
          <BasicSettings />
        </template>
      </Card>

      <Card>
        <template #header>
          <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
            <i class="pi pi-sitemap tw:text-xl tw:text-purple-600"></i>

            <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">
              Стратегии кэширования
            </h3>
          </div>
        </template>

        <template #content>
          <CacheStrategiesSettings />
        </template>
      </Card>

      <Card>
        <template #header>
          <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
            <i class="pi pi-database tw:text-xl tw:text-green-600"></i>
            <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">Runtime Cache</h3>
          </div>
        </template>

        <template #content>
          <RuntimeCacheSettings />
        </template>
      </Card>
    </div>
  </div>
</template>
