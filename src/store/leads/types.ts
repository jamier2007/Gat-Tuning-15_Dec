import { FuelType, TransmissionType } from '../../types/vehicle';

export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost';

export interface LeadVehicle {
  registration?: string;
  make?: string;
  model?: string;
  year?: number;
  engineSize?: string;
  ecuType?: string;
  fuelType?: FuelType;
  transmission?: TransmissionType;
}

export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  followUpDate?: string;
  vehicle?: LeadVehicle;
}

export interface LeadsState {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}