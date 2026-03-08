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
    description: "Cache first, then network (fast, but may be outdated)",
  },
  [ENUM_CACHE_STRATEGIES.NETWORK_FIRST]: {
    title: "Network First",
    description: "Network first, then cache (actual, but slower)",
  },
  [ENUM_CACHE_STRATEGIES.NETWORK_ONLY]: {
    title: "Network Only",
    description: "Only network (most actual, no offline mode)",
  },
  [ENUM_CACHE_STRATEGIES.CACHE_ONLY]: {
    title: "Cache Only",
    description: "Only cache (fast, but requires preloading)",
  },
  [ENUM_CACHE_STRATEGIES.STALE_WHILE_REVALIDATE]: {
    title: "Stale While Revalidate",
    description: "Cache, but if it's outdated, then network (fast, but may be outdated)",
  },
};
