<template>
  <div class="cache-settings">
    <h4 class="cache-title">Типы ресурсов для кеширования</h4>

    <div class="cache-options">
      <div v-for="(enabled, resource) in cacheResources" :key="resource" class="cache-option">
        <Checkbox
          :model-value="enabled"
          @update:model-value="updateCacheResource(resource, $event)"
          :input-id="`cache-${resource}`"
        />
        <label :for="`cache-${resource}`" class="cache-label">
          <i :class="getResourceIcon(resource)" class="cache-icon"></i>
          {{ getResourceLabel(resource) }}
        </label>
      </div>
    </div>

    <FormField label="Исключения из кеша" help="URL паттерны, которые не будут кешироваться">
      <div class="exclude-patterns">
        <div class="pattern-input">
          <InputText
            v-model="newPattern"
            placeholder="/wp-admin/"
            class="pattern-field"
            @keyup.enter="addPattern"
          />
          <Button icon="pi pi-plus" @click="addPattern" :disabled="!newPattern.trim()" />
        </div>

        <div v-if="excludePatterns.length > 0" class="patterns-list">
          <Tag
            v-for="(pattern, index) in excludePatterns"
            :key="index"
            :value="pattern"
            removable
            @remove="removePattern(index)"
          />
        </div>
      </div>
    </FormField>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import FormField from '@/shared/ui/FormField.vue'
import type { ServiceWorkerSettings } from '@/shared/types/service-worker'

interface Props {
  cacheResources: ServiceWorkerSettings['cache_resources']
  excludePatterns: string[]
}

interface Emits {
  (e: 'update:cache-resources', resources: ServiceWorkerSettings['cache_resources']): void
  (e: 'add:exclude-pattern', pattern: string): void
  (e: 'remove:exclude-pattern', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const newPattern = ref('')

const resourceLabels = {
  pages: 'Страницы',
  images: 'Изображения',
  scripts: 'Скрипты',
  styles: 'Стили',
  fonts: 'Шрифты',
}

const resourceIcons = {
  pages: 'pi pi-file',
  images: 'pi pi-image',
  scripts: 'pi pi-code',
  styles: 'pi pi-palette',
  fonts: 'pi pi-font',
}

const updateCacheResource = (resource: string, enabled: boolean) => {
  emit('update:cache-resources', {
    ...props.cacheResources,
    [resource]: enabled,
  })
}

const getResourceLabel = (resource: string): string => {
  return resourceLabels[resource as keyof typeof resourceLabels] || resource
}

const getResourceIcon = (resource: string): string => {
  return resourceIcons[resource as keyof typeof resourceIcons] || 'pi pi-file'
}

const addPattern = () => {
  if (newPattern.value.trim()) {
    emit('add:exclude-pattern', newPattern.value.trim())
    newPattern.value = ''
  }
}

const removePattern = (index: number) => {
  emit('remove:exclude-pattern', index)
}
</script>

<style scoped>
.cache-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cache-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.cache-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.cache-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cache-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-color);
}

.cache-icon {
  color: var(--primary-color);
}

.exclude-patterns {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pattern-input {
  display: flex;
  gap: 0.5rem;
}

.pattern-field {
  flex: 1;
}

.patterns-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
