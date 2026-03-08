<script setup lang="ts">
import { computed } from "vue";

import { useManifestMutation } from "../model/useManifestMutation";
import { useManifestQuery } from "../model/useManifestQuery";

import InputField from "@/shared/ui/InputField.vue";

const { queryManifest } = useManifestQuery();
const { updateManifest } = useManifestMutation();

const queryManifestData = computed(() => queryManifest.data.value);
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <InputField
      label="Application name"
      icon="pi pi-mobile"
      placeholder="Enter the application name"
      required
      :model-value="queryManifestData?.name"
      @update:model-value="updateManifest({ name: $event })"
    />

    <InputField
      label="Short name"
      icon="pi pi-bookmark"
      placeholder="Enter the short name of the application"
      required
      :model-value="queryManifestData?.short_name"
      @update:model-value="updateManifest({ short_name: $event })"
    />

    <InputField
      label="Description"
      icon="pi pi-align-left"
      placeholder="Enter the description of the application"
      :model-value="queryManifestData?.description"
      @update:model-value="updateManifest({ description: $event })"
    />
  </div>
</template>
