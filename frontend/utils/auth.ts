import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const signIn = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    const { token, refreshToken, student } = response.data;
    return { token, refreshToken, student };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signUp = async (studentData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    // Transform frontend field names to match backend expectations
    const transformedData = {
      first_name: studentData.firstName,
      last_name: studentData.lastName,
      email: studentData.email,
      password: studentData.password
    };

    const response = await axios.post(`${API_URL}/api/auth/register`, transformedData);
    const { token, refreshToken, student } = response.data;
    return { token, refreshToken, student };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const signOut = async () => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const useAuth = () => {
  const [student, setStudent] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedToken && storedRefreshToken) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
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

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const result = await signIn(credentials);
      setToken(result.token);
      setRefreshToken(result.refreshToken);
      setStudent(result.student);
      localStorage.setItem('token', result.token);
      localStorage.setItem('refreshToken', result.refreshToken);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const register = async (studentData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const result = await signUp(studentData);
      setToken(result.token);
      setRefreshToken(result.refreshToken);
      setStudent(result.student);
      localStorage.setItem('token', result.token);
      localStorage.setItem('refreshToken', result.refreshToken);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setStudent(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Clear any other session data if needed
  };

  const refreshTokenHandler = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/refresh-token`, {
        refreshToken: refreshToken
      });
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
    } catch (error) {
      logout();
    }
  };

  return {
    student,
    token,
    login,
    register,
    logout,
    refreshTokenHandler
  };
};

// Add a request interceptor to include the auth token in requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle token refresh if needed
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshTokenHandler } = useAuth();
        await refreshTokenHandler();
        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default useAuth;
