<script setup lang="ts">
import { computed } from 'vue';
import { Button, useConfirm } from 'primevue';

import Navigation from './ui/Navigation.vue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

const confirm = useConfirm();
const { queryManifest, mutationUpdateManifest } = useManifestQuery();

const version = '1.0.0';

const handleResetManifest = () => {
  confirm.require({
    message: 'Вы уверены, что хотите сбросить все настройки? Это действие нельзя отменить.',
    header: 'Подтверждение сброса',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Да, сбросить',
    rejectLabel: 'Отмена',
    acceptClass: 'p-button-danger',
    accept: () => {
      mutationUpdateManifest.mutate({});
    },
  });
};

const handleUpdateManifest = () => {
  mutationUpdateManifest.mutate(queryManifest.data.value || {});
};

const isDisabled = computed(() => {
  return mutationUpdateManifest.isPending || !queryManifest.data.value;
});
</script>

<template>
  <header class="px-4 sm:px-8 sticky top-[var(--wp-admin--admin-bar--height)] py-2 bg-white border-b z-10">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <h1>Swift PWA</h1>

        <span>v{{ version }}</span>
      </div>

      <div>
        <Button icon="pi pi-refresh" label="Сбросить" severity="secondary" text :disabled="isDisabled.value" @click="handleResetManifest" />

        <Button
          icon="pi pi-save"
          label="Сохранить"
          :loading="mutationUpdateManifest.isPending.value"
          :disabled="isDisabled.value"
          @click="handleUpdateManifest"
        />
      </div>
    </div>

    <Navigation />

    <div v-if="false">
      <i class="pi pi-info-circle"></i>

      <span>У вас есть несохраненные изменения</span>
    </div>
  </header>
</template>
