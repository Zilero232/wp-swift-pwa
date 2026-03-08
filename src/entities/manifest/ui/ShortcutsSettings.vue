<script setup lang="ts">
import { Button } from "primevue";
import { computed } from "vue";

import { useManifestMutation } from "../model/useManifestMutation";
import { useManifestQuery } from "../model/useManifestQuery";

import PostSelector from "@/features/post-selector/ui/PostSelector.vue";
import type { ManifestShortcut } from "@/shared/types/manifest";
import InputField from "@/shared/ui/InputField.vue";

const { queryManifest } = useManifestQuery();
const { updateManifest } = useManifestMutation();

const shortcuts = computed(() => queryManifest.data.value?.shortcuts ?? []);

const addShortcut = () => {
  const items = [...shortcuts.value];

  items.push({
    name: "",
    short_name: "",
    description: "",
    url: "",
  });

  updateManifest({
    shortcuts: items,
  });
};

const removeShortcut = (index: number) => {
  const items = shortcuts.value.filter((_, i) => i !== index) ?? [];

  updateManifest({
    shortcuts: items,
  });
};

const updateShortcut = (index: number, field: keyof ManifestShortcut, value: string) => {
  const items =
    queryManifest.data.value?.shortcuts?.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value || undefined,
          }
        : item,
    ) || [];

  updateManifest({
    shortcuts: items,
  });
};
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-4">
    <div
      v-for="(shortcut, index) in queryManifest.data.value?.shortcuts"
      :key="index"
      class="tw:border tw:border-gray-200 tw:rounded-lg tw:p-4"
    >
      <div class="tw:flex tw:flex-col tw:gap-3">
        <div class="tw:flex tw:items-center tw:gap-2">
          <InputField
            label="Shortcut name"
            icon="pi pi-text-width"
            placeholder="Enter the name of the shortcut *"
            :model-value="shortcut.name"
            @update:model-value="updateShortcut(index, 'name', $event)"
            class="tw:flex-1"
            required
          />

          <InputField
            label="Short name"
            icon="pi pi-text-width"
            placeholder="Enter the short name of the shortcut"
            :model-value="shortcut.short_name || ''"
            @update:model-value="updateShortcut(index, 'short_name', $event)"
            class="tw:flex-1"
          />
        </div>

        <InputField
          label="Shortcut description"
          icon="pi pi-align-left"
          placeholder="Enter the description of the shortcut"
          :model-value="shortcut.description || ''"
          @update:model-value="updateShortcut(index, 'description', $event)"
          rows="2"
          class="tw:w-full"
        />

        <PostSelector
          label="Shortcut URL"
          icon="pi pi-link"
          placeholder="Select a page or post *"
          :model-value="shortcut.url || ''"
          @update:model-value="updateShortcut(index, 'url', $event)"
          required
        />
      </div>

      <div class="tw:flex tw:justify-end tw:mt-3">
        <Button icon="pi pi-trash" severity="danger" text @click="removeShortcut(index)" />
      </div>
    </div>

    <Button
      label="Add shortcut"
      icon="pi pi-plus"
      outlined
      @click="addShortcut"
      :disabled="shortcuts.length >= 4"
      class="tw:w-full"
    />
  </div>
</template>
