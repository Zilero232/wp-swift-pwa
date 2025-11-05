<script setup lang="ts">
import { STRATEGY_INFO } from '../constants';
</script>

<template>
  <div class="tw:bg-blue-50 tw:border tw:border-blue-200 tw:rounded-lg tw:p-4">
    <div class="tw:flex tw:items-start tw:gap-3">
      <i class="pi pi-info-circle tw:text-blue-600 tw:mt-1"></i>
      <div class="tw:text-sm tw:text-blue-900">
        <strong class="tw:block tw:mb-2">О стратегиях:</strong>

        <ul class="tw:space-y-1 tw:list-disc tw:list-inside">
          <li v-for="(info, key) in STRATEGY_INFO" :key="key">
            <strong>{{ info.title }}</strong> - {{ info.description }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
