<script setup lang="ts">
import { computed } from 'vue';
import InputField from '@/shared/ui/InputField.vue';

import { useManifestQuery } from '../model/useManifestQuery';

const { queryManifest, updateManifest } = useManifestQuery();

const queryManifestData = computed(() => queryManifest.data.value);
</script>

<template>
  <div class="flex flex-col gap-6">
    <InputField
      label="Название приложения"
      icon="pi pi-mobile"
      placeholder="Введите название приложения"
      required
      :model-value="queryManifestData?.name"
      @update:model-value="updateManifest({ name: $event })"
    />

    <InputField
      label="Короткое название"
      icon="pi pi-bookmark"
      placeholder="Короткое название приложения"
      required
      :model-value="queryManifestData?.short_name"
      @update:model-value="updateManifest({ short_name: $event })"
    />

    <InputField
      label="Описание"
      icon="pi pi-align-left"
      placeholder="Введите описание приложения"
      :model-value="queryManifestData?.description"
      @update:model-value="updateManifest({ description: $event })"
    />
  </div>
</template>
