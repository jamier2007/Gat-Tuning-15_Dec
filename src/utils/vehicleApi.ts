import { VehicleData } from '../types';

const API_URL = 'https://www.checkcardetails.co.uk/api/vehicledata';
const API_KEY = 'e0ad2200e1160c251d5ea1ca8f5be80d';

export async function lookupVehicle(registration: string): Promise<VehicleData> {
  try {
    const response = await fetch(`${API_URL}?reg=${registration}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Vehicle lookup failed');
    }

    const data = await response.json();
    return {
      make: data.make,
      model: data.model,
      engineCC: data.engine_capacity,
      year: data.year_of_manufacture
    };
  } catch (error) {
    console.error('Vehicle API Error:', error);
    throw new Error('Failed to fetch vehicle details');
  }
}