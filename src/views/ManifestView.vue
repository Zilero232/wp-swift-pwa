<template>
  <div class="manifest-view">
    <div class="view-header">
      <h2>Настройки Manifest</h2>
      <p>Конфигурация веб-приложения манифеста</p>
    </div>

    <div class="view-content">
      <div class="section-grid">
        <Card class="manifest-card">
          <template #header>
            <div class="card-header">
              <i class="pi pi-info-circle"></i>
              <h3>Основная информация</h3>
            </div>
          </template>

          <BasicInfo
            :manifest="manifestStore.manifest"
            :errors="manifestStore.validation.errors"
            @update:field="updateManifestField"
          />
        </Card>

        <Card class="display-card">
          <template #header>
            <div class="card-header">
              <i class="pi pi-desktop"></i>
              <h3>Отображение</h3>
            </div>
          </template>

          <DisplaySettings
            :manifest="manifestStore.manifest"
            :errors="manifestStore.validation.errors"
            @update:field="updateManifestField"
          />
        </Card>
      </div>

      <Card class="icons-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-image"></i>
            <h3>Иконки приложения</h3>
          </div>
        </template>

        <IconManager
          :icons="manifestStore.manifest.icons"
          @update:icons="updateManifestField('icons', $event)"
        />
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/shared/ui/Card.vue'
import BasicInfo from '@/entities/manifest/ui/BasicInfo.vue'
import DisplaySettings from '@/entities/manifest/ui/DisplaySettings.vue'
import IconManager from '@/entities/manifest/ui/IconManager.vue'
import { useManifestStore } from '@/entities/manifest/model/store'
import type { ManifestSettings } from '@/shared/types/manifest'

const manifestStore = useManifestStore()

const updateManifestField = (field: keyof ManifestSettings, value: unknown) => {
  manifestStore.updateManifest({ [field]: value })
}
</script>

<style scoped>
.manifest-view {
  padding: 2rem;
  margin: 0 auto;
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

.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
}

.manifest-card,
.display-card,
.icons-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--surface-border);
  transition: box-shadow 0.3s ease;
}

.manifest-card:hover,
.display-card:hover,
.icons-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

@media (max-width: 1024px) {
  .section-grid {
    grid-template-columns: 1fr;
  }

  .manifest-view {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .view-header h2 {
    font-size: 1.5rem;
  }

  .view-header p {
    font-size: 1rem;
  }
}
</style>
