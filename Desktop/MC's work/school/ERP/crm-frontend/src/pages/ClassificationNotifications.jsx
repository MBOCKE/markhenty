import React, { useEffect, useState } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { useNotifications } from '../hooks/useNotifications';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAuth } from '../hooks/useAuth';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { BellIcon } from '@heroicons/react/24/outline';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { CustomerTierBadge } from '../components/customers/CustomerTierBadge';
import dayjs from 'dayjs';

const useClassificationNotifications = () => {
  const { user } = useAuth();
  const customerId = user?.customerId || 'global';
  const { notifications, unreadCount, markAsRead, markAllAsRead, fetchNotifications, isLoading } = useNotificationStore();
  
  useEffect(() => {
    if (customerId && customerId !== 'undefined') {
      fetchNotifications(customerId);
    }
  }, [customerId, fetchNotifications]);

  React.useEffect(() => {
    if (customerId && customerId !== 'global' && customerId !== 'undefined') {
      useWebSocket(customerId);
    }
  }, [customerId]);

  const classificationNotifications = notifications.filter(n => 
    n.title?.toLowerCase().includes('tier') || 
    n.title?.toLowerCase().includes('classification') ||
    n.title?.toLowerCase().includes('rule') ||
    n.message?.toLowerCase().includes('upgraded') ||
    n.message?.toLowerCase().includes('downgraded')
  );

  if (!user) {
    return { classificationNotifications: [], unreadCount: 0, markAsRead: () => {}, markAllAsRead: () => {}, isLoading: false };
  }

  return { classificationNotifications, unreadCount, markAsRead, markAllAsRead, isLoading };
};

export const ClassificationNotifications = () => {
  const { classificationNotifications, unreadCount, markAsRead, markAllAsRead, isLoading } = useClassificationNotifications();
  const { user } = useAuth();
  const [showMarkAll, setShowMarkAll] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Classification Notifications</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (classificationNotifications.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Classification Notifications</h1>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No classification notifications</h3>
          <p className="mt-1 text-sm text-gray-500">Get notified when customers change tiers or rules trigger.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classification Notifications</h1>
          <p className="text-gray-600 mt-1">
            {classificationNotifications.length} classification events | {unreadCount} unread
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => {
              markAllAsRead(user?.customerId || 'global');
              setShowMarkAll(true);
              setTimeout(() => setShowMarkAll(false), 2000);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {classificationNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={() => markAsRead(notification.id, user?.customerId || 'global')}
            >
              {notification.tier && <CustomerTierBadge tier={notification.tier} className="ml-2" />}
            </NotificationItem>
          ))}
        </div>
      </div>

      {showMarkAll && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-800 text-sm">All classification notifications marked as read.</p>
        </div>
      )}
    </div>
  );
};

export default ClassificationNotifications;

