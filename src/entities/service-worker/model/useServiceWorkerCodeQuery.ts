import { useQuery } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";

import { serviceWorkerAPI } from "@/services/service-worker.service";
import type { ServiceWorkerSettings } from "@/shared/types/service-worker";

export const useServiceWorkerCodeQuery = (
  serviceWorkerSettings: Readonly<Ref<ServiceWorkerSettings | undefined>>,
) => {
  const serviceWorkerCodeQueryKey = computed(() => [
    "service-worker-code",
    serviceWorkerSettings.value ? JSON.stringify(serviceWorkerSettings.value) : "",
  ]);

  const queryServiceWorkerCode = useQuery({
    queryKey: serviceWorkerCodeQueryKey,
    queryFn: async () => {
      const { data, success, message } = await serviceWorkerAPI.getServiceWorkerCode({
        config: serviceWorkerSettings.value || {},
      });

      if (!success) {
        throw new Error(message || "Failed to fetch Service Worker code");
      }

      return data.code;
    },
    enabled: computed(() => !!serviceWorkerSettings.value),
  });

  return {
    queryServiceWorkerCode,
  };
};
