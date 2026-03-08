<script setup lang="ts">
import { computed } from "vue";

import { CACHE_STRATEGIES, STRATEGY_INFO } from "../constants";
import { useServiceWorkerMutation } from "../model/useServiceWorkerMutation";
import { useServiceWorkerQuery } from "../model/useServiceWorkerQuery";

import { PostSelector } from "@/features/post-selector";
import InfoBlock from "@/shared/ui/InfoBlock.vue";
import InputField from "@/shared/ui/InputField.vue";
import SelectField from "@/shared/ui/SelectField.vue";

const { queryServiceWorker } = useServiceWorkerQuery();
const { updateServiceWorker } = useServiceWorkerMutation();

const queryServiceWorkerData = computed(() => queryServiceWorker.data.value);
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-6">
      <InputField
        label="Version"
        icon="pi pi-tag"
        placeholder="1.0.0"
        :model-value="queryServiceWorkerData?.version"
        @update:model-value="updateServiceWorker({ version: $event })"
      />

      <InputField
        label="Cache name"
        icon="pi pi-database"
        placeholder="swift-pwa-cache"
        :model-value="queryServiceWorkerData?.cache_name"
        @update:model-value="updateServiceWorker({ cache_name: $event })"
      />
    </div>

    <PostSelector
      label="Offline page"
      icon="pi pi-wifi"
      placeholder="Select a page or post"
      :model-value="queryServiceWorkerData?.offline_page"
      @update:model-value="updateServiceWorker({ offline_page: $event })"
    />

    <SelectField
      label="Cache strategy"
      icon="pi pi-sitemap"
      :options="CACHE_STRATEGIES"
      :model-value="queryServiceWorkerData?.strategy"
      @update:model-value="updateServiceWorker({ strategy: $event })"
    />

    <InfoBlock title="About the selected strategy:" as-list>
      <li v-for="(strategy, key) in STRATEGY_INFO" :key="key">
        <strong>{{ key }}:</strong> {{ strategy.description }}
      </li>
    </InfoBlock>
  </div>
</template>
