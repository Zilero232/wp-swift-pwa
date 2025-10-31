<script setup lang="ts">
import { computed } from 'vue';
import { Dropdown } from 'primevue';

import ColorInput from '@/shared/ui/ColorInput.vue';

import { DISPLAY_OPTIONS, ORIENTATION_OPTIONS } from '@/shared/config/display.constants';

import { useManifestQuery } from '../model/useManifestQuery';

const { queryManifest, updateManifest } = useManifestQuery();

const queryManifestData = computed(() => queryManifest.data.value);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Dropdown
        :model-value="queryManifestData?.display"
        @update:model-value="updateManifest({ display: $event })"
        :options="DISPLAY_OPTIONS"
        option-label="label"
        option-value="value"
        class="w-full"
      />

      <Dropdown
        :model-value="queryManifestData?.orientation"
        @update:model-value="updateManifest({ orientation: $event })"
        :options="ORIENTATION_OPTIONS"
        option-label="label"
        option-value="value"
        class="w-full"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ColorInput
        :model-value="queryManifestData?.theme_color || ''"
        @update:model-value="updateManifest({ theme_color: $event })"
        placeholder="#000000"
      />

      <ColorInput
        :model-value="queryManifestData?.background_color || '#ffffff'"
        @update:model-value="updateManifest({ background_color: $event })"
        placeholder="#ffffff"
      />
    </div>
  </div>
</template>
