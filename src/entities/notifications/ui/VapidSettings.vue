<template>
  <div class="vapid-settings">
    <div class="vapid-info">
      <div class="info-item">
        <i class="pi pi-info-circle"></i>
        <div class="info-content">
          <h5>О VAPID ключах</h5>
          <p>
            VAPID ключи необходимы для отправки push-уведомлений. Публичный ключ используется в
            браузере, приватный - на сервере.
          </p>
        </div>
      </div>
    </div>

    <FormField
      label="Публичный ключ VAPID"
      help="Используется для подписки на уведомления в браузере"
    >
      <div class="key-input">
        <InputText
          :model-value="settings.vapid_public_key"
          @update:model-value="updateField('vapid_public_key', $event)"
          placeholder="Публичный ключ VAPID..."
          class="w-full"
          readonly
        />
        <Button
          icon="pi pi-copy"
          text
          size="small"
          @click="copyToClipboard(settings.vapid_public_key)"
          :disabled="!settings.vapid_public_key"
        />
      </div>
    </FormField>

    <FormField label="Приватный ключ VAPID" help="Используется на сервере для отправки уведомлений">
      <div class="key-input">
        <InputText :model-value="maskedPrivateKey" class="w-full" readonly />
        <Button
          icon="pi pi-eye"
          text
          size="small"
          @click="togglePrivateKeyVisibility"
          :disabled="!settings.vapid_private_key"
        />
        <Button
          icon="pi pi-copy"
          text
          size="small"
          @click="copyToClipboard(settings.vapid_private_key)"
          :disabled="!settings.vapid_private_key"
        />
      </div>
    </FormField>

    <div class="actions">
      <Button
        label="Генерировать новые ключи"
        icon="pi pi-refresh"
        @click="$emit('generate')"
        severity="secondary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import FormField from '@/shared/ui/FormField.vue'
import type { NotificationSettings } from '@/shared/types/notifications'

interface Props {
  settings: NotificationSettings
}

interface Emits {
  (e: 'update:field', field: keyof NotificationSettings, value: unknown): void
  (e: 'generate'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const showPrivateKey = ref(false)

const maskedPrivateKey = computed(() => {
  if (!props.settings.vapid_private_key) return ''
  if (showPrivateKey.value) return props.settings.vapid_private_key
  return '●'.repeat(Math.min(props.settings.vapid_private_key.length, 50))
})

const updateField = (field: keyof NotificationSettings, value: unknown) => {
  emit('update:field', field, value)
}

const togglePrivateKeyVisibility = () => {
  showPrivateKey.value = !showPrivateKey.value
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // TODO: Добавить toast уведомление об успешном копировании
  } catch (error) {
    console.error('Ошибка копирования в буфер обмена:', error)
  }
}
</script>

<style scoped>
.vapid-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
}

.vapid-info {
  margin-bottom: 1rem;
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

.info-content p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--blue-700);
  line-height: 1.4;
}

.key-input {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .vapid-settings {
    padding: 1rem;
  }

  .key-input {
    flex-wrap: wrap;
  }
}
</style>
