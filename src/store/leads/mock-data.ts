import { Lead } from './types';

export const mockLeads: Lead[] = [
  {
    id: '1',
    customerName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '07700 900123',
    status: 'new',
    notes: 'Interested in Stage 1 tuning for BMW 320d',
    createdAt: '2024-03-18T10:00:00',
    followUpDate: '2024-03-20T10:00:00',
    vehicle: {
      registration: 'AB12CDE',
      make: 'BMW',
      model: '320d',
      year: 2020,
      engineSize: '2.0L',
      ecuType: 'Bosch EDC17',
      fuelType: 'diesel',
      transmission: 'auto'
    }
  }
];