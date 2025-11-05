<template>
  <div class="tw:text-center tw:p-8 tw:text-gray-500">
    <i :class="icon" class="text-5xl mb-4 block"></i>
    <h3 v-if="title" class="tw:text-lg tw:font-semibold tw:text-gray-700 tw:mb-2">
      {{ title }}
    </h3>
    <p v-if="description" class="tw:leading-relaxed tw:mb-6">{{ description }}</p>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string;
  title?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  icon: 'pi pi-info-circle',
});
</script>
