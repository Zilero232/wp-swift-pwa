<script setup lang="ts">
import { Toast, ConfirmDialog } from 'primevue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <RouterView />

  <Toast style="top: 45px" />
  <ConfirmDialog />

  <VueQueryDevtools />
</template>
