import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface BankAccount {
  id: string;
  family_id: string;
  bank_name: string;
  account_number: string;
  account_number_masked?: string;
  account_type?: string;
  balance?: number;
  branch?: string;
  ifsc_code?: string;
  linked_debit_card?: string;
  min_balance?: number;
  color?: string;
  is_primary?: boolean;
  is_active?: boolean;
  created_by: string;
  created_at?: string;
}

export interface CreditCard {
  id: string;
  family_id: string;
  bank_name: string;
  card_name: string;
  card_number_masked: string;
  credit_limit: number;
  outstanding?: number;
  available_limit?: number;
  billing_date?: number;
  due_date?: number;
  color?: string;
  is_active?: boolean;
  created_by: string;
  created_at?: string;
}

export interface CreditCardBill {
  id: string;
  family_id: string;
  credit_card_id: string;
  year: number;
  month: number;
  bill_amount: number;
  paid_amount?: number;
  status?: string;
  billing_date?: string;
  due_date?: string;
  paid_date?: string;
  transaction_id?: string;
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
  payment_mode?: string;
  notes?: string;
  created_by: string;
}

// ==================== Bank Accounts ====================

export async function getBankAccounts(familyId: string): Promise<BankAccount[]> {
  try {
    const { data } = await apiClient.get('/accounts/bank', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function getBankAccount(id: string): Promise<BankAccount | null> {
  try {
    const { data } = await apiClient.get(`/accounts/bank/${id}`);
    return data;
  } catch { return null; }
}

export async function createBankAccount(account: Omit<BankAccount, 'id' | 'created_by' | 'account_number_masked'>, userId: string): Promise<BankAccount> {
  try {
    const { data } = await apiClient.post('/accounts/bank', { ...account, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateBankAccount(id: string, updates: Partial<BankAccount>): Promise<BankAccount> {
  try {
    const { data } = await apiClient.patch(`/accounts/bank/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateBankBalance(id: string, newBalance: number): Promise<BankAccount> {
  return updateBankAccount(id, { balance: newBalance });
}

export async function deleteBankAccount(id: string): Promise<void> {
  try {
    await apiClient.delete(`/accounts/bank/${id}`);
  } catch (e) { handleApiError(e); }
}

export async function setPrimaryAccount(id: string, familyId: string): Promise<void> {
  try {
    await apiClient.patch(`/accounts/bank/${id}/set-primary`, { familyId });
  } catch (e) { handleApiError(e); }
}

// ==================== Credit Cards ====================

export async function getCreditCards(familyId: string): Promise<CreditCard[]> {
  try {
    const { data } = await apiClient.get('/accounts/credit-cards', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function getCreditCard(id: string): Promise<CreditCard | null> {
  try {
    const { data } = await apiClient.get(`/accounts/credit-cards/${id}`);
    return data;
  } catch { return null; }
}

export async function createCreditCard(card: Omit<CreditCard, 'id' | 'created_by' | 'available_limit'>, userId: string): Promise<CreditCard> {
  try {
    const { data } = await apiClient.post('/accounts/credit-cards', { ...card, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateCreditCard(id: string, updates: Partial<CreditCard>): Promise<CreditCard> {
  try {
    const { data } = await apiClient.patch(`/accounts/credit-cards/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteCreditCard(id: string): Promise<void> {
  try {
    await apiClient.delete(`/accounts/credit-cards/${id}`);
  } catch (e) { handleApiError(e); }
}

// ==================== Summary ====================

export async function getAccountsSummary(familyId: string) {
  try {
    const { data } = await apiClient.get('/accounts/summary', { params: { familyId } });
    return data;
  } catch (e) { handleApiError(e); }
}

// ==================== Credit Card Bills ====================

export async function getCreditCardBills(creditCardId: string, year?: number, month?: number): Promise<CreditCardBill[]> {
  try {
    const { data } = await apiClient.get('/accounts/credit-card-bills', { params: { creditCardId, year, month } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createCreditCardBill(bill: any, userId: string, familyId: string): Promise<CreditCardBill> {
  try {
    const { data } = await apiClient.post('/accounts/credit-card-bills', { ...bill, family_id: familyId, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateCreditCardBill(id: string, updates: Partial<CreditCardBill>): Promise<CreditCardBill> {
  try {
    const { data } = await apiClient.patch(`/accounts/credit-card-bills/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function payCreditCardBill(billId: string, paidAmount: number, fromAccountId: string | null, userId: string, familyId: string, notes?: string) {
  try {
    const { data } = await apiClient.post(`/accounts/credit-card-bills/${billId}/pay`, { amount: paidAmount, fromAccountId, familyId, notes });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteCreditCardBill(id: string): Promise<void> {
  try {
    await apiClient.delete(`/accounts/credit-card-bills/${id}`);
  } catch (e) { handleApiError(e); }
}
