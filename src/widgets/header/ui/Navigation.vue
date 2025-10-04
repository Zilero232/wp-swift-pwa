<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { NAV_ITEMS } from '../constants';

const route = useRoute();

const currentRoute = computed(() => route.name);
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
            '!text-blue-600 !border-blue-600': currentRoute === item.name,
          }"
        >
          <i :class="item.icon"></i>

          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
