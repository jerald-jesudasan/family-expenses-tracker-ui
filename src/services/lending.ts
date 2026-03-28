import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface PersonalLending {
  id: string;
  family_id: string;
  lending_type: 'lent' | 'borrowed';
  person_name: string;
  person_contact?: string;
  amount: number;
  paid_amount?: number;
  outstanding_amount?: number;
  date: string;
  due_date?: string;
  interest_rate?: number;
  status?: string;
  purpose?: string;
  notes?: string;
  created_by: string;
  created_at?: string;
}

export interface LendingPayment {
  id: string;
  family_id: string;
  lending_id: string;
  amount: number;
  payment_date: string;
  notes?: string;
  created_by: string;
}

export async function getPersonalLendings(familyId: string): Promise<PersonalLending[]> {
  try {
    const { data } = await apiClient.get('/lending', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createPersonalLending(lending: Omit<PersonalLending, 'id' | 'created_by' | 'outstanding_amount'>, userId: string): Promise<PersonalLending> {
  try {
    const { data } = await apiClient.post('/lending', { ...lending, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updatePersonalLending(id: string, updates: Partial<PersonalLending>): Promise<PersonalLending> {
  try {
    const { data } = await apiClient.patch(`/lending/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deletePersonalLending(id: string): Promise<void> {
  try {
    await apiClient.delete(`/lending/${id}`);
  } catch (e) { handleApiError(e); }
}

export async function getLendingPayments(lendingId: string): Promise<LendingPayment[]> {
  try {
    const { data } = await apiClient.get(`/lending/${lendingId}/payments`);
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function addLendingPayment(lendingId: string, payment: Omit<LendingPayment, 'id' | 'created_by' | 'lending_id'>, userId: string): Promise<LendingPayment> {
  try {
    const { data } = await apiClient.post(`/lending/${lendingId}/payments`, { ...payment, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}
