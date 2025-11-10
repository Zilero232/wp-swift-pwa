<script setup lang="ts">
import {
 Select 
} from 'primevue';

interface Props {
  label: string;
  icon?: string;
  required?: boolean;
}

defineProps<Props>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="tw:w-full">
    <label
      class="tw:block tw:text-xs tw:font-semibold tw:text-gray-600 tw:mb-1.5 tw:uppercase tw:tracking-wide"
    >
      <i v-if="icon" :class="['tw:text-xs tw:mr-1', icon]"></i>
      {{ label }}

      <span v-if="required" class="tw:text-red-500 tw:ml-0.5">*</span>
    </label>

    <Select v-bind="$attrs" option-label="label" option-value="value" class="tw:w-full" />
  </div>
</template>
