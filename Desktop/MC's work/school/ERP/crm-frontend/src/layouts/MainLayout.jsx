import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { NotificationBell } from '../components/notifications/NotificationBell';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useUIStore } from '../store/uiStore';
import { useEffect } from 'react';

export const MainLayout = () => {
  const location = useLocation();
  const { theme } = useUIStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const getBreadcrumbs = () => {
    const pathNames = location.pathname.split('/').filter(x => x);
    return pathNames.map((name, index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      href: '/' + pathNames.slice(0, index + 1).join('/')
    }));
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          {breadcrumbs.length > 0 && (
            <nav className="mb-6">
              <ol className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</a>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center">
                    <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <a href={crumb.href} className="hover:text-gray-700 dark:hover:text-gray-200">{crumb.name}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <Outlet />
        </main>
      </div>
      <NotificationBell />
      <ConfirmDialog />
    </div>
  );
};