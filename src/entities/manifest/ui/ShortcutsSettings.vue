<script setup lang="ts">
import { computed } from 'vue';
import { Button } from 'primevue';

import PostSelector from '@/features/post-selector/ui/PostSelector.vue';

import InputField from '@/shared/ui/InputField.vue';

import type { ManifestShortcut } from '@/shared/types/manifest';

import { useManifestQuery } from '../model/useManifestQuery';

const { queryManifest, updateManifest } = useManifestQuery();

const shortcuts = computed(() => queryManifest.data.value?.shortcuts ?? []);

const addShortcut = () => {
  const items = [...shortcuts.value];

  items.push({
    name: '',
    short_name: '',
    description: '',
    url: '',
  });

  updateManifest({ shortcuts: items });
};

const removeShortcut = (index: number) => {
  const items = shortcuts.value.filter((_, i) => i !== index) ?? [];

  updateManifest({ shortcuts: items });
};

const updateShortcut = (index: number, field: keyof ManifestShortcut, value: string) => {
  const items = queryManifest.data.value?.shortcuts?.map((item, i) => (i === index ? { ...item, [field]: value || undefined } : item)) || [];

  updateManifest({ shortcuts: items });
};
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-4">
    <div v-for="(shortcut, index) in queryManifest.data.value?.shortcuts" :key="index" class="tw:border tw:border-gray-200 tw:rounded-lg tw:p-4">
      <div class="tw:flex tw:flex-col tw:gap-3">
        <div class="tw:flex tw:items-center tw:gap-2">
          <InputField
            label="Название шортката"
            icon="pi pi-text-width"
            placeholder="Название шортката *"
            :model-value="shortcut.name"
            @update:model-value="updateShortcut(index, 'name', $event)"
            class="tw:flex-1"
            required
          />

          <InputField
            label="Короткое название"
            icon="pi pi-text-width"
            placeholder="Короткое название"
            :model-value="shortcut.short_name || ''"
            @update:model-value="updateShortcut(index, 'short_name', $event)"
            class="tw:flex-1"
          />
        </div>

        <InputField
          label="Описание шортката"
          icon="pi pi-align-left"
          placeholder="Описание шортката"
          :model-value="shortcut.description || ''"
          @update:model-value="updateShortcut(index, 'description', $event)"
          rows="2"
          class="tw:w-full"
        />

        <PostSelector
          label="URL шортката"
          icon="pi pi-link"
          placeholder="Выберите страницу или пост *"
          :model-value="shortcut.url || ''"
          @update:model-value="updateShortcut(index, 'url', $event)"
          required
        />
      </div>

      <div class="tw:flex tw:justify-end tw:mt-3">
        <Button icon="pi pi-trash" severity="danger" text @click="removeShortcut(index)" />
      </div>
    </div>

    <Button label="Добавить шорткат" icon="pi pi-plus" outlined @click="addShortcut" :disabled="shortcuts.length >= 4" class="tw:w-full" />
  </div>
</template>
