import { useEffect, useRef } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import toast from 'react-hot-toast';

export const useWebSocket = (customerId) => {
  const wsRef = useRef(null);
  const { addRealTimeNotification, fetchUnreadCount } = useNotificationStore();

  useEffect(() => {
    if (!customerId || customerId === 'undefined' || customerId === 'global') return;

    try {
      const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:3001/ws'}/?customerId=${customerId}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected for customer:', customerId);
        ws.send(JSON.stringify({ type: 'subscribe', customerId }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'notification') {
            addRealTimeNotification(data.notification);
            fetchUnreadCount(customerId);
            toast.success(data.notification.title);
          }
        } catch (e) {
          console.error('WS message parse error:', e);
        }
      };

      ws.onerror = (error) => {
        console.warn('WebSocket error for customer', customerId, error);
      };

      ws.onclose = () => {
        console.log('WebSocket closed for customer', customerId);
      };

      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    } catch (error) {
      console.error('WebSocket init error:', error);
    }
  }, [customerId, addRealTimeNotification, fetchUnreadCount]);
};