import apiClient from '@/shared/api/client';
import type { NotificationSettings } from '@/shared/types/notifications';

export interface VapidKeysResponse {
  public_key: string;
  private_key: string;
}

class NotificationsAPI {
  async getSettings(): Promise<NotificationSettings> {
    const response = await apiClient.get<NotificationSettings>('/notifications');

    return response.data;
  }

  async updateSettings(data: NotificationSettings): Promise<NotificationSettings> {
    const response = await apiClient.post<NotificationSettings>('/notifications', data);

    return response.data;
  }

  async sendTestNotification(message: string): Promise<{ sent: boolean; message: string }> {
    const response = await apiClient.post<{ sent: boolean; message: string }>('/notifications/test', { message });

    return response.data;
  }

  async generateVapidKeys(): Promise<VapidKeysResponse> {
    const response = await apiClient.post<VapidKeysResponse>('/notifications/vapid');

    return response.data;
  }
}

export const notificationsAPI = new NotificationsAPI();
