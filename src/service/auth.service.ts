// src/services/auth.service.ts
import apiService from '@/service/api.service';

export interface User {
    id: string;
    username: string;
    role: string;
    authorities: string[];
}

class AuthService {
    private currentUser: User | null = null;
    
    async register(user: { name: string; username: string; email: string; password: string; }): Promise<void> {
        await apiService.post('/api/auth/register', user);
    }
    
    async login(credentials: { username: string; password: string }): Promise<void> {
        await apiService.post('/api/auth/login', credentials);
        // After login, fetch user data
        await this.fetchCurrentUser();
    }
    
    async logout(): Promise<void> {
        await apiService.post('/api/auth/logout');
        this.currentUser = null;
    }
    
    async fetchCurrentUser(): Promise<User | null> {
        try {
            const user = await apiService.get<User>('/api/auth/me');
            this.currentUser = user;
            return user;
        } catch (error) {
            this.currentUser = null;
            return null;
        }
    }
    
    getCurrentUser(): User | null {
        return this.currentUser;
    }
    
    isAuthenticated(): boolean {
        return this.currentUser !== null;
    }
    
    hasRole(role: string): boolean {
        return this.currentUser?.role === role || 
               this.currentUser?.authorities?.includes(`ROLE_${role}`) || false;
    }
    
    async checkAuth(): Promise<boolean> {
        const user = await this.fetchCurrentUser();
        return user !== null;
    }
}

export default new AuthService();