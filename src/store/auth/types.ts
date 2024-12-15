import { User, UserCredentials } from '../../types';

export interface AuthState {
  user: User | null;
  users: UserCredentials[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (username: string, newPassword: string) => Promise<boolean>;
  resetUserPassword: (username: string) => Promise<boolean>;
  getUsers: () => UserCredentials[];
}

export const defaultUsers: UserCredentials[] = [
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