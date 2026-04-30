export const TIERS = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
};

export const TIER_NAMES = {
  [TIERS.BRONZE]: 'Bronze',
  [TIERS.SILVER]: 'Silver',
  [TIERS.GOLD]: 'Gold',
  [TIERS.PLATINUM]: 'Platinum',
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
  CASH: 'cash',
};

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

export const API_ENDPOINTS = {
  AUTH: '/auth',
  CUSTOMERS: '/customers',
  TRANSACTIONS: '/transactions',
  NOTIFICATIONS: '/notifications',
  CLASSIFICATION: '/classification',
  BONUS: '/bonus',
};
