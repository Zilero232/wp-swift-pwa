<script setup lang="ts">
import { DataTable, Column, Tag, Message } from 'primevue';
import { useQuery } from '@tanstack/vue-query';

import { statusAPI } from '@/services/status.service';

const {
  data: statusData,
  isLoading,
  error,
} = useQuery({
  queryKey: ['pwa-status'],
  queryFn: async () => {
    const { data } = await statusAPI.getStatus();

    return data;
  },
});

const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return 'N/A';

  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(2)} KB` : `${(kb / 1024).toFixed(2)} MB`;
};

const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return 'N/A';

  return new Date(timestamp * 1000).toLocaleString('ru-RU');
};
</script>

<template>
  <div class="tw:p-6">
    <div class="tw:mb-6">
      <h2 class="tw:text-2xl tw:font-bold tw:mb-2">Статус PWA</h2>
      <p class="tw:text-gray-600">Проверка готовности вашего сайта к работе в качестве Progressive Web App</p>
    </div>

    <div v-if="isLoading" class="tw:flex tw:justify-center tw:p-8">
      <i class="pi pi-spinner pi-spin tw:text-3xl"></i>
    </div>

    <div v-else-if="error" class="tw:p-4 tw:bg-red-50 tw:border tw:border-red-200 tw:rounded">
      <div class="tw:flex tw:items-center tw:gap-2 tw:text-red-800">
        <i class="pi pi-exclamation-triangle"></i>
        <span>Ошибка загрузки данных</span>
      </div>
    </div>

    <template v-else-if="statusData">
      <div class="tw:mb-6">
        <h3 class="tw:text-lg tw:font-semibold tw:mb-3 tw:flex! tw:items-center tw:gap-2">
          <i class="pi pi-shield"></i>
          <span>HTTPS (SSL/TLS)</span>
        </h3>

        <Message v-if="statusData.https.enabled" severity="success" icon="pi pi-check-circle" :closable="false">
          <div class="tw:flex tw:flex-col tw:gap-1">
            <strong>HTTPS включён</strong>
            <span class="tw:text-sm">{{ statusData.https.message }}</span>
            <code class="tw:text-xs tw:mt-1 tw:bg-green-100 tw:px-2 tw:py-1 tw:rounded">
              {{ statusData.https.site_url }}
            </code>
          </div>
        </Message>

        <Message v-else severity="warn" icon="pi pi-exclamation-triangle" :closable="false">
          <div class="tw:flex tw:flex-col tw:gap-2">
            <strong>HTTPS не включён</strong>
            <span class="tw:text-sm">{{ statusData.https.message }}</span>
            <code class="tw:text-xs tw:mt-1 tw:bg-yellow-100 tw:px-2 tw:py-1 tw:rounded">
              {{ statusData.https.site_url }}
            </code>
            <div class="tw:mt-2 tw:text-sm">
              <p class="tw:font-semibold tw:mb-1">Почему HTTPS важен для PWA:</p>
              <ul class="tw:list-disc tw:list-inside tw:space-y-1 tw:text-xs">
                <li>Service Workers работают только по HTTPS</li>
                <li>Push-уведомления требуют безопасное соединение</li>
                <li>Защита данных пользователей при офлайн-работе</li>
                <li>Доступ к мощным браузерным API</li>
              </ul>
            </div>
          </div>
        </Message>
      </div>

      <div>
        <h3 class="tw:text-lg tw:font-semibold tw:mb-3 tw:flex tw:items-center tw:gap-2">
          <i class="pi pi-file"></i>
          <span>Файлы PWA</span>
        </h3>

        <DataTable :value="statusData.files" stripedRows class="tw:border tw:rounded">
          <Column field="name" header="Файл" style="width: 20%">
            <template #body="{ data }">
              <div class="tw:flex tw:items-center tw:gap-2">
                <i class="pi pi-file tw:text-blue-500"></i>
                <span class="tw:font-mono tw:text-sm">{{ data.name }}</span>
              </div>
            </template>
          </Column>

          <Column field="description" header="Описание" style="width: 25%">
            <template #body="{ data }">
              <span class="tw:text-gray-600">{{ data.description }}</span>
            </template>
          </Column>

          <Column field="exists" header="Статус" style="width: 15%">
            <template #body="{ data }">
              <Tag v-if="data.exists" severity="success" icon="pi pi-check">Существует</Tag>
              <Tag v-else severity="danger" icon="pi pi-times">Отсутствует</Tag>
            </template>
          </Column>

          <Column field="size" header="Размер" style="width: 12%">
            <template #body="{ data }">
              <span class="tw:text-sm">{{ formatFileSize(data.size) }}</span>
            </template>
          </Column>

          <Column field="modified" header="Изменён" style="width: 18%">
            <template #body="{ data }">
              <span class="tw:text-sm tw:text-gray-600">{{ formatDate(data.modified) }}</span>
            </template>
          </Column>

          <Column header="Действия" style="width: 10%">
            <template #body="{ data }">
              <a v-if="data.exists && data.url" :href="data.url" target="_blank" class="tw:text-blue-600 tw:hover:text-blue-800" title="Открыть файл">
                <i class="pi pi-external-link"></i>
              </a>
              <span v-else class="tw:text-gray-400">
                <i class="pi pi-ban"></i>
              </span>
            </template>
          </Column>
        </DataTable>

        <div class="tw:mt-4 tw:p-4 tw:bg-gray-50 tw:border tw:border-gray-200 tw:rounded">
          <div class="tw:flex tw:items-start tw:gap-2">
            <i class="pi pi-info-circle tw:text-gray-600 tw:mt-1"></i>
            <div class="tw:text-sm tw:text-gray-700">
              <strong>Сводка:</strong>
              Всего файлов: {{ statusData.files.length }} | Существует: {{ statusData.files.filter((f) => f.exists).length }} | Отсутствует:
              {{ statusData.files.filter((f) => !f.exists).length }}
            </div>
          </div>
        </div>
      </div>

      <div class="tw:mt-6">
        <Message
          v-if="statusData.https.enabled && statusData.files.every((f) => f.exists)"
          severity="success"
          icon="pi pi-check-circle"
          :closable="false"
        >
          <strong>✅ Ваш сайт готов к работе в качестве PWA!</strong>
          <span class="tw:block tw:text-sm tw:mt-1"> Все необходимые требования выполнены. </span>
        </Message>

        <Message v-else severity="info" icon="pi pi-info-circle" :closable="false">
          <strong>⚠️ Требуется настройка</strong>
          <span class="tw:block tw:text-sm tw:mt-1"> Для полноценной работы PWA необходимо устранить выявленные проблемы. </span>
        </Message>
      </div>
    </template>
  </div>
</template>
