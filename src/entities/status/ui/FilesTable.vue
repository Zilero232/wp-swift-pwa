<script setup lang="ts">
import { DataTable, Column, Tag } from "primevue";

import { useStatusFormatters } from "../model/useStatusFormatters";

import type { FileStatus } from "@/shared/types/status";

interface Props {
  files: FileStatus[];
}

const props = defineProps<Props>();

const { formatFileSize, formatDate } = useStatusFormatters();
</script>

<template>
  <div>
    <h3 class="tw:text-lg tw:font-semibold tw:mb-3 tw:flex! tw:items-center tw:gap-2">
      <i class="pi pi-file"></i>

      <span>PWA files</span>
    </h3>

    <DataTable :value="props.files" stripedRows class="tw:border tw:rounded">
      <Column field="name" header="File" style="width: 20%">
        <template #body="{ data }">
          <div class="tw:flex tw:items-center tw:gap-2">
            <i class="pi pi-file tw:text-blue-500"></i>

            <span class="tw:font-mono tw:text-sm">{{ data.name }}</span>
          </div>
        </template>
      </Column>

      <Column field="description" header="Description" style="width: 25%">
        <template #body="{ data }">
          <span class="tw:text-gray-600">{{ data.description }}</span>
        </template>
      </Column>

      <Column field="exists" header="Status" style="width: 15%">
        <template #body="{ data }">
          <Tag v-if="data.exists" severity="success" icon="pi pi-check">Exists</Tag>
          <Tag v-else severity="danger" icon="pi pi-times">Missing</Tag>
        </template>
      </Column>

      <Column field="size" header="Size" style="width: 12%">
        <template #body="{ data }">
          <span class="tw:text-sm">{{ formatFileSize(data.size) }}</span>
        </template>
      </Column>

      <Column field="modified" header="Modified" style="width: 18%">
        <template #body="{ data }">
          <span class="tw:text-sm tw:text-gray-600">{{ formatDate(data.modified) }}</span>
        </template>
      </Column>

      <Column header="Actions" style="width: 10%">
        <template #body="{ data }">
          <a
            v-if="data.exists && data.url"
            :href="data.url"
            target="_blank"
            class="tw:text-blue-600 tw:hover:text-blue-800"
            title="Open file"
          >
            <i class="pi pi-external-link"></i>
          </a>

          <span v-else class="tw:text-gray-400">
            <i class="pi pi-ban"></i>
          </span>
        </template>
      </Column>
    </DataTable>

    <div class="tw:mt-4 tw:p-4 tw:bg-gray-50 tw:border tw:border-gray-200 tw:rounded">
      <div class="tw:flex tw:items-start tw:gap-2">
        <i class="pi pi-info-circle tw:text-gray-600 tw:mt-1"></i>

        <div class="tw:text-sm tw:text-gray-700">
          <strong>Summary:</strong>

          Total files: {{ props.files.length }} | Exists:
          {{ props.files.filter((f) => f.exists).length }} | Missing:
          {{ props.files.filter((f) => !f.exists).length }}
        </div>
      </div>
    </div>
  </div>
</template>
