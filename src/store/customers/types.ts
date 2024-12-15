import { Customer, TuningRecord, FuelType, TransmissionType } from '../../types';

// Update mock data to include new fields
export const mockCustomers: Customer[] = [
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
      engineSize: '2000cc',
      fuelType: 'diesel',
      transmission: 'auto'
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
      engineSize: '2000cc',
      fuelType: 'diesel',
      transmission: 'manual'
    },
    tuningHistory: []
  }
];