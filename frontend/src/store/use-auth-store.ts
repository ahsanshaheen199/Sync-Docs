import { create } from "zustand";
import type { AuthState, User } from "@/types";

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isAuthenticated: false,
  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: undefined, isAuthenticated: false }),
}));
