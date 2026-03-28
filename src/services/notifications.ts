import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface Notification {
  id: string;
  family_id: string;
  user_id: string;
  title: string;
  message: string;
  type?: string;
  priority?: string;
  is_read?: boolean;
  linked_type?: string;
  linked_id?: string;
  action_url?: string;
  created_at?: string;
}

export async function getNotifications(familyId: string): Promise<Notification[]> {
  try {
    const { data } = await apiClient.get('/notifications', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function markNotificationRead(id: string): Promise<Notification> {
  try {
    const { data } = await apiClient.patch(`/notifications/${id}/read`);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function markAllNotificationsRead(familyId: string): Promise<void> {
  try {
    await apiClient.patch('/notifications/read-all', null, { params: { familyId } });
  } catch (e) { handleApiError(e); }
}

export async function deleteNotification(id: string): Promise<void> {
  try {
    await apiClient.delete(`/notifications/${id}`);
  } catch (e) { handleApiError(e); }
}
