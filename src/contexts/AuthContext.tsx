import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import apiClient, { API_URL } from '../lib/apiClient';

export interface User {
  id: string;
  email: string;
  name: string;
  mobile?: string;
  avatar?: string;
  created_at?: string;
}

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
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  family: Family | null;
  familyMembership: FamilyMember | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  refreshFamily: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [family, setFamily] = useState<Family | null>(null);
  const [familyMembership, setFamilyMembership] = useState<FamilyMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await apiClient.get('/auth/me');
      if (data?.user) setUser(data.user);
      if (data?.family) setFamily(data.family);
      if (data?.membership) setFamilyMembership(data.membership);
    } catch {
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const signInWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const signOut = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setFamily(null);
    setFamilyMembership(null);
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    try {
      const { data } = await apiClient.get('/auth/me');
      if (data?.user) setUser(data.user);
    } catch {}
  };

  const refreshFamily = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    try {
      const { data } = await apiClient.get('/auth/me');
      if (data?.family) setFamily(data.family);
      if (data?.membership) setFamilyMembership(data.membership);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{
      user,
      family,
      familyMembership,
      isLoading,
      isAuthenticated: !!user,
      signInWithGoogle,
      signOut,
      logout: signOut,
      refreshUser,
      refreshFamily,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
