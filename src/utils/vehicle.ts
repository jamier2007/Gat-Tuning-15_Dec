import { FuelType, TransmissionType } from '../types/vehicle';

export const formatFuelType = (fuelType: FuelType = 'diesel'): string => {
  return fuelType.charAt(0).toUpperCase() + fuelType.slice(1);
};

export const formatTransmission = (transmission: TransmissionType = 'manual'): string => {
  return transmission === 'auto' ? 'Automatic' : 'Manual';
};