import React from 'react';

export const NotificationItem = ({ notification, onRead }) => {
  return (
    <div
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
      onClick={onRead}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{notification.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        </div>
        {!notification.read && (
          <div className="ml-2 flex-shrink-0">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
    </div>
  );
};

export default NotificationItem;
