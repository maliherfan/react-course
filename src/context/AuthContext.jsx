import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';

import './AuthContext.css';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const savedAuth = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(savedAuth);
      setAuthLoading(false);
    }, 1000);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      // const response = await fetch('http://localhost:3001/users');
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseURL}/users`);

      if (!response.ok) {
        throw new Error('خطا در ارتباط با سرور');
      }

      const users = await response.json();
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return {
          success: false,
          error: 'ایمیل یا رمز ورود اشتباه است!',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'خطا در ارتباط با سرور',
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      authLoading,
      login,
      logout,
    }),
    [isAuthenticated, authLoading, login, logout]
  );

  if (authLoading) {
    return (
      <div className="auth-loading-container">
        <div className="auth-loading-spinner"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
