<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

import FormField from '@/shared/ui/FormField.vue';

import { LANGUAGE_OPTIONS, TEXT_DIRECTION_OPTIONS } from '@/shared/config/constants';

import { useManifestStore } from '../model/store';

const manifestStore = useManifestStore();
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FormField label="Стартовый URL" help="URL, который открывается при запуске приложения">
        <InputText
          :model-value="manifestStore.manifest?.start_url || '/'"
          @update:model-value="manifestStore.updateManifest({ start_url: $event })"
          placeholder="/"
          class="w-full"
        />
      </FormField>

      <FormField label="Область навигации" help="Ограничивает область навигации приложения">
        <InputText
          :model-value="manifestStore.manifest?.scope || '/'"
          @update:model-value="manifestStore.updateManifest({ scope: $event })"
          placeholder="/"
          class="w-full"
        />
      </FormField>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FormField label="Язык приложения" help="Основной язык интерфейса">
        <Dropdown
          :model-value="manifestStore.manifest?.lang"
          @update:model-value="manifestStore.updateManifest({ lang: $event })"
          :options="LANGUAGE_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>

      <FormField label="Направление текста" help="Направление чтения текста">
        <Dropdown
          :model-value="manifestStore.manifest?.dir"
          @update:model-value="manifestStore.updateManifest({ dir: $event })"
          :options="TEXT_DIRECTION_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>
    </div>
  </div>
</template>
