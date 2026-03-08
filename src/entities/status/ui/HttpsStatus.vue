<script setup lang="ts">
import { Message } from "primevue";

import type { HttpsStatus } from "@/shared/types/status";

interface Props {
  https: HttpsStatus;
}

defineProps<Props>();

const WHY_PWA_IMPORTANT = [
  {
    title: "Service Workers work only over HTTPS",
  },
  {
    title: "Push notifications require a secure connection",
  },
  {
    title: "Protection of user data when offline work",
  },
  {
    title: "Access to powerful browser APIs",
  },
];
</script>

<template>
  <div class="tw:mb-6">
    <h3 class="tw:text-lg tw:font-semibold tw:mb-3 tw:flex! tw:items-center tw:gap-2">
      <i class="pi pi-shield"></i>
      <span>HTTPS (SSL/TLS)</span>
    </h3>

    <Message v-if="https.enabled" severity="success" icon="pi pi-check-circle" :closable="false">
      <div class="tw:flex tw:flex-col tw:gap-1">
        <strong>HTTPS enabled</strong>

        <span class="tw:text-sm">{{ https.message }}</span>

        <code class="tw:text-xs tw:mt-1 tw:bg-green-100 tw:px-2 tw:py-1 tw:rounded">
          {{ https.site_url }}
        </code>
      </div>
    </Message>

    <Message v-else severity="warn" icon="pi pi-exclamation-triangle" :closable="false">
      <div class="tw:flex tw:flex-col tw:gap-2">
        <strong>HTTPS disabled</strong>

        <span class="tw:text-sm">{{ https.message }}</span>

        <code class="tw:text-xs tw:mt-1 tw:bg-yellow-100 tw:px-2 tw:py-1 tw:rounded">
          {{ https.site_url }}
        </code>

        <div class="tw:mt-2 tw:text-sm">
          <p class="tw:font-semibold tw:mb-1">Why HTTPS is important for PWA:</p>

          <ul class="tw:list-disc tw:list-inside tw:space-y-1 tw:text-xs">
            <li v-for="item in WHY_PWA_IMPORTANT" :key="item.title">{{ item.title }}</li>
          </ul>
        </div>
      </div>
    </Message>
  </div>
</template>
