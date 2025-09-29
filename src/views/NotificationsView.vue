<template>
  <div class="notifications-view">
    <div class="view-header">
      <h2>Push-уведомления</h2>
      <p>Настройка веб-уведомлений и VAPID ключей</p>
    </div>

    <div class="view-content">
      <Card class="notifications-status-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-bell"></i>
            <h3>Статус уведомлений</h3>
            <div
              class="status-indicator"
              :class="{ 'status-indicator--active': notificationsStore.isEnabled }"
            >
              {{ notificationsStore.isEnabled ? 'Включены' : 'Отключены' }}
            </div>
          </div>
        </template>

        <NotificationBasicSettings
          :settings="notificationsStore.settings"
          @update:field="updateNotificationField"
        />
      </Card>

      <Card v-if="notificationsStore.isEnabled" class="vapid-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-key"></i>
            <h3>VAPID ключи</h3>
            <Button
              icon="pi pi-refresh"
              label="Генерировать новые"
              size="small"
              text
              @click="generateVapidKeys"
            />
          </div>
        </template>

        <VapidSettings
          :settings="notificationsStore.settings"
          @update:field="updateNotificationField"
          @generate="generateVapidKeys"
        />
      </Card>

      <Card v-if="notificationsStore.isEnabled" class="notification-templates-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-file-edit"></i>
            <h3>Шаблоны уведомлений</h3>
          </div>
        </template>

        <NotificationTemplates
          :templates="notificationsStore.templates"
          @update:templates="notificationsStore.updateTemplates"
        />
      </Card>

      <Card v-if="notificationsStore.isEnabled" class="test-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-send"></i>
            <h3>Тестирование</h3>
          </div>
        </template>

        <NotificationTest @send-test="sendTestNotification" :loading="testLoading" />
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Card from '@/shared/ui/Card.vue'
import NotificationBasicSettings from '@/entities/notifications/ui/BasicSettings.vue'
import VapidSettings from '@/entities/notifications/ui/VapidSettings.vue'
import NotificationTemplates from '@/entities/notifications/ui/Templates.vue'
import NotificationTest from '@/entities/notifications/ui/Test.vue'
import { useNotificationsStore } from '@/entities/notifications/model/store'
import type { NotificationSettings } from '@/shared/types/notifications'

const notificationsStore = useNotificationsStore()
const testLoading = ref(false)

const updateNotificationField = (field: keyof NotificationSettings, value: unknown) => {
  notificationsStore.updateSettings({ [field]: value })
}

const generateVapidKeys = async () => {
  try {
    // API call to generate VAPID keys
    const keys = await fetch('/wp-json/swift-pwa-api/v1/vapid/generate', {
      method: 'POST',
      headers: {
        'X-WP-Nonce': window.swiftPWA?.nonce || '',
      },
    }).then((res) => res.json())

    notificationsStore.updateSettings({
      vapid_public_key: keys.public_key,
      vapid_private_key: keys.private_key,
    })
  } catch (error) {
    console.error('Error generating VAPID keys:', error)
  }
}

const sendTestNotification = async (notification: any) => {
  testLoading.value = true
  try {
    await fetch('/wp-json/swift-pwa-api/v1/notifications/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.swiftPWA?.nonce || '',
      },
      body: JSON.stringify(notification),
    })
  } catch (error) {
    console.error('Error sending test notification:', error)
  } finally {
    testLoading.value = false
  }
}
</script>

<style scoped>
.notifications-view {
  padding: 2rem;
}

.view-header {
  margin-bottom: 2rem;
  text-align: center;
}

.view-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
}

.view-header p {
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 1.1rem;
}

.view-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem 0;
}

.card-header i {
  font-size: 1.25rem;
  color: var(--primary-color);
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  flex: 1;
}

.status-indicator {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: var(--red-100);
  color: var(--red-700);
}

.status-indicator--active {
  background: var(--green-100);
  color: var(--green-700);
}

.notifications-status-card,
.vapid-card,
.notification-templates-card,
.test-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--surface-border);
  transition: box-shadow 0.3s ease;
}

.notifications-status-card:hover,
.vapid-card:hover,
.notification-templates-card:hover,
.test-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .notifications-view {
    padding: 1rem;
  }

  .view-header h2 {
    font-size: 1.5rem;
  }

  .view-header p {
    font-size: 1rem;
  }
}
</style>
