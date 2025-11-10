import {
 useQuery 
} from '@tanstack/vue-query';

import {
 statusAPI 
} from '@/services/status.service';

const STATUS_KEY = ['pwa-status'];

export const useStatusQuery = () => {
  const queryStatus = useQuery({
    queryKey: STATUS_KEY,
    queryFn: async () => {
      const response = await statusAPI.getStatus();

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch status');
      }

      return response.data;
    },
  });

  return queryStatus;
};
