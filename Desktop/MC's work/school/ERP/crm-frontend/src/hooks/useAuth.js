import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../api/auth';

export const useAuth = () => {
  const { user, token, setUser, setToken, logout: storeLogout } = useAuthStore();

  const login = useCallback(
    async (email, password) => {
      try {
        const response = await authAPI.login(email, password);
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('authToken', response.data.token);
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
    },
    [setUser, setToken]
  );

  const logout = useCallback(() => {
    storeLogout();
    localStorage.removeItem('authToken');
    authAPI.logout();
  }, [storeLogout]);

  return {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };
};

export default useAuth;
