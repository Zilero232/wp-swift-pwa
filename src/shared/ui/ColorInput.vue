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
  <div class="flex gap-2 items-center">
    <input
      :value="modelValue"
      @input="handleColorInput"
      type="color"
      class="w-12 h-10 border border-gray-300 rounded-md cursor-pointer bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-60"
      :disabled="disabled"
    />
    <InputText :model-value="modelValue" @update:model-value="handleTextInput" class="flex-1" :placeholder="placeholder" :disabled="disabled" />
  </div>
</template>
