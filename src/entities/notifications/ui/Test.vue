<template>
  <div class="notification-test">
    <div class="test-form">
      <FormField label="Заголовок">
        <InputText v-model="testData.title" placeholder="Тестовое уведомление" class="w-full" />
      </FormField>

      <FormField label="Текст уведомления">
        <Textarea
          v-model="testData.body"
          placeholder="Это тестовое push-уведомление"
          rows="3"
          class="w-full"
        />
      </FormField>

      <div class="form-row">
        <FormField label="Иконка (URL)">
          <InputText
            v-model="testData.icon"
            placeholder="/wp-content/uploads/icon.png"
            class="w-full"
          />
        </FormField>

        <FormField label="Тег">
          <InputText v-model="testData.tag" placeholder="test-notification" class="w-full" />
        </FormField>
      </div>

      <div class="form-row">
        <FormField label="Беззвучное">
          <ToggleSwitch v-model="testData.silent" />
        </FormField>

        <FormField label="Требует взаимодействие">
          <ToggleSwitch v-model="testData.requireInteraction" />
        </FormField>
      </div>

      <FormField label="Паттерн вибрации">
        <InputText v-model="vibratePattern" placeholder="200, 100, 200" class="w-full" />
      </FormField>
    </div>

    <div class="test-actions">
      <Button
        label="Отправить тестовое уведомление"
        icon="pi pi-send"
        @click="sendTest"
        :loading="loading"
        :disabled="!testData.title || !testData.body"
      />
    </div>

    <div class="test-info">
      <div class="info-item">
        <i class="pi pi-info-circle"></i>
        <div class="info-content">
          <h5>Тестирование уведомлений</h5>
          <ul>
            <li>Для тестирования нужно разрешение на уведомления</li>
            <li>Сайт должен быть открыт по HTTPS</li>
            <li>Service Worker должен быть активен</li>
            <li>VAPID ключи должны быть настроены</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import ToggleSwitch from 'primevue/toggleswitch'
import FormField from '@/shared/ui/FormField.vue'
import type { TestNotification } from '@/shared/types/notifications'

interface Props {
  loading?: boolean
}

interface Emits {
  (e: 'send-test', notification: TestNotification): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const testData = reactive({
  title: 'Тестовое уведомление',
  body: 'Это тестовое push-уведомление из WordPress PWA',
  icon: '',
  tag: 'test-notification',
  silent: false,
  requireInteraction: false,
})

const vibratePattern = ref('200, 100, 200')

const sendTest = () => {
  const vibrate = vibratePattern.value
    .split(',')
    .map((v) => parseInt(v.trim()))
    .filter((v) => !isNaN(v))

  const notification: TestNotification = {
    title: testData.title,
    body: testData.body,
    icon: testData.icon || undefined,
    tag: testData.tag || undefined,
    silent: testData.silent,
    requireInteraction: testData.requireInteraction,
    vibrate: vibrate.length > 0 ? vibrate : undefined,
  }

  emit('send-test', notification)
}
</script>

<style scoped>
.notification-test {
  padding: 1.5rem;
}

.test-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
}

.test-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.test-info {
  padding: 1rem;
  background: var(--yellow-50);
  border: 1px solid var(--yellow-200);
  border-radius: 8px;
}

.info-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.info-item i {
  color: var(--yellow-600);
  font-size: 1.125rem;
  margin-top: 0.125rem;
}

.info-content h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--yellow-800);
}

.info-content ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--yellow-700);
}

.info-content li {
  margin-bottom: 0.25rem;
}

@media (max-width: 768px) {
  .notification-test {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
