import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface IncomeRecord {
  id: string;
  family_id: string;
  income_source_id: string;
  year: number;
  month: number;
  planned_amount: number;
  received_amount?: number;
  status?: string;
  notes?: string;
  created_by: string;
}

export interface ExpenseRecord {
  id: string;
  family_id: string;
  category_id: string;
  year: number;
  month: number;
  planned_amount: number;
  spent_amount?: number;
  status?: string;
  notes?: string;
  created_by: string;
}

export interface Transaction {
  id: string;
  family_id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  account_id?: string;
  category_id?: string;
  payment_mode?: string;
  notes?: string;
  created_by: string;
}

export async function getMonthlySummary(familyId: string, year: number, month: number) {
  try {
    const { data } = await apiClient.get('/monthly/summary', { params: { familyId, year, month } });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function getIncomeRecords(familyId: string, year: number, month: number): Promise<IncomeRecord[]> {
  try {
    const { data } = await apiClient.get('/monthly/income-records', { params: { familyId, year, month } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createIncomeRecord(record: Omit<IncomeRecord, 'id' | 'created_by'>, userId: string): Promise<IncomeRecord> {
  try {
    const { data } = await apiClient.post('/monthly/income-records', { ...record, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateIncomeRecord(id: string, updates: Partial<IncomeRecord>): Promise<IncomeRecord> {
  try {
    const { data } = await apiClient.patch(`/monthly/income-records/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function getExpenseRecords(familyId: string, year: number, month: number): Promise<ExpenseRecord[]> {
  try {
    const { data } = await apiClient.get('/monthly/expense-records', { params: { familyId, year, month } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createExpenseRecord(record: Omit<ExpenseRecord, 'id' | 'created_by'>, userId: string): Promise<ExpenseRecord> {
  try {
    const { data } = await apiClient.post('/monthly/expense-records', { ...record, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateExpenseRecord(id: string, updates: Partial<ExpenseRecord>): Promise<ExpenseRecord> {
  try {
    const { data } = await apiClient.patch(`/monthly/expense-records/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function getTransactions(familyId: string, year: number, month: number): Promise<Transaction[]> {
  try {
    const { data } = await apiClient.get('/monthly/transactions', { params: { familyId, year, month } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createTransaction(tx: Omit<Transaction, 'id' | 'created_by'>, userId: string): Promise<Transaction> {
  try {
    const { data } = await apiClient.post('/monthly/transactions', { ...tx, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteTransaction(id: string): Promise<void> {
  try {
    await apiClient.delete(`/monthly/transactions/${id}`);
  } catch (e) { handleApiError(e); }
}
