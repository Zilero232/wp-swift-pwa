<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

import FormField from '@/shared/ui/FormField.vue';
import ColorInput from '@/shared/ui/ColorInput.vue';

import { DISPLAY_OPTIONS, ORIENTATION_OPTIONS } from '@/shared/config/constants';

import { useManifestStore } from '../model/store';

const manifestStore = useManifestStore();
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FormField label="Режим отображения">
        <Dropdown
          :model-value="manifestStore.manifest?.display"
          @update:model-value="manifestStore.updateManifest({ display: $event })"
          :options="DISPLAY_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>

      <FormField label="Ориентация">
        <Dropdown
          :model-value="manifestStore.manifest?.orientation"
          @update:model-value="manifestStore.updateManifest({ orientation: $event })"
          :options="ORIENTATION_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FormField label="Цвет темы" help="Цвет строки состояния и заголовка">
        <ColorInput
          :model-value="manifestStore.manifest?.theme_color"
          @update:model-value="manifestStore.updateManifest({ theme_color: $event })"
          placeholder="#000000"
        />
      </FormField>

      <FormField label="Цвет фона" help="Цвет экрана загрузки">
        <ColorInput
          :model-value="manifestStore.manifest?.background_color"
          @update:model-value="manifestStore.updateManifest({ background_color: $event })"
          placeholder="#ffffff"
        />
      </FormField>
    </div>
  </div>
</template>
