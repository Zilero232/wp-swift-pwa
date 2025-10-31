<script setup lang="ts">
import { PWA_FEATURES } from '@/shared/config/pwa.constants';
</script>

<template>
  <div class="tw:p-4">
    <div class="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4 tw:mb-6">
      <div
        v-for="feature in PWA_FEATURES"
        :key="feature.title"
        class="tw:flex tw:gap-4 tw:p-4 tw:bg-green-50 tw:border tw:border-green-200 tw:rounded-lg tw:hover:shadow-md tw:transition-shadow"
      >
        <div class="tw:flex-1">
          <div class="tw:flex tw:items-center tw:gap-2">
            <i :class="[feature.icon, 'tw:text-2xl tw:text-green-600']"></i>

            <h4 class="tw:text-base tw:font-semibold tw:text-gray-800 tw:mb-1">{{ feature.title }}</h4>
          </div>

          <p class="tw:text-sm tw:text-gray-600 tw:m-0">{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <div class="tw:text-center tw:p-4 tw:bg-blue-50 tw:border tw:border-blue-200 tw:rounded-lg">
      <p class="m-0 tw:flex tw:items-center tw:justify-center tw:gap-2 tw:text-blue-800">
        <i class="pi pi-info-circle tw:text-blue-600"></i>
        <span class="tw:font-medium">PWA поддерживается во всех современных браузерах: Chrome, Firefox, Safari, Edge</span>
      </p>
    </div>
  </div>
</template>
