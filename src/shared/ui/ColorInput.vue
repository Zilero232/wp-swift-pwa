<script setup lang="ts">
import InputText from 'primevue/inputtext';

interface Props {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleColorInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};

const handleTextInput = (value: string | undefined) => {
  emit('update:modelValue', value || '');
};
</script>

<template>
  <div class="tw:flex tw:gap-2 tw:items-center">
    <input
      :value="modelValue"
      @input="handleColorInput"
      type="color"
      class="tw:w-12 tw:h-10 tw:border tw:border-gray-300 tw:rounded-md tw:cursor-pointer tw:bg-transparent tw:p-0 tw:disabled:cursor-not-allowed tw:disabled:opacity-60"
      :disabled="disabled"
    />
    <InputText :model-value="modelValue" @update:model-value="handleTextInput" class="tw:flex-1" :placeholder="placeholder" :disabled="disabled" />
  </div>
</template>
