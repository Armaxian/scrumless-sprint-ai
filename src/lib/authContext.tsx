import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authService, User } from './api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (provider: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        // Check if we have a token
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Validate token and get user info
        const response = await authService.getCurrentUser();
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {
        // Error will be handled by the axios interceptor which will
        // try to refresh the token or redirect to login
        console.error('Auth check error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (provider: string, code: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(provider, code);
      const { token, user: userData } = response.data;
      
      // Store token in localStorage (refresh token is in httpOnly cookie)
      localStorage.setItem('auth_token', token);
      
      setUser(userData);
      toast.success('Successfully logged in');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      toast.success('Successfully logged out');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Error logging out');
    } finally {
      // Clear user data regardless of API success
      localStorage.removeItem('auth_token');
      setUser(null);
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 