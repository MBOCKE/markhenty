import React, { useEffect } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { useNotifications } from '../hooks/useNotifications';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAuth } from '../hooks/useAuth';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { BellIcon } from '@heroicons/react/24/outline';

export const Notifications = () => {
  const { user } = useAuth();
  const customerId = user?.customerId || 'global';
  const { notifications, unreadCount, markAsRead, markAllAsRead, fetchNotifications, isLoading } = useNotificationStore();
  
  useWebSocket(customerId);
  useNotifications();

  useEffect(() => {
    fetchNotifications(customerId);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {notifications.length} total | {unreadCount} unread
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={() => markAsRead(notification.id, customerId)}
            />
          ))}
        </div>
      </div>
      {notifications.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
          <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
