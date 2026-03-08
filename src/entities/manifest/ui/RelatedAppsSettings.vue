<script setup lang="ts">
import { Button, Checkbox } from "primevue";
import { computed } from "vue";

import { useManifestMutation } from "../model/useManifestMutation";
import { useManifestQuery } from "../model/useManifestQuery";

import { RELATED_APPLICATION_PLATFORM_OPTIONS } from "@/shared/config/display.constants";
import { RelatedApplicationPlatform, type RelatedApplication } from "@/shared/types/manifest";
import InputField from "@/shared/ui/InputField.vue";
import SelectField from "@/shared/ui/SelectField.vue";

const { queryManifest } = useManifestQuery();
const { updateManifest } = useManifestMutation();

const relatedApplications = computed(() => queryManifest.data.value?.related_applications ?? []);

const addApp = () => {
  const apps = [...relatedApplications.value];

  apps.push({
    platform: RelatedApplicationPlatform.PLAY,
    url: "",
    id: "",
  });

  updateManifest({
    related_applications: apps,
  });
};

const removeApp = (index: number) => {
  const apps = relatedApplications.value.filter((_, i) => i !== index) ?? [];

  updateManifest({
    related_applications: apps,
  });
};

const updateApp = (index: number, field: keyof RelatedApplication, value: string) => {
  const apps =
    relatedApplications.value.map((app, i) =>
      i === index
        ? {
            ...app,
            [field]: value || undefined,
          }
        : app,
    ) ?? [];

  updateManifest({
    related_applications: apps,
  });
};
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-4">
    <div
      v-for="(app, index) in relatedApplications"
      :key="index"
      class="tw:border tw:border-gray-200 tw:rounded-lg tw:p-4"
    >
      <div class="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4">
        <SelectField
          label="Platform"
          icon="pi pi-mobile"
          placeholder="Select the platform"
          :options="RELATED_APPLICATION_PLATFORM_OPTIONS"
          :model-value="app.platform || ''"
          @update:model-value="updateApp(index, 'platform', $event)"
          required
        />

        <InputField
          label="Application ID"
          icon="pi pi-id-card"
          placeholder="Enter the application ID"
          :model-value="app.id || ''"
          @update:model-value="updateApp(index, 'id', $event)"
          required
        />

        <div class="md:col-span-2">
          <InputField
            label="Application URL in the store"
            icon="pi pi-link"
            placeholder="Enter the application URL in the store"
            :model-value="app.url || ''"
            @update:model-value="updateApp(index, 'url', $event)"
            required
          />
        </div>
      </div>

      <div class="tw:flex tw:justify-end tw:mt-3">
        <Button icon="pi pi-trash" severity="danger" text @click="removeApp(index)" />
      </div>
    </div>

    <Button
      label="Add application"
      icon="pi pi-plus"
      outlined
      @click="addApp"
      :disabled="relatedApplications.length >= 5"
      class="tw:w-full"
    />

    <div class="tw:flex tw:items-center tw:gap-2">
      <Checkbox
        :model-value="queryManifest.data.value?.prefer_related_applications || false"
        @update:model-value="updateManifest({ prefer_related_applications: $event })"
        binary
        input-id="prefer_related"
      />

      <label for="prefer_related" class="text-sm text-gray-700">
        Prefer related applications instead of PWA
      </label>
    </div>
  </div>
</template>
