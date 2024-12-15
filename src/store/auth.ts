import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserCredentials } from '../types';

interface AuthState {
  user: User | null;
  users: UserCredentials[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (username: string, newPassword: string) => Promise<boolean>;
  resetUserPassword: (username: string) => Promise<boolean>;
  getUsers: () => UserCredentials[];
}

const initialUsers: UserCredentials[] = [
  {
    username: 'jamie',
    password: 'class*20',
    requiresPasswordChange: false,
    lastPasswordChange: new Date().toISOString()
  },
  {
    username: 'jumbo',
    password: 'password',
    requiresPasswordChange: true
  },
  {
    username: 'adam',
    password: 'password',
    requiresPasswordChange: true
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: initialUsers,
      
      getUsers: () => get().users,
      
      login: async (username: string, password: string) => {
        const users = get().users;
        const user = users.find(
          u => u.username.toLowerCase() === username.toLowerCase() && 
               u.password === password
        );
        
        if (user) {
          set({ 
            user: {
              username: user.username,
              role: user.username.toLowerCase() === 'jamie' ? 'admin' : 'user',
              requiresPasswordChange: user.requiresPasswordChange,
              lastPasswordChange: user.lastPasswordChange
            }
          });
          return true;
        }
        return false;
      },
      
      logout: () => set({ user: null }),
      
      changePassword: async (username: string, newPassword: string) => {
        const users = get().users;
        const userIndex = users.findIndex(
          u => u.username.toLowerCase() === username.toLowerCase()
        );
        
        if (userIndex === -1) return false;
        
        const now = new Date().toISOString();
        const updatedUsers = [...users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          password: newPassword,
          requiresPasswordChange: false,
          lastPasswordChange: now
        };
        
        set({ 
          users: updatedUsers,
          user: get().user?.username.toLowerCase() === username.toLowerCase()
            ? {
                ...get().user!,
                requiresPasswordChange: false,
                lastPasswordChange: now
              }
            : get().user
        });
        
        return true;
      },
      
      resetUserPassword: async (username: string) => {
        const users = get().users;
        const userIndex = users.findIndex(
          u => u.username.toLowerCase() === username.toLowerCase()
        );
        
        if (userIndex === -1) return false;

        const updatedUsers = [...users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          password: 'password',
          requiresPasswordChange: true,
          lastPasswordChange: undefined
        };
        
        set({ 
          users: updatedUsers,
          user: get().user?.username.toLowerCase() === username.toLowerCase()
            ? null
            : get().user
        });
        
        return true;
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        users: state.users
      })
    }
  )
);