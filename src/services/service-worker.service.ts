import apiClient from '@/shared/api/client';
import type { ServiceWorkerSettings } from '@/shared/types/service-worker';

export interface ServiceWorkerGenerateResponse {
  file_url: string;
  file_size: number;
}

class ServiceWorkerAPI {
  async getSettings(): Promise<ServiceWorkerSettings> {
    const response = await apiClient.get<ServiceWorkerSettings>('/service-worker');

    return response.data;
  }

  async updateSettings(data: ServiceWorkerSettings): Promise<ServiceWorkerSettings> {
    const response = await apiClient.post<ServiceWorkerSettings>('/service-worker', data);

    return response.data;
  }

  async generateServiceWorker(): Promise<ServiceWorkerGenerateResponse> {
    const response = await apiClient.post<ServiceWorkerGenerateResponse>('/service-worker/generate');

    return response.data;
  }
}

export const serviceWorkerAPI = new ServiceWorkerAPI();
