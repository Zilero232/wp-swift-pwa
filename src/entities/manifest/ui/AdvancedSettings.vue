<template>
  <div class="advanced-settings">
    <div class="form-row">
      <FormField label="Стартовый URL" help="URL, который открывается при запуске приложения" :error="getFieldError('start_url')">
        <InputText :model-value="manifest.start_url || '/'" @update:model-value="updateField('start_url', $event)" placeholder="/" class="w-full" />
      </FormField>

      <FormField label="Область навигации" help="Ограничивает область навигации приложения" :error="getFieldError('scope')">
        <InputText :model-value="manifest.scope || '/'" @update:model-value="updateField('scope', $event)" placeholder="/" class="w-full" />
      </FormField>
    </div>

    <div class="form-row">
      <FormField label="Язык приложения" help="Основной язык интерфейса" :error="getFieldError('lang')">
        <Dropdown
          :model-value="manifest.lang"
          @update:model-value="updateField('lang', $event)"
          :options="LANGUAGE_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>

      <FormField label="Направление текста" help="Направление чтения текста" :error="getFieldError('dir')">
        <Dropdown
          :model-value="manifest.dir"
          @update:model-value="updateField('dir', $event)"
          :options="TEXT_DIRECTION_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>
    </div>

    <FormField label="Предпочитать связанные приложения" help="Предлагать установку нативного приложения вместо PWA">
      <div class="switch-wrapper">
        <ToggleSwitch :model-value="manifest.prefer_related_applications" @update:model-value="updateField('prefer_related_applications', $event)" />
        <span class="switch-label">
          {{ manifest.prefer_related_applications ? 'Включено' : 'Отключено' }}
        </span>
      </div>
    </FormField>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import ToggleSwitch from 'primevue/toggleswitch';
import FormField from '@/shared/ui/FormField.vue';
import { LANGUAGE_OPTIONS, TEXT_DIRECTION_OPTIONS } from '@/shared/config/constants';
import type { ManifestSettings } from '../schemas';

interface Props {
  manifest: ManifestSettings;
  errors?: string[];
}

interface Emits {
  (e: 'update:field', field: keyof ManifestSettings, value: unknown): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const updateField = (field: keyof ManifestSettings, value: unknown) => {
  emit('update:field', field, value);
};

const getFieldError = (field: string): string | undefined => {
  return props.errors?.find((error) => error.toLowerCase().includes(field.replace('_', ' ')));
};
</script>

<style scoped>
.advanced-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.switch-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.switch-label {
  font-weight: 500;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
