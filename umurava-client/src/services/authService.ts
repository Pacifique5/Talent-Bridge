interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface LoginData {
  email: string;
  password: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authService = {
  async signup(data: SignupData): Promise<AuthResponse> {
    console.log("🚀 Frontend: Making signup request to:", `${API_BASE_URL}/api/auth/signup`);
    console.log("📤 Frontend: Signup data:", { ...data, password: '[HIDDEN]' });
    
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log("📥 Frontend: Signup response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Frontend: Signup error:", error);
      throw new Error(error.message || 'Signup failed');
    }

    const result = await response.json();
    console.log("✅ Frontend: Signup successful:", result.message);
    
    // Store token in localStorage
    if (result.token) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log("💾 Frontend: Token and user stored in localStorage");
    }

    return result;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    console.log("🚀 Frontend: Making login request to:", `${API_BASE_URL}/api/auth/login`);
    console.log("📤 Frontend: Login data:", { email: data.email, password: '[HIDDEN]' });
    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log("📥 Frontend: Login response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Frontend: Login error:", error);
      throw new Error(error.message || 'Login failed');
    }

    const result = await response.json();
    console.log("✅ Frontend: Login successful:", result.message);
    
    // Store token in localStorage
    if (result.token) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log("💾 Frontend: Token and user stored in localStorage");
    }

    return result;
  },

  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });

    // Clear local storage regardless of response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Helper method to get auth headers
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  },
};

export type { User, AuthResponse, SignupData, LoginData };