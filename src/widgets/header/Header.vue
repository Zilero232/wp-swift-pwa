<script setup lang="ts">
import { computed } from 'vue';
import { Button, useConfirm } from 'primevue';

import Navigation from './ui/Navigation.vue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

const {
  swiftPwaSettings: { version },
} = window;

const confirm = useConfirm();
const { queryManifest, mutationUpdateManifest } = useManifestQuery();

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
  <header class="tw:px-4 sm:px-8 tw:sticky tw:top-0 tw:sm:top-[var(--wp-admin--admin-bar--height)] tw:py-2 tw:bg-white tw:border-b tw:z-10 tw:gap-4">
    <div class="tw:flex tw:justify-between tw:items-center tw:flex-col tw:sm:flex-row">
      <div class="tw:items-center tw:gap-4 tw:hidden tw:sm:flex">
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
