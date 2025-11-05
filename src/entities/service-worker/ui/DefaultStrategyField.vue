<script setup lang="ts">
import SelectField from '@/shared/ui/SelectField.vue';
import type { CacheStrategy } from '@/shared/types/service-worker';
import { CACHE_STRATEGIES } from '../constants';

interface Props {
  modelValue: CacheStrategy;
  onUpdate: (value: CacheStrategy) => void;
}

defineProps<Props>();
</script>

<template>
  <div class="tw:border-t tw:pt-4">
    <SelectField
      label="Стратегия по умолчанию (для остальных типов файлов)"
      icon="pi pi-cog"
      :options="CACHE_STRATEGIES"
      :model-value="modelValue"
      @update:model-value="onUpdate($event)"
    />
    <p class="tw:text-xs tw:text-gray-500 tw:mt-2">
      Эта стратегия будет применяться к файлам, которые не соответствуют ни одному из
      настроенных расширений
    </p>
  </div>
</template>
