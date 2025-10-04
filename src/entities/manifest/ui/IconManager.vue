<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import EmptyState from '@/shared/ui/EmptyState.vue';
import IconItem from './IconItem.vue';
import IconDialog from './IconDialog.vue';
import type { ManifestIcon } from '../schemas';
import { useManifestStore } from '../model/store';

const manifestStore = useManifestStore();

const showDialog = ref(false);
const editingIndex = ref<number | null>(null);
const editingIcon = ref<ManifestIcon | null>(null);

const editIcon = (index: number) => {
  editingIndex.value = index;
  editingIcon.value = { ...manifestStore.manifest?.icons[index] };
  showDialog.value = true;
};

const removeIcon = (index: number) => {
  const newIcons = [...manifestStore.manifest?.icons];
  newIcons.splice(index, 1);
  manifestStore.updateManifest({ icons: newIcons });
};

const saveIcon = (icon: ManifestIcon) => {
  const newIcons = [...manifestStore.manifest?.icons];

  if (editingIndex.value !== null) {
    newIcons[editingIndex.value] = icon;
  } else {
    newIcons.push(icon);
  }

  manifestStore.updateManifest({ icons: newIcons });
  cancelEdit();
};

const cancelEdit = () => {
  showDialog.value = false;
  editingIndex.value = null;
  editingIcon.value = null;
};
</script>

<template>
  <div>
    <div class="flex justify-end mb-4">
      <Button icon="pi pi-plus" label="Добавить иконку" @click="showDialog = true" size="small" />
    </div>

    <div
      v-if="manifestStore.manifest?.icons && manifestStore.manifest?.icons.length > 0"
      class="flex flex-col gap-3"
    >
      <IconItem
        v-for="(icon, index) in manifestStore.manifest?.icons"
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
