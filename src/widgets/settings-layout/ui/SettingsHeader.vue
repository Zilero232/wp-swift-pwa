<template>
  <header class="settings-header">
    <div class="header-container">
      <div class="header-brand">
        <i class="pi pi-mobile header-icon"></i>
        <div class="brand-text">
          <h1>Swift PWA</h1>
          <span class="version">v{{ version }}</span>
        </div>
      </div>

      <div class="header-actions">
        <Button
          icon="pi pi-refresh"
          label="Сбросить"
          severity="secondary"
          text
          @click="$emit('reset')"
          :disabled="saving"
        />

        <Button
          icon="pi pi-save"
          label="Сохранить"
          :loading="saving"
          @click="$emit('save')"
          :disabled="!hasChanges"
        />
      </div>
    </div>

    <div v-if="hasChanges" class="changes-indicator">
      <i class="pi pi-info-circle"></i>
      <span>У вас есть несохраненные изменения</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

interface Props {
  saving?: boolean
  hasChanges?: boolean
}

interface Emits {
  (e: 'save'): void
  (e: 'reset'): void
}

withDefaults(defineProps<Props>(), {
  saving: false,
  hasChanges: false,
})

defineEmits<Emits>()

const version = '1.0.0'
</script>

<style scoped>
.settings-header {
  background: white;
  border-bottom: 1px solid var(--surface-border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  font-size: 2rem;
  color: var(--primary-color);
}

.brand-text h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.version {
  font-size: 0.75rem;
  color: var(--text-color-secondary);
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.changes-indicator {
  background: var(--blue-50);
  color: var(--blue-700);
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.changes-indicator i {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header-brand {
    justify-content: center;
  }

  .header-actions {
    justify-content: center;
  }

  .changes-indicator {
    padding: 0.75rem 1rem;
    text-align: center;
  }
}
</style>
