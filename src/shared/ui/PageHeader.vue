<script setup lang="ts">
interface Props {
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<template>
  <div class="tw:mb-8 tw:text-center">
    <h2 class="tw:text-2xl sm:tw:text-3xl tw:font-bold tw:text-gray-800 tw:mb-2">
      {{ title }}
    </h2>

    <p class="tw:text-gray-600 tw:text-lg">
      {{ description }}
    </p>
  </div>
</template>
