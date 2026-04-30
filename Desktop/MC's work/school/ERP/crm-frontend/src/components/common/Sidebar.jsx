import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Classification Notifications', href: '/classification-notifications', icon: ShieldCheckIcon },
];

const adminNavigation = [
  { name: 'Admin Panel', href: '/admin', icon: ShieldCheckIcon },
  { name: 'Logs Dashboard', href: '/logs', icon: DocumentTextIcon },
];

export const Sidebar = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.roles?.includes('admin');

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-57px)] sticky top-[57px] overflow-y-auto">
      <nav className="mt-5 px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
        {isAdmin && (
          <>
            <div className="border-t border-gray-200 my-4" />
            {adminNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
};