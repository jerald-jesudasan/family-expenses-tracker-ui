import apiClient from '../lib/apiClient';
import { handleApiError } from '../lib/api';

export interface Document {
  id: string;
  family_id: string;
  name: string;
  category?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  linked_type?: string;
  linked_id?: string;
  member_id?: string;
  expiry_date?: string;
  notes?: string;
  created_by: string;
  created_at?: string;
}

export async function getDocuments(familyId: string): Promise<Document[]> {
  try {
    const { data } = await apiClient.get('/documents', { params: { familyId } });
    return data ?? [];
  } catch (e) { handleApiError(e); }
}

export async function createDocument(doc: Omit<Document, 'id' | 'created_by'>, userId: string): Promise<Document> {
  try {
    const { data } = await apiClient.post('/documents', { ...doc, created_by: userId });
    return data;
  } catch (e) { handleApiError(e); }
}

export async function updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
  try {
    const { data } = await apiClient.patch(`/documents/${id}`, updates);
    return data;
  } catch (e) { handleApiError(e); }
}

export async function deleteDocument(id: string): Promise<void> {
  try {
    await apiClient.delete(`/documents/${id}`);
  } catch (e) { handleApiError(e); }
}
