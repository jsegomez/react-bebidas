import type { StateCreator } from "zustand";

type Notification = {    
    message: string;
    error: boolean;
    show: boolean;
    duration?: number; 
}

export type NotificationSliceType = {
    notification: Notification | null;
    setNotification: (notification: Notification | null) => void;
}

export const createNotificationSlice: StateCreator<NotificationSliceType> = (set) => ({
    notification: null,
    setNotification: (notification: Notification | null) => {
        set({ notification });

        setTimeout(() => {
            set({ notification: null });
        }, notification?.duration || 3000);
    }
});