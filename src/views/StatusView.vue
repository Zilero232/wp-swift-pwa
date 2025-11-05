<script setup lang="ts">
import { useStatusQuery } from '@/entities/status/model/useStatusQuery';

import HttpsStatus from '@/entities/status/ui/HttpsStatus.vue';
import FilesTable from '@/entities/status/ui/FilesTable.vue';
import StatusSummary from '@/entities/status/ui/StatusSummary.vue';

const { queryStatus } = useStatusQuery();

const statusData = queryStatus.data;
const isLoading = queryStatus.isPending;
const error = queryStatus.error;
</script>

<template>
  <div class="tw:p-6">
    <div class="tw:mb-6">
      <h2 class="tw:text-2xl tw:font-bold tw:mb-2">Статус PWA</h2>

      <p class="tw:text-gray-600">
        Проверка готовности вашего сайта к работе в качестве Progressive Web App
      </p>
    </div>

    <div v-if="isLoading" class="tw:flex tw:justify-center tw:p-8">
      <i class="pi pi-spinner pi-spin tw:text-3xl"></i>
    </div>

    <div
      v-else-if="error"
      class="tw:p-4 tw:bg-red-50 tw:border tw:border-red-200 tw:rounded"
    >
      <div class="tw:flex tw:items-center tw:gap-2 tw:text-red-800">
        <i class="pi pi-exclamation-triangle"></i>

        <span>Ошибка загрузки данных</span>
      </div>
    </div>

    <template v-else-if="statusData">
      <HttpsStatus :https="statusData.https" />

      <FilesTable :files="statusData.files" />

      <StatusSummary :status="statusData" />
    </template>
  </div>
</template>
