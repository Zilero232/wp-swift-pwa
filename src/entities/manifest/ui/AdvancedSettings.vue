<script setup lang="ts">
import { computed } from 'vue';
import PostSelector from '@/features/post-selector/ui/PostSelector.vue';

import SelectField from '@/shared/ui/SelectField.vue';
import InputField from '@/shared/ui/InputField.vue';

import { LANGUAGE_OPTIONS, TEXT_DIRECTION_OPTIONS } from '@/shared/config/localization.constants';

import { useManifestQuery } from '../model/useManifestQuery';

const { queryManifest, updateManifest } = useManifestQuery();

const queryManifestData = computed(() => queryManifest.data.value);
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div class="tw:grid tw:grid-cols-1 tw:lg:grid-cols-2 tw:gap-4">
      <PostSelector
        label="Стартовая страница"
        icon="pi pi-home"
        placeholder="Выберите стартовую страницу"
        :model-value="queryManifestData?.start_url"
        @update:model-value="updateManifest({ start_url: $event })"
      />

      <InputField
        label="Область навигации"
        icon="pi pi-map"
        placeholder="Ограничивает область навигации приложения"
        :model-value="queryManifestData?.scope || '/'"
        @update:model-value="updateManifest({ scope: $event })"
      />
    </div>

    <div class="tw:grid tw:grid-cols-1 tw:lg:grid-cols-2 tw:gap-4">
      <SelectField
        label="Язык"
        icon="pi pi-language"
        :options="LANGUAGE_OPTIONS"
        :model-value="queryManifestData?.lang"
        @update:model-value="updateManifest({ lang: $event })"
      />

      <SelectField
        label="Направление текста"
        icon="pi pi-text-direction"
        :options="TEXT_DIRECTION_OPTIONS"
        :model-value="queryManifestData?.dir"
        @update:model-value="updateManifest({ dir: $event })"
      />
    </div>
  </div>
</template>
