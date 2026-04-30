import { classificationClient } from './client';
import { loadMockData, saveMockData, defaultRules } from '../utils/mockData';
import toast from 'react-hot-toast';

export const classificationAPI = {
  getCustomerTier: async (customerId) => {
    // Try real classification service first, fallback mock
    try {
      return await classificationClient.get(`/api/v1/classify/${customerId}`);
    } catch {
      // Mock tier based on spending
      const customers = loadMockData('customers') || [];
      const customer = customers.find(c => c.id === customerId);
      const score = parseFloat(customer.totalSpent || 0) / 1000;
      const tier = score > 40 ? 'BRONZE' : score > 20 ? 'PREMIUM' : score > 10 ? 'STANDARD' : 'NORMAL';
      return { data: { current_tier: tier, score } };
    }
  },

  getClassificationHistory: async (customerId) => {
    await new Promise(r => setTimeout(r, 300));
    // Mock history
    const history = [
      { tier: 'NORMAL', changedAt: new Date(Date.now() - 86400000).toISOString(), reason: 'New customer' },
      { tier: 'STANDARD', changedAt: new Date(Date.now() - 30*86400000).toISOString(), reason: 'Purchase activity' },
    ];
    return { data: history };
  },

  getTierDistribution: async () => {
    // Try real, fallback mock
    try {
      return await classificationClient.get('/api/v1/classify/stats/tiers');
    } catch {
      return {
        data: [
          { current_tier: 'NORMAL', count: 50 },
          { current_tier: 'STANDARD', count: 37 },
          { current_tier: 'PREMIUM', count: 25 },
          { current_tier: 'BRONZE', count: 12 },
        ]
      };
    }
  },

  // Admin
  getCurrentRules: async () => ({ data: defaultRules }),
  switchScenario: async (scenario) => {
    toast.success(`Scenario switched to ${scenario}`);
    return { data: { success: true } };
  },
};

export default classificationAPI;

