import {
 useQuery, useMutation, useQueryClient 
} from '@tanstack/vue-query';

import {
 serviceWorkerAPI 
} from '@/services/service-worker.service';

import {
 useToast 
} from '@/shared/composable/useToast';

import type {
 ServiceWorkerSettings 
} from '@/shared/types/service-worker';

const SERVICE_WORKER_KEY = ['service-worker'];

export function useServiceWorkerQuery() {
  const {
 showSuccess, showError 
} = useToast();
  const queryClient = useQueryClient();

  const queryServiceWorker = useQuery({
    queryKey: SERVICE_WORKER_KEY,
    queryFn: async () => {
      const response = await serviceWorkerAPI.getServiceWorker();

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch Service Worker');
      }

      return response.data;
    },
    enabled: false,
  });

  const mutationUpdateServiceWorker = useMutation({
    mutationFn: async (payload: Partial<ServiceWorkerSettings>) => {
      const response = await serviceWorkerAPI.updateServiceWorker(payload);

      if (response.success) {
        showSuccess(response.message || 'Service Worker updated successfully');
      } else {
        showError(response.message || 'Failed to update Service Worker');
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service-worker'],
      });

      showSuccess('Service Worker обновлён успешно');
    },
    onError: (error: Error) => {
      showError(error.message || 'Ошибка обновления Service Worker');
    },
  });

  const queryServiceWorkerCode = useQuery({
    queryKey: ['service-worker-code'],
    queryFn: async () => {
      const {
 data, success, message 
} = await serviceWorkerAPI.getServiceWorkerCode();

      if (!success) {
        throw new Error(message || 'Failed to fetch Service Worker code');
      }

      return data.code;
    },
    enabled: false,
  });

  const updateServiceWorker = (payload: Partial<ServiceWorkerSettings>) => {
    const currentServiceWorker = queryClient.getQueryData(SERVICE_WORKER_KEY);

    if (!currentServiceWorker) return;

    const updatedServiceWorker = {
      ...currentServiceWorker,
      ...payload,
    };

    queryClient.setQueryData(['service-worker'], updatedServiceWorker);
  };

  const loadServiceWorker = () => {
    queryServiceWorker.refetch();
  };

  return {
    queryServiceWorker,
    mutationUpdateServiceWorker,
    queryServiceWorkerCode,
    updateServiceWorker,
    loadServiceWorker,
  };
}
