<template>
  <div class="settings-layout">
    <div class="settings-header">
      <h1>Настройки PWA</h1>
      <div class="header-actions">
        <Button
          icon="pi pi-refresh"
          label="Сбросить"
          text
          @click="resetSettings"
          :loading="loading"
        />
        <Button icon="pi pi-save" label="Сохранить" @click="saveSettings" :loading="saving" />
      </div>
    </div>

    <TabView v-model:active-index="activeTab" class="settings-tabs">
      <TabPanel header="Основные">
        <div class="tab-content">
          <Card title="Основная информация">
            <BasicInfo
              :manifest="manifestStore.manifest"
              :errors="manifestStore.validation.errors"
              @update:field="updateManifestField"
            />
          </Card>

          <Card title="Отображение">
            <DisplaySettings
              :manifest="manifestStore.manifest"
              :errors="manifestStore.validation.errors"
              @update:field="updateManifestField"
            />
          </Card>
        </div>
      </TabPanel>

      <TabPanel header="Иконки">
        <div class="tab-content">
          <Card title="Иконки приложения">
            <IconManager
              :icons="manifestStore.manifest.icons"
              @update:icons="updateManifestField('icons', $event)"
            />
          </Card>
        </div>
      </TabPanel>

      <TabPanel header="Service Worker">
        <div class="tab-content">
          <Card title="Настройки Service Worker">
            <BasicSettings :settings="swStore.settings" @update:field="updateSWField" />
          </Card>

          <Card v-if="swStore.isEnabled" title="Кеширование">
            <CacheSettings
              :cache-resources="swStore.settings.cache_resources"
              :exclude-patterns="swStore.settings.exclude_patterns"
              @update:cache-resources="updateSWField('cache_resources', $event)"
              @add:exclude-pattern="swStore.addExcludePattern"
              @remove:exclude-pattern="swStore.removeExcludePattern"
            />
          </Card>
        </div>
      </TabPanel>

      <TabPanel header="Предпросмотр">
        <div class="tab-content">
          <Card title="Manifest.json">
            <ManifestPreview :manifest="manifestStore.manifestJson" />
          </Card>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import Card from '@/shared/ui/Card.vue'
import BasicInfo from '@/entities/manifest/ui/BasicInfo.vue'
import DisplaySettings from '@/entities/manifest/ui/DisplaySettings.vue'
import IconManager from '@/entities/manifest/ui/IconManager.vue'
import BasicSettings from '@/entities/service-worker/ui/BasicSettings.vue'
import CacheSettings from '@/entities/service-worker/ui/CacheSettings.vue'
import ManifestPreview from './ManifestPreview.vue'
import { useManifestStore } from '@/entities/manifest/model/store'
import { useServiceWorkerStore } from '@/entities/service-worker/model/store'
import type { ManifestSettings } from '@/shared/types/manifest'
import type { ServiceWorkerSettings } from '@/shared/types/service-worker'

const activeTab = ref(0)
const loading = ref(false)
const saving = ref(false)

const manifestStore = useManifestStore()
const swStore = useServiceWorkerStore()

const updateManifestField = (field: keyof ManifestSettings, value: unknown) => {
  manifestStore.updateManifest({ [field]: value })
}

const updateSWField = (field: keyof ServiceWorkerSettings, value: unknown) => {
  swStore.updateSettings({ [field]: value })
}

const saveSettings = async () => {
  saving.value = true
  try {
    // Here you would call your API to save settings
    console.log('Saving settings...', {
      manifest: manifestStore.manifest,
      serviceWorker: swStore.settings,
    })
    // await api.saveSettings(...)
  } catch (error) {
    console.error('Error saving settings:', error)
  } finally {
    saving.value = false
  }
}

const resetSettings = () => {
  if (confirm('Вы уверены, что хотите сбросить все настройки?')) {
    manifestStore.resetManifest()
    swStore.resetSettings()
  }
}

onMounted(() => {
  // Load initial settings
})
</script>

<style scoped>
.settings-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--surface-border);
}

.settings-header h1 {
  margin: 0;
  color: var(--text-color);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.settings-tabs {
  background: transparent;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 768px) {
  .settings-layout {
    padding: 0.5rem;
  }

  .settings-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header-actions {
    justify-content: flex-end;
  }
}
</style>
