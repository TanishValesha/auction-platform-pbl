"use client"; // Zustand is a client-only library

import { create } from "zustand";
import Cookies from "js-cookie";

interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  phone: number;
  businessType?: string;
  companyName?: string;
  address: string;
}

interface UserStore {
  user: UserInterface | null;
  setUser: (userData: UserInterface) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  // Load user from cookies if available
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,

  setUser: (userData) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Store for 7 days
    set({ user: userData });
  },

  clearUser: () => {
    Cookies.remove("user");
    set({ user: null });
  },
}));

export default useUserStore;
