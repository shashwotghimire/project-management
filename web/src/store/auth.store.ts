import { AuthStore } from "@/types/auth-api.types";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user }),
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  logOut: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, isLoggedIn: false });
  },
  hasRoles: (...roles) => {
    const { user } = get();
    return user ? roles.includes(user.role) : false;
  },
}));
