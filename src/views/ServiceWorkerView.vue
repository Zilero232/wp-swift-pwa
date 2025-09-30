<script setup lang="ts">
import { Card } from 'primevue';

import { useServiceWorkerStore } from '@/entities/service-worker/model/store';

import BasicSettings from '@/entities/service-worker/ui/BasicSettings.vue';
import CacheSettings from '@/entities/service-worker/ui/CacheSettings.vue';
import AdvancedSettings from '@/entities/service-worker/ui/AdvancedSettings.vue';

import type { ServiceWorkerSettings } from '@/shared/types/service-worker';

const swStore = useServiceWorkerStore();

const updateSWField = (field: keyof ServiceWorkerSettings, value: unknown) => {
  swStore.updateSettings({ [field]: value });
};
</script>

<template>
  <div class="p-4 sm:p-8">
    <div class="mb-8 text-center">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Service Worker</h2>
      <p class="text-gray-600 text-lg">Настройки кеширования и оффлайн функциональности</p>
    </div>

    <div class="flex flex-col gap-8">
      <Card>
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0 flex-wrap">
            <i class="pi pi-cog text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800 flex-1">Статус Service Worker</h3>
            <div
              class="px-3 py-1 rounded-full text-xs font-semibold uppercase"
              :class="swStore.isEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
              {{ swStore.isEnabled ? 'Активен' : 'Отключен' }}
            </div>
          </div>
        </template>

        <template #content>
          <BasicSettings :settings="swStore.settings" @update:field="updateSWField" />
        </template>
      </Card>

      <Card v-if="swStore.isEnabled">
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0 flex-wrap">
            <i class="pi pi-database text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800 flex-1">Настройки кеширования</h3>
            <div class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{{ swStore.cacheResourcesCount }} типов ресурсов</div>
          </div>
        </template>

        <template #content>
          <CacheSettings
            :cache-resources="swStore.settings.cache_resources"
            :exclude-patterns="swStore.settings.exclude_patterns"
            @update:cache-resources="updateSWField('cache_resources', $event)"
            @add:exclude-pattern="swStore.addExcludePattern"
            @remove:exclude-pattern="swStore.removeExcludePattern"
          />
        </template>
      </Card>

      <Card v-if="swStore.isEnabled">
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <i class="pi pi-sliders-h text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800">Дополнительные настройки</h3>
          </div>
        </template>

        <template #content>
          <AdvancedSettings :settings="swStore.settings" @update:field="updateSWField" />
        </template>
      </Card>
    </div>
  </div>
</template>
