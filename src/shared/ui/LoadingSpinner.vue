<script setup lang="ts">
import {
 ProgressSpinner 
} from 'primevue';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  centered?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  message: '',
  centered: true,
});

const sizeClasses = {
  sm: 'tw:w-8 tw:h-8',
  md: 'tw:w-12 tw:h-12',
  lg: 'tw:w-16 tw:h-16',
};

const paddingClasses = {
  sm: 'tw:p-4',
  md: 'tw:p-8',
  lg: 'tw:p-12',
};
</script>

<template>
  <div
    :class="[
      'tw:flex tw:flex-col tw:items-center tw:gap-3',
      centered && 'tw:justify-center',
      paddingClasses[size],
    ]"
  >
    <ProgressSpinner
      :style="{ width: sizeClasses[size], height: sizeClasses[size] }"
      strokeWidth="4"
      animationDuration="1s"
      aria-label="Loading..."
    />

    <p v-if="message" class="tw:text-gray-600 tw:text-sm">{{ message }}</p>
  </div>
</template>
