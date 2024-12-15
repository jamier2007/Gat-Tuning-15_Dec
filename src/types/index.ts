export interface Booking {
  id: string;
  customerId: string;
  date: string;
  service: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  vehicle?: Vehicle;
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  ecuType: string;
  registration: string;
  engineSize?: string;
  fuelType: 'petrol' | 'diesel';
  transmission: 'manual' | 'auto';
}

// ... rest of your types