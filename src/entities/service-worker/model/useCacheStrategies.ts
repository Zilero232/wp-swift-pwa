import { computed } from 'vue';

import type { CacheStrategy } from '@/shared/types/service-worker';
import { useToast } from '@/shared/composable/useToast';

import { useServiceWorkerQuery } from './useServiceWorkerQuery';

import { BASE_TYPES } from '../constants';

export interface StrategyItem {
  id: string;
  extensions: string;
  strategy: CacheStrategy;
  isBase: boolean;
}

export function useCacheStrategies() {
  const { queryServiceWorker, updateServiceWorker } = useServiceWorkerQuery();
  const { showError } = useToast();

  const serviceWorkerData = computed(() => queryServiceWorker.data.value);

  const defaultStrategy = computed(() => {
    return serviceWorkerData.value?.strategies?.default || 'networkFirst';
  });

  const currentStrategies = computed((): StrategyItem[] => {
    const strategies = serviceWorkerData.value?.strategies || {};
    const result: StrategyItem[] = [];

    Object.keys(strategies).forEach((extensions) => {
      if (extensions === 'default') return;

      const isBase = BASE_TYPES.some((base) => base.extensions === extensions);

      result.push({
        id: extensions,
        extensions,
        strategy: strategies[extensions] || 'cacheFirst',
        isBase,
      });
    });

    return result;
  });

  const addBaseType = (baseType: (typeof BASE_TYPES)[0]) => {
    if (currentStrategies.value.some((s) => s.extensions === baseType.extensions)) {
      return showError('Тип ресурса уже добавлен');
    }

    const strategies = { ...serviceWorkerData.value?.strategies };
    strategies[baseType.extensions] = 'cacheFirst';

    updateServiceWorker({ strategies });
  };

  const updateStrategy = (extensions: string, strategy: CacheStrategy) => {
    if (!serviceWorkerData.value?.strategies) return;

    const strategies = { ...serviceWorkerData.value.strategies };
    strategies[extensions] = strategy;

    updateServiceWorker({ strategies });
  };

  const updateExtensions = (oldExtensions: string, newExtensions: string) => {
    if (!serviceWorkerData.value?.strategies) return;

    const normalizedNew = newExtensions.trim().toLowerCase();

    if (!normalizedNew || normalizedNew === oldExtensions) return;

    const exists = currentStrategies.value.some(
      (s) => s.extensions === normalizedNew && s.extensions !== oldExtensions,
    );

    if (exists) {
      return showError('Такие расширения уже существуют');
    }

    const strategies = { ...serviceWorkerData.value.strategies };
    const strategy = strategies[oldExtensions];

    delete strategies[oldExtensions];
    strategies[normalizedNew] = strategy;

    updateServiceWorker({ strategies });
  };

  const updateDefaultStrategy = (strategy: CacheStrategy) => {
    if (!serviceWorkerData.value?.strategies) return;

    const strategies = { ...serviceWorkerData.value.strategies };
    strategies.default = strategy;

    updateServiceWorker({ strategies });
  };

  const addCustomExtensions = (extensions: string) => {
    const normalized = extensions.trim().toLowerCase();

    if (!normalized) return;

    if (currentStrategies.value.some((s) => s.extensions === normalized)) {
      return showError('Такие расширения уже добавлены');
    }

    const strategies = { ...serviceWorkerData.value?.strategies };
    strategies[normalized] = 'cacheFirst';

    updateServiceWorker({ strategies });
  };

  const removeStrategy = (extensions: string) => {
    if (!serviceWorkerData.value?.strategies) return;

    const strategies = { ...serviceWorkerData.value.strategies };
    delete strategies[extensions];

    updateServiceWorker({ strategies });
  };

  const getIcon = (extensions: string, isBase: boolean) => {
    if (isBase) {
      const base = BASE_TYPES.find((b) => b.extensions === extensions);

      return base?.icon || 'pi pi-file';
    }

    return 'pi pi-file';
  };

  return {
    currentStrategies,
    defaultStrategy,
    addBaseType,
    updateStrategy,
    updateExtensions,
    updateDefaultStrategy,
    addCustomExtensions,
    removeStrategy,
    getIcon,
  };
}
