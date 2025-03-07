import { create } from "zustand";

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
  getUser: () => UserInterface | null;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  getUser: () => get().user,
}));

export default useUserStore;
