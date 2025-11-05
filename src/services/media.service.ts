import apiClient from '@/shared/api/client';

import type { APIResponse } from '@/shared/types';
import type { MediaAttachment } from '@/shared/types/media';

export interface MediaLibraryResponse {
  items: MediaAttachment[];
  total: number;
  pages: number;
}

class MediaAPI {
  private baseUrl = '/media';

  async uploadFile(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    const { data } = await apiClient.post<APIResponse<MediaAttachment>>(
      `${this.baseUrl}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (!data.success) {
      throw new Error(data.message || 'Failed to upload file');
    }

    return data.data;
  }

  async getAttachment(id: number) {
    const { data } = await apiClient.get<APIResponse<MediaAttachment>>(
      `${this.baseUrl}/attachment/${id}`,
    );

    if (!data.success) {
      throw new Error(data.message || 'Failed to get attachment');
    }

    return data.data;
  }

  async getLibrary(params?: { search?: string; per_page?: number }) {
    const { data } = await apiClient.get<APIResponse<MediaLibraryResponse>>(
      `${this.baseUrl}/library`,
      {
        params,
      },
    );

    console.log(data);

    if (!data.success) {
      throw new Error(data.message || 'Failed to load library');
    }

    console.log(data.data);

    return data.data;
  }
}

export const mediaAPI = new MediaAPI();
