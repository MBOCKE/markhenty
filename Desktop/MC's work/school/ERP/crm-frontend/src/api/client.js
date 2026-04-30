import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const apiClient = (baseURL) => {
  const effectiveBaseURL = baseURL || '/api/mock'; // Fallback for unset env
  const client = axios.create({
    baseURL: effectiveBaseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - add JWT token
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle token refresh (mock friendly)
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            // Mock refresh via authAPI
            const { authAPI } = await import('./auth');
            const response = await authAPI.refreshToken({ refreshToken });
            localStorage.setItem('accessToken', response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return client(originalRequest);
          }
        } catch (err) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

// Create service-specific clients
export const authClient = apiClient(import.meta.env.VITE_AUTH_SERVICE_URL);
export const customerClient = apiClient(import.meta.env.VITE_CUSTOMER_SERVICE_URL);
export const transactionClient = apiClient(import.meta.env.VITE_TRANSACTION_SERVICE_URL);
export const classificationClient = apiClient(import.meta.env.VITE_CLASSIFICATION_SERVICE_URL);
export const bonusClient = apiClient(import.meta.env.VITE_BONUS_SERVICE_URL);
export const auditClient = apiClient(import.meta.env.VITE_AUDIT_SERVICE_URL);