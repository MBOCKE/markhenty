import { create } from 'zustand';
import { customerAPI } from '../api/customers';
import { classificationAPI } from '../api/classification';
import { notificationAPI } from '../api/notifications';
import toast from 'react-hot-toast';

export const useCustomerStore = create((set, get) => ({
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
  filters: { search: '', tier: '', page: 1, pageSize: 20 },
  totalCount: 0,

  fetchCustomers: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customerAPI.getAllCustomers({ ...get().filters, ...params });
      set({ customers: response.data, totalCount: response.total || 0, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.error || 'Failed to fetch customers' });
      toast.error('Failed to load customers');
    }
  },

  fetchCustomerWithDetails: async (id) => {
    set({ isLoading: true });
    try {
      const [customerRes, tierRes, historyRes, notificationsRes] = await Promise.all([
        customerAPI.getCustomerById(id),
        classificationAPI.getCustomerTier(id),
        classificationAPI.getClassificationHistory(id),
        notificationAPI.getNotifications(id),
      ]);
      
      set({
        selectedCustomer: {
          ...customerRes.data,
          tier: tierRes.data?.current_tier || tierRes.data || 'NORMAL',
          history: historyRes.data || [],
          notifications: notificationsRes.data || [],
        },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to load customer details' });
      toast.error('Customer details load failed');
    }
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters, page: 1 } });
  },

  createCustomer: async (data) => {
    try {
      const response = await customerAPI.createCustomer(data);
      toast.success('Customer created');
      await get().fetchCustomers();
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Create failed');
      throw error;
    }
  },

  updateCustomer: async (id, data) => {
    try {
      const response = await customerAPI.updateCustomer(id, data);
      toast.success('Customer updated');
      await get().fetchCustomers();
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Update failed');
      throw error;
    }
  },

  deleteCustomer: async (id) => {
    try {
      await customerAPI.deleteCustomer(id);
      toast.success('Customer deleted');
      await get().fetchCustomers();
    } catch (error) {
      toast.error('Delete failed');
    }
  },

  clearError: () => set({ error: null }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
}));

export default useCustomerStore;

