import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationsState, Notification } from './types';

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) => {
        const newNotification: Notification = {
          id: Math.random().toString(36).substring(2),
          createdAt: new Date().toISOString(),
          read: false,
          ...notification,
        };

        set((state) => {
          // Filter out any duplicate notifications based on content
          const existingNotification = state.notifications.find(n => 
            n.title === notification.title && 
            n.message === notification.message &&
            n.type === notification.type
          );

          if (existingNotification) {
            return state; // Don't add duplicate notifications
          }

          const updatedNotifications = [newNotification, ...state.notifications];
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter(n => !n.read).length
          };
        });
      },

      markAsRead: (id) => {
        set((state) => {
          const updatedNotifications = state.notifications.map((notification) =>
            notification.id === id && !notification.read
              ? { ...notification, read: true }
              : notification
          );

          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter(n => !n.read).length
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
          unreadCount: 0,
        }));
      },

      cleanupOldNotifications: () => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        set((state) => {
          const updatedNotifications = state.notifications.filter(
            notification => new Date(notification.createdAt) > thirtyDaysAgo
          );

          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter(n => !n.read).length
          };
        });
      }
    }),
    {
      name: 'notifications-storage',
      version: 1,
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount
      })
    }
  )
);