import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotificationsStore } from '../store/notifications';
import { format } from 'date-fns';

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    cleanupOldNotifications 
  } = useNotificationsStore();

  // Only clean up notifications when the dropdown opens
  const handleOpen = () => {
    if (!isOpen) {
      cleanupOldNotifications();
    }
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="relative p-2 hover:bg-gray-700 rounded-full group"
        aria-label="Notifications"
      >
        <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'text-blue-400 animate-[shake_0.8s_ease-in-out_infinite]' : 'text-gray-400'}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        {notification.type === 'lead' && notification.followUpDate && (
                          <p className="text-xs text-blue-600">
                            Follow up on {format(new Date(notification.followUpDate), 'MMM d, yyyy')}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {format(new Date(notification.createdAt), 'MMM d, HH:mm')}
                        </span>
                        {!notification.read && (
                          <span className="text-xs text-blue-600 mt-1">New</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;