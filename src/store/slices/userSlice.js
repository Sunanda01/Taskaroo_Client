// store/userSlice.js
import { devtools } from 'zustand/middleware';

export const createUserSlice = devtools((set) => {
  // Load initial userInfo from localStorage
  let savedUser = undefined;
  try {
    const userString = localStorage.getItem('userData');
    savedUser = userString ? JSON.parse(userString) : undefined;
  } catch (error) {
    console.error('Failed to parse userDetails from localStorage', error);
  }

  return {
    userInfo: savedUser,
    setUserInfo: (userInfo) => {
      localStorage.setItem('userData', JSON.stringify(userInfo));
      set({ userInfo });
    },
    clearUserInfo: () => {
      localStorage.removeItem('userData');
      set({ userInfo: undefined });
    },
  };
}, { name: 'userSlice' });
