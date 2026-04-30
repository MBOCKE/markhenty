/* Mock data for CRM frontend - replace with real API calls when services live
 * Generated with faker-like logic for realism
 * Persist to localStorage for state across refreshes
 */

 // Tiers per spec
export const TIERS = ['NORMAL', 'STANDARD', 'PREMIUM', 'BRONZE'];

 // Sample customers (100+)
export const generateCustomers = (count = 100) => Array.from({ length: count }, (_, i) => ({
  id: `cust_${1000 + i}`,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  phone: `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 10000)}`,
  tier: TIERS[Math.floor(Math.random() * TIERS.length)],
  totalSpent: (Math.random() * 50000 + 100).toFixed(2),
  lastPurchase: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  createdAt: new Date(Date.now() - Math.random() * 730 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'active',
  points: Math.floor(Math.random() * 5000),
  // 25+ factors for classification (mock scores)
  factors: {
    purchaseFrequency: Math.floor(Math.random() * 10),
    avgOrderValue: Math.floor(Math.random() * 1000),
    loyaltyYears: Math.floor(Math.random() * 5),
    // ... more
  }
}));

 // Transactions (500)
export const generateTransactions = (customers, transactionsPerCustomer = 3) => {
  const transactions = [];
  customers.forEach((customer, idx) => {
    for (let i = 0; i < transactionsPerCustomer + Math.floor(Math.random() * 3); i++) { // 3-5 per customer
      transactions.push({
        id: `txn_${10000 + idx * 10 + i}`,
        customerId: customer.id,
        amount: (Math.random() * 500 + 10).toFixed(2),
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        type: ['purchase', 'refund', 'bonus'][Math.floor(Math.random() * 3)],
        status: 'completed',
        paymentMethod: ['credit_card', 'debit_card', 'cash'][Math.floor(Math.random() * 3)],
      });
    }
  });
  return transactions;
};

 // Notifications (100)
export const generateNotifications = (count = 100) => Array.from({ length: count }, (_, i) => ({
  id: `notif_${100 + i}`,
  customerId: `cust_${1000 + Math.floor(Math.random() * 100)}`,
  title: ['Tier Upgrade!', 'Bonus Points Awarded', 'New Purchase Confirmed', 'Inactivity Reminder'][Math.floor(Math.random() * 4)],
  message: 'Lorem ipsum notification message...',
  type: 'info',
  is_read: Math.random() > 0.5 ? 1 : 0,
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}));

 // Users (20)
export const generateUsers = () => [
  { id: 'user1', email: 'admin@example.com', password: 'admin123', name: 'Admin User', roles: ['admin'], isActive: true },
  { id: 'user2', email: 'manager@example.com', password: 'manager123', name: 'Manager', roles: ['manager'], isActive: true },
  // 18 more regular users...
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `user${i+3}`,
    email: `user${i+3}@example.com`,
    password: 'user123',
    name: `Regular User ${i+3}`,
    roles: ['user'],
    isActive: true,
  })),
];

 // Audit logs
export const generateAudits = (count = 200) => Array.from({ length: count }, (_, i) => ({
  id: `audit_${i}`,
  userId: `user${Math.floor(Math.random() * 20) + 1}`,
  action: ['login', 'customer_update', 'txn_create', 'tier_change'][Math.floor(Math.random() * 4)],
  targetId: `cust_${1000 + Math.floor(Math.random() * 100)}`,
  ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
  timestamp: new Date().toISOString(),
}));

 // Default rule engine
export const defaultRules = {
  scenarios: ['big_spender', 'loyal_fan', 'super_user', 'balanced', 'retention'],
  factors: {
    purchaseFrequency: { weight: 0.2, enabled: true },
    avgOrderValue: { weight: 0.25, enabled: true },
    // 23 more factors...
  },
  tierThresholds: {
    NORMAL: 0,
    STANDARD: 30,
    PREMIUM: 60,
    BRONZE: 80,
  }
};

// Load/save helpers
export const loadMockData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(`mock_${key}`) || 'null');
  } catch {
    return null;
  }
};

export const saveMockData = (key, data) => {
  localStorage.setItem(`mock_${key}`, JSON.stringify(data));
};

 // Init data if empty
export const initMockData = () => {
  if (!loadMockData('customers')) {
    const customers = generateCustomers(120);
    saveMockData('customers', customers);
    const transactions = generateTransactions(customers);
    saveMockData('transactions', transactions);
  }
  if (!loadMockData('transactions')) {
    const customers = loadMockData('customers') || generateCustomers(120);
    const transactions = generateTransactions(customers);
    saveMockData('transactions', transactions);
  }
  if (!loadMockData('users')) {
    const users = generateUsers();
    saveMockData('users', users);
  }
  if (!loadMockData('audits')) {
    const audits = generateAudits(200);
    saveMockData('audits', audits);
  }
  // Similar for others
};

