<script setup lang="ts">
import {
 ref 
} from 'vue';
import {
 Button 
} from 'primevue';

import SelectField from '@/shared/ui/SelectField.vue';
import InputField from '@/shared/ui/InputField.vue';

import type {
 ENUM_CACHE_STRATEGIES 
} from '@/shared/types/service-worker';

import type {
 StrategyItem 
} from '../model/useCacheStrategies';

import {
 CACHE_STRATEGIES 
} from '../constants';

interface Props {
  strategy: StrategyItem;
  icon: string;
  onUpdateStrategy: (extensions: string, value: ENUM_CACHE_STRATEGIES) => void;
  onUpdateExtensions: (oldExtensions: string, newExtensions: string) => void;
  onRemove: (extensions: string) => void;
}

const props = defineProps<Props>();

// Локальное состояние для редактирования расширений
const editingValue = ref(props.strategy.extensions);

const handleBlur = () => {
  props.onUpdateExtensions(props.strategy.extensions, editingValue.value);
};

const handleEnter = () => {
  props.onUpdateExtensions(props.strategy.extensions, editingValue.value);
};
</script>

<template>
  <div
    class="tw:bg-gray-50 tw:border tw:border-gray-200 tw:rounded-lg tw:p-4 tw:flex tw:flex-col tw:gap-4"
  >
    <div class="tw:flex tw:items-start tw:gap-2">
      <div class="tw:flex-1 tw:flex tw:flex-col tw:gap-4">
        <InputField
          v-model="editingValue"
          label="Расширения (через запятую)"
          placeholder="например: mp4,webm,mp3"
          :icon="icon"
          @blur="handleBlur"
          @keyup.enter="handleEnter"
        />

        <SelectField
          label="Стратегия кэширования"
          icon="pi pi-cog"
          :options="CACHE_STRATEGIES"
          :model-value="strategy.strategy"
          @update:model-value="onUpdateStrategy(strategy.extensions, $event)"
        />
      </div>

      <Button
        icon="pi pi-times"
        severity="danger"
        text
        rounded
        size="small"
        class="tw:mt-1"
        @click="onRemove(strategy.extensions)"
      />
    </div>
  </div>
</template>
