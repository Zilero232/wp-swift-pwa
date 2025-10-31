<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button } from 'primevue';

import InputField from '@/shared/ui/InputField.vue';
import MediaLibrary from '@/shared/ui/MediaLibrary.vue';
import MediaPreview from '@/shared/ui/MediaPreview.vue';
import SelectField from '@/shared/ui/SelectField.vue';
import InfoBlock from '@/shared/ui/InfoBlock.vue';

import type { MediaAttachment } from '@/shared/types/media';
import { type ManifestIcon, IconPurpose } from '@/shared/types/manifest';

import { useManifestQuery } from '../model/useManifestQuery';

import { ICON_PURPOSE_OPTIONS } from '@/shared/config/display.constants';

const { queryManifest, updateManifest } = useManifestQuery();

const icons = computed(() => queryManifest.data.value?.icons ?? []);

const showLibrary = ref(false);
const showPreview = ref(false);

const selectedIndexItem = ref<number | null>(null);

const addIcon = () => {
  const items = [...icons.value];

  items.push({
    src: '',
    sizes: '',
    type: '',
    purpose: IconPurpose.ANY,
  });

  updateManifest({ icons: items });
};

const removeIcon = (index: number) => {
  const items = icons.value.filter((_, i) => i !== index) ?? [];

  if (selectedIndexItem.value === index) {
    selectedIndexItem.value = null;
  }

  updateManifest({ icons: items });
};

const updateIcon = (index: number, field: keyof ManifestIcon, value: string | undefined) => {
  const items = icons.value.map((item, i) => {
    if (i === index) {
      return {
        ...item,
        [field]: value || undefined,
      };
    }

    return item;
  });

  updateManifest({ icons: items });
};

const handleLibrarySelect = ({ url, width, height, mime_type }: MediaAttachment) => {
  if (selectedIndexItem.value === null) return;

  const items = icons.value.map((item, i) => {
    if (i === selectedIndexItem.value) {
      return { ...item, src: url, sizes: `${width}x${height}`, type: mime_type };
    }

    return item;
  });

  updateManifest({ icons: items });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="relative border border-gray-200 rounded-xl p-5 from-gray-50 to-white hover:shadow-md transition-all"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold text-sm">
            {{ index + 1 }}
          </div>

          <span class="text-sm font-medium text-gray-700">Иконка #{{ index + 1 }}</span>
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
            :disabled="!icon.src"
            v-tooltip.top="'Предпросмотр'"
            @click="
              () => {
                showPreview = true;
                selectedIndexItem = index;
              }
            "
          />

          <Button icon="pi pi-trash" outlined rounded severity="danger" v-tooltip.top="'Удалить'" @click="removeIcon(index)" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          class="md:col-span-2"
          label="URL иконки"
          icon="pi pi-link"
          placeholder="https://example.com/icon.png"
          :model-value="icon.src || ''"
          @update:model-value="updateIcon(index, 'src', $event)"
        />

        <InputField
          label="Размер"
          icon="pi pi-clone"
          placeholder="192x192"
          :model-value="icon.sizes || ''"
          @update:model-value="updateIcon(index, 'sizes', $event)"
        />

        <InputField
          label="Тип"
          icon="pi pi-file"
          placeholder="image/png"
          :model-value="icon.type || ''"
          @update:model-value="updateIcon(index, 'type', $event)"
        />

        <SelectField
          label="Назначение"
          icon="pi pi-star"
          :model-value="icon.purpose || IconPurpose.ANY"
          :options="ICON_PURPOSE_OPTIONS"
          placeholder="Выберите назначение иконки"
          class="w-full"
          @update:model-value="updateIcon(index, 'purpose', $event)"
        />
      </div>
    </div>

    <Button label="Добавить иконку" icon="pi pi-plus" outlined class="w-full" size="large" :disabled="icons.length >= 20" @click="addIcon" />

    <div v-if="icons.length >= 20" class="text-sm text-orange-600 text-center">
      <i class="pi pi-info-circle mr-1"></i>

      Достигнут максимум иконок (20)
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoBlock title="Рекомендуемые размеры иконок:" severity="info" as-list>
        <li>192x192 - минимальный размер для Android</li>
        <li>512x512 - для splash screen и высокого разрешения</li>
        <li>Maskable иконки должны иметь безопасную зону (80% от размера)</li>
      </InfoBlock>

      <InfoBlock title="Рекомендуемые назначения иконок:" severity="info" as-list>
        <li>Any: стандартная иконка.</li>
        <li>Maskable: адаптируется под разные формы.</li>
        <li>Monochrome: одноцветная версия.</li>
      </InfoBlock>
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
    :image="icons?.[selectedIndexItem ?? 0] || {}"
    @update:visible="
      () => {
        showPreview = false;
        selectedIndexItem = null;
      }
    "
  />
</template>
