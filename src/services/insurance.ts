import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface Insurance {
  id: string;
  family_id: string;
  policy_name: string;
  insurer: string;
  policy_number: string;
  insurance_type?: string;
  insured_member_id: string;
  sum_assured: number;
  premium_amount: number;
  premium_frequency?: string;
  start_date: string;
  maturity_date: string;
  next_premium_date?: string;
  nominee?: string;
  status?: string;
  notes?: string;
  created_by: string;
  created_at?: string;
}

export async function getInsurancePolicies(familyId: string): Promise<Insurance[]> {
  try {
    const { data } = await apiClient.get('/insurance', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createInsurance(policy: Omit<Insurance, 'id' | 'created_by'>, userId: string): Promise<Insurance> {
  try {
    const { data } = await apiClient.post('/insurance', { ...policy, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateInsurance(id: string, updates: Partial<Insurance>): Promise<Insurance> {
  try {
    const { data } = await apiClient.patch(`/insurance/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteInsurance(id: string): Promise<void> {
  try {
    await apiClient.delete(`/insurance/${id}`);
  } catch (e) { handleApiError(e); }
}
