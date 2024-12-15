import { Document } from './types';

export const mockDocuments: Document[] = [
  {
    id: 'INV-123ABC',
    type: 'invoice',
    customer: {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '07700 900123',
      vehicle: {
        make: 'BMW',
        model: '320d',
        year: 2019,
        ecuType: 'Bosch EDC17',
        registration: 'AB19 XYZ',
        engineSize: '2.0L',
        fuelType: 'diesel',
        transmission: 'auto'
      },
      tuningHistory: []
    },
    services: [
      { id: 'stage1', name: 'Stage 1 Tuning', price: 280 },
      { id: 'dpf', name: 'DPF Delete', price: 250 }
    ],
    total: 330,
    notes: 'Stage 1 remap with DPF delete service',
    status: 'paid',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    sentAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];