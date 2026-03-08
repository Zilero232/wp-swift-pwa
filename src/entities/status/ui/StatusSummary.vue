<script setup lang="ts">
import { Message } from "primevue";
import { computed } from "vue";

import type { StatusResponse } from "@/shared/types/status";

interface Props {
  status: StatusResponse;
}

const props = defineProps<Props>();

const isReady = computed(() => {
  return props.status.https.enabled && props.status.files.every((f) => f.exists);
});
</script>

<template>
  <div class="tw:mt-6">
    <Message v-if="isReady" severity="success" icon="pi pi-check-circle" :closable="false">
      <strong>✅ Your site is ready to work as a PWA!</strong>
      <span class="tw:block tw:text-sm tw:mt-1">All necessary requirements are met.</span>
    </Message>

    <Message v-else severity="info" icon="pi pi-info-circle" :closable="false">
      <strong>⚠️ Configuration required</strong>
      <span class="tw:block tw:text-sm tw:mt-1">
        To fully work as a PWA, you need to resolve the issues identified.
      </span>
    </Message>
  </div>
</template>
