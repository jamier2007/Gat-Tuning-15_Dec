import { StateCreator } from 'zustand';
import { AuthState } from './types';

export const createAuthActions = (
  set: StateCreator<AuthState>['setState'],
  get: () => AuthState
) => ({
  getUsers: () => get().users,
  
  login: async (username: string, password: string) => {
    const currentUsers = get().users;
    const matchedUser = currentUsers.find(
      u => u.username.toLowerCase() === username.toLowerCase() && 
           u.password === password
    );
    
    if (matchedUser) {
      set({ 
        user: {
          username: matchedUser.username,
          role: matchedUser.username.toLowerCase() === 'jamie' ? 'admin' : 'user',
          requiresPasswordChange: matchedUser.requiresPasswordChange,
          lastPasswordChange: matchedUser.lastPasswordChange
        }
      });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ user: null });
  },
  
  changePassword: async (username: string, newPassword: string) => {
    const currentUsers = get().users;
    const userIndex = currentUsers.findIndex(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
    
    if (userIndex === -1) return false;
    
    const now = new Date().toISOString();
    const updatedUsers = [...currentUsers];
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
    const currentUsers = get().users;
    const userIndex = currentUsers.findIndex(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
    
    if (userIndex === -1) return false;

    const updatedUsers = [...currentUsers];
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
});