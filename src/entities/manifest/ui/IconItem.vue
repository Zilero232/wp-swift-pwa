<script setup lang="ts">
import { ref } from 'vue';
import { Button, Tag } from 'primevue';

import type { ManifestIcon } from '@/shared/types/manifest';

interface Props {
  icon: ManifestIcon;
}

interface Emits {
  (e: 'edit'): void;
  (e: 'remove'): void;
}

defineProps<Props>();
defineEmits<Emits>();

const imageError = ref(false);
</script>

<template>
  <div class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white">
    <div
      class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0"
    >
      <img
        v-if="!imageError"
        :src="icon.src"
        :alt="`Icon ${icon.sizes}`"
        @error="imageError = true"
        class="w-full h-full object-cover"
      />
      <i v-else class="pi pi-image text-2xl text-gray-400"></i>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <span class="font-semibold text-gray-800">{{ icon.sizes }}</span>
        <Tag :value="icon.type" severity="secondary" />
        <Tag v-if="icon.purpose" :value="icon.purpose" />
      </div>
      <div class="text-xs text-gray-500 break-all">{{ icon.src }}</div>
    </div>

    <div class="flex gap-1 flex-shrink-0">
      <Button
        icon="pi pi-pencil"
        text
        size="small"
        @click="$emit('edit')"
        v-tooltip="'Редактировать'"
      />
      <Button
        icon="pi pi-trash"
        text
        severity="danger"
        size="small"
        @click="$emit('remove')"
        v-tooltip="'Удалить'"
      />
    </div>
  </div>
</template>
