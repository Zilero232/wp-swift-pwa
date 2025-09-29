<template>
  <div class="manifest-preview">
    <div class="preview-actions">
      <Button icon="pi pi-copy" label="Копировать" text @click="copyToClipboard" />
      <Button icon="pi pi-download" label="Скачать" text @click="downloadManifest" />
    </div>

    <div class="code-container">
      <pre class="code-block"><code>{{ manifest }}</code></pre>
    </div>

    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

interface Props {
  manifest: string
}

const props = defineProps<Props>()
const toast = ref()

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.manifest)
    toast.value.add({
      severity: 'success',
      summary: 'Скопировано',
      detail: 'Manifest скопирован в буфер обмена',
      life: 3000,
    })
  } catch (error) {
    toast.value.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось скопировать в буфер обмена',
      life: 3000,
    })
  }
}

const downloadManifest = () => {
  const blob = new Blob([props.manifest], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'manifest.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.manifest-preview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.code-container {
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  overflow: hidden;
}

.code-block {
  margin: 0;
  padding: 1.5rem;
  background: var(--surface-50);
  color: var(--text-color);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
}
</style>
