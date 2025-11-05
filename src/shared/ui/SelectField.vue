<script setup lang="ts">
import { computed } from 'vue';
import { Select, type SelectProps } from 'primevue';

interface Props extends SelectProps {
  label: string;
  icon?: string;
  required?: boolean;
}

const props = defineProps<Props>();

const selectProps = computed(() => {
  const { label, icon, required, ...rest } = props;

  return rest;
});

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="tw:w-full">
    <label
      class="tw:block tw:text-xs tw:font-semibold tw:text-gray-600 tw:mb-1.5 tw:uppercase tw:tracking-wide"
    >
      <i v-if="icon" :class="['text-xs mr-1', icon]"></i>
      {{ label }}

      <span v-if="required" class="tw:text-red-500 tw:ml-0.5">*</span>
    </label>

    <Select
      v-bind="{ ...selectProps, ...$attrs }"
      option-label="label"
      option-value="value"
      class="tw:w-full"
    />
  </div>
</template>
