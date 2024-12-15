import { AuthState } from './types';

export const migrations = {
  0: (state: any) => ({
    ...state,
    users: state.users || [],
    user: state.user || null
  }),
  1: (state: any) => ({
    ...state,
    users: state.users.map((user: any) => ({
      ...user,
      requiresPasswordChange: user.requiresPasswordChange ?? true,
      lastPasswordChange: user.lastPasswordChange ?? undefined
    }))
  }),
  2: (state: any) => ({
    ...state,
    users: state.users.map((user: any) => ({
      ...user,
      password: user.username.toLowerCase() === 'adam' ? 'password' : user.password
    }))
  })
};

export const migrate = (persistedState: any, version: number): AuthState => {
  let state = persistedState;

  // Apply each migration sequentially
  for (let i = version; i < Object.keys(migrations).length; i++) {
    if (migrations[i as keyof typeof migrations]) {
      state = migrations[i as keyof typeof migrations](state);
    }
  }

  return state as AuthState;
};