<template>
  <div class="text-center p-8 text-gray-500">
    <i :class="icon" class="text-5xl mb-4 block"></i>
    <h3 v-if="title" class="text-lg font-semibold text-gray-700 mb-2">{{ title }}</h3>
    <p v-if="description" class="leading-relaxed mb-6">{{ description }}</p>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'pi pi-info-circle',
})
</script>
