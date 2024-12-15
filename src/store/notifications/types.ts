export interface Notification {
  id: string;
  type: 'lead' | 'booking' | 'payment';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  followUpDate?: string;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}