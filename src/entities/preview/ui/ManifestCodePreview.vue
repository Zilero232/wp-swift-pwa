<script setup lang="ts">
import { Tag } from 'primevue';

import { useManifestStore } from '@/entities/manifest/model/store';

const manifestStore = useManifestStore();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="flex justify-between items-center p-3 bg-gray-50 rounded-t-lg border-b border-gray-200"
    >
      <div class="flex items-center gap-2 font-semibold text-gray-700">
        <i class="pi pi-file-code"></i>

        <span>manifest.json</span>
      </div>

      <div class="flex items-center gap-2">
        <Tag
          :value="manifestStore.validation.valid ? 'Валидный' : 'Ошибки'"
          :severity="manifestStore.validation.valid ? 'success' : 'danger'"
        />

        <span v-if="!manifestStore.validation.valid" class="text-sm text-red-600">
          {{ manifestStore.validation.errors.length }} ошибок
        </span>
      </div>
    </div>

    <div class="bg-gray-900 rounded-b-lg overflow-auto max-h-96">
      <pre class="m-0 p-4 overflow-auto">
        <code class="text-gray-300 font-mono text-sm leading-relaxed">{{ manifestStore.manifest }}</code>
      </pre>
    </div>

    <div
      v-if="!manifestStore.validation.valid || manifestStore.validation.warnings.length > 0"
      class="flex flex-col gap-4"
    >
      <div
        v-if="manifestStore.validation.errors.length > 0"
        class="p-4 bg-red-50 border border-red-200 rounded-lg"
      >
        <h4 class="m-0 mb-2 text-red-700 flex items-center gap-2">
          <i class="pi pi-times-circle"></i>
          Ошибки:
        </h4>

        <ul class="m-0 pl-6 text-red-600">
          <li v-for="error in manifestStore.validation.errors" :key="error" class="mb-1">
            {{ error }}
          </li>
        </ul>
      </div>

      <div
        v-if="manifestStore.validation.warnings.length > 0"
        class="p-4 bg-orange-50 border border-orange-200 rounded-lg"
      >
        <h4 class="m-0 mb-2 text-orange-700 flex items-center gap-2">
          <i class="pi pi-exclamation-triangle"></i>
          Предупреждения:
        </h4>

        <ul class="m-0 pl-6 text-orange-600">
          <li v-for="warning in manifestStore.validation.warnings" :key="warning" class="mb-1">
            {{ warning }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
