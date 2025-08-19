'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User, LoginCredentials, AuthTokens } from '@/src/types/admin.types';
import { apiClient } from '@/src/lib/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const router = useRouter();

  const setTokens = useCallback((tokens: AuthTokens) => {
    localStorage.setItem('admin_access_token', tokens.access);
    localStorage.setItem('admin_refresh_token', tokens.refresh);
  }, []);

  const clearTokens = useCallback(() => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.login(credentials);
      
      if (response.success && response.data) {
        setTokens(response.data.tokens);
        setAuthState({
          user: response.data.user,
          isLoading: false,
          isAuthenticated: true,
        });
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  }, [setTokens]);

  const logout = useCallback(() => {
    clearTokens();
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    router.push('/admin/login');
  }, [clearTokens, router]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('admin_access_token');
    
    if (!token) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      return;
    }

    try {
      const response = await apiClient.getProfile();
      
      if (response.success && response.data) {
        setAuthState({
          user: response.data,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        clearTokens();
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      clearTokens();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, [clearTokens]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
}