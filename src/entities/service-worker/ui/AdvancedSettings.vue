<script setup lang="ts">
import {
 computed 
} from 'vue';
import {
 ToggleSwitch 
} from 'primevue';

import InputField from '@/shared/ui/InputField.vue';
import InfoBlock from '@/shared/ui/InfoBlock.vue';

import type {
  BackgroundSyncConfig,
  PushNotificationsConfig,
} from '@/shared/types/service-worker';

import {
 useServiceWorkerQuery 
} from '../model/useServiceWorkerQuery';

const {
 queryServiceWorker, updateServiceWorker 
} = useServiceWorkerQuery();

const queryServiceWorkerData = computed(() => queryServiceWorker.data.value);

const updateBackgroundSync = (payload: Partial<BackgroundSyncConfig>) => {
  if (!queryServiceWorkerData.value?.background_sync) return;

  updateServiceWorker({
    background_sync: {
      ...queryServiceWorkerData.value.background_sync,
      ...payload,
    },
  });
};

const updatePushNotifications = (payload: Partial<PushNotificationsConfig>) => {
  if (!queryServiceWorkerData.value?.push_notifications) return;

  updateServiceWorker({
    push_notifications: {
      ...queryServiceWorkerData.value.push_notifications,
      ...payload,
    },
  });
};
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div
      class="tw:flex tw:items-center tw:justify-between tw:p-4 tw:bg-gray-50 tw:rounded-lg"
    >
      <div>
        <label class="tw:font-medium tw:text-gray-700 tw:block tw:mb-1">
          Режим отладки
        </label>
        <small class="tw:text-gray-500">
          Включить подробное логирование в консоль браузера
        </small>
      </div>

      <ToggleSwitch
        :model-value="queryServiceWorkerData?.debug"
        @update:model-value="updateServiceWorker({ debug: $event })"
      />
    </div>

    <div class="tw:border tw:border-gray-200 tw:rounded-lg tw:p-4 tw:space-y-4">
      <div class="tw:flex tw:items-center tw:justify-between">
        <div>
          <label class="tw:font-medium tw:text-gray-700 tw:block tw:mb-1">
            Background Sync
          </label>
          <small class="tw:text-gray-500"> Синхронизация данных в фоновом режиме </small>
        </div>

        <ToggleSwitch
          :model-value="queryServiceWorkerData?.background_sync?.enabled"
          @update:model-value="updateBackgroundSync({ enabled: $event })"
        />
      </div>

      <InputField
        v-if="queryServiceWorkerData?.background_sync?.enabled"
        label="Имя очереди"
        icon="pi pi-list"
        placeholder="swift-pwa-sync"
        :model-value="queryServiceWorkerData?.background_sync?.queue_name"
        @update:model-value="updateBackgroundSync({ queue_name: $event })"
      />
    </div>

    <div class="tw:border tw:border-gray-200 tw:rounded-lg tw:p-4 tw:space-y-4">
      <div class="tw:flex tw:items-center tw:justify-between">
        <div>
          <label class="tw:font-medium tw:text-gray-700 tw:block tw:mb-1">
            Push уведомления
          </label>

          <small class="tw:text-gray-500">
            Отправка push-уведомлений пользователям
          </small>
        </div>

        <ToggleSwitch
          :model-value="queryServiceWorkerData?.push_notifications?.enabled"
          @update:model-value="updatePushNotifications({ enabled: $event })"
        />
      </div>

      <InputField
        v-if="queryServiceWorkerData?.push_notifications?.enabled"
        label="VAPID Public Key"
        icon="pi pi-key"
        placeholder="Введите VAPID публичный ключ"
        :model-value="queryServiceWorkerData?.push_notifications?.vapid_public_key"
        @update:model-value="updatePushNotifications({ vapid_public_key: $event })"
      />
    </div>

    <InfoBlock title="Экспериментальные функции:" variant="warning">
      <p class="tw:text-sm">
        Background Sync и Push Notifications требуют дополнительной настройки на сервере и
        могут работать не во всех браузерах.
      </p>
    </InfoBlock>
  </div>
</template>
