import { authClient } from './client';
import { initMockData, loadMockData, saveMockData, generateUsers } from '../utils/mockData';
import toast from 'react-hot-toast';

// Init auth mocks - called from App.jsx

// Mock auth API - // TODO: Replace with real Auth Service @3000 when live
export const authAPI = {
  login: async (credentials) => {
    // TODO: Replace mock implementation with: return authClient.post('/auth/login', credentials);
    // Simulate delay
    await new Promise(r => setTimeout(r, 800));
    
    const users = loadMockData('users') || generateUsers();
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (!user) {
      throw { response: { data: { error: 'Invalid credentials' } } };
    }
    
    // Mock tokens (static for demo)
    const accessToken = `mock_jwt_${user.id}_${Date.now()}`;
    const refreshToken = `mock_refresh_${user.id}`;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    toast.success('Login successful!');
    return {
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles,
        }
      }
    };
  },

  logout: async () => {
    // TODO: Replace mock implementation with: return authClient.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    toast.success('Logged out');
    return { data: {} };
  },

  getCurrentUser: async () => {
    // TODO: Replace mock implementation with: return authClient.get('/auth/me');
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No token');
    
    await new Promise(r => setTimeout(r, 300));
    // Mock from token
    const userId = token.split('_')[2];
    const users = loadMockData('users') || generateUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) throw new Error('User not found');
    
    return { data: user };
  },

  refreshToken: async ({ refreshToken }) => {
    // TODO: Replace mock implementation with: return authClient.post('/auth/refresh', { refreshToken });
    await new Promise(r => setTimeout(r, 400));
    // Simulate refresh
    return {
      data: {
        accessToken: `refreshed_${refreshToken}_${Date.now()}`,
      }
    };
  },

  // Additional for profile/reset
  updateProfile: async (data) => authClient.put('/api/auth/profile', data),
  forgotPassword: async (email) => authClient.post('/api/auth/forgot-password', { email }),
  resetPassword: async (token, password) => authClient.post('/api/auth/reset-password', { token, password }),
};

// Use client for real calls, mock first
export default authAPI;

