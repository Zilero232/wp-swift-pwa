<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button } from 'primevue';

import InputField from '@/shared/ui/InputField.vue';
import MediaLibrary from '@/shared/ui/MediaLibrary.vue';
import MediaPreview from '@/shared/ui/MediaPreview.vue';

import type { MediaAttachment } from '@/shared/types/media';

import type { ManifestScreenshot } from '@/shared/types/manifest';

import { useManifestQuery } from '../model/useManifestQuery';

const { queryManifest, updateManifest } = useManifestQuery();

const screenshots = computed(() => queryManifest.data.value?.screenshots ?? []);

const showLibrary = ref(false);
const showPreview = ref(false);

const selectedIndexItem = ref<number | null>(null);

const addScreenshot = () => {
  const items = [...screenshots.value];

  items.push({
    src: '',
    sizes: '',
    type: '',
    label: '',
  });

  updateManifest({ screenshots: items });
};

const removeScreenshot = (index: number) => {
  const items = screenshots.value.filter((_, i) => i !== index) ?? [];

  if (selectedIndexItem.value === index) {
    selectedIndexItem.value = null;
  }

  updateManifest({ screenshots: items });
};

const updateScreenshot = (index: number, field: keyof ManifestScreenshot, value: string | undefined) => {
  const items = screenshots.value.map((item, i) => {
    if (i === index) {
      return {
        ...item,
        [field]: value || undefined,
      };
    }

    return item;
  });

  updateManifest({ screenshots: items });
};

const handleLibrarySelect = ({ url, width, height, mime_type, alt }: MediaAttachment) => {
  if (selectedIndexItem.value === null) return;

  const items = screenshots.value.map((item, i) => {
    if (i === selectedIndexItem.value) {
      return { ...item, src: url, sizes: `${width}x${height}`, type: mime_type, label: alt };
    }

    return item;
  });

  updateManifest({ screenshots: items });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(screenshot, index) in screenshots"
      :key="index"
      class="relative border border-gray-200 rounded-xl p-5 from-gray-50 to-white hover:shadow-md transition-all"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
            {{ index + 1 }}
          </div>

          <span class="text-sm font-medium text-gray-700">Скриншот #{{ index + 1 }}</span>
        </div>

        <div class="flex gap-2">
          <Button
            icon="pi pi-images"
            outlined
            rounded
            severity="secondary"
            v-tooltip.top="'Выбрать из библиотеки'"
            @click="
              () => {
                showLibrary = true;
                selectedIndexItem = index;
              }
            "
          />

          <Button
            icon="pi pi-eye"
            outlined
            rounded
            severity="info"
            :disabled="!screenshot.src"
            v-tooltip.top="'Предпросмотр'"
            @click="
              () => {
                showPreview = true;
                selectedIndexItem = index;
              }
            "
          />

          <Button icon="pi pi-trash" outlined rounded severity="danger" v-tooltip.top="'Удалить'" @click="removeScreenshot(index)" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          class="md:col-span-2"
          label="URL изображения"
          icon="pi pi-link"
          placeholder="https://example.com/screenshot.png"
          :model-value="screenshot.src || ''"
          @update:model-value="updateScreenshot(index, 'src', $event)"
        />

        <InputField
          label="Размер"
          icon="pi pi-clone"
          placeholder="1920x1080"
          :model-value="screenshot.sizes || ''"
          @update:model-value="updateScreenshot(index, 'sizes', $event)"
        />

        <InputField
          label="Тип"
          icon="pi pi-file"
          placeholder="image/png"
          :model-value="screenshot.type || ''"
          @update:model-value="updateScreenshot(index, 'type', $event)"
        />

        <InputField
          class="md:col-span-2"
          label="Описание"
          icon="pi pi-comment"
          placeholder="Описание скриншота для доступности"
          :model-value="screenshot.label || ''"
          @update:model-value="updateScreenshot(index, 'label', $event)"
        />
      </div>
    </div>

    <Button
      label="Добавить скриншот"
      icon="pi pi-plus"
      outlined
      class="w-full"
      size="large"
      :disabled="screenshots.length >= 10"
      @click="addScreenshot"
    />

    <div v-if="screenshots.length >= 10" class="text-sm text-orange-600 text-center">
      <i class="pi pi-info-circle mr-1"></i>
      Достигнут максимум скриншотов (10)
    </div>
  </div>

  <MediaLibrary
    :visible="showLibrary"
    @select="handleLibrarySelect"
    @update:visible="
      () => {
        showLibrary = false;
        selectedIndexItem = null;
      }
    "
  />

  <MediaPreview
    :visible="showPreview"
    :image="screenshots?.[selectedIndexItem ?? 0] || {}"
    @update:visible="
      () => {
        showPreview = false;
        selectedIndexItem = null;
      }
    "
  />
</template>
