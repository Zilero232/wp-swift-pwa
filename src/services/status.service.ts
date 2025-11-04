import apiClient from '@/shared/api/client';

import type { APIResponse } from '@/shared/types';
import type { StatusResponse } from '@/shared/types/status';

class StatusAPI {
  async getStatus() {
    const { data } = await apiClient.get<APIResponse<StatusResponse>>('/status');

    return data;
  }
}

export const statusAPI = new StatusAPI();
