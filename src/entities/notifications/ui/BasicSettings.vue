<template>
  <div class="notification-basic-settings">
    <FormField label="Push-уведомления" help="Включить возможность отправки уведомлений">
      <div class="switch-wrapper">
        <ToggleSwitch
          :model-value="settings.enabled"
          @update:model-value="updateField('enabled', $event)"
        />
        <span class="switch-label">
          {{ settings.enabled ? 'Включены' : 'Отключены' }}
        </span>
      </div>
    </FormField>

    <template v-if="settings.enabled">
      <div class="form-row">
        <FormField label="Иконка по умолчанию" help="URL иконки для уведомлений">
          <InputText
            :model-value="settings.default_icon"
            @update:model-value="updateField('default_icon', $event)"
            placeholder="/wp-content/uploads/icon.png"
            class="w-full"
          />
        </FormField>

        <FormField label="Бейдж по умолчанию" help="URL маленькой иконки-бейджа">
          <InputText
            :model-value="settings.default_badge"
            @update:model-value="updateField('default_badge', $event)"
            placeholder="/wp-content/uploads/badge.png"
            class="w-full"
          />
        </FormField>
      </div>

      <FormField label="Показывать при фокусе" help="Показывать уведомления когда сайт открыт">
        <div class="switch-wrapper">
          <ToggleSwitch
            :model-value="settings.show_on_focus"
            @update:model-value="updateField('show_on_focus', $event)"
          />
          <span class="switch-label">
            {{ settings.show_on_focus ? 'Включено' : 'Отключено' }}
          </span>
        </div>
      </FormField>

      <div class="form-row">
        <FormField label="Требовать взаимодействие" help="Уведомление не исчезнет автоматически">
          <div class="switch-wrapper">
            <ToggleSwitch
              :model-value="settings.require_interaction"
              @update:model-value="updateField('require_interaction', $event)"
            />
            <span class="switch-label">
              {{ settings.require_interaction ? 'Включено' : 'Отключено' }}
            </span>
          </div>
        </FormField>

        <FormField label="Беззвучные уведомления" help="Отключить звук уведомлений">
          <div class="switch-wrapper">
            <ToggleSwitch
              :model-value="settings.silent"
              @update:model-value="updateField('silent', $event)"
            />
            <span class="switch-label">
              {{ settings.silent ? 'Включено' : 'Отключено' }}
            </span>
          </div>
        </FormField>
      </div>

      <FormField label="Паттерн вибрации" help="Вибрация в миллисекундах (через запятую)">
        <InputText
          :model-value="settings.vibrate.join(', ')"
          @update:model-value="updateVibratePattern"
          placeholder="200, 100, 200"
          class="w-full"
        />
      </FormField>
    </template>
  </div>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch'
import InputText from 'primevue/inputtext'
import FormField from '@/shared/ui/FormField.vue'
import type { NotificationSettings } from '@/shared/types/notifications'

interface Props {
  settings: NotificationSettings
}

interface Emits {
  (e: 'update:field', field: keyof NotificationSettings, value: unknown): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const updateField = (field: keyof NotificationSettings, value: unknown) => {
  emit('update:field', field, value)
}

const updateVibratePattern = (value: string) => {
  const pattern = value
    .split(',')
    .map((v) => parseInt(v.trim()))
    .filter((v) => !isNaN(v))

  emit('update:field', 'vibrate', pattern)
}
</script>

<style scoped>
.notification-basic-settings {
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .notification-basic-settings {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
