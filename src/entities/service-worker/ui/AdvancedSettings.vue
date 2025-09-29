<template>
  <div class="sw-advanced-settings">
    <FormField label="Таймаут сети" help="Время ожидания сетевого запроса (в миллисекундах)">
      <div class="input-with-unit">
        <InputNumber
          :model-value="settings.network_timeout"
          @update:model-value="updateField('network_timeout', $event)"
          :min="1000"
          :max="30000"
          :step="1000"
          suffix=" мс"
          class="w-full"
        />
      </div>
    </FormField>

    <FormField
      label="Фоновая синхронизация"
      help="Повторная отправка запросов при восстановлении соединения"
    >
      <div class="switch-wrapper">
        <ToggleSwitch
          :model-value="settings.background_sync"
          @update:model-value="updateField('background_sync', $event)"
        />
        <span class="switch-label">
          {{ settings.background_sync ? 'Включена' : 'Отключена' }}
        </span>
      </div>
    </FormField>

    <FormField label="Push уведомления" help="Возможность получения уведомлений в фоновом режиме">
      <div class="switch-wrapper">
        <ToggleSwitch
          :model-value="settings.push_notifications"
          @update:model-value="updateField('push_notifications', $event)"
        />
        <span class="switch-label">
          {{ settings.push_notifications ? 'Включены' : 'Отключены' }}
        </span>
      </div>
    </FormField>

    <div class="advanced-info">
      <div class="info-item">
        <i class="pi pi-info-circle"></i>
        <div class="info-content">
          <h5>Рекомендации</h5>
          <ul>
            <li>Оптимальный таймаут сети: 5-10 секунд</li>
            <li>Фоновая синхронизация полезна для форм и заказов</li>
            <li>Push уведомления требуют согласия пользователя</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch'
import InputNumber from 'primevue/inputnumber'
import FormField from '@/shared/ui/FormField.vue'
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
.sw-advanced-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
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

.input-with-unit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.advanced-info {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--blue-50);
  border: 1px solid var(--blue-200);
  border-radius: 8px;
}

.info-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.info-item i {
  color: var(--blue-600);
  font-size: 1.125rem;
  margin-top: 0.125rem;
}

.info-content h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--blue-800);
}

.info-content ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--blue-700);
}

.info-content li {
  margin-bottom: 0.25rem;
}

@media (max-width: 768px) {
  .sw-advanced-settings {
    padding: 1rem;
  }

  .info-item {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
