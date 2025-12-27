import {
  createContext,
  useContext,
  useState,
  useEffect,
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // check login status from localstorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // login with json-server
  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/users');

      if (!response.ok) {
        throw new Error('خطا در ارتباط با سرور');
      }

      const users = await response.json();
      const foundUser = users.find(
        user => user.email === email && user.password === password
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

  // logout
  const logout = useCallback(() => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  }, []);

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
