export type FuelType = 'petrol' | 'diesel';
export type TransmissionType = 'manual' | 'auto';

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  ecuType: string;
  registration: string;
  engineSize?: string;
  fuelType: FuelType;
  transmission: TransmissionType;
}

export interface VehicleNote {
  id: string;
  content: string;
  createdAt: string;
  updatedBy: string;
}

export interface VehicleDetails {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number;
  engineSize?: string;
  ecuType: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  customer: Customer;
  notes: VehicleNote[];
  createdAt: string;
  updatedAt: string;
}

export interface VehicleStore {
  vehicles: VehicleDetails[];
  addVehicle: (vehicle: Omit<VehicleDetails, 'id' | 'createdAt' | 'updatedAt' | 'notes'>) => void;
  updateVehicle: (id: string, updates: Partial<VehicleDetails>) => void;
  addNote: (vehicleId: string, content: string, updatedBy: string) => void;
  deleteNote: (vehicleId: string, noteId: string) => void;
}

export interface VehicleData {
  make: string;
  model: string;
  engineCC?: string;
  year: number;
  fuelType?: FuelType;
  transmission?: TransmissionType;
}