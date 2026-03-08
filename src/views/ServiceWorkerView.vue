<script setup lang="ts">
import { toValue } from "vue";

import { useServiceWorkerQuery } from "@/entities/service-worker/model/useServiceWorkerQuery";
import AdvancedSettings from "@/entities/service-worker/ui/AdvancedSettings.vue";
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
      title="Настройки Service Worker"
      description="Конфигурация кэширования и офлайн-функциональности"
    />

    <LoadingSpinner v-if="toValue(queryServiceWorker.isPending)" />

    <div v-else class="tw:flex tw:flex-col tw:gap-8">
      <CardSection title="Основные параметры" icon="pi pi-cog">
        <BasicSettings />
      </CardSection>

      <CardSection title="Исключения (Skip Patterns)" icon="pi pi-ban">
        <SkipPatternsSettings />
      </CardSection>

      <CardSection title="Дополнительные настройки" icon="pi pi-sliders-h">
        <AdvancedSettings />
      </CardSection>
    </div>
  </div>
</template>
