import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

import { manifestAPI } from '@/services/manifest.service';

import { useToast } from '@/shared/composable/useToast';

import type { ManifestSettings } from '@/shared/types/manifest';

const MANIFEST_KEY = ['manifest'];

export const useManifestQuery = () => {
  const { showSuccess, showError } = useToast();

  const queryClient = useQueryClient();

  const queryManifest = useQuery({
    queryKey: MANIFEST_KEY,
    queryFn: async () => {
      const response = await manifestAPI.getManifest();

      if (response.success) {
        showSuccess(response.message || 'Manifest fetched successfully');
      } else {
        showError(response.message || 'Failed to fetch manifest');
      }

      return response.data;
    },
    enabled: false,
  });

  const mutationUpdateManifest = useMutation({
    mutationFn: async (payload: Partial<ManifestSettings>) => {
      const response = await manifestAPI.updateManifest(payload);

      return response.data;
    },
    onSuccess: () => {
      showSuccess('Manifest updated successfully');
    },
    onError: () => {
      showError('Failed to update manifest');
    },
  });

  const updateManifest = (payload: Partial<ManifestSettings>) => {
    const currentManifest = queryClient.getQueryData(MANIFEST_KEY);

    if (!currentManifest) return;

    const updatedManifest = { ...currentManifest, ...payload };

    queryClient.setQueryData(MANIFEST_KEY, updatedManifest);
  };

  const loadManifest = () => {
    queryManifest.refetch();
  };

  return { queryManifest, mutationUpdateManifest, updateManifest, loadManifest };
};
