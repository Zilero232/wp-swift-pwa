import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

import { manifestAPI } from '@/services/manifest.service';

import { useToast } from '@/shared/composable/useToast';

import type { ManifestSettings } from '@/shared/types/manifest';
import { toValue, type MaybeRefOrGetter, computed } from 'vue';

const MANIFEST_KEY = ['manifest'];

interface Props {
  enabled?: MaybeRefOrGetter<boolean>;
}

export const useManifestQuery = ({ enabled = true }: Props = {}) => {
  const { showSuccess, showError } = useToast();

  const queryClient = useQueryClient();

  const isEnabled = computed(() => toValue(enabled));

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
    enabled: isEnabled.value,
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

  return { queryManifest, mutationUpdateManifest, updateManifest };
};
