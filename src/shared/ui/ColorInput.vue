<script setup lang="ts">
import {
 InputText, ColorPicker 
} from 'primevue';

interface Props {
  label: string;
  icon?: string;
  required?: boolean;
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const handleColorChange = (value: string | undefined) => {
  emit('update:modelValue', value || '');
};

const handleTextInput = (value: string | undefined) => {
  emit('update:modelValue', value || '');
};
</script>

<template>
  <div>
    <label
      class="tw:block tw:text-xs tw:font-semibold tw:text-gray-600 tw:mb-1.5 tw:uppercase tw:tracking-wide"
    >
      <i v-if="icon" :class="['tw:text-xs tw:mr-1', icon]"></i>
      {{ label }}

      <span v-if="required" class="tw:text-red-500 tw:ml-0.5">*</span>
    </label>

    <div class="tw:flex tw:gap-2 tw:items-center">
      <ColorPicker
        :model-value="modelValue"
        :disabled="disabled"
        format="hex"
        @update:model-value="handleColorChange"
      />

      <InputText
        class="tw:flex-1"
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @update:model-value="handleTextInput"
      />
    </div>
  </div>
</template>

<style>
.p-colorpicker-preview {
  height: 34px !important;
  width: 34px !important;
}
</style>
