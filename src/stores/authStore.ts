// stores/authStore.ts
import { defineStore } from 'pinia';
import { api } from '@/utils/api';

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refrToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refrToken: localStorage.getItem('refreshToken') || null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.accessToken,
    
    hasRole: (state) => (role: string): boolean => {
      return state.user?.roles?.includes(role) || false;
    },
    
    isAdmin: (state): boolean => {
      return state.user?.roles?.includes('ROLE_ADMIN') || false;
    },
    
    authHeader: (state): Record<string, string> => {
      return state.accessToken 
        ? { Authorization: `Bearer ${state.accessToken}` }
        : {};
    },
  },

  actions: {
    async login(username: string, password: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.post<{ accessToken: string; refreshToken: string }>(
          '/api/auth/login',
          { username, password }
        );
        
        this.accessToken = response.data.accessToken;
        this.refrToken = response.data.refreshToken;
        
        // Store in localStorage for persistence
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refrToken);
        
        // Fetch user profile
        await this.fetchUserProfile();
        
        return true;
      } catch (error: any) {
        this.error = error.message || 'Login failed';
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUserProfile() {
      try {
        const response = await api.get<User>('/api/users/profile');
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
      }
    },

    async refreshToken(): Promise<boolean> {
      if (!this.refreshToken) {
        return false;
      }

      try {
        const response = await api.post<{ accessToken: string; refreshToken?: string }>(
          '/api/auth/refresh',
          { refreshToken: this.refreshToken }
        );
        
        this.accessToken = response.data.accessToken;
        
        if (response.data.refreshToken) {
          this.refrToken = response.data.refreshToken;
          localStorage.setItem('refreshToken', this.refrToken);
        }
        
        localStorage.setItem('accessToken', this.accessToken);
        
        return true;
      } catch (error) {
        this.logout();
        return false;
      }
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.refrToken = null;
      this.error = null;
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Optional: Call logout endpoint
      // api.post('/api/auth/logout').catch(console.error);
    },

    clearError() {
      this.error = null;
    },
  },
});