<script setup lang="ts">
import {
 Button 
} from 'primevue';

import type {
 BASE_EXTENSIONS 
} from '../constants';

interface Props {
  availableTypes: typeof BASE_EXTENSIONS;
  onSelect: (baseType: (typeof BASE_EXTENSIONS)[number]) => void;
}

defineProps<Props>();
</script>

<template>
  <div>
    <h3 class="tw:text-sm tw:font-semibold tw:text-gray-700 tw:mb-3">
      Быстрый выбор базовых типов:
    </h3>

    <div class="tw:flex tw:flex-wrap tw:gap-2">
      <Button
        v-for="baseType in availableTypes"
        :key="baseType.extensions"
        :label="baseType.label"
        :icon="baseType.icon"
        size="small"
        outlined
        @click="onSelect(baseType)"
      />
    </div>
  </div>
</template>
