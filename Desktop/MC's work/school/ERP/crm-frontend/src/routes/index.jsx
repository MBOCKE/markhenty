import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import Customers from '../pages/Customers.jsx';
import { CustomerDetail } from '../pages/CustomerDetail';
import { Transactions } from '../pages/Transactions';
import { Notifications } from '../pages/Notifications';
import { AdminPanel } from '../pages/AdminPanel';
import ClassificationNotifications from '../pages/ClassificationNotifications.jsx';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && !user?.roles?.includes('admin')) return <Navigate to="/dashboard" replace />;
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'customers', element: <Customers /> },
      { path: 'customers/:id', element: <CustomerDetail /> },
      { path: 'transactions', element: <Transactions /> },
{ path: 'notifications', element: <Notifications /> },
      { path: 'classification-notifications', element: <ClassificationNotifications /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute adminOnly>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
