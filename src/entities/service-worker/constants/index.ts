import {
 ENUM_CACHE_STRATEGIES 
} from '@/shared/types/service-worker';

export const CACHE_STRATEGIES = [
  {
    label: 'Cache First',
    value: ENUM_CACHE_STRATEGIES.CACHE_FIRST,
  },
  {
    label: 'Network First',
    value: ENUM_CACHE_STRATEGIES.NETWORK_FIRST,
  },
  {
    label: 'Network Only',
    value: ENUM_CACHE_STRATEGIES.NETWORK_ONLY,
  },
  {
    label: 'Cache Only',
    value: ENUM_CACHE_STRATEGIES.CACHE_ONLY,
  },
];

export const BASE_EXTENSIONS = [
  {
    label: 'HTML',
    extensions: 'html,htm',
    icon: 'pi pi-file',
  },
  {
    label: 'CSS',
    extensions: 'css,scss,sass',
    icon: 'pi pi-palette',
  },
  {
    label: 'JavaScript',
    extensions: 'js,mjs',
    icon: 'pi pi-code',
  },
  {
    label: 'Изображения',
    extensions: 'jpg,jpeg,png,gif,webp,svg,ico',
    icon: 'pi pi-image',
  },
  {
    label: 'Шрифты',
    extensions: 'woff,woff2,ttf,eot,otf',
    icon: 'pi pi-font',
  },
  {
    label: 'API',
    extensions: 'api',
    icon: 'pi pi-cloud',
  },
];

export const STRATEGY_INFO = {
  [ENUM_CACHE_STRATEGIES.CACHE_FIRST]: {
    title: 'Cache First',
    description: 'сначала кэш, потом сеть (быстро, но может быть устаревшим)',
  },
  [ENUM_CACHE_STRATEGIES.NETWORK_FIRST]: {
    title: 'Network First',
    description: 'сначала сеть, потом кэш (актуально, но медленнее)',
  },
  [ENUM_CACHE_STRATEGIES.NETWORK_ONLY]: {
    title: 'Network Only',
    description: 'только сеть (самое актуальное, нет офлайн-режима)',
  },
  [ENUM_CACHE_STRATEGIES.CACHE_ONLY]: {
    title: 'Cache Only',
    description: 'только кэш (быстро, но требует предзагрузки)',
  },
};

export const REGISTRATION_UPDATE_VIA_CACHE_OPTIONS = [
  {
    label: 'Imports (рекомендуется)',
    value: 'imports',
    description: 'Проверяет обновления только для импортируемых скриптов',
  },
  {
    label: 'All',
    value: 'all',
    description: 'Проверяет обновления для всех скриптов',
  },
  {
    label: 'None',
    value: 'none',
    description: 'Не использует HTTP-кэш при проверке обновлений',
  },
];

export const REGISTRATION_TYPE_OPTIONS = [
  {
    label: 'Classic (рекомендуется)',
    value: 'classic',
    description: 'Традиционный JavaScript скрипт',
  },
  {
    label: 'Module',
    value: 'module',
    description: 'ES модуль с поддержкой import/export',
  },
];

export const DEFAULT_REGISTRATION_SCOPE = '/';
