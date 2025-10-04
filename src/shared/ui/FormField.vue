<template>
  <div class="flex flex-col gap-2" :class="{ 'text-red-600': hasError }">
    <label
      v-if="label"
      :for="fieldId"
      class="text-sm font-medium text-gray-700"
      :class="{ 'text-red-600': hasError }"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div>
      <slot />
    </div>

    <small v-if="help && !hasError" class="text-xs text-gray-500 leading-relaxed">
      {{ help }}
    </small>

    <small v-if="hasError" class="text-xs text-red-500 leading-relaxed">
      {{ error }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label?: string;
  help?: string;
  error?: string;
  required?: boolean;
  fieldId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
});

const hasError = computed(() => Boolean(props.error));
</script>
