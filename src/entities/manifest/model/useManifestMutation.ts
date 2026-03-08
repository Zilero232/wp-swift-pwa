import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { MANIFEST_KEY } from "./useManifestQuery";

import { manifestAPI } from "@/services/manifest.service";
import { useToast } from "@/shared/composable/useToast";
import type { ManifestSettings } from "@/shared/types/manifest";

export const useManifestMutation = () => {
  const { showSuccess, showError } = useToast();

  const queryClient = useQueryClient();

  const mutationUpdateManifest = useMutation({
    mutationFn: async (payload: Partial<ManifestSettings>) => {
      const response = await manifestAPI.updateManifest(payload);

      return response.data;
    },
    onSuccess: () => {
      showSuccess("Manifest updated successfully");
    },
    onError: () => {
      showError("Failed to update manifest");
    },
  });

  const updateManifest = (payload: Partial<ManifestSettings>) => {
    const currentManifest = queryClient.getQueryData(MANIFEST_KEY);

    if (!currentManifest) return;

    const updatedManifest = {
      ...currentManifest,
      ...payload,
    };

    queryClient.setQueryData(MANIFEST_KEY, updatedManifest);
  };

  return {
    mutationUpdateManifest,
    updateManifest,
  };
};
