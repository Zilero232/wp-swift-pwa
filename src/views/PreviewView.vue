<template>
  <div class="preview-view">
    <div class="view-header">
      <h2>Предпросмотр PWA</h2>
      <p>Просмотр манифеста и функций вашего PWA приложения</p>
    </div>

    <div class="view-content">
      <!-- Предпросмотр manifest.json -->
      <Card class="manifest-preview-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-file-code"></i>
            <h3>Manifest.json</h3>
            <div class="preview-actions">
              <Button icon="pi pi-copy" text v-tooltip="'Копировать'" @click="copyManifest" />
              <Button icon="pi pi-download" text v-tooltip="'Скачать'" @click="downloadManifest" />
            </div>
          </div>
        </template>

        <ManifestCodePreview
          :manifest="manifestStore.manifestJson"
          :validation="manifestStore.validation"
        />
      </Card>

      <!-- PWA функции -->
      <Card class="features-card">
        <template #header>
          <div class="card-header">
            <i class="pi pi-check-circle"></i>
            <h3>PWA функции</h3>
          </div>
        </template>

        <BrowserCompatibility :features="pwaFeatures" />
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import Card from '@/shared/ui/Card.vue'
import ManifestCodePreview from '@/entities/preview/ui/ManifestCodePreview.vue'
import BrowserCompatibility from '@/entities/preview/ui/BrowserCompatibility.vue'
import { useManifestStore } from '@/entities/manifest/model/store'
import { PWA_FEATURES } from '@/shared/config/constants'

const manifestStore = useManifestStore()

const pwaFeatures = PWA_FEATURES

const copyManifest = async () => {
  try {
    await navigator.clipboard.writeText(manifestStore.manifestJson)
    // TODO: Показать уведомление об успешном копировании
  } catch (error) {
    console.error('Error copying manifest:', error)
  }
}

const downloadManifest = () => {
  const blob = new Blob([manifestStore.manifestJson], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'manifest.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.preview-view {
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

.preview-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.manifest-preview-card,
.features-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--surface-border);
  transition: box-shadow 0.3s ease;
}

.manifest-preview-card:hover,
.features-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .preview-view {
    padding: 1rem;
  }

  .view-header h2 {
    font-size: 1.5rem;
  }

  .card-header {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
