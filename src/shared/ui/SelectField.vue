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
  <div class="w-full">
    <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
      <i v-if="icon" :class="['text-xs mr-1', icon]"></i>
      {{ label }}

      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>

    <Select v-bind="{ ...selectProps, ...$attrs }" option-label="label" option-value="value" class="w-full" />
  </div>
</template>
