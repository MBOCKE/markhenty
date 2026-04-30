import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEffect } from 'react';

export const useUIStore = create(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      theme: typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light',
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setTheme: (theme) => {
        set({ theme });
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', theme);
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme, sidebarOpen: state.sidebarOpen }),
    }
  )
);

