import { useQuery } from "@tanstack/vue-query";

import { manifestAPI } from "@/services/manifest.service";

export const MANIFEST_KEY = ["manifest"];

export const useManifestQuery = () => {
  const queryManifest = useQuery({
    queryKey: MANIFEST_KEY,
    queryFn: async () => {
      const response = await manifestAPI.getManifest();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch manifest");
      }

      return response.data;
    },
  });

  return {
    queryManifest,
  };
};
