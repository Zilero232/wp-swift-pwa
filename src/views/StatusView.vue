<script setup lang="ts">
import { useStatusQuery } from "@/entities/status/model/useStatusQuery";
import FilesTable from "@/entities/status/ui/FilesTable.vue";
import HttpsStatus from "@/entities/status/ui/HttpsStatus.vue";
import StatusSummary from "@/entities/status/ui/StatusSummary.vue";
import LoadingSpinner from "@/shared/ui/LoadingSpinner.vue";
import PageHeader from "@/shared/ui/PageHeader.vue";

const { isPending, data, error } = useStatusQuery();
</script>

<template>
  <div class="tw:p-6">
    <PageHeader
      title="Status PWA"
      description="Checking the readiness of your site to work as a Progressive Web App"
    />

    <LoadingSpinner v-if="isPending" />

    <div v-else-if="error" class="tw:p-4 tw:bg-red-50 tw:border tw:border-red-200 tw:rounded">
      <div class="tw:flex tw:items-center tw:gap-2 tw:text-red-800">
        <i class="pi pi-exclamation-triangle"></i>

        <span>Error loading data</span>
      </div>
    </div>

    <template v-else-if="data">
      <HttpsStatus :https="data.https" />

      <FilesTable :files="data.files" />

      <StatusSummary :status="data" />
    </template>
  </div>
</template>
