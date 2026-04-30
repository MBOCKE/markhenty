import { customerClient } from './client';
import { initMockData, loadMockData, saveMockData, generateCustomers } from '../utils/mockData';
import toast from 'react-hot-toast';

// initMockData(); // App.jsx

export const customerAPI = {
  // TODO: Replace with Customer Service API calls @3002
  // Replace loadMockData/saveMockData with actual API calls
  getAllCustomers: async (params = {}) => {
    // TODO: Replace mock implementation with: return customerClient.get('/customers', { params });
    await new Promise(r => setTimeout(r, 500));
    let customers = loadMockData('customers') || generateCustomers(100);
    
    // Filter/search/paginate
    if (params.search) {
      customers = customers.filter(c => 
        c.name.toLowerCase().includes(params.search.toLowerCase()) ||
        c.email.toLowerCase().includes(params.search.toLowerCase())
      );
    }
    if (params.tier) {
      customers = customers.filter(c => c.tier === params.tier);
    }
    const pageSize = params.pageSize || 20;
    const page = params.page || 1;
    const start = (page - 1) * pageSize;
    const paginated = customers.slice(start, start + pageSize);
    
    return { data: paginated, total: customers.length };
  },

  getCustomerById: async (id) => {
    // TODO: Replace mock implementation with: return customerClient.get(`/customers/${id}`);
    await new Promise(r => setTimeout(r, 300));
    const customers = loadMockData('customers') || [];
    const customer = customers.find(c => c.id === id);
    if (!customer) throw { response: { data: { error: 'Customer not found' } } };
    return { data: customer };
  },

  createCustomer: async (data) => {
    // TODO: Replace mock implementation with: return customerClient.post('/customers', data);
    await new Promise(r => setTimeout(r, 600));
    let customers = loadMockData('customers') || [];
    const newCustomer = {
      id: `cust_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      tier: 'NORMAL',
      totalSpent: 0,
      points: 0,
    };
    customers.unshift(newCustomer);
    saveMockData('customers', customers);
    toast.success('Customer created');
    return { data: newCustomer };
  },

  updateCustomer: async (id, data) => {
    // TODO: Replace mock implementation with: return customerClient.put(`/customers/${id}`, data);
    await new Promise(r => setTimeout(r, 400));
    let customers = loadMockData('customers') || [];
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) throw { response: { data: { error: 'Customer not found' } } };
    customers[index] = { ...customers[index], ...data };
    saveMockData('customers', customers);
    toast.success('Customer updated');
    return { data: customers[index] };
  },

  deleteCustomer: async (id) => {
    // TODO: Replace mock implementation with: return customerClient.delete(`/customers/${id}`);
    await new Promise(r => setTimeout(r, 300));
    let customers = loadMockData('customers') || [];
    const filtered = customers.filter(c => c.id !== id);
    saveMockData('customers', filtered);
    toast.success('Customer deleted');
    return { data: { success: true } };
  },

  searchCustomers: async (query) => customerAPI.getAllCustomers({ search: query }),

  // Export
  exportCSV: async () => {
    // TODO: Move CSV export logic to Customer Service @3002
    const all = (await customerAPI.getAllCustomers()).data;
    // TODO: Use papaparse for CSV download
    const csv = 'ID,Name,Email,Tier,Total Spent\n' + all.map(c => `${c.id},"${c.name}",${c.email},${c.tier},${c.totalSpent}`).join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    toast.success('Exported');
  },
};

