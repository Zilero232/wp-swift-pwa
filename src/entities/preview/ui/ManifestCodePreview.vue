<template>
  <div class="manifest-preview">
    <div class="code-header">
      <div class="file-info">
        <i class="pi pi-file-code"></i>
        <span>manifest.json</span>
      </div>
      <div class="validation-status">
        <Tag
          :value="validation.valid ? 'Валидный' : 'Ошибки'"
          :severity="validation.valid ? 'success' : 'danger'"
        />
        <span v-if="!validation.valid" class="error-count">
          {{ validation.errors.length }} ошибок
        </span>
      </div>
    </div>

    <div class="code-container">
      <pre><code class="json">{{ formattedManifest }}</code></pre>
    </div>

    <div v-if="!validation.valid || validation.warnings.length > 0" class="validation-messages">
      <div v-if="validation.errors.length > 0" class="errors">
        <h4><i class="pi pi-times-circle"></i> Ошибки:</h4>
        <ul>
          <li v-for="error in validation.errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div v-if="validation.warnings.length > 0" class="warnings">
        <h4><i class="pi pi-exclamation-triangle"></i> Предупреждения:</h4>
        <ul>
          <li v-for="warning in validation.warnings" :key="warning">{{ warning }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Tag from 'primevue/tag'
import type { ManifestValidationResult } from '@/entities/manifest/model/validation'

interface Props {
  manifest: string
  validation: ManifestValidationResult
}

const props = defineProps<Props>()

const formattedManifest = computed(() => {
  try {
    const parsed = JSON.parse(props.manifest)
    return JSON.stringify(parsed, null, 2)
  } catch {
    return props.manifest
  }
})
</script>

<style scoped>
.manifest-preview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--surface-100);
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid var(--surface-border);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.validation-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-count {
  font-size: 0.875rem;
  color: var(--red-600);
}

.code-container {
  background: #1e1e1e;
  border-radius: 0 0 8px 8px;
  overflow: auto;
  max-height: 400px;
}

pre {
  margin: 0;
  padding: 1rem;
  overflow: auto;
}

code.json {
  color: #d4d4d4;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.validation-messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.errors,
.warnings {
  padding: 1rem;
  border-radius: 8px;
}

.errors {
  background: var(--red-50);
  border: 1px solid var(--red-200);
}

.warnings {
  background: var(--orange-50);
  border: 1px solid var(--orange-200);
}

.errors h4 {
  margin: 0 0 0.5rem 0;
  color: var(--red-700);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.warnings h4 {
  margin: 0 0 0.5rem 0;
  color: var(--orange-700);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

ul {
  margin: 0;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.25rem;
}

.errors li {
  color: var(--red-600);
}

.warnings li {
  color: var(--orange-600);
}
</style>
