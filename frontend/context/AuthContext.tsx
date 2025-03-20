import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Student {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  student: Student | null;
  token: string | null;
  login: (token: string, studentData: Student) => void;
  register: (studentData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<any>;
  logout: () => void;
  refreshTokenHandler: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      // Decode token to get student info
      try {
        const decoded = JSON.parse(atob(storedToken.split('.')[1]));
        setStudent(decoded);
      } catch (error) {
        console.error('Failed to decode token');
        logout();
      }
    }
  }, []);

  // Add token refresh middleware
  useEffect(() => {
    const handleTokenRefresh = async () => {
      if (!token) return;

      try {
        const response = await fetch('/api/auth/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
      }
    };

    // Check token validity every 5 minutes
    const interval = setInterval(handleTokenRefresh, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

  const login = (newToken: string, studentData: Student) => {
    localStorage.setItem('token', newToken);
    setIsAuthenticated(true);
    setStudent(studentData);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setStudent(null);
    setToken(null);
    // Redirect to home page after logout
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      student,
      token,
      login,
      register: async (studentData) => {
        // Implement registration logic here
        throw new Error('Not implemented');
      },
      logout,
      refreshTokenHandler: async () => {
        // Implement token refresh logic here
        throw new Error('Not implemented');
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
