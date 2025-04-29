import { create } from "zustand";

interface SidebarDashboard {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useSidebarDashboard = create<SidebarDashboard>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
