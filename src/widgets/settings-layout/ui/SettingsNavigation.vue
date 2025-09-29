<template>
  <nav class="settings-navigation">
    <div class="nav-container">
      <div class="nav-items">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.name"
          :to="{ name: item.name }"
          class="nav-item"
          :class="{
            'nav-item--active': currentRoute === item.name,
            'nav-item--error': hasError(item.name),
            'nav-item--warning': hasWarning(item.name),
          }"
        >
          <i :class="item.icon" class="nav-icon"></i>
          <span class="nav-label">{{ item.label }}</span>

          <div v-if="hasError(item.name)" class="nav-status nav-status--error">
            <i class="pi pi-times-circle"></i>
          </div>
          <div v-else-if="hasWarning(item.name)" class="nav-status nav-status--warning">
            <i class="pi pi-exclamation-triangle"></i>
          </div>
          <div v-else class="nav-status nav-status--success">
            <i class="pi pi-check-circle"></i>
          </div>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { NAV_ITEMS } from '../constants'

interface Props {
  currentRoute: string
  validationStatus: {
    manifest: { valid: boolean; errors: string[]; warnings: string[] }
    serviceWorker: { valid: boolean; errors: string[]; warnings: string[] }
  }
}

const props = defineProps<Props>()

const hasError = (routeName: string): boolean => {
  if (routeName === 'manifest') {
    return !props.validationStatus.manifest.valid
  }
  if (routeName === 'service-worker') {
    return !props.validationStatus.serviceWorker.valid
  }
  return false
}

const hasWarning = (routeName: string): boolean => {
  if (routeName === 'manifest') {
    return props.validationStatus.manifest.warnings.length > 0
  }
  return false
}
</script>

<style scoped>
.settings-navigation {
  background: white;
  border-bottom: 1px solid var(--surface-border);
  position: sticky;
  top: var(--header-height, 80px);
  z-index: 90;
}

.nav-container {
  padding: 0 2rem;
}

.nav-items {
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav-items::-webkit-scrollbar {
  display: none;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: var(--text-color-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
}

.nav-item:hover {
  color: var(--text-color);
  background: var(--surface-50);
}

.nav-item--active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background: var(--primary-50);
}

.nav-item--error {
  color: var(--red-600);
}

.nav-item--error.nav-item--active {
  border-bottom-color: var(--red-600);
  background: var(--red-50);
}

.nav-item--warning {
  color: var(--orange-600);
}

.nav-item--warning.nav-item--active {
  border-bottom-color: var(--orange-600);
  background: var(--orange-50);
}

.nav-icon {
  font-size: 1rem;
}

.nav-label {
  font-weight: 600;
}

.nav-status {
  margin-left: auto;
  font-size: 0.75rem;
}

.nav-status--success {
  color: var(--green-600);
}

.nav-status--error {
  color: var(--red-600);
}

.nav-status--warning {
  color: var(--orange-600);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .nav-item {
    padding: 1rem;
    font-size: 0.8rem;
  }

  .nav-label {
    display: none;
  }

  .nav-icon {
    font-size: 1.25rem;
  }
}
</style>
