import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface Family {
  id: string;
  name: string;
  owner_id: string;
  created_at?: string;
}

export interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  role: 'admin' | 'member';
  relationship: string;
  invited_by?: string;
  created_by: string;
  user?: { id: string; name: string; email: string; avatar?: string };
  created_at?: string;
}

export interface FamilyInvitation {
  id: string;
  family_id: string;
  email: string;
  role: string;
  relationship: string;
  status: string;
}

export async function getCurrentFamily(): Promise<Family | null> {
  try {
    const { data } = await apiClient.get('/families/current');
    return data;
  } catch { return null; }
}

export async function getFamilyMembers(familyId: string): Promise<FamilyMember[]> {
  try {
    const { data } = await apiClient.get(`/families/${familyId}/members`);
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function addFamilyMember(familyId: string, name: string, email: string, role: string, relationship: string): Promise<FamilyMember> {
  try {
    const { data } = await apiClient.post(`/families/${familyId}/members`, { name, email, role, relationship });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateFamilyMember(familyId: string, memberId: string, updates: Partial<FamilyMember>): Promise<FamilyMember> {
  try {
    const { data } = await apiClient.patch(`/families/${familyId}/members/${memberId}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function removeFamilyMember(familyId: string, memberId: string): Promise<void> {
  try {
    await apiClient.delete(`/families/${familyId}/members/${memberId}`);
  } catch (e) { handleApiError(e); }
}

export async function updateFamily(familyId: string, updates: Partial<Family>): Promise<Family> {
  try {
    const { data } = await apiClient.patch(`/families/${familyId}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}
