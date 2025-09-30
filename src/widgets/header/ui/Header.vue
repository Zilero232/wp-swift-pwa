<script setup lang="ts">
import { Button } from 'primevue';

import Navigation from './Navigation.vue';

interface Props {
  saving?: boolean;
  hasChanges?: boolean;
}

interface Emits {
  (e: 'save'): void;
  (e: 'reset'): void;
}

withDefaults(defineProps<Props>(), {
  saving: false,
  hasChanges: false,
});

defineEmits<Emits>();

const version = '1.0.0';
</script>

<template>
  <header class="px-4 sm:px-8 sticky top-10 bg-white border-b z-10">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <h1>Swift PWA</h1>

        <span>v{{ version }}</span>
      </div>

      <div>
        <Button icon="pi pi-refresh" label="Сбросить" severity="secondary" text @click="$emit('reset')" :disabled="saving" />

        <Button icon="pi pi-save" label="Сохранить" :loading="saving" @click="$emit('save')" :disabled="!hasChanges" />
      </div>
    </div>

    <Navigation
      :validation-status="{ manifest: { valid: true, errors: [], warnings: [] }, serviceWorker: { valid: true, errors: [], warnings: [] } }"
    />

    <div v-if="hasChanges">
      <i class="pi pi-info-circle"></i>

      <span>У вас есть несохраненные изменения</span>
    </div>
  </header>
</template>
