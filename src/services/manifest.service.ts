import apiClient from '@/shared/api/client';

import type { ManifestSettings } from '@/entities/manifest/schemas';

export interface ManifestGenerateResponse {
  file_url: string;
  file_size: number;
}

export interface IconUploadResponse {
  url: string;
  file: string;
  type: string;
}

class ManifestAPI {
  async getManifest(): Promise<ManifestSettings> {
    const response = await apiClient.get<ManifestSettings>('/manifest');

    return response.data;
  }

  async updateManifest(data: ManifestSettings): Promise<ManifestSettings> {
    const response = await apiClient.post<ManifestSettings>('/manifest', data);

    return response.data;
  }

  async generateManifest(): Promise<ManifestGenerateResponse> {
    const response = await apiClient.post<ManifestGenerateResponse>('/manifest/generate');

    return response.data;
  }

  async validateManifest(data: ManifestSettings): Promise<{ valid: boolean; errors: string[]; warnings: string[] }> {
    const response = await apiClient.post('/manifest/validate', data);

    return response.data;
  }

  async uploadIcon(file: File): Promise<IconUploadResponse> {
    const formData = new FormData();

    formData.append('icon', file);

    const response = await apiClient.post<IconUploadResponse>('/manifest/icon', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  }
}

export const manifestAPI = new ManifestAPI();
