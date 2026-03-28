import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface IncomeSource {
  id: string;
  family_id: string;
  name: string;
  description?: string;
  member_id: string;
  amount: number;
  frequency?: string;
  is_active?: boolean;
  created_by: string;
  created_at?: string;
}

export interface ExpenseCategory {
  id: string;
  family_id: string;
  name: string;
  icon?: string;
  color?: string;
  is_fixed?: boolean;
  is_auto_linked?: boolean;
  linked_type?: string;
  linked_id?: string;
  is_active?: boolean;
  created_by: string;
  created_at?: string;
}

export async function getIncomeSources(familyId: string): Promise<IncomeSource[]> {
  try {
    const { data } = await apiClient.get('/budget/income-sources', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createIncomeSource(source: Omit<IncomeSource, 'id' | 'created_by'>, userId: string): Promise<IncomeSource> {
  try {
    const { data } = await apiClient.post('/budget/income-sources', { ...source, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateIncomeSource(id: string, updates: Partial<IncomeSource>): Promise<IncomeSource> {
  try {
    const { data } = await apiClient.patch(`/budget/income-sources/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteIncomeSource(id: string): Promise<void> {
  try {
    await apiClient.delete(`/budget/income-sources/${id}`);
  } catch (e) { handleApiError(e); }
}

export async function getExpenseCategories(familyId: string): Promise<ExpenseCategory[]> {
  try {
    const { data } = await apiClient.get('/budget/expense-categories', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createExpenseCategory(category: Omit<ExpenseCategory, 'id' | 'created_by'>, userId: string): Promise<ExpenseCategory> {
  try {
    const { data } = await apiClient.post('/budget/expense-categories', { ...category, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateExpenseCategory(id: string, updates: Partial<ExpenseCategory>): Promise<ExpenseCategory> {
  try {
    const { data } = await apiClient.patch(`/budget/expense-categories/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteExpenseCategory(id: string): Promise<void> {
  try {
    await apiClient.delete(`/budget/expense-categories/${id}`);
  } catch (e) { handleApiError(e); }
}
