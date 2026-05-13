import { create } from 'zustand'

const useNotificationStore = create((set) => ({
    notification: '',
    actions: {
        showNotification: (notification, duration = 5000) => {
            set({ notification })
            setTimeout(() => set({ notification: '' }), duration)
        },
    },
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
