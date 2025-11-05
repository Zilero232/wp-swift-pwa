import type { CacheStrategy } from '@/shared/types/service-worker';

export const CACHE_STRATEGIES: { label: string; value: CacheStrategy }[] = [
  { label: 'Cache First', value: 'cacheFirst' },
  { label: 'Network First', value: 'networkFirst' },
  { label: 'Network Only', value: 'networkOnly' },
  { label: 'Cache Only', value: 'cacheOnly' },
];

export interface BaseType {
  label: string;
  extensions: string;
  icon: string;
}

export const BASE_TYPES: BaseType[] = [
  { label: 'HTML', extensions: 'html,htm', icon: 'pi pi-file' },
  { label: 'CSS', extensions: 'css,scss,sass', icon: 'pi pi-palette' },
  { label: 'JavaScript', extensions: 'js,mjs', icon: 'pi pi-code' },
  {
    label: 'Изображения',
    extensions: 'jpg,jpeg,png,gif,webp,svg,ico',
    icon: 'pi pi-image',
  },
  { label: 'Шрифты', extensions: 'woff,woff2,ttf,eot,otf', icon: 'pi pi-font' },
  { label: 'API', extensions: 'api', icon: 'pi pi-cloud' },
];

export const STRATEGY_INFO = {
  cacheFirst: {
    title: 'Cache First',
    description: 'сначала кэш, потом сеть (быстро, но может быть устаревшим)',
  },
  networkFirst: {
    title: 'Network First',
    description: 'сначала сеть, потом кэш (актуально, но медленнее)',
  },
  networkOnly: {
    title: 'Network Only',
    description: 'только сеть (самое актуальное, нет офлайн-режима)',
  },
  cacheOnly: {
    title: 'Cache Only',
    description: 'только кэш (быстро, но требует предзагрузки)',
  },
} as const;
