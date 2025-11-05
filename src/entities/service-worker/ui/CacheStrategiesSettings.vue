<script setup lang="ts">
import { computed } from 'vue';

import QuickTypeSelector from './QuickTypeSelector.vue';
import StrategyItem from './StrategyItem.vue';
import AddStrategyForm from './AddStrategyForm.vue';
import DefaultStrategyField from './DefaultStrategyField.vue';
import StrategyInfo from './StrategyInfo.vue';

import { useCacheStrategies } from '../model/useCacheStrategies';

import { BASE_TYPES } from '../constants';

const {
  currentStrategies,
  defaultStrategy,
  addBaseType,
  updateStrategy,
  updateExtensions,
  updateDefaultStrategy,
  addCustomExtensions,
  removeStrategy,
  getIcon,
} = useCacheStrategies();

const availableBaseTypes = computed(() => {
  return BASE_TYPES.filter((bt) => {
    return !currentStrategies.value.some((cs) => cs.extensions === bt.extensions);
  });
});
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <p class="tw:text-sm tw:text-gray-600 tw:mb-4">
      Выберите стратегию кэширования для различных типов ресурсов. Это определяет, как
      Service Worker будет обрабатывать запросы.
    </p>

    <QuickTypeSelector
      v-if="availableBaseTypes.length > 0"
      :available-types="availableBaseTypes"
      @select="addBaseType"
    />

    <div v-if="currentStrategies.length > 0" class="tw:space-y-4">
      <h3 class="tw:text-sm tw:font-semibold tw:text-gray-700 tw:mb-3">
        Настроенные стратегии:
      </h3>

      <div class="tw:space-y-4 tw:grid tw:grid-cols-3 tw:gap-4">
        <StrategyItem
          v-for="strategy in currentStrategies"
          :key="strategy.id"
          :strategy="strategy"
          :icon="getIcon(strategy.extensions, strategy.isBase)"
          @update-strategy="updateStrategy"
          @update-extensions="updateExtensions"
          @remove="removeStrategy"
        />
      </div>
    </div>

    <AddStrategyForm @add="addCustomExtensions" />

    <DefaultStrategyField
      :model-value="defaultStrategy"
      @update="updateDefaultStrategy"
    />

    <StrategyInfo />
  </div>
</template>
