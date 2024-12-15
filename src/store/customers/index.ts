import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomersState, defaultCustomers } from './types';
import { createCustomersActions } from './actions';

export const useCustomersStore = create<CustomersState>()(
  persist(
    (set) => ({
      customers: defaultCustomers,
      ...createCustomersActions(set)
    }),
    {
      name: 'customers-storage',
      version: 1,
      partialize: (state) => ({ customers: state.customers })
    }
  )
);