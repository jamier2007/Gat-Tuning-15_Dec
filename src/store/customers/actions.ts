import { StateCreator } from 'zustand';
import { CustomersState } from './types';

export const createCustomersActions = (
  set: StateCreator<CustomersState>['setState']
) => ({
  addCustomer: (customer) => {
    const newCustomer = {
      ...customer,
      id: Math.random().toString(36).substr(2, 9),
      tuningHistory: []
    };
    
    set((state) => ({
      customers: [...state.customers, newCustomer]
    }));
  },
  
  updateCustomer: (id, updates) => {
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updates } : customer
      )
    }));
  },
  
  addTuningRecord: (customerId, record) => {
    const newRecord = {
      ...record,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              tuningHistory: [...customer.tuningHistory, newRecord]
            }
          : customer
      )
    }));
  },
  
  updateTuningRecord: (customerId, recordId, updates) => {
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              tuningHistory: customer.tuningHistory.map((record) =>
                record.id === recordId ? { ...record, ...updates } : record
              )
            }
          : customer
      )
    }));
  },
  
  deleteTuningRecord: (customerId, recordId) => {
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              tuningHistory: customer.tuningHistory.filter(
                (record) => record.id !== recordId
              )
            }
          : customer
      )
    }));
  }
});