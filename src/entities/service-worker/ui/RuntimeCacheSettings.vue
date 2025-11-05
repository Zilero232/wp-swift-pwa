<script setup lang="ts">
import { computed } from 'vue';
import { InputSwitch } from 'primevue';

import InputField from '@/shared/ui/InputField.vue';

import { useServiceWorkerQuery } from '../model/useServiceWorkerQuery';

const { queryServiceWorker, updateServiceWorker } = useServiceWorkerQuery();

const queryServiceWorkerData = computed(() => queryServiceWorker.data.value);

const updateRuntimeCache = (
  payload: Partial<typeof queryServiceWorkerData.value.runtime_cache>,
) => {
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
      <InputSwitch
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
      >
        <template #helper>
          <small class="tw:text-gray-500 tw:block tw:mt-1"
            >Максимальное количество файлов в кэше</small
          >
        </template>
      </InputField>

      <InputField
        label="Максимальный возраст (секунды)"
        icon="pi pi-clock"
        type="number"
        :model-value="queryServiceWorkerData?.runtime_cache?.max_age_seconds?.toString()"
        @update:model-value="updateRuntimeCache({ max_age_seconds: Number($event) })"
      >
        <template #helper>
          <small class="tw:text-gray-500 tw:block tw:mt-1"
            >Время жизни записи в кэше (86400 = 24 часа)</small
          >
        </template>
      </InputField>
    </div>
  </div>
</template>
