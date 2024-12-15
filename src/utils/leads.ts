import { Lead } from '../types';

export interface LeadToBookingData {
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: {
      line1: string;
      city: string;
      postcode: string;
    };
    vehicle: {
      make?: string;
      model?: string;
      year?: number;
      ecuType?: string;
      registration?: string;
      engineSize?: string;
      fuelType?: 'petrol' | 'diesel';
      transmission?: 'manual' | 'auto';
    };
  };
  notes?: string;
}

export const convertLeadToBookingData = (lead: Lead): LeadToBookingData => {
  return {
    customer: {
      name: lead.customerName,
      email: lead.email,
      phone: lead.phone,
      vehicle: {
        ...lead.vehicle,
        // Ensure we're not passing undefined values
        make: lead.vehicle?.make || '',
        model: lead.vehicle?.model || '',
        year: lead.vehicle?.year,
        ecuType: lead.vehicle?.ecuType || '',
        registration: lead.vehicle?.registration || '',
        engineSize: lead.vehicle?.engineSize,
        fuelType: lead.vehicle?.fuelType,
        transmission: lead.vehicle?.transmission
      }
    },
    // Include lead notes if they exist
    notes: lead.notes || undefined
  };
};