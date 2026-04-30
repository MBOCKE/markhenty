# API Migration Guide for Microservices Integration

This document tracks all mock data usage locations and provides a clear path for migrating from mock data to actual microservice API calls.

## Migration Status Summary

### Completed Files with TODO Comments

#### 1. **Authentication API** (`src/api/auth.js`)
- **Service Target**: Auth Service @3000
- **Methods Commented**:
  - `login()` - TODO: Replace with `authClient.post('/auth/login', credentials)`
  - `logout()` - TODO: Replace with `authClient.post('/auth/logout')`
  - `getCurrentUser()` - TODO: Replace with `authClient.get('/auth/me')`
  - `refreshToken()` - TODO: Replace with `authClient.post('/auth/refresh', { refreshToken })`

#### 2. **Customer API** (`src/api/customers.js`)
- **Service Target**: Customer Service @3002
- **Methods Commented**:
  - `getAllCustomers()` - TODO: Replace with `customerClient.get('/customers')`
  - `getCustomerById()` - TODO: Replace with `customerClient.get('/customers/{customerId}')`
  - `createCustomer()` - TODO: Replace with `customerClient.post('/customers', customerData)`
  - `updateCustomer()` - TODO: Replace with `customerClient.put('/customers/{customerId}', customerData)`
  - `deleteCustomer()` - TODO: Replace with `customerClient.delete('/customers/{customerId}')`

#### 3. **Transactions API** (`src/api/transactions.js`)
- **Service Target**: Transaction Service @3001
- **Methods Commented**:
  - `getAll()` - TODO: Replace with `transactionClient.get('/transactions')`
  - `getByCustomer()` - TODO: Replace with `transactionClient.get('/transactions/customer/{customerId}')`
  - `create()` - TODO: Replace with `transactionClient.post('/transactions', transactionData)`
  - `getStats()` - TODO: Replace with `transactionClient.get('/transactions/stats')`

#### 4. **Notifications API** (`src/api/notifications.js`)
- **Service Target**: Notification Service @3005
- **Methods Commented**:
  - `getNotifications()` - TODO: Replace with `notificationClient.get('/notifications/{customerId}')`
  - `getUnreadCount()` - TODO: Replace with `notificationClient.get('/notifications/{customerId}/unread')`
  - `markAsRead()` - TODO: Replace with `notificationClient.post('/notifications/read', { customerId })`
  - `markAllAsRead()` - TODO: Replace with `notificationClient.post('/notifications/read-all')`
  - `deleteOldNotifications()` - TODO: Replace with `notificationClient.post('/notifications/cleanup')`
  - `createNotification()` - TODO: Replace with `notificationClient.post('/notifications', notificationData)`

#### 5. **Bonus API** (`src/api/bonus.js`)
- **Service Target**: Bonus Service @3004
- **Methods Commented**:
  - `getBalance()` - TODO: Replace with `bonusClient.get('/bonus/{customerId}/balance')`
  - `calculateBonus()` - TODO: Replace with `bonusClient.post('/bonus/calculate', { customerId, amount, tierMultiplier })`
  - `redeem()` - TODO: Replace with `bonusClient.post('/bonus/redeem', { customerId, points })`
  - `awardBonus()` - TODO: Replace with `bonusClient.post('/bonus/award', { customerId, points, reason })`

#### 6. **Dashboard API** (`src/api/dashboard.js`)
- **Service Target**: Dashboard Service
- **Methods Commented**:
  - `getSummary()` - TODO: Replace with `dashboardClient.get('/dashboard/summary')`
  - `getRecentActivity()` - TODO: Replace with `dashboardClient.get('/dashboard/activity')`

#### 7. **Classification API** (`src/api/classification.js`)
- **Service Target**: Classification Service @3003
- **Methods Commented**:
  - `getCustomerTier()` - Already has try-catch fallback pattern
  - `getClassificationHistory()` - TODO: Replace with `classificationClient.get('/api/v1/classify/{customerId}/history')`
  - `getTierDistribution()` - Already has try-catch fallback pattern

#### 8. **Audit API** (`src/api/audit.js`)
- **Service Target**: Audit Service
- **Methods Commented**:
  - `getLogs()` - TODO: Replace with `auditClient.get('/audit/logs', { params: filters })`
  - `createLog()` - TODO: Replace with `auditClient.post('/audit/logs', logData)`

## Microservices Endpoints Overview

| Service | Port | Module | Example Endpoints |
|---------|------|--------|-------------------|
| Auth Service | 3000 | authClient | `/auth/login`, `/auth/logout`, `/auth/me` |
| Transaction Service | 3001 | transactionClient | `/transactions`, `/transactions/stats` |
| Customer Service | 3002 | customerClient | `/customers`, `/customers/{id}` |
| Classification Service | 3003 | classificationClient | `/api/v1/classify/{customerId}` |
| Bonus Service | 3004 | bonusClient | `/bonus/calculate`, `/bonus/redeem` |
| Notification Service | 3005 | notificationClient | `/notifications`, `/notifications/{customerId}/unread` |

## Migration Process

### Step 1: Prepare Microservices
Ensure all microservices are deployed and running on their respective ports (3000-3005).

### Step 2: Update Client Configuration
Update `src/api/client.js` to point to actual service endpoints instead of mock data.

### Step 3: Replace TODO Sections
For each method with a TODO comment, follow this pattern:

**Before (Mock):**
```javascript
async getCustomers() => {
  // TODO: Replace mock implementation with: return customerClient.get('/customers');
  let customers = loadMockData('customers') || [];
  return { data: customers };
}
```

**After (Live API):**
```javascript
async getCustomers() => {
  return customerClient.get('/customers');
}
```

### Step 4: Remove Mock Data Utilities
Once all APIs are migrated:
1. Remove `loadMockData()` calls
2. Remove `saveMockData()` calls
3. Remove `generateXXX()` function calls
4. Clean up `src/utils/mockData.js` (or remove entirely)

### Step 5: Testing
- Test each API endpoint independently
- Verify error handling is working
- Update error messages to reflect real service responses

## Mock Data Locations

All mock data is currently stored in `localStorage` under these keys:
- `customers` - Customer data
- `transactions` - Transaction records
- `notifications` - Notification messages
- `audits` - Audit logs
- `users` - User accounts
- `rules` - Classification rules

## Notes

- Comments are formatted as `// TODO: Replace mock implementation with: ...` for easy searchability
- Service ports are documented in comments (e.g., `@3000`, `@3002`, etc.)
- Each TODO includes the exact replacement API call needed
- Some files already have try-catch patterns for fallback to mock data (optional migration)

## Related Files

- [Rules Management](./src/components/admin/RuleEngineEditor.jsx) - For managing classification rules
- [Mock Data Generator](./src/utils/mockData.js) - Central location for mock data utilities
- [API Clients](./src/api/client.js) - Axios client configurations
