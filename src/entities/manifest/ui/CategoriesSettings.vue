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
  <div class="flex flex-col gap-6">
    <div>
      <label class="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
        <i class="pi pi-tags text-xs mr-1"></i>
        Выберите категории приложения
      </label>

      <MultiSelect
        :model-value="categories"
        :options="categoryOptions"
        option-label="label"
        option-value="value"
        placeholder="Выберите одну или несколько категорий"
        class="w-full"
        :max-selected-labels="3"
        selected-items-label="{0} категорий выбрано"
        :filter="true"
        filter-placeholder="Поиск категорий..."
        display="chip"
        @update:model-value="updateManifest({ categories: $event })"
      />

      <small class="text-gray-500 mt-2 block text-xs"> Максимум 10 категорий. Помогают пользователям найти ваше приложение в магазинах. </small>
    </div>

    <div v-if="categories.length > 0" class="from-gray-50 to-white border border-gray-200 rounded-xl px-5 pb-5">
      <div class="flex items-center gap-2 mb-3">
        <i class="pi pi-check-circle text-green-600"></i>

        <h4 class="text-sm font-semibold text-gray-700">Выбранные категории ({{ categories.length }}/10)</h4>
      </div>

      <div class="flex flex-wrap gap-2">
        <Tag
          v-for="category in categories"
          :key="category"
          :value="category"
          severity="info"
          rounded
          class="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <template #default>
            <div class="flex items-center gap-2">
              <span>{{ category }}</span>

              <i class="pi pi-times text-xs" @click="removeCategory(category)"></i>
            </div>
          </template>
        </Tag>
      </div>
    </div>

    <div v-else class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
      <i class="pi pi-info-circle text-blue-600 text-2xl mb-2"></i>

      <p class="text-sm text-blue-900">Категории не выбраны. Выберите категории, чтобы помочь пользователям найти ваше приложение.</p>
    </div>

    <InfoBlock title="Рекомендации по выбору категорий:" severity="help" icon="pi-lightbulb" as-list>
      <li>Выбирайте категории, максимально соответствующие функциональности приложения</li>
      <li>Не злоупотребляйте количеством — лучше 2-3 точные категории, чем 10 неподходящих</li>
      <li>Основная категория должна быть на первом месте</li>
    </InfoBlock>
  </div>
</template>
