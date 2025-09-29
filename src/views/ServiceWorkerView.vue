<template>
  <div class="service-worker-view">
    <div class="view-header">
      <h2>Service Worker</h2>
      <p>Настройки кеширования и оффлайн функциональности</p>
    </div>

    <div class="view-content">
      <Card class="sw-status-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-cog"></i>
            <h3>Статус Service Worker</h3>
            <div
              class="status-indicator"
              :class="{ 'status-indicator--active': swStore.isEnabled }"
            >
              {{ swStore.isEnabled ? 'Активен' : 'Отключен' }}
            </div>
          </div>
        </template>

        <BasicSettings :settings="swStore.settings" @update:field="updateSWField" />
      </Card>

      <Card v-if="swStore.isEnabled" class="cache-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-database"></i>
            <h3>Настройки кеширования</h3>
            <div class="cache-summary">{{ swStore.cacheResourcesCount }} типов ресурсов</div>
          </div>
        </template>

        <CacheSettings
          :cache-resources="swStore.settings.cache_resources"
          :exclude-patterns="swStore.settings.exclude_patterns"
          @update:cache-resources="updateSWField('cache_resources', $event)"
          @add:exclude-pattern="swStore.addExcludePattern"
          @remove:exclude-pattern="swStore.removeExcludePattern"
        />
      </Card>

      <Card v-if="swStore.isEnabled" class="advanced-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-sliders-h"></i>
            <h3>Дополнительные настройки</h3>
          </div>
        </template>

        <AdvancedSettings :settings="swStore.settings" @update:field="updateSWField" />
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/shared/ui/Card.vue'
import BasicSettings from '@/entities/service-worker/ui/BasicSettings.vue'
import CacheSettings from '@/entities/service-worker/ui/CacheSettings.vue'
import AdvancedSettings from '@/entities/service-worker/ui/AdvancedSettings.vue'
import { useServiceWorkerStore } from '@/entities/service-worker/model/store'
import type { ServiceWorkerSettings } from '@/shared/types/service-worker'

const swStore = useServiceWorkerStore()

const updateSWField = (field: keyof ServiceWorkerSettings, value: unknown) => {
  swStore.updateSettings({ [field]: value })
}
</script>

<style scoped>
.service-worker-view {
  padding: 2rem;
}

.view-header {
  margin-bottom: 2rem;
  text-align: center;
}

.view-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
}

.view-header p {
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 1.1rem;
}

.view-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem 0;
}

.card-header i {
  font-size: 1.25rem;
  color: var(--primary-color);
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  flex: 1;
}

.status-indicator {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: var(--red-100);
  color: var(--red-700);
}

.status-indicator--active {
  background: var(--green-100);
  color: var(--green-700);
}

.cache-summary {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--blue-100);
  color: var(--blue-700);
}

.sw-status-card,
.cache-card,
.advanced-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--surface-border);
  transition: box-shadow 0.3s ease;
}

.sw-status-card:hover,
.cache-card:hover,
.advanced-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .service-worker-view {
    padding: 1rem;
  }

  .view-header h2 {
    font-size: 1.5rem;
  }

  .view-header p {
    font-size: 1rem;
  }

  .card-header {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
