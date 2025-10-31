<script setup lang="ts">
import { computed } from 'vue';
import { Button, Checkbox } from 'primevue';

import SelectField from '@/shared/ui/SelectField.vue';
import InputField from '@/shared/ui/InputField.vue';

import { RELATED_APPLICATION_PLATFORM_OPTIONS } from '@/shared/config/display.constants';

import { RelatedApplicationPlatform, type RelatedApplication } from '@/shared/types/manifest';

import { useManifestQuery } from '../model/useManifestQuery';

const { queryManifest, updateManifest } = useManifestQuery();

const relatedApplications = computed(() => queryManifest.data.value?.related_applications ?? []);

const addApp = () => {
  const apps = [...relatedApplications.value];

  apps.push({
    platform: RelatedApplicationPlatform.PLAY,
    url: '',
    id: '',
  });

  updateManifest({ related_applications: apps });
};

const removeApp = (index: number) => {
  const apps = relatedApplications.value.filter((_, i) => i !== index) ?? [];

  updateManifest({ related_applications: apps });
};

const updateApp = (index: number, field: keyof RelatedApplication, value: string) => {
  const apps = relatedApplications.value.map((app, i) => (i === index ? { ...app, [field]: value || undefined } : app)) ?? [];

  updateManifest({ related_applications: apps });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="(app, index) in relatedApplications" :key="index" class="border border-gray-200 rounded-lg p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Платформа"
          icon="pi pi-mobile"
          placeholder="Выберите платформу"
          :options="RELATED_APPLICATION_PLATFORM_OPTIONS"
          :model-value="app.platform || ''"
          @update:model-value="updateApp(index, 'platform', $event)"
          required
        />

        <InputField
          label="ID приложения"
          icon="pi pi-id-card"
          placeholder="ID приложения"
          :model-value="app.id || ''"
          @update:model-value="updateApp(index, 'id', $event)"
          required
        />

        <div class="md:col-span-2">
          <InputField
            label="URL приложения в магазине"
            icon="pi pi-link"
            placeholder="URL приложения в магазине"
            :model-value="app.url || ''"
            @update:model-value="updateApp(index, 'url', $event)"
            required
          />
        </div>
      </div>

      <div class="flex justify-end mt-3">
        <Button icon="pi pi-trash" severity="danger" text @click="removeApp(index)" />
      </div>
    </div>

    <Button label="Добавить приложение" icon="pi pi-plus" outlined @click="addApp" :disabled="relatedApplications.length >= 5" class="w-full" />

    <div class="flex items-center gap-2">
      <Checkbox
        :model-value="queryManifest.data.value?.prefer_related_applications || false"
        @update:model-value="updateManifest({ prefer_related_applications: $event })"
        binary
        input-id="prefer_related"
      />

      <label for="prefer_related" class="text-sm text-gray-700"> Предпочитать связанные приложения вместо PWA </label>
    </div>
  </div>
</template>
