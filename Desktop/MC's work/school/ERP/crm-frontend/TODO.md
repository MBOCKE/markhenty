# ERP CRM Frontend Task TODO

## Overall Plan Status: 5/7 completed

### 1. [x] Fix Critical Bug (Search Infinite Loop) - Priority 1
   - Edit `src/store/customerStore.js`: Remove sync `fetchCustomers()` from `setFilters`, add `applyFilters` action.
   - Edit `src/pages/Customers.jsx`: Add `useEffect` on `filters` → `fetchCustomers(filters)`.
   - Test: Search without error.

### 2. [x] Create ClassificationNotifications Page
   - Create `src/pages/ClassificationNotifications.jsx`.
   - Edit `src/components/common/Sidebar.jsx`: Add nav link.
   - Edit `src/routes/index.jsx`: Add route `/classification-notifications`.

### 3. [x] Integrate WebSocket Real-time Everywhere
   - Edit `src/pages/Notifications.jsx`: Use store + WebSocket.
   - Edit `src/pages/ClassificationNotifications.jsx`.
   - Edit `src/pages/Dashboard.jsx`: Live KPIs/activity.

### 4. [x] Data Export & Reporting
   - Create `src/components/common/DataExport.jsx`.
   - Edit pages: Customers, Transactions etc. to include exports.
   - Backend: Extend APIs if needed.

### 5. [ ] UI Features Implementation
   - Create `src/store/uiStore.js` (dark mode).
   - Edit `src/components/common/Header.jsx` (toggle, breadcrumb).
   - Create ConfirmDialog, integrate validation/boundaries/shortcuts.

### 6. [ ] Install/Check Dependencies
   - Verify/add: react-hook-form, zod, react-hot-toast (already), lucide-react, use-hotkeys?.

### 7. [ ] Testing & Polish
   - Test all features.
   - Responsive check, error handling.

### 8. [x] Fix ClassificationNotifications 500 Error
   - Add auth checks and customerId fallbacks.
   - Handle malformed JWT / unauthorized requests gracefully.
   - Updated store, hooks, error handling.

**Next Step: Complete remaining TODO items (5-7)**
