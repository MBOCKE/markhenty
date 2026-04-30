import { create } from 'zustand';
import { notificationAPI } from '../api/notifications';

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async (customerId = 'global') => {
    if (!customerId || customerId === 'undefined') {
      set({ notifications: [], isLoading: false });
      return;
    }
    set({ isLoading: true });
    try {
      const response = await notificationAPI.getNotifications(customerId);
      set({ notifications: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      set({ notifications: [], isLoading: false });
    }
  },

  fetchUnreadCount: async (customerId) => {
    try {
      const response = await notificationAPI.getUnreadCount(customerId);
      set({ unreadCount: response.data.unreadCount });
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  },

  markAsRead: async (notificationId, customerId) => {
    try {
      await notificationAPI.markAsRead(notificationId, customerId);
      set((state) => ({
        notifications: state.notifications.map(n =>
          n.id === notificationId ? { ...n, is_read: 1 } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  },

  markAllAsRead: async (customerId) => {
    try {
      await notificationAPI.markAllAsRead(customerId);
      set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, is_read: 1 })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  },

  addRealTimeNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
}));