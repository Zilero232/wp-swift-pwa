<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import FormField from '@/shared/ui/FormField.vue';

import type { RelatedApplication } from '../schemas';

import { useManifestStore } from '../model/store';

const manifestStore = useManifestStore();

const addApp = () => {
  const apps = [...(manifestStore.manifest?.related_applications || [])];

  apps.push({
    platform: '',
    url: '',
    id: '',
  });

  manifestStore.updateManifest({ related_applications: apps });
};

const removeApp = (index: number) => {
  const apps = [...(manifestStore.manifest?.related_applications || [])];
  apps.splice(index, 1);
  manifestStore.updateManifest({ related_applications: apps });
};

const updateApp = (index: number, field: keyof RelatedApplication, value: string) => {
  const apps = [...(manifestStore.manifest?.related_applications || [])];
  apps[index] = { ...apps[index], [field]: value || undefined };
  manifestStore.updateManifest({ related_applications: apps });
};
</script>

<template>
  <FormField label="Связанные приложения" help="Нативные приложения, связанные с вашим PWA">
    <div class="flex flex-col gap-4">
      <div
        v-for="(app, index) in manifestStore.manifest?.related_applications"
        :key="index"
        class="border border-gray-200 rounded-lg p-4"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <InputText
              :model-value="app.platform"
              @update:model-value="updateApp(index, 'platform', $event)"
              placeholder="Платформа (play, itunes, windows)"
              class="flex-1"
            />

            <InputText
              :model-value="app.id || ''"
              @update:model-value="updateApp(index, 'id', $event)"
              placeholder="ID приложения"
              class="flex-1"
            />
          </div>

          <InputText
            :model-value="app.url || ''"
            @update:model-value="updateApp(index, 'url', $event)"
            placeholder="URL приложения в магазине"
            class="w-full"
          />
        </div>

        <div class="flex justify-end mt-3">
          <Button icon="pi pi-trash" severity="danger" text @click="removeApp(index)" />
        </div>
      </div>

      <Button
        label="Добавить приложение"
        icon="pi pi-plus"
        outlined
        @click="addApp"
        :disabled="(manifestStore.manifest?.related_applications?.length || 0) >= 5"
        class="w-full"
      />
    </div>
  </FormField>
</template>
