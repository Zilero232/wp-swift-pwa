import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { SERVICE_WORKER_KEY } from "./useServiceWorkerQuery";

import { serviceWorkerAPI } from "@/services/service-worker.service";
import { useToast } from "@/shared/composable/useToast";
import type { ServiceWorkerSettings } from "@/shared/types/service-worker";

export function useServiceWorkerMutation() {
  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();

  const mutationUpdateServiceWorker = useMutation({
    mutationFn: async (payload: Partial<ServiceWorkerSettings>) => {
      const { data, success, message } = await serviceWorkerAPI.updateServiceWorker(payload);

      if (!success) {
        throw new Error(message || "Failed to update Service Worker");
      }

      return data;
    },
    onSuccess: () => {
      showSuccess("Service Worker обновлён успешно");
    },
    onError: (error: Error) => {
      showError(error.message || "Ошибка обновления Service Worker");
    },
  });

  const updateServiceWorker = (payload: Partial<ServiceWorkerSettings>) => {
    const currentServiceWorker = queryClient.getQueryData(SERVICE_WORKER_KEY);

    if (!currentServiceWorker) return;

    const updatedServiceWorker = {
      ...currentServiceWorker,
      ...payload,
    };

    queryClient.setQueryData(SERVICE_WORKER_KEY, updatedServiceWorker);
  };

  return {
    mutationUpdateServiceWorker,
    updateServiceWorker,
  };
}
