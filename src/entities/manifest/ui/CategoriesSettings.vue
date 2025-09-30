<template>
  <div class="categories-settings">
    <FormField label="Категории приложения" help="Категории помогают пользователям найти ваше приложение в магазинах">
      <MultiSelect
        :model-value="manifest.categories"
        @update:model-value="updateField('categories', $event)"
        :options="APP_CATEGORIES"
        placeholder="Выберите категории"
        class="w-full"
        :max-selected-labels="3"
        selected-items-label="{0} категорий выбрано"
        :filter="true"
        filter-placeholder="Поиск категорий..."
      />
    </FormField>

    <div v-if="manifest.categories && manifest.categories.length > 0" class="selected-categories">
      <h4>Выбранные категории:</h4>
      <div class="categories-list">
        <Tag
          v-for="category in manifest.categories"
          :key="category"
          :value="getCategoryLabel(category)"
          removable
          @remove="removeCategory(category)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
import FormField from '@/shared/ui/FormField.vue';
import { APP_CATEGORIES } from '@/shared/config/constants';
import type { ManifestSettings } from '../schemas';

interface Props {
  manifest: ManifestSettings;
  errors?: string[];
}

interface Emits {
  (e: 'update:field', field: keyof ManifestSettings, value: unknown): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const updateField = (field: keyof ManifestSettings, value: unknown) => {
  emit('update:field', field, value);
};

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
  const updated = (props.manifest.categories || []).filter((c) => c !== category);
  emit('update:field', 'categories', updated);
};
</script>

<style scoped>
.categories-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.selected-categories h4 {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
