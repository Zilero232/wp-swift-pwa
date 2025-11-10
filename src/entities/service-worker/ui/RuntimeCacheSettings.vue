<script setup lang="ts">
import {
 computed 
} from 'vue';
import {
 ToggleSwitch 
} from 'primevue';

import InputField from '@/shared/ui/InputField.vue';

import type {
 RuntimeCacheConfig 
} from '@/shared/types/service-worker';

import {
 useServiceWorkerQuery 
} from '../model/useServiceWorkerQuery';

const {
 queryServiceWorker, updateServiceWorker 
} = useServiceWorkerQuery();

const queryServiceWorkerData = computed(() => queryServiceWorker.data.value);

const updateRuntimeCache = (payload: Partial<RuntimeCacheConfig>) => {
  if (!queryServiceWorkerData.value?.runtime_cache) return;

  updateServiceWorker({
    runtime_cache: {
      ...queryServiceWorkerData.value.runtime_cache,
      ...payload,
    },
  });
};
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div
      class="tw:flex tw:items-center tw:justify-between tw:p-4 tw:bg-gray-50 tw:rounded-lg"
    >
      <div>
        <label class="tw:font-medium tw:text-gray-700 tw:block tw:mb-1"
          >Включить runtime cache</label
        >

        <small class="tw:text-gray-500"
          >Автоматическое кэширование ресурсов во время использования</small
        >
      </div>

      <ToggleSwitch
        :model-value="queryServiceWorkerData?.runtime_cache?.enabled"
        @update:model-value="updateRuntimeCache({ enabled: $event })"
      />
    </div>

    <div
      v-if="queryServiceWorkerData?.runtime_cache?.enabled"
      class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-6"
    >
      <InputField
        label="Максимум записей в кэше"
        icon="pi pi-list"
        type="number"
        :model-value="queryServiceWorkerData?.runtime_cache?.max_entries?.toString()"
        @update:model-value="updateRuntimeCache({ max_entries: Number($event) })"
      />

      <InputField
        label="Максимальный возраст (секунды)"
        icon="pi pi-clock"
        type="number"
        :model-value="queryServiceWorkerData?.runtime_cache?.max_age_seconds?.toString()"
        @update:model-value="updateRuntimeCache({ max_age_seconds: Number($event) })"
      />
    </div>
  </div>
</template>
