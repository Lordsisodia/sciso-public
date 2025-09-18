/**
 * Authentication Business Logic for SISO-PUBLIC
 */

import { User, AuthTokens, LoginCredentials, RegisterData } from '@siso-public/shared-types';
import { ApiClient } from '../api/base';

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export class AuthService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.apiClient.post<{ user: User; tokens: AuthTokens }>('/auth/login', credentials);
    
    // Store tokens in localStorage
    if (response.data.tokens) {
      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
    }

    return response.data;
  }

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.apiClient.post<{ user: User; tokens: AuthTokens }>('/auth/register', data);
    
    // Store tokens in localStorage
    if (response.data.tokens) {
      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
    }

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.apiClient.post('/auth/logout');
    } finally {
      // Clear tokens regardless of API call success
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.apiClient.post<AuthTokens>('/auth/refresh', {
      refreshToken
    });

    // Update stored tokens
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.apiClient.get<User>('/auth/me');
    return response.data;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await this.apiClient.patch<User>('/auth/profile', updates);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }

  async resetPassword(email: string): Promise<void> {
    await this.apiClient.post('/auth/reset-password', { email });
  }

  async confirmPasswordReset(token: string, newPassword: string): Promise<void> {
    await this.apiClient.post('/auth/confirm-reset', {
      token,
      newPassword
    });
  }

  getStoredTokens(): AuthTokens | null {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      return null;
    }

    return { accessToken, refreshToken };
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }
}