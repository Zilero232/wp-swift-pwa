<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { Toast, ConfirmDialog } from "primevue";
</script>

<template>
  <RouterView />

  <Toast style="top: 45px" />
  <ConfirmDialog />

  <VueQueryDevtools />
</template>
