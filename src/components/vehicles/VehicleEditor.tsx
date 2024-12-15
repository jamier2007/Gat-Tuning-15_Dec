import React, { useState } from 'react';
import { VehicleDetails, FuelType, TransmissionType } from '../../types/vehicle';

interface VehicleEditorProps {
  vehicle: VehicleDetails;
  onSave: (updates: Partial<VehicleDetails>) => void;
  onCancel: () => void;
}

const VehicleEditor: React.FC<VehicleEditorProps> = ({
  vehicle,
  onSave,
  onCancel
}) => {
  const [registration, setRegistration] = useState(vehicle.registration);
  const [make, setMake] = useState(vehicle.make);
  const [model, setModel] = useState(vehicle.model);
  const [year, setYear] = useState(vehicle.year.toString());
  const [engineSize, setEngineSize] = useState(vehicle.engineSize || '');
  const [ecuType, setEcuType] = useState(vehicle.ecuType);
  const [fuelType, setFuelType] = useState<FuelType>(vehicle.fuelType);
  const [transmission, setTransmission] = useState<TransmissionType>(vehicle.transmission);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      registration,
      make,
      model,
      year: parseInt(year),
      engineSize: engineSize || undefined,
      ecuType,
      fuelType,
      transmission
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Edit Vehicle Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration
            </label>
            <input
              type="text"
              value={registration}
              onChange={(e) => setRegistration(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Engine Size
            </label>
            <input
              type="text"
              value={engineSize}
              onChange={(e) => setEngineSize(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2.0L"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ECU Type
            </label>
            <input
              type="text"
              value={ecuType}
              onChange={(e) => setEcuType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fuel Type
            </label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value as FuelType)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transmission
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as TransmissionType)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="manual">Manual</option>
              <option value="auto">Automatic</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleEditor;