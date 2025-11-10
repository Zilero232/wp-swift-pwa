<script setup lang="ts">
import {
 Card 
} from 'primevue';

interface Props {
  title: string;
  icon: string;
  iconColor?: string;
}

withDefaults(defineProps<Props>(), {
  iconColor: 'tw:text-blue-600',
});
</script>

<template>
  <Card>
    <template #header>
      <div class="tw:flex tw:items-center tw:gap-3 tw:p-6 tw:pb-0">
        <i :class="[icon, 'tw:text-xl', iconColor]"></i>

        <h3 class="tw:text-xl tw:font-semibold tw:text-gray-800">{{ title }}</h3>
      </div>
    </template>

    <template #content>
      <slot></slot>
    </template>
  </Card>
</template>
