import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, defaultUsers } from './types';
import { createAuthActions } from './actions';
import { migrate } from './migrations';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: defaultUsers,
      ...createAuthActions(set, get)
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        users: state.users,
        user: state.user
      }),
      version: 2,
      migrate
    }
  )
);