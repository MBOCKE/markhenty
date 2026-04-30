import { classificationClient } from './client';
import { loadMockData, initMockData, saveMockData, generateNotifications } from '../utils/mockData';
import toast from 'react-hot-toast';

initMockData();

export const notificationAPI = {
  // TODO: Replace with Notification Service API calls @3005
  // Replace loadMockData/saveMockData with actual API calls
  getNotifications: async (customerId, limit = 50, offset = 0) => {
    // TODO: Replace mock implementation with: return notificationClient.get(`/notifications/${customerId}`, { params: { limit, offset } });
    await new Promise(r => setTimeout(r, 300));
    let notifications = loadMockData('notifications') || generateNotifications(100);
    notifications = notifications.filter(n => n.customerId === customerId).slice(offset, offset + limit);
    return { data: notifications };
  },

  getUnreadCount: async (customerId) => {
    // TODO: Replace mock implementation with: return notificationClient.get(`/notifications/${customerId}/unread`);
    await new Promise(r => setTimeout(r, 200));
    const notifications = loadMockData('notifications') || [];
    const unread = notifications.filter(n => n.customerId === customerId && !n.is_read).length;
    return { data: { unreadCount: unread } };
  },

  markAsRead: async (notificationId, customerId) => {
    // TODO: Replace mock implementation with: return notificationClient.put(`/notifications/${notificationId}/read`);
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
    // TODO: Replace mock implementation with: return notificationClient.put(`/notifications/${customerId}/read-all`);
    await new Promise(r => setTimeout(r, 400));
    let notifications = loadMockData('notifications') || [];
    notifications = notifications.map(n => n.customerId === customerId ? { ...n, is_read: 1 } : n);
    saveMockData('notifications', notifications);
    return { data: { success: true } };
  },

  createNotification: async (notificationData) => {
    // TODO: Replace mock implementation with: return notificationClient.post('/notifications', notificationData);
    await new Promise(r => setTimeout(r, 300));
    let notifications = loadMockData('notifications') || [];
    const newNotification = {
      id: `notif_${Date.now()}`,
      ...notificationData,
      is_read: 0,
      createdAt: new Date().toISOString(),
    };
    notifications.unshift(newNotification);
    saveMockData('notifications', notifications);
    return { data: newNotification };
  },
};

export default notificationAPI;

