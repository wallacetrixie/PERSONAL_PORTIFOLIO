import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { API_ENDPOINTS, apiClient, getAuthToken, setAuthToken, removeAuthToken } from '../utils/api';

interface Admin {
  id: number;
  email: string;
  username: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  verifyAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify authentication on mount
  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      const data = await apiClient.get(API_ENDPOINTS.VERIFY, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setAdmin(data.data.admin);
    } catch (error) {
      console.error('Auth verification failed:', error);
      removeAuthToken();
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const data = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password, rememberMe });

      // Store token
      setAuthToken(data.data.token);
      
      // Set admin
      setAdmin(data.data.admin);

      return Promise.resolve();
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = getAuthToken();

      if (token) {
        await apiClient.post(API_ENDPOINTS.LOGOUT, undefined, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call success
      removeAuthToken();
      setAdmin(null);
    }
  };

  const value = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
    verifyAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
