<script setup lang="ts">
import InputText from 'primevue/inputtext'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleColorInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

const handleTextInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="color-input">
    <input
      :value="modelValue"
      @input="handleColorInput"
      type="color"
      class="color-input__picker"
      :disabled="disabled"
    />
    <InputText
      :model-value="modelValue"
      @update:model-value="handleTextInput"
      class="color-input__text"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<style scoped>
.color-input {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.color-input__picker {
  width: 3rem;
  height: 2.5rem;
  border: 1px solid var(--surface-border);
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  padding: 0;
}

.color-input__picker:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.color-input__text {
  flex: 1;
}
</style>
