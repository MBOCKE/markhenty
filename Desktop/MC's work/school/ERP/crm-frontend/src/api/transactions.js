import { transactionClient } from './client';
import { loadMockData, saveMockData, generateTransactions } from '../utils/mockData';
import { customerAPI } from './customers';
import toast from 'react-hot-toast';

// initMockData();

const transactionsAPI = {
  getAll: async (params = {}) => {
    await new Promise(r => setTimeout(r, 500));
    let transactions = loadMockData('transactions') || generateTransactions(500);
    
    if (params.customerId) {
      transactions = transactions.filter(t => t.customerId === params.customerId);
    }
    if (params.dateFrom) {
      const fromDate = new Date(params.dateFrom);
      transactions = transactions.filter(t => new Date(t.date) >= fromDate);
    }
    
    const pageSize = params.pageSize || 20;
    const page = params.page || 1;
    const start = (page - 1) * pageSize;
    const paginated = transactions.slice(start, start + pageSize);
    
    return { data: paginated, total: transactions.length };
  },

  getByCustomer: async (customerId) => transactionsAPI.getAll({ customerId }),

  create: async (transactionData) => {
    await new Promise(r => setTimeout(r, 700));
    let transactions = loadMockData('transactions') || [];
    const newTxn = {
      id: `txn_${Date.now()}`,
      ...transactionData,
      status: 'completed',
      date: new Date().toISOString(),
    };
    transactions.unshift(newTxn);
    saveMockData('transactions', transactions);
    
    // Update customer totalSpent
    const custRes = await customerAPI.getCustomerById(transactionData.customerId);
    const updatedCust = {
      ...custRes.data,
      totalSpent: (parseFloat(custRes.data.totalSpent || 0) + parseFloat(transactionData.amount)).toFixed(2),
    };
    await customerAPI.updateCustomer(transactionData.customerId, { totalSpent: updatedCust.totalSpent });
    
    toast.success('Transaction recorded');
    return { data: newTxn };
  },

  getStats: async () => {
    await new Promise(r => setTimeout(r, 400));
    const transactions = loadMockData('transactions') || [];
    const monthly = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toISOString().slice(0,7);
      monthly[month] = (monthly[month] || 0) + parseFloat(t.amount);
    });
    return { data: { monthly, totalRevenue: transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0) } };
  },
};

export default transactionsAPI;

