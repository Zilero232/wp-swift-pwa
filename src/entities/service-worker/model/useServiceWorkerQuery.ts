import { useQuery } from "@tanstack/vue-query";

import { serviceWorkerAPI } from "@/services/service-worker.service";

export const SERVICE_WORKER_KEY = ["service-worker"];

export const useServiceWorkerQuery = () => {
  const queryServiceWorker = useQuery({
    queryKey: SERVICE_WORKER_KEY,
    queryFn: async () => {
      const { data, success, message } = await serviceWorkerAPI.getServiceWorker();

      if (!success) {
        throw new Error(message || "Failed to fetch Service Worker");
      }

      return data;
    },
  });

  return {
    queryServiceWorker,
  };
};
