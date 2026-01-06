import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  const login = useCallback(async (email, password) => {
    try {
      // const response = await fetch('http://localhost:3001/users');
      // const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      // const MOCKAPI_URL = 'https://695bc4e41d8041d5eeb855d8.mockapi.io';
      const baseURL = import.meta.env.VITE_API_URL;
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
    window.location.pathname = '/login';
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
