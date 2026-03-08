import { ENUM_CACHE_STRATEGIES } from "@/shared/types/service-worker";

export const CACHE_STRATEGIES = [
  {
    label: "Cache First",
    value: ENUM_CACHE_STRATEGIES.CACHE_FIRST,
  },
  {
    label: "Network First",
    value: ENUM_CACHE_STRATEGIES.NETWORK_FIRST,
  },
  {
    label: "Network Only",
    value: ENUM_CACHE_STRATEGIES.NETWORK_ONLY,
  },
  {
    label: "Cache Only",
    value: ENUM_CACHE_STRATEGIES.CACHE_ONLY,
  },
  {
    label: "Stale While Revalidate",
    value: ENUM_CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
  },
];

export const STRATEGY_INFO = {
  [ENUM_CACHE_STRATEGIES.CACHE_FIRST]: {
    title: "Cache First",
    description: "сначала кэш, потом сеть (быстро, но может быть устаревшим)",
  },
  [ENUM_CACHE_STRATEGIES.NETWORK_FIRST]: {
    title: "Network First",
    description: "сначала сеть, потом кэш (актуально, но медленнее)",
  },
  [ENUM_CACHE_STRATEGIES.NETWORK_ONLY]: {
    title: "Network Only",
    description: "только сеть (самое актуальное, нет офлайн-режима)",
  },
  [ENUM_CACHE_STRATEGIES.CACHE_ONLY]: {
    title: "Cache Only",
    description: "только кэш (быстро, но требует предзагрузки)",
  },
  [ENUM_CACHE_STRATEGIES.STALE_WHILE_REVALIDATE]: {
    title: "Stale While Revalidate",
    description: "кэш, но если он устаревший, то сеть (быстро, но может быть устаревшим)",
  },
};
