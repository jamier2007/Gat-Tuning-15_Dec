import { Settings } from '../../types';
import { initialSettings } from './types';

export const migrations = {
  0: (state: any): { settings: Settings } => ({
    settings: state.settings || initialSettings
  }),
  1: (state: any): { settings: Settings } => ({
    settings: {
      ...state.settings,
      bookings: {
        ...initialSettings.bookings,
        ...state.settings.bookings
      }
    }
  })
};

export const migrate = (persistedState: any, version: number) => {
  let state = persistedState;

  for (let i = version; i < Object.keys(migrations).length; i++) {
    if (migrations[i as keyof typeof migrations]) {
      state = migrations[i as keyof typeof migrations](state);
    }
  }

  return state;
};