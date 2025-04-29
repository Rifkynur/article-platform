import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  role: string;
  createdAt?: Date;
  UpdatedAt?: Date;
}
interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setLogin: (token: string) => void;
  setLogout: () => void;
  clearUser: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoggedIn: false,

      setLogin: (token) => {
        localStorage.setItem("token", token);
        set({ token, isLoggedIn: true });
      },

      setLogout: () => {
        localStorage.removeItem("token");
        set({ token: null, user: null, isLoggedIn: false });
      },

      setUser: (user) => {
        set({ user });
      },

      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: "user",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
