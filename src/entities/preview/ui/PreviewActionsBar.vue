<script setup lang="ts">
interface Props {
  isLoading?: boolean;
  title: string;
  description: string;
  hasData: boolean;
}

interface Emits {
  (e: 'copy'): void;
  (e: 'download'): void;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
});

defineEmits<Emits>();
</script>

<template>
  <div class="tw:flex tw:items-center tw:justify-between tw:mb-4">
    <div>
      <h4 class="tw:font-semibold tw:text-gray-800">{{ title }}</h4>

      <p class="tw:text-sm tw:text-gray-600">{{ description }}</p>
    </div>

    <div class="tw:flex tw:gap-2">
      <Button
        icon="pi pi-copy"
        text
        rounded
        v-tooltip.top="'Копировать'"
        :disabled="!hasData"
        :loading="isLoading"
        @click="$emit('copy')"
      />

      <Button
        icon="pi pi-download"
        text
        rounded
        v-tooltip.top="'Скачать'"
        :disabled="!hasData"
        :loading="isLoading"
        @click="$emit('download')"
      />
    </div>
  </div>
</template>
