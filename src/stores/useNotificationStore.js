import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notifications: [
    { id: 1, type: "bills", message: "Rent due tomorrow", time: "2h ago", read: false },
    { id: 2, type: "chores", message: "Kitchen cleaning assigned", time: "4h ago", read: false },
    { id: 3, type: "messages", message: "John: Don’t forget the groceries!", time: "1d ago", read: true },
    { id: 4, type: "events", message: "House meeting on Sunday", time: "2d ago", read: false },
  ],

  addNotification: (type, message) =>
    set((state) => ({
      notifications: [
        { id: Date.now(), type, message, time: "just now", read: false },
        ...state.notifications,
      ],
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
