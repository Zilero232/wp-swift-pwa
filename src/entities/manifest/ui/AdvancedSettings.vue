<script setup lang="ts">
import { computed } from "vue";

import { useManifestMutation } from "../model/useManifestMutation";
import { useManifestQuery } from "../model/useManifestQuery";

import PostSelector from "@/features/post-selector/ui/PostSelector.vue";
import { LANGUAGE_OPTIONS, TEXT_DIRECTION_OPTIONS } from "@/shared/config/localization.constants";
import InputField from "@/shared/ui/InputField.vue";
import SelectField from "@/shared/ui/SelectField.vue";

const { queryManifest } = useManifestQuery();
const { updateManifest } = useManifestMutation();

const queryManifestData = computed(() => queryManifest.data.value);
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div class="tw:grid tw:grid-cols-1 tw:lg:grid-cols-2 tw:gap-4">
      <PostSelector
        label="Start page"
        icon="pi pi-home"
        placeholder="Select the start page"
        :model-value="queryManifestData?.start_url"
        @update:model-value="updateManifest({ start_url: $event })"
      />

      <InputField
        label="Navigation scope"
        icon="pi pi-map"
        placeholder="Limits the navigation scope of the application"
        :model-value="queryManifestData?.scope || '/'"
        @update:model-value="updateManifest({ scope: $event })"
      />
    </div>

    <div class="tw:grid tw:grid-cols-1 tw:lg:grid-cols-2 tw:gap-4">
      <SelectField
        label="Language"
        icon="pi pi-language"
        :options="LANGUAGE_OPTIONS"
        :model-value="queryManifestData?.lang"
        @update:model-value="updateManifest({ lang: $event })"
      />

      <SelectField
        label="Text direction"
        icon="pi pi-text-direction"
        :options="TEXT_DIRECTION_OPTIONS"
        :model-value="queryManifestData?.dir"
        @update:model-value="updateManifest({ dir: $event })"
      />
    </div>
  </div>
</template>
