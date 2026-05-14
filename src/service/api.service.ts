// src/services/api.service.ts
class ApiService {
    private baseURL: string;
    
    constructor() {
        this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    }
    
    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        
        // IMPORTANT: Include credentials (cookies)
        const config: RequestInit = {
            ...options,
            credentials: 'include',  // This sends cookies with requests
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };
        
        const response = await fetch(url, config);
        
        if (!response.ok) {
            if (response.status === 401) {
                // Try to refresh token
                const refreshed = await this.refreshToken();
                if (refreshed) {
                    // Retry original request
                    return this.request(endpoint, options);
                } else {
                    window.location.href = '/login';
                }
            }
            throw new Error(`HTTP ${response.status}`);
        }
        
        // Check if response has content
       const text = await response.text();
        return text ? JSON.parse(text) : null as T;
    }
    
    private async refreshToken(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseURL}/api/auth/refresh`, {
                method: 'POST',
                credentials: 'include',  // Send refresh token cookie
            });
            return response.ok;
        } catch {
            return false;
        }
    }
    
    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }
    
    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }
}

export default new ApiService();