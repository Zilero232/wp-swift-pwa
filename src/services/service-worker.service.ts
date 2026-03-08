import apiClient from "@/shared/api/client";
import type { APIResponse } from "@/shared/types";
import type { ServiceWorkerSettings } from "@/shared/types/service-worker";

class ServiceWorkerAPI {
  async getServiceWorker() {
    const { data } = await apiClient.get<APIResponse<ServiceWorkerSettings>>("/service-worker");

    return data;
  }

  async updateServiceWorker(payload: Partial<ServiceWorkerSettings>) {
    const { data } = await apiClient.post<APIResponse<ServiceWorkerSettings>>(
      "/service-worker",
      payload,
    );

    return data;
  }

  async getServiceWorkerCode({ config }: { config: Partial<ServiceWorkerSettings> }) {
    const { data } = await apiClient.get<APIResponse<{ code: string }>>("/service-worker/code", {
      params: {
        config,
      },
    });

    console.log(config);

    return data;
  }
}

export const serviceWorkerAPI = new ServiceWorkerAPI();
