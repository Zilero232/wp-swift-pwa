<template>
  <div class="pwa-settings-view">
    <SettingsLayout />
  </div>
</template>

<script setup lang="ts">
import SettingsLayout from '@/widgets/settings-layout/ui/SettingsLayout.vue'
</script>

<style scoped>
.pwa-settings-view {
  min-height: 100vh;
  background: var(--surface-ground);
}
</style>
