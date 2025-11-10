<script setup lang="ts">
import {
 computed 
} from 'vue';

import SelectField from '@/shared/ui/SelectField.vue';
import ColorInput from '@/shared/ui/ColorInput.vue';

import {
 DISPLAY_OPTIONS, ORIENTATION_OPTIONS 
} from '@/shared/config/display.constants';

import {
 useManifestQuery 
} from '../model/useManifestQuery';

const {
 queryManifest, updateManifest 
} = useManifestQuery();

const queryManifestData = computed(() => queryManifest.data.value);
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div class="tw:grid tw:grid-cols-1 tw:lg:grid-cols-2 tw:gap-4">
      <SelectField
        label="Display"
        icon="pi pi-display"
        :options="DISPLAY_OPTIONS"
        :model-value="queryManifestData?.display"
        @update:model-value="updateManifest({ display: $event })"
      />

      <SelectField
        label="Orientation"
        icon="pi pi-orientation"
        :options="ORIENTATION_OPTIONS"
        :model-value="queryManifestData?.orientation"
        @update:model-value="updateManifest({ orientation: $event })"
      />
    </div>

    <div class="tw:grid tw:grid-cols-1 tw:lg:grid-cols-2 tw:gap-4">
      <ColorInput
        label="Theme Color"
        placeholder="#000000"
        :model-value="queryManifestData?.theme_color || ''"
        @update:model-value="updateManifest({ theme_color: `#${$event}` })"
      />

      <ColorInput
        label="Background Color"
        placeholder="#ffffff"
        :model-value="queryManifestData?.background_color || '#ffffff'"
        @update:model-value="updateManifest({ background_color: `#${$event}` })"
      />
    </div>
  </div>
</template>
