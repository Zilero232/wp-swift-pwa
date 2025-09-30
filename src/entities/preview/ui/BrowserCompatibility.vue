<script setup lang="ts">
interface Props {
  features: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
      <div
        v-for="feature in features"
        :key="feature"
        class="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700"
      >
        <i class="pi pi-check-circle text-green-600"></i>
        <span>{{ feature }}</span>
      </div>
    </div>

    <div class="text-center p-4 bg-gray-50 rounded-lg">
      <p class="m-0 flex items-center justify-center gap-2 text-gray-600">
        <i class="pi pi-info-circle text-blue-600"></i>
        PWA функции поддерживаются во всех современных браузерах
      </p>
    </div>
  </div>
</template>
