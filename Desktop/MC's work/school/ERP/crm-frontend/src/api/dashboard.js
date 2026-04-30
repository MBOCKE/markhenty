import { loadMockData, generateAudits } from '../utils/mockData';
import { customerAPI } from './customers';

export const dashboardAPI = {
  // Mock dashboard data - TODO: Real dashboard service
  getSummary: async () => {
    await new Promise(r => setTimeout(r, 600));
    const customersRes = await customerAPI.getAllCustomers();
    const customers = customersRes.data;
    
    const summary = {
      totalCustomers: customers.length,
      activeCustomers: Math.floor(customers.length * 0.8),
      totalRevenue: customers.reduce((sum, c) => sum + parseFloat(c.totalSpent || 0), 0).toFixed(0),
      newCustomers: Math.floor(customers.length * 0.1),
      bonusPool: customers.reduce((sum, c) => sum + (c.points || 0), 0),
    };
    
    return { data: summary };
  },

  getRecentActivity: async () => {
    await new Promise(r => setTimeout(r, 400));
    const audits = loadMockData('audits') || generateAudits(50);
    const recent = audits.slice(0, 10).map(a => ({
      id: a.id,
      action: a.action,
      target: a.targetId,
      timestamp: a.timestamp,
      user: `User ${a.userId}`,
    }));
    
    return { data: recent };
  },
};

