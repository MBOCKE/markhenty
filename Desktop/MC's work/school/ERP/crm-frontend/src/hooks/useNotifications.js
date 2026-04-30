import { useEffect, useCallback } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { notificationAPI } from '../api/notifications';

export const useNotifications = () => {
  const { notifications: notifs, unreadCount, setNotifications, markAsRead } = useNotificationStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationAPI.getNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Fetch every 30 seconds

    return () => clearInterval(interval);
  }, [setNotifications]);

  const handleMarkAsRead = useCallback(
    async (id) => {
      try {
        await notifications.markAsRead(id);
        markAsRead(id);
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    },
    [markAsRead]
  );

  return {
    notifications: notifs,
    unreadCount,
    markAsRead: handleMarkAsRead,
  };
};

export default useNotifications;
