<script setup lang="ts">
import {
 Message 
} from 'primevue';

import type {
 HttpsStatus 
} from '@/shared/types/status';

interface Props {
  https: HttpsStatus;
}

defineProps<Props>();

const WHY_PWA_IMPORTANT = [
  {
    title: 'Service Workers работают только по HTTPS',
  },
  {
    title: 'Push-уведомления требуют безопасное соединение',
  },
  {
    title: 'Защита данных пользователей при офлайн-работе',
  },
  {
    title: 'Доступ к мощным браузерным API',
  },
];
</script>

<template>
  <div class="tw:mb-6">
    <h3 class="tw:text-lg tw:font-semibold tw:mb-3 tw:flex! tw:items-center tw:gap-2">
      <i class="pi pi-shield"></i>
      <span>HTTPS (SSL/TLS)</span>
    </h3>

    <Message
      v-if="https.enabled"
      severity="success"
      icon="pi pi-check-circle"
      :closable="false"
    >
      <div class="tw:flex tw:flex-col tw:gap-1">
        <strong>HTTPS включён</strong>

        <span class="tw:text-sm">{{ https.message }}</span>

        <code class="tw:text-xs tw:mt-1 tw:bg-green-100 tw:px-2 tw:py-1 tw:rounded">
          {{ https.site_url }}
        </code>
      </div>
    </Message>

    <Message v-else severity="warn" icon="pi pi-exclamation-triangle" :closable="false">
      <div class="tw:flex tw:flex-col tw:gap-2">
        <strong>HTTPS не включён</strong>

        <span class="tw:text-sm">{{ https.message }}</span>

        <code class="tw:text-xs tw:mt-1 tw:bg-yellow-100 tw:px-2 tw:py-1 tw:rounded">
          {{ https.site_url }}
        </code>

        <div class="tw:mt-2 tw:text-sm">
          <p class="tw:font-semibold tw:mb-1">Почему HTTPS важен для PWA:</p>

          <ul class="tw:list-disc tw:list-inside tw:space-y-1 tw:text-xs">
            <li v-for="item in WHY_PWA_IMPORTANT" :key="item.title">{{ item.title }}</li>
          </ul>
        </div>
      </div>
    </Message>
  </div>
</template>
