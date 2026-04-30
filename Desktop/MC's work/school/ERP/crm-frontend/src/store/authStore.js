import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../api/auth';
import toast from 'react-hot-toast';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);
          set({ user: response.data.user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          const errMsg = error.response?.data?.error || 'Login failed';
          set({ error: errMsg, isLoading: false });
          return { success: false, error: errMsg };
        }
      },

      logout: async () => {
        try {
          await authAPI.logout();
          toast.success('Logged out successfully');
        } catch (e) {
          console.log('Logout API fail ok');
        } finally {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          set({ user: null, isAuthenticated: false });
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return false;
        
        set({ isLoading: true });
        try {
          const response = await authAPI.getCurrentUser();
          set({ user: response.data, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('accessToken');
          set({ user: null, isAuthenticated: false, isLoading: false });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;

