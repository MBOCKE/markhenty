import { classificationClient } from './client';
import { loadMockData, initMockData, saveMockData, generateNotifications } from '../utils/mockData';
import toast from 'react-hot-toast';

initMockData();

export const notificationAPI = {
  getNotifications: async (customerId, limit = 50, offset = 0) => {
    await new Promise(r => setTimeout(r, 300));
    let notifications = loadMockData('notifications') || generateNotifications(100);
    notifications = notifications.filter(n => n.customerId === customerId).slice(offset, offset + limit);
    return { data: notifications };
  },

  getUnreadCount: async (customerId) => {
    await new Promise(r => setTimeout(r, 200));
    const notifications = loadMockData('notifications') || [];
    const unread = notifications.filter(n => n.customerId === customerId && !n.is_read).length;
    return { data: { unreadCount: unread } };
  },

  markAsRead: async (notificationId, customerId) => {
    await new Promise(r => setTimeout(r, 200));
    let notifications = loadMockData('notifications') || [];
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index > -1) {
      notifications[index].is_read = 1;
      saveMockData('notifications', notifications);
    }
    return { data: { success: true } };
  },

  markAllAsRead: async (customerId) => {
    await new Promise(r => setTimeout(r, 400));
    let notifications = loadMockData('notifications') || [];
    notifications = notifications.map(n => n.customerId === customerId ? { ...n, is_read: 1 } : n);
    saveMockData('notifications', notifications);
    return { data: { success: true } };
  },

  deleteOldNotifications: async (customerId, days = 30) => {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    let notifications = loadMockData('notifications') || [];
    notifications = notifications.filter(n => !(n.customerId === customerId && n.createdAt < cutoff));
    saveMockData('notifications', notifications);
    return { data: { deleted: true } };
  },
};

export default notificationAPI;

