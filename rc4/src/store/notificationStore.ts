import { create } from "zustand";

type NotificationType = "info" | "error" | "success";

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (message, type) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          message,
          type,
          read: false,
        },
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

export default useNotificationStore;
