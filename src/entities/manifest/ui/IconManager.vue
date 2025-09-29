<template>
  <div class="icon-manager">
    <div class="icon-manager__header">
      <Button icon="pi pi-plus" label="Добавить иконку" @click="showDialog = true" size="small" />
    </div>

    <div v-if="icons.length > 0" class="icon-list">
      <IconItem
        v-for="(icon, index) in icons"
        :key="index"
        :icon="icon"
        @edit="editIcon(index)"
        @remove="removeIcon(index)"
      />
    </div>

    <EmptyState
      v-else
      icon="pi pi-image"
      title="Иконки не добавлены"
      description="Добавьте иконки для отображения приложения на устройствах"
    >
      <template #actions>
        <Button label="Добавить первую иконку" @click="showDialog = true" />
      </template>
    </EmptyState>

    <IconDialog
      v-model:visible="showDialog"
      :icon="editingIcon"
      :editing="editingIndex !== null"
      @save="saveIcon"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import EmptyState from '@/shared/ui/EmptyState.vue'
import IconItem from './IconItem.vue'
import IconDialog from './IconDialog.vue'
import type { ManifestIcon } from '@/shared/types/manifest'

interface Props {
  icons: ManifestIcon[]
}

interface Emits {
  (e: 'update:icons', icons: ManifestIcon[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showDialog = ref(false)
const editingIndex = ref<number | null>(null)
const editingIcon = ref<ManifestIcon | null>(null)

const editIcon = (index: number) => {
  editingIndex.value = index
  editingIcon.value = { ...props.icons[index] }
  showDialog.value = true
}

const removeIcon = (index: number) => {
  const newIcons = [...props.icons]
  newIcons.splice(index, 1)
  emit('update:icons', newIcons)
}

const saveIcon = (icon: ManifestIcon) => {
  const newIcons = [...props.icons]

  if (editingIndex.value !== null) {
    newIcons[editingIndex.value] = icon
  } else {
    newIcons.push(icon)
  }

  emit('update:icons', newIcons)
  cancelEdit()
}

const cancelEdit = () => {
  showDialog.value = false
  editingIndex.value = null
  editingIcon.value = null
}
</script>

<style scoped>
.icon-manager__header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.icon-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
