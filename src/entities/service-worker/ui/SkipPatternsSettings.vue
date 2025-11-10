<script setup lang="ts">
import {
 computed, ref 
} from 'vue';
import {
 Button, Chip 
} from 'primevue';

import InputField from '@/shared/ui/InputField.vue';
import InfoBlock from '@/shared/ui/InfoBlock.vue';

import {
 useServiceWorkerQuery 
} from '../model/useServiceWorkerQuery';

const {
 queryServiceWorker, updateServiceWorker 
} = useServiceWorkerQuery();

const queryServiceWorkerData = computed(() => queryServiceWorker.data.value);
const skipPatterns = computed(() => queryServiceWorkerData.value?.skip_patterns || []);

const newPattern = ref('');

const addPattern = () => {
  if (!newPattern.value.trim()) return;

  const currentPatterns = skipPatterns.value;
  if (currentPatterns.includes(newPattern.value.trim())) {
    return;
  }

  updateServiceWorker({
    skip_patterns: [...currentPatterns, newPattern.value.trim()],
  });

  newPattern.value = '';
};

const removePattern = (pattern: string) => {
  updateServiceWorker({
    skip_patterns: skipPatterns.value.filter((p) => p !== pattern),
  });
};

const addDefaultPattern = (pattern: string) => {
  if (skipPatterns.value.includes(pattern)) return;

  updateServiceWorker({
    skip_patterns: [...skipPatterns.value, pattern],
  });
};

const defaultPatterns = ['/wp-admin/', '/wp-login.php', '/wp-json/wp/'];
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <p class="tw:text-sm tw:text-gray-600">
      URL пути, которые Service Worker должен игнорировать (не кэшировать).
    </p>

    <div class="tw:flex tw:gap-2">
      <InputField
        v-model="newPattern"
        label="Добавить паттерн"
        icon="pi pi-ban"
        placeholder="/wp-admin/"
        class="tw:flex-1"
        @keyup.enter="addPattern"
      />
      <Button
        label="Добавить"
        icon="pi pi-plus"
        @click="addPattern"
        class="tw:self-end tw:mb-1"
      />
    </div>

    <div v-if="skipPatterns.length > 0" class="tw:space-y-2">
      <h4 class="tw:text-sm tw:font-semibold tw:text-gray-700">Настроенные паттерны:</h4>
      <div class="tw:flex tw:flex-wrap tw:gap-2">
        <Chip
          v-for="pattern in skipPatterns"
          :key="pattern"
          :label="pattern"
          removable
          @remove="removePattern(pattern)"
        />
      </div>
    </div>

    <div class="tw:space-y-2">
      <h4 class="tw:text-sm tw:font-semibold tw:text-gray-700">
        Рекомендуемые паттерны:
      </h4>
      <div class="tw:flex tw:flex-wrap tw:gap-2">
        <Button
          v-for="pattern in defaultPatterns"
          :key="pattern"
          :label="pattern"
          :disabled="skipPatterns.includes(pattern)"
          size="small"
          outlined
          @click="addDefaultPattern(pattern)"
        />
      </div>
    </div>

    <InfoBlock title="О паттернах:">
      <p class="tw:text-sm">
        Паттерны проверяются с помощью <code>pathname.startsWith()</code>. Например,
        <code>/wp-admin/</code> исключит все запросы к админке WordPress.
      </p>
    </InfoBlock>
  </div>
</template>
