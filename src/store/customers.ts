import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer, TuningRecord } from '../types';

interface CustomersState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  addTuningRecord: (customerId: string, record: Omit<TuningRecord, 'id'>) => void;
  updateTuningRecord: (customerId: string, recordId: string, updates: Partial<TuningRecord>) => void;
  deleteTuningRecord: (customerId: string, recordId: string) => void;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '07700 900123',
    address: {
      line1: '123 High Street',
      city: 'London',
      postcode: 'SW1A 1AA'
    },
    vehicle: {
      make: 'BMW',
      model: '320d',
      year: 2019,
      ecuType: 'Bosch EDC17',
      registration: 'AB19 XYZ',
      engineSize: '2000cc'
    },
    tuningHistory: [
      {
        id: '1',
        type: 'Stage1',
        date: '2024-03-15',
        notes: 'Stage 1 remap completed - Invoice INV-123ABC'
      },
      {
        id: '2',
        type: 'DPF_Delete',
        date: '2024-03-15',
        notes: 'DPF delete service - Invoice INV-123ABC'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.w@email.com',
    phone: '07700 900456',
    address: {
      line1: '456 Church Lane',
      city: 'Manchester',
      postcode: 'M1 1AA'
    },
    vehicle: {
      make: 'Audi',
      model: 'A4',
      year: 2020,
      ecuType: 'Bosch MED17',
      registration: 'CD20 ABC',
      engineSize: '2000cc'
    },
    tuningHistory: []
  }
];

export const useCustomersStore = create<CustomersState>()(
  persist(
    (set) => ({
      customers: mockCustomers,
      
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
    }),
    {
      name: 'customers-storage',
      version: 1
    }
  )
);