import { loadMockData, saveMockData, generateAudits } from '../utils/mockData';

export const auditAPI = {
  getLogs: async (filters = {}) => {
    // TODO: Replace mock implementation with: return auditClient.get('/audit/logs', { params: filters });
    await new Promise(r => setTimeout(r, 500));
    let audits = loadMockData('audits') || generateAudits(200);

    // Apply filters
    if (filters.user) {
      audits = audits.filter(a => a.userId.includes(filters.user));
    }
    if (filters.action) {
      audits = audits.filter(a => a.action === filters.action);
    }
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      audits = audits.filter(a => new Date(a.timestamp) >= fromDate);
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      audits = audits.filter(a => new Date(a.timestamp) <= toDate);
    }

    // Sort by timestamp descending
    audits.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return { data: audits };
  },

  createLog: async (logData) => {
    // TODO: Replace mock implementation with: return auditClient.post('/audit/logs', logData);
    await new Promise(r => setTimeout(r, 200));
    let audits = loadMockData('audits') || [];
    const newLog = {
      id: `audit_${Date.now()}`,
      ...logData,
      timestamp: new Date().toISOString(),
    };
    audits.unshift(newLog);
    saveMockData('audits', audits);
    return { data: newLog };
  },
};