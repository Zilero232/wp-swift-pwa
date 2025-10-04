<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';

import FormField from '@/shared/ui/FormField.vue';
import { APP_CATEGORIES } from '@/shared/config/constants';

import { useManifestStore } from '../model/store';

const manifestStore = useManifestStore();

const getCategoryLabel = (category: string): string => {
  // Переводим категории на русский
  const translations: Record<string, string> = {
    business: 'Бизнес',
    education: 'Образование',
    entertainment: 'Развлечения',
    finance: 'Финансы',
    fitness: 'Фитнес',
    food: 'Еда',
    games: 'Игры',
    health: 'Здоровье',
    lifestyle: 'Образ жизни',
    news: 'Новости',
    productivity: 'Продуктивность',
    shopping: 'Покупки',
    social: 'Социальные сети',
    sports: 'Спорт',
    travel: 'Путешествия',
    utilities: 'Утилиты',
  };
  return translations[category] || category;
};

const removeCategory = (category: string) => {
  const updated = (manifestStore.manifest?.categories || []).filter((c) => c !== category);

  manifestStore.updateManifest({ categories: updated });
};
</script>

<template>
  <div class="categories-settings">
    <FormField
      label="Категории приложения"
      help="Категории помогают пользователям найти ваше приложение в магазинах"
    >
      <MultiSelect
        :model-value="manifestStore.manifest?.categories"
        @update:model-value="manifestStore.updateManifest({ categories: $event })"
        :options="APP_CATEGORIES"
        placeholder="Выберите категории"
        class="w-full"
        :max-selected-labels="3"
        selected-items-label="{0} категорий выбрано"
        :filter="true"
        filter-placeholder="Поиск категорий..."
      />
    </FormField>

    <div
      v-if="manifestStore.manifest?.categories && manifestStore.manifest?.categories.length > 0"
      class="selected-categories"
    >
      <h4>Выбранные категории:</h4>
      <div class="categories-list">
        <Tag
          v-for="category in manifestStore.manifest?.categories"
          :key="category"
          :value="getCategoryLabel(category)"
          removable
          @remove="removeCategory(category)"
        />
      </div>
    </div>
  </div>
</template>
