import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SettingsState, initialSettings } from './types';
import { createSettingsActions } from './actions';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: initialSettings,
      ...createSettingsActions(set, get)
    }),
    {
      name: 'settings-storage',
      version: 1,
      partialize: (state) => ({ settings: state.settings }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        settings: {
          ...initialSettings,
          ...persistedState.settings
        }
      })
    }
  )
);