<script setup lang="ts">
import { toValue } from "vue";

import { useServiceWorkerQuery } from "@/entities/service-worker/model/useServiceWorkerQuery";
import BasicSettings from "@/entities/service-worker/ui/BasicSettings.vue";
import SkipPatternsSettings from "@/entities/service-worker/ui/SkipPatternsSettings.vue";
import CardSection from "@/shared/ui/CardSection.vue";
import LoadingSpinner from "@/shared/ui/LoadingSpinner.vue";
import PageHeader from "@/shared/ui/PageHeader.vue";

const { queryServiceWorker } = useServiceWorkerQuery();
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <PageHeader
      title="Service Worker settings"
      description="Configuration of caching and offline functionality"
    />

    <LoadingSpinner v-if="toValue(queryServiceWorker.isPending)" />

    <div v-else class="tw:flex tw:flex-col tw:gap-8">
      <CardSection title="Basic parameters" icon="pi pi-cog">
        <BasicSettings />
      </CardSection>

      <CardSection title="Exceptions (Skip Patterns)" icon="pi pi-ban">
        <SkipPatternsSettings />
      </CardSection>
    </div>
  </div>
</template>
