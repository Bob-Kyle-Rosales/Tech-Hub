import { create } from 'zustand';
import { UserState } from '../interface/types';

const useUserStore = create<UserState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
