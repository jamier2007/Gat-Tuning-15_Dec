import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VehicleDetails, VehicleStore } from '../types/vehicle';

// Initial mock data
const mockVehicles: VehicleDetails[] = [
  {
    id: '1',
    registration: 'AB19XYZ',
    make: 'BMW',
    model: '320d',
    year: 2019,
    engineSize: '2.0L',
    ecuType: 'Bosch EDC17',
    fuelType: 'diesel',
    transmission: 'auto',
    customer: {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '07700 900123',
      vehicle: {
        make: 'BMW',
        model: '320d',
        year: 2019,
        ecuType: 'Bosch EDC17',
        registration: 'AB19XYZ',
        engineSize: '2.0L',
        fuelType: 'diesel',
        transmission: 'auto'
      },
      tuningHistory: []
    },
    notes: [
      {
        id: '1',
        content: 'Stage 1 remap completed',
        createdAt: '2024-03-15T10:00:00',
        updatedBy: 'jamie'
      }
    ],
    createdAt: '2024-03-15T10:00:00',
    updatedAt: '2024-03-15T10:00:00'
  },
  {
    id: '2',
    registration: 'CD20ABC',
    make: 'Audi',
    model: 'A4',
    year: 2020,
    engineSize: '2.0L',
    ecuType: 'Bosch MED17',
    fuelType: 'diesel',
    transmission: 'manual',
    customer: {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '07700 900456',
      vehicle: {
        make: 'Audi',
        model: 'A4',
        year: 2020,
        ecuType: 'Bosch MED17',
        registration: 'CD20ABC',
        engineSize: '2.0L',
        fuelType: 'diesel',
        transmission: 'manual'
      },
      tuningHistory: []
    },
    notes: [],
    createdAt: '2024-03-16T14:30:00',
    updatedAt: '2024-03-16T14:30:00'
  }
];

const useVehicleStore = create<VehicleStore>()(
  persist(
    (set) => ({
      vehicles: mockVehicles,
      
      addVehicle: (vehicle) => {
        const newVehicle: VehicleDetails = {
          ...vehicle,
          id: Math.random().toString(36).substr(2, 9),
          notes: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // Ensure default values for new fields
          fuelType: vehicle.fuelType || 'diesel',
          transmission: vehicle.transmission || 'manual',
        };

        set((state) => ({
          vehicles: [...state.vehicles, newVehicle]
        }));
      },

      updateVehicle: (id, updates) => {
        set((state) => ({
          vehicles: state.vehicles.map((vehicle) =>
            vehicle.id === id
              ? { ...vehicle, ...updates, updatedAt: new Date().toISOString() }
              : vehicle
          )
        }));
      },

      addNote: (vehicleId, content, updatedBy) => {
        set((state) => ({
          vehicles: state.vehicles.map((vehicle) =>
            vehicle.id === vehicleId
              ? {
                  ...vehicle,
                  notes: [
                    ...vehicle.notes,
                    {
                      id: Math.random().toString(36).substr(2, 9),
                      content,
                      createdAt: new Date().toISOString(),
                      updatedBy
                    }
                  ],
                  updatedAt: new Date().toISOString()
                }
              : vehicle
          )
        }));
      },

      deleteNote: (vehicleId, noteId) => {
        set((state) => ({
          vehicles: state.vehicles.map((vehicle) =>
            vehicle.id === vehicleId
              ? {
                  ...vehicle,
                  notes: vehicle.notes.filter((note) => note.id !== noteId),
                  updatedAt: new Date().toISOString()
                }
              : vehicle
          )
        }));
      }
    }),
    {
      name: 'vehicles-storage',
      version: 1
    }
  )
);

export default useVehicleStore;