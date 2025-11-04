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
  <div class="tw:flex tw:flex-col tw:gap-4">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="tw:relative tw:border tw:border-gray-200 tw:rounded-xl tw:p-5 tw:from-gray-50 tw:to-white tw:hover:shadow-md tw:transition-all"
    >
      <div class="tw:flex tw:items-center tw:justify-between tw:mb-4">
        <div class="tw:flex tw:items-center tw:gap-2">
          <div
            class="tw:w-8 tw:h-8 tw:rounded-full tw:bg-purple-100 tw:text-purple-600 tw:flex tw:items-center tw:justify-center tw:font-semibold tw:text-sm"
          >
            {{ index + 1 }}
          </div>

          <span class="tw:text-sm tw:font-medium tw:text-gray-700">Иконка #{{ index + 1 }}</span>
        </div>

        <div class="tw:flex tw:gap-2">
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

      <div class="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4">
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
          class="tw:w-full"
          @update:model-value="updateIcon(index, 'purpose', $event)"
        />
      </div>
    </div>

    <Button label="Добавить иконку" icon="pi pi-plus" outlined class="tw:w-full" size="large" :disabled="icons.length >= 20" @click="addIcon" />

    <div v-if="icons.length >= 20" class="text-sm text-orange-600 tw:text-center">
      <i class="pi pi-info-circle mr-1"></i>

      Достигнут максимум иконок (20)
    </div>

    <div class="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4">
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
