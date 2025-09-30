<template>
  <div class="related-apps-settings">
    <FormField label="Связанные приложения" help="Нативные приложения, связанные с вашим PWA">
      <div class="apps-list">
        <div v-for="(app, index) in manifest.related_applications" :key="index" class="app-item">
          <div class="app-fields">
            <div class="form-row">
              <InputText
                :model-value="app.platform"
                @update:model-value="updateApp(index, 'platform', $event)"
                placeholder="Платформа (play, itunes, windows)"
                class="w-full"
              />
              <InputText
                :model-value="app.id || ''"
                @update:model-value="updateApp(index, 'id', $event)"
                placeholder="ID приложения"
                class="w-full"
              />
            </div>
            <InputText
              :model-value="app.url || ''"
              @update:model-value="updateApp(index, 'url', $event)"
              placeholder="URL приложения в магазине"
              class="w-full"
            />
          </div>
          <Button icon="pi pi-trash" severity="danger" text @click="removeApp(index)" />
        </div>

        <Button
          label="Добавить приложение"
          icon="pi pi-plus"
          outlined
          @click="addApp"
          :disabled="(manifest.related_applications?.length || 0) >= 5"
          class="w-full"
        />
      </div>
    </FormField>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import FormField from '@/shared/ui/FormField.vue';
import type { ManifestSettings, RelatedApplication } from '../schemas';

interface Props {
  manifest: ManifestSettings;
  errors?: string[];
}

interface Emits {
  (e: 'update:field', field: keyof ManifestSettings, value: unknown): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const updateField = (field: keyof ManifestSettings, value: unknown) => {
  emit('update:field', field, value);
};

const addApp = () => {
  const apps = [...(props.manifest.related_applications || [])];
  apps.push({
    platform: '',
    url: '',
    id: '',
  });
  emit('update:field', 'related_applications', apps);
};

const removeApp = (index: number) => {
  const apps = [...(props.manifest.related_applications || [])];
  apps.splice(index, 1);
  emit('update:field', 'related_applications', apps);
};

const updateApp = (index: number, field: keyof RelatedApplication, value: string) => {
  const apps = [...(props.manifest.related_applications || [])];
  apps[index] = { ...apps[index], [field]: value || undefined };
  emit('update:field', 'related_applications', apps);
};
</script>

<style scoped>
.related-apps-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.apps-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  background: var(--surface-50);
}

.app-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .app-item {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
