<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

import FormField from '@/shared/ui/FormField.vue';

import { useManifestStore } from '../model/store';

const manifestStore = useManifestStore();
</script>

<template>
  <div class="flex flex-col gap-6">
    <FormField label="Название приложения" help="Полное название вашего PWA приложения" required>
      <InputText
        :model-value="manifestStore.manifest?.name"
        @update:model-value="manifestStore.updateManifest({ name: $event })"
        placeholder="Введите название приложения"
        class="w-full"
      />
    </FormField>

    <FormField
      label="Короткое название"
      help="Используется когда недостаточно места для полного названия"
      required
    >
      <InputText
        :model-value="manifestStore.manifest?.short_name"
        @update:model-value="manifestStore.updateManifest({ short_name: $event })"
        placeholder="Короткое название"
        class="w-full"
      />
    </FormField>

    <FormField label="Описание" help="Краткое описание приложения">
      <Textarea
        :model-value="manifestStore.manifest?.description"
        @update:model-value="manifestStore.updateManifest({ description: $event })"
        placeholder="Описание приложения"
        rows="3"
        class="w-full"
      />
    </FormField>
  </div>
</template>
