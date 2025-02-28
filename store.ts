import { create } from "zustand";

interface UserInterface {
  _id: string;
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
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
