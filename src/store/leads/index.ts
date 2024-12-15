import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LeadsState } from './types';
import { createLeadActions } from './actions';
import { mockLeads } from './mock-data';

export const useLeadsStore = create<LeadsState>()(
  persist(
    (set) => ({
      leads: mockLeads,
      ...createLeadActions(set)
    }),
    {
      name: 'leads-storage',
      version: 1,
      partialize: (state) => ({ leads: state.leads })
    }
  )
);