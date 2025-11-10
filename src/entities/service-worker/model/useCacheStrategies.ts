import {
 computed 
} from 'vue';

import {
 useToast 
} from '@/shared/composable/useToast';
import {
 ENUM_CACHE_STRATEGIES 
} from '@/shared/types/service-worker';

import {
 useServiceWorkerQuery 
} from './useServiceWorkerQuery';

import {
 BASE_EXTENSIONS 
} from '../constants';

export interface StrategyItem {
  id: string;
  extensions: string;
  strategy: ENUM_CACHE_STRATEGIES;
  isBase: boolean;
}

export function useCacheStrategies() {
  const {
 queryServiceWorker, updateServiceWorker 
} = useServiceWorkerQuery();
  const {
 showError 
} = useToast();

  const serviceWorkerData = computed(() => queryServiceWorker.data.value);

  const strategies = computed(() => serviceWorkerData.value?.strategies || {});

  const defaultStrategy = computed(() => {
    return strategies.value.default || 'networkFirst';
  });

  const currentStrategies = computed((): StrategyItem[] => {
    const result: StrategyItem[] = [];

    Object.keys(strategies.value).forEach((extensions) => {
      if (extensions === 'default') return;

      const isBase = BASE_EXTENSIONS.some((base) => base.extensions === extensions);

      result.push({
        id: extensions,
        extensions,
        strategy: strategies.value[extensions] || ENUM_CACHE_STRATEGIES.CACHE_FIRST,
        isBase,
      });
    });

    return result;
  });

  // Helper function to update strategies
  const updateStrategies = (
    updater: (current: Record<string, ENUM_CACHE_STRATEGIES>) => void,
  ) => {
    if (!strategies.value) return;

    const updated = {
      ...strategies.value,
    };
    updater(updated);
    updateServiceWorker({
      strategies: updated,
    });
  };

  const addBaseType = (baseType: (typeof BASE_EXTENSIONS)[0]) => {
    if (currentStrategies.value.some((s) => s.extensions === baseType.extensions)) {
      return showError('Тип ресурса уже добавлен');
    }

    updateStrategies((current) => {
      current[baseType.extensions] = ENUM_CACHE_STRATEGIES.CACHE_FIRST;
    });
  };

  const updateStrategy = (extensions: string, strategy: ENUM_CACHE_STRATEGIES) => {
    updateStrategies((current) => {
      current[extensions] = strategy;
    });
  };

  const updateExtensions = (oldExtensions: string, newExtensions: string) => {
    const normalizedNew = newExtensions.trim().toLowerCase();

    if (!normalizedNew || normalizedNew === oldExtensions) return;

    const exists = currentStrategies.value.some(
      (s) => s.extensions === normalizedNew && s.extensions !== oldExtensions,
    );

    if (exists) {
      return showError('Такие расширения уже существуют');
    }

    updateStrategies((current) => {
      const strategy = current[oldExtensions];

      delete current[oldExtensions];

      current[normalizedNew] = strategy || ENUM_CACHE_STRATEGIES.CACHE_FIRST;
    });
  };

  const updateDefaultStrategy = (strategy: ENUM_CACHE_STRATEGIES) => {
    updateStrategies((current) => {
      current.default = strategy;
    });
  };

  const addCustomExtensions = (extensions: string) => {
    const normalized = extensions.trim().toLowerCase();

    if (!normalized) return;

    if (currentStrategies.value.some((s) => s.extensions === normalized)) {
      return showError('Такие расширения уже добавлены');
    }

    updateStrategies((current) => {
      current[normalized] = ENUM_CACHE_STRATEGIES.CACHE_FIRST;
    });
  };

  const removeStrategy = (extensions: string) => {
    updateStrategies((current) => {
      delete current[extensions];
    });
  };

  const getIcon = (extensions: string, isBase: boolean) => {
    if (isBase) {
      const base = BASE_EXTENSIONS.find((b) => b.extensions === extensions);
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
