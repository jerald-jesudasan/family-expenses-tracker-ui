import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface ScheduledPayment {
  id: string;
  family_id: string;
  name: string;
  icon?: string;
  category?: string;
  frequency?: string;
  due_months?: number[];
  due_day: number;
  amount?: number;
  is_variable?: boolean;
  is_auto_linked?: boolean;
  linked_type?: string;
  linked_id?: string;
  start_date: string;
  end_date?: string;
  is_active?: boolean;
  created_by: string;
}

export interface ScheduledInstance {
  id: string;
  schedule_id: string;
  family_id: string;
  year: number;
  month: number;
  due_date: string;
  amount: number;
  status?: string;
  paid_amount?: number;
  paid_date?: string;
  transaction_id?: string;
  created_by: string;
}

export async function getSchedules(familyId: string): Promise<ScheduledPayment[]> {
  try {
    const { data } = await apiClient.get('/schedules', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createSchedule(schedule: Omit<ScheduledPayment, 'id' | 'created_by'>, userId: string): Promise<ScheduledPayment> {
  try {
    const { data } = await apiClient.post('/schedules', { ...schedule, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateSchedule(id: string, updates: Partial<ScheduledPayment>): Promise<ScheduledPayment> {
  try {
    const { data } = await apiClient.patch(`/schedules/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteSchedule(id: string): Promise<void> {
  try {
    await apiClient.delete(`/schedules/${id}`);
  } catch (e) { handleApiError(e); }
}

export async function getScheduleInstances(familyId: string, year: number, month: number): Promise<ScheduledInstance[]> {
  try {
    const { data } = await apiClient.get('/schedules/instances', { params: { familyId, year, month } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function payScheduleInstance(id: string, amount: number): Promise<ScheduledInstance> {
  try {
    const { data } = await apiClient.post(`/schedules/instances/${id}/pay`, { amount });
    return data;
  } catch (e) { handleApiError(e); }
}
