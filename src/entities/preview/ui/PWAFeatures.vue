<script setup lang="ts">
import { PWA_FEATURES } from '@/shared/config/pwa.constants';
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div
        v-for="feature in PWA_FEATURES"
        :key="feature.title"
        class="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <i :class="[feature.icon, 'text-2xl text-green-600']"></i>

            <h4 class="text-base font-semibold text-gray-800 mb-1">{{ feature.title }}</h4>
          </div>

          <p class="text-sm text-gray-600 m-0">{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="m-0 flex items-center justify-center gap-2 text-blue-800">
        <i class="pi pi-info-circle text-blue-600"></i>
        <span class="font-medium">PWA поддерживается во всех современных браузерах: Chrome, Firefox, Safari, Edge</span>
      </p>
    </div>
  </div>
</template>
