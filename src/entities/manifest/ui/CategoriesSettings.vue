<script setup lang="ts">
import { computed } from 'vue';
import { MultiSelect, Tag } from 'primevue';

import InfoBlock from '@/shared/ui/InfoBlock.vue';

import { APP_CATEGORIES } from '@/shared/config/categories.constants';

import { useManifestQuery } from '../model/useManifestQuery';

const { queryManifest, updateManifest } = useManifestQuery();

const categories = computed(() => queryManifest.data.value?.categories ?? []);

const categoryOptions = computed(() =>
  APP_CATEGORIES.map((category) => ({
    label: category,
    value: category,
  })),
);

const removeCategory = (category: string) => {
  const updated = categories.value.filter((c) => c !== category) ?? [];

  updateManifest({ categories: updated });
};
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div>
      <label class="tw:block tw:text-xs tw:font-semibold tw:text-gray-600 tw:mb-2 tw:uppercase tw:tracking-wide">
        <i class="pi pi-tags tw:text-xs tw:mr-1"></i>
        Выберите категории приложения
      </label>

      <MultiSelect
        :model-value="categories"
        :options="categoryOptions"
        option-label="label"
        option-value="value"
        placeholder="Выберите одну или несколько категорий"
        class="tw:w-full"
        :max-selected-labels="3"
        selected-items-label="{0} категорий выбрано"
        :filter="true"
        filter-placeholder="Поиск категорий..."
        display="chip"
        @update:model-value="updateManifest({ categories: $event })"
      />

      <small class="tw:text-gray-500 tw:mt-2 tw:block tw:text-xs"> Максимум 10 категорий. Помогают пользователям найти ваше приложение в магазинах. </small>
    </div>

    <div v-if="categories.length > 0" class="tw:from-gray-50 tw:to-white tw:border tw:border-gray-200 tw:rounded-xl tw:px-5 tw:pb-5">
      <div class="tw:flex tw:items-center tw:gap-2 tw:mb-3">
        <i class="pi pi-check-circle tw:text-green-600"></i>

        <h4 class="tw:text-sm tw:font-semibold tw:text-gray-700">Выбранные категории ({{ categories.length }}/10)</h4>
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

    <div v-else class="tw:bg-blue-50 tw:border tw:border-blue-200 tw:rounded-lg tw:p-4 tw:text-center">
      <i class="pi pi-info-circle tw:text-blue-600 tw:text-2xl tw:mb-2"></i>

      <p class="tw:text-sm tw:text-blue-900">Категории не выбраны. Выберите категории, чтобы помочь пользователям найти ваше приложение.</p>
    </div>

    <InfoBlock title="Рекомендации по выбору категорий:" severity="help" icon="pi-lightbulb" as-list>
      <li>Выбирайте категории, максимально соответствующие функциональности приложения</li>
      <li>Не злоупотребляйте количеством — лучше 2-3 точные категории, чем 10 неподходящих</li>
      <li>Основная категория должна быть на первом месте</li>
    </InfoBlock>
  </div>
</template>
