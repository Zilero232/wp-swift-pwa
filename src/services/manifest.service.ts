import apiClient from "@/shared/api/client";
import type { APIResponse } from "@/shared/types";
import type { ManifestSettings } from "@/shared/types/manifest";

class ManifestAPI {
  async getManifest() {
    const { data } = await apiClient.get<APIResponse<ManifestSettings>>("/manifest");

    return data;
  }

  async updateManifest(payload: Partial<ManifestSettings>) {
    const { data } = await apiClient.post<APIResponse<ManifestSettings>>("/manifest", payload);

    return data;
  }
}

export const manifestAPI = new ManifestAPI();
