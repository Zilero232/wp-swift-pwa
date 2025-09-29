<template>
  <div class="sw-basic-settings">
    <FormField label="Service Worker" help="Включить функциональность PWA">
      <div class="switch-wrapper">
        <ToggleSwitch
          :model-value="settings.enabled"
          @update:model-value="updateField('enabled', $event)"
        />
        <span class="switch-label">
          {{ settings.enabled ? 'Включен' : 'Отключен' }}
        </span>
      </div>
    </FormField>

    <template v-if="settings.enabled">
      <FormField label="Стратегия кеширования" help="Определяет как будут кешироваться ресурсы">
        <Dropdown
          :model-value="settings.cache_strategy"
          @update:model-value="updateField('cache_strategy', $event)"
          :options="CACHE_STRATEGIES"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>

      <div class="form-row">
        <FormField label="Версия кеша" help="Изменение версии очистит старый кеш">
          <InputText
            :model-value="settings.cache_version"
            @update:model-value="updateField('cache_version', $event)"
            placeholder="1.0.0"
            class="w-full"
          />
        </FormField>

        <FormField label="Оффлайн страница" help="URL страницы для показа в оффлайне">
          <InputText
            :model-value="settings.offline_page"
            @update:model-value="updateField('offline_page', $event)"
            placeholder="/offline"
            class="w-full"
          />
        </FormField>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import FormField from '@/shared/ui/FormField.vue'
import { CACHE_STRATEGIES } from '@/shared/config/constants'
import type { ServiceWorkerSettings } from '@/shared/types/service-worker'

interface Props {
  settings: ServiceWorkerSettings
}

interface Emits {
  (e: 'update:field', field: keyof ServiceWorkerSettings, value: unknown): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const updateField = (field: keyof ServiceWorkerSettings, value: unknown) => {
  emit('update:field', field, value)
}
</script>

<style scoped>
.sw-basic-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
