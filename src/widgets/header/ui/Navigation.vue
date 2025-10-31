<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { NAV_ITEMS } from '../constants';

const route = useRoute();

const currentRoute = computed(() => route.name);
</script>

<template>
  <nav>
    <ul class="tw:px-6">
      <li class="tw:flex tw:align-center tw:justify-center tw:sm:justify-start">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.name"
          :to="{ name: item.name }"
          class="tw:flex tw:items-center tw:gap-3 tw:px-4 tw:py-3 tw:text-sm tw:text-gray-600 tw:border-b-2 tw:border-transparent tw:hover:text-gray-900"
          :class="{
            'tw:text-blue-600! tw:border-blue-600!': currentRoute === item.name,
          }"
        >
          <i :class="item.icon"></i>

          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
