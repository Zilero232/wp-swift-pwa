<script setup lang="ts">
import {
 computed 
} from 'vue';

import InputField from '@/shared/ui/InputField.vue';

import {
 useServiceWorkerQuery 
} from '../model/useServiceWorkerQuery';

const {
 queryServiceWorker, updateServiceWorker 
} = useServiceWorkerQuery();

const queryServiceWorkerData = computed(() => queryServiceWorker.data.value);
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-6">
      <InputField
        label="Версия"
        icon="pi pi-tag"
        placeholder="1.0.0"
        :model-value="queryServiceWorkerData?.version"
        @update:model-value="updateServiceWorker({ version: $event })"
      />

      <InputField
        label="Имя кэша"
        icon="pi pi-database"
        placeholder="swift-pwa-cache-v1"
        :model-value="queryServiceWorkerData?.cache_name"
        @update:model-value="updateServiceWorker({ cache_name: $event })"
      />
    </div>

    <InputField
      label="Офлайн страница"
      icon="pi pi-wifi"
      placeholder="/offline.html"
      :model-value="queryServiceWorkerData?.offline_page"
      @update:model-value="updateServiceWorker({ offline_page: $event })"
    />
  </div>
</template>
