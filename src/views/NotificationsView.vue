<template>
  <div class="p-4 sm:p-8">
    <div class="mb-8 text-center">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Push-уведомления</h2>
      <p class="text-gray-600 text-lg">Настройка веб-уведомлений и VAPID ключей</p>
    </div>

    <div class="flex flex-col gap-8">
      <Card>
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <i class="pi pi-bell text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800 flex-1">Статус уведомлений</h3>
            <div
              class="px-3 py-1 rounded-full text-xs font-semibold uppercase"
              :class="notificationsStore.isEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
              {{ notificationsStore.isEnabled ? 'Включены' : 'Отключены' }}
            </div>
          </div>
        </template>

        <template #content>
          <NotificationBasicSettings :settings="notificationsStore.settings" @update:field="updateNotificationField" />
        </template>
      </Card>

      <Card v-if="notificationsStore.isEnabled">
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <i class="pi pi-key text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800 flex-1">VAPID ключи</h3>
            <Button icon="pi pi-refresh" label="Генерировать новые" size="small" text @click="generateVapidKeys" />
          </div>
        </template>

        <template #content>
          <VapidSettings :settings="notificationsStore.settings" @update:field="updateNotificationField" @generate="generateVapidKeys" />
        </template>
      </Card>

      <Card v-if="notificationsStore.isEnabled">
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <i class="pi pi-file-edit text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800">Шаблоны уведомлений</h3>
          </div>
        </template>

        <template #content>
          <NotificationTemplates :templates="notificationsStore.templates" @update:templates="notificationsStore.updateTemplates" />
        </template>
      </Card>

      <Card v-if="notificationsStore.isEnabled">
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <i class="pi pi-send text-xl text-blue-600"></i>
            <h3 class="text-xl font-semibold text-gray-800">Тестирование</h3>
          </div>
        </template>

        <template #content>
          <NotificationTest @send-test="sendTestNotification" :loading="testLoading" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Card, Button } from 'primevue';

import NotificationBasicSettings from '@/entities/notifications/ui/BasicSettings.vue';
import VapidSettings from '@/entities/notifications/ui/VapidSettings.vue';
import NotificationTemplates from '@/entities/notifications/ui/Templates.vue';
import NotificationTest from '@/entities/notifications/ui/Test.vue';

import { useNotificationsStore } from '@/entities/notifications/model/store';

import type { NotificationSettings } from '@/shared/types/notifications';

const notificationsStore = useNotificationsStore();
const testLoading = ref(false);

const updateNotificationField = (field: keyof NotificationSettings, value: unknown) => {
  notificationsStore.updateSettings({ [field]: value });
};

const generateVapidKeys = async () => {
  try {
    // API call to generate VAPID keys
    const keys = await fetch('/wp-json/swift-pwa-api/v1/vapid/generate', {
      method: 'POST',
      headers: {
        'X-WP-Nonce': window.swiftPWA?.nonce || '',
      },
    }).then((res) => res.json());

    notificationsStore.updateSettings({
      vapid_public_key: keys.public_key,
      vapid_private_key: keys.private_key,
    });
  } catch (error) {
    console.error('Error generating VAPID keys:', error);
  }
};

const sendTestNotification = async (notification: any) => {
  testLoading.value = true;
  try {
    await fetch('/wp-json/swift-pwa-api/v1/notifications/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.swiftPWA?.nonce || '',
      },
      body: JSON.stringify(notification),
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
  } finally {
    testLoading.value = false;
  }
};
</script>
