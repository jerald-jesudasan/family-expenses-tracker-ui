import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface Investment {
  id: string;
  family_id: string;
  name: string;
  investment_type?: string;
  invested_amount: number;
  current_value?: number;
  units?: number;
  nav?: number;
  interest_rate?: number;
  start_date: string;
  maturity_date?: string;
  folio_number?: string;
  fund_house?: string;
  status?: string;
  frequency?: string;
  sip_amount?: number;
  nominee?: string;
  account_id?: string;
  notes?: string;
  created_by: string;
  created_at?: string;
}

export async function getInvestments(familyId: string): Promise<Investment[]> {
  try {
    const { data } = await apiClient.get('/investments', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createInvestment(investment: Omit<Investment, 'id' | 'created_by'>, userId: string): Promise<Investment> {
  try {
    const { data } = await apiClient.post('/investments', { ...investment, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateInvestment(id: string, updates: Partial<Investment>): Promise<Investment> {
  try {
    const { data } = await apiClient.patch(`/investments/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteInvestment(id: string): Promise<void> {
  try {
    await apiClient.delete(`/investments/${id}`);
  } catch (e) { handleApiError(e); }
}
