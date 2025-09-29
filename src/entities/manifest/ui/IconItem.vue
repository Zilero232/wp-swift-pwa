<template>
  <div class="icon-item">
    <div class="icon-item__preview">
      <img
        v-if="!imageError"
        :src="icon.src"
        :alt="`Icon ${icon.sizes}`"
        @error="imageError = true"
      />
      <i v-else class="pi pi-image icon-item__fallback"></i>
    </div>

    <div class="icon-item__info">
      <div class="icon-item__details">
        <span class="icon-item__size">{{ icon.sizes }}</span>
        <Tag :value="icon.type" severity="secondary" />
        <Tag v-if="icon.purpose" :value="icon.purpose" />
      </div>
      <div class="icon-item__url">{{ icon.src }}</div>
    </div>

    <div class="icon-item__actions">
      <Button
        icon="pi pi-pencil"
        text
        size="small"
        @click="$emit('edit')"
        v-tooltip="'Редактировать'"
      />
      <Button
        icon="pi pi-trash"
        text
        severity="danger"
        size="small"
        @click="$emit('remove')"
        v-tooltip="'Удалить'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { ManifestIcon } from '@/shared/types/manifest'

interface Props {
  icon: ManifestIcon
}

interface Emits {
  (e: 'edit'): void
  (e: 'remove'): void
}

defineProps<Props>()
defineEmits<Emits>()

const imageError = ref(false)
</script>

<style scoped>
.icon-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  background: var(--surface-0);
}

.icon-item__preview {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface-100);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-item__preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icon-item__fallback {
  font-size: 1.5rem;
  color: var(--text-color-secondary);
}

.icon-item__info {
  flex: 1;
  min-width: 0;
}

.icon-item__details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.icon-item__size {
  font-weight: 600;
  color: var(--text-color);
}

.icon-item__url {
  color: var(--text-color-secondary);
  font-size: 0.75rem;
  word-break: break-all;
}

.icon-item__actions {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
}
</style>
