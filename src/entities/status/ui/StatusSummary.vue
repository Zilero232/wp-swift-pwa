<script setup lang="ts">
import {
 computed 
} from 'vue';
import {
 Message 
} from 'primevue';

import type {
 StatusResponse 
} from '@/shared/types/status';

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
    <Message
      v-if="isReady"
      severity="success"
      icon="pi pi-check-circle"
      :closable="false"
    >
      <strong>✅ Ваш сайт готов к работе в качестве PWA!</strong>
      <span class="tw:block tw:text-sm tw:mt-1">
        Все необходимые требования выполнены.
      </span>
    </Message>

    <Message v-else severity="info" icon="pi pi-info-circle" :closable="false">
      <strong>⚠️ Требуется настройка</strong>
      <span class="tw:block tw:text-sm tw:mt-1">
        Для полноценной работы PWA необходимо устранить выявленные проблемы.
      </span>
    </Message>
  </div>
</template>
