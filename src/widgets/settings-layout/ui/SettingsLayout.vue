<template>
  <div class="settings-layout">
    <SettingsHeader
      @save="handleSave"
      @reset="handleReset"
      :saving="saving"
      :has-changes="hasChanges"
    />

    <SettingsNavigation :current-route="currentRoute" :validation-status="validationStatus" />

    <main class="settings-main">
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div class="loading-container">
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            <p>Загрузка...</p>
          </div>
        </template>
      </Suspense>
    </main>

    <SettingsFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SettingsHeader from './SettingsHeader.vue'
import SettingsNavigation from './SettingsNavigation.vue'
import SettingsFooter from './SettingsFooter.vue'
import { useManifestStore } from '@/entities/manifest/model/store'
import { useServiceWorkerStore } from '@/entities/service-worker/model/store'

const route = useRoute()
const router = useRouter()
const saving = ref(false)

const manifestStore = useManifestStore()
const swStore = useServiceWorkerStore()

const currentRoute = computed(() => route.name as string)

const hasChanges = computed(() => {
  // Real logic for detecting changes
  return (
    manifestStore.manifest.name !== '' ||
    manifestStore.manifest.description !== '' ||
    !swStore.settings.enabled
  )
})

const validationStatus = computed(() => ({
  manifest: manifestStore.validation,
  serviceWorker: {
    valid: swStore.isEnabled,
    errors: [],
    warnings: swStore.isEnabled ? [] : ['Service Worker отключен'],
  },
}))

const handleSave = async () => {
  saving.value = true
  try {
    // TODO: Implement API call to save settings to WordPress
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    console.log('Settings saved successfully')
  } catch (error) {
    console.error('Save error:', error)
  } finally {
    saving.value = false
  }
}

const handleReset = () => {
  if (confirm('Вы уверены, что хотите сбросить все настройки?')) {
    manifestStore.resetManifest()
    swStore.resetSettings()
  }
}

// Ensure default route is set correctly
onMounted(() => {
  if (route.path === '/') {
    router.replace('/manifest')
  }
})
</script>

<style scoped>
.settings-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--surface-ground);
}

.settings-main {
  flex: 1;
  padding: 2rem 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem;
  color: var(--text-color-secondary);
}

@media (max-width: 768px) {
  .settings-main {
    padding: 1rem 0;
  }
}
</style>
