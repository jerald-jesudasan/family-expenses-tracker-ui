import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface Loan {
  id: string;
  family_id: string;
  name: string;
  loan_type?: string;
  lender: string;
  principal_amount: number;
  interest_rate: number;
  tenure_months: number;
  emi_amount: number;
  start_date: string;
  end_date?: string;
  outstanding_balance: number;
  total_paid?: number;
  emi_paid_count?: number;
  due_day: number;
  account_id?: string;
  status?: string;
  notes?: string;
  created_by: string;
  created_at?: string;
}

export interface LoanPayment {
  id: string;
  family_id: string;
  loan_id: string;
  payment_date: string;
  amount: number;
  principal_component?: number;
  interest_component?: number;
  payment_type?: string;
  account_id?: string;
  transaction_id?: string;
  notes?: string;
  created_by: string;
}

export async function getLoans(familyId: string): Promise<Loan[]> {
  try {
    const { data } = await apiClient.get('/loans', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createLoan(loan: Omit<Loan, 'id' | 'created_by'>, userId: string): Promise<Loan> {
  try {
    const { data } = await apiClient.post('/loans', { ...loan, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateLoan(id: string, updates: Partial<Loan>): Promise<Loan> {
  try {
    const { data } = await apiClient.patch(`/loans/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteLoan(id: string): Promise<void> {
  try {
    await apiClient.delete(`/loans/${id}`);
  } catch (e) { handleApiError(e); }
}

export async function getLoanPayments(loanId: string): Promise<LoanPayment[]> {
  try {
    const { data } = await apiClient.get(`/loans/${loanId}/payments`);
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function addLoanPayment(loanId: string, payment: Omit<LoanPayment, 'id' | 'created_by' | 'loan_id'>, userId: string): Promise<LoanPayment> {
  try {
    const { data } = await apiClient.post(`/loans/${loanId}/payments`, { ...payment, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}
