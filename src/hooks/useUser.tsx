import { create } from 'zustand';
import { UserState } from '../interface/types';

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const useUserStore = create<UserState>((set) => ({
  user: getUserFromLocalStorage(),
  isAuthenticated: false,
  login: (user) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  },
}));

export default useUserStore;
