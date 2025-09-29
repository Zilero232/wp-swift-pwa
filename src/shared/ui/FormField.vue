<template>
  <div class="form-field" :class="{ 'form-field--error': hasError }">
    <label v-if="label" :for="fieldId" class="form-field__label">
      {{ label }}
      <span v-if="required" class="form-field__required">*</span>
    </label>

    <div class="form-field__input">
      <slot />
    </div>

    <small v-if="help && !hasError" class="form-field__help">
      {{ help }}
    </small>

    <small v-if="hasError" class="form-field__error">
      {{ error }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: string
  help?: string
  error?: string
  required?: boolean
  fieldId?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
})

const hasError = computed(() => Boolean(props.error))
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field__label {
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.875rem;
}

.form-field__required {
  color: var(--red-500);
}

.form-field__help {
  color: var(--text-color-secondary);
  font-size: 0.75rem;
  line-height: 1.4;
}

.form-field__error {
  color: var(--red-500);
  font-size: 0.75rem;
  line-height: 1.4;
}

.form-field--error .form-field__label {
  color: var(--red-500);
}
</style>
