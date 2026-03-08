<script setup lang="ts">
import { MultiSelect, Tag } from "primevue";
import { computed } from "vue";

import { useManifestMutation } from "../model/useManifestMutation";
import { useManifestQuery } from "../model/useManifestQuery";

import { APP_CATEGORIES } from "@/shared/config/categories.constants";
import InfoBlock from "@/shared/ui/InfoBlock.vue";

const { queryManifest } = useManifestQuery();
const { updateManifest } = useManifestMutation();

const categories = computed(() => queryManifest.data.value?.categories ?? []);

const categoryOptions = computed(() =>
  APP_CATEGORIES.map((category) => ({
    label: category,
    value: category,
  })),
);

const removeCategory = (category: string) => {
  const updated = categories.value.filter((c) => c !== category) ?? [];

  updateManifest({
    categories: updated,
  });
};
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div>
      <label
        class="tw:block tw:text-xs tw:font-semibold tw:text-gray-600 tw:mb-2 tw:uppercase tw:tracking-wide"
      >
        <i class="pi pi-tags tw:text-xs tw:mr-1"></i>
        Select the categories of the application
      </label>

      <MultiSelect
        :model-value="categories"
        :options="categoryOptions"
        option-label="label"
        option-value="value"
        placeholder="Select one or more categories"
        class="tw:w-full"
        :max-selected-labels="3"
        selected-items-label="{0} categories selected"
        :filter="true"
        filter-placeholder="Search categories..."
        display="chip"
        @update:model-value="updateManifest({ categories: $event })"
      />

      <small class="tw:text-gray-500 tw:mt-2 tw:block tw:text-xs">
        Maximum 10 categories. Help users find your application in the stores.
      </small>
    </div>

    <div
      v-if="categories.length > 0"
      class="tw:from-gray-50 tw:to-white tw:border tw:border-gray-200 tw:rounded-xl tw:px-5 tw:pb-5"
    >
      <div class="tw:flex tw:items-center tw:gap-2 tw:mb-3">
        <i class="pi pi-check-circle tw:text-green-600"></i>

        <h4 class="tw:text-sm tw:font-semibold tw:text-gray-700">
          Selected categories ({{ categories.length }}/10)
        </h4>
      </div>

      <div class="tw:flex tw:flex-wrap tw:gap-2">
        <Tag
          v-for="category in categories"
          :key="category"
          :value="category"
          severity="info"
          rounded
          class="tw:cursor-pointer tw:hover:opacity-80 tw:transition-opacity"
        >
          <template #default>
            <div class="tw:flex tw:items-center tw:gap-2">
              <span>{{ category }}</span>

              <i class="pi pi-times text-xs" @click="removeCategory(category)"></i>
            </div>
          </template>
        </Tag>
      </div>
    </div>

    <div
      v-else
      class="tw:bg-blue-50 tw:border tw:border-blue-200 tw:rounded-lg tw:p-4 tw:text-center"
    >
      <i class="pi pi-info-circle tw:text-blue-600 tw:text-2xl tw:mb-2"></i>

      <p class="tw:text-sm tw:text-blue-900">
        Categories not selected. Select categories to help users find your application.
      </p>
    </div>

    <InfoBlock
      title="Recommendations for selecting categories:"
      severity="help"
      icon="pi-lightbulb"
      as-list
    >
      <li>Select categories that most closely match the functionality of the application</li>
      <li>Do not abuse the number — better 2-3 exact categories than 10 unsuitable ones</li>
      <li>The main category should be at the first place</li>
    </InfoBlock>
  </div>
</template>
