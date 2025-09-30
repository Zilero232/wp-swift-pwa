<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { NAV_ITEMS } from '../constants';

const route = useRoute();

const currentRoute = computed(() => route.name as string);

interface Props {
  validationStatus: {
    manifest: { valid: boolean; errors: string[]; warnings: string[] };
    serviceWorker: { valid: boolean; errors: string[]; warnings: string[] };
  };
}

const props = defineProps<Props>();

const hasError = (routeName: string): boolean => {
  if (routeName === 'manifest') return !props.validationStatus.manifest.valid;
  if (routeName === 'service-worker') return !props.validationStatus.serviceWorker.valid;

  return false;
};

const hasWarning = (routeName: string): boolean => {
  if (routeName === 'manifest') return props.validationStatus.manifest.warnings.length > 0;

  return false;
};
</script>

<template>
  <nav>
    <ul class="px-6">
      <li class="flex align-center">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.name"
          :to="{ name: item.name }"
          class="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 border-b-2 border-transparent hover:text-gray-900"
          :class="{
            'text-blue-600 border-blue-600': currentRoute === item.name,
            'text-red-600': hasError(item.name),
          }"
        >
          <i :class="item.icon"></i>

          <span>{{ item.label }}</span>

          <i v-if="hasError(item.name)" class="pi pi-times-circle text-red-600 ml-auto"></i>
          <i v-else-if="hasWarning(item.name)" class="pi pi-exclamation-triangle text-yellow-600 ml-auto"></i>
          <i v-else class="pi pi-check-circle text-green-600 ml-auto"></i>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
