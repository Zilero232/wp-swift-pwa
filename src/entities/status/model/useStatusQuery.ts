import { useQuery } from '@tanstack/vue-query';

import { statusAPI } from '@/services/status.service';

import { useToast } from '@/shared/composable/useToast';

const STATUS_KEY = ['pwa-status'];

export const useStatusQuery = () => {
  const { showSuccess, showError } = useToast();

  const queryStatus = useQuery({
    queryKey: STATUS_KEY,
    queryFn: async () => {
      const response = await statusAPI.getStatus();

      if (response.success) {
        showSuccess(response.message || 'Status fetched successfully');
      } else {
        showError(response.message || 'Failed to fetch status');
      }

      return response.data;
    },
  });

  return { queryStatus };
};
