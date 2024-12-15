import React, { useState } from 'react';
import { Car, Edit2, Save, X } from 'lucide-react';
import { Vehicle, FuelType, TransmissionType } from '../../types';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onUpdate: (vehicle: Vehicle) => void;
  isEditable?: boolean;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
  vehicle,
  onUpdate,
  isEditable = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState(vehicle);

  if (!isEditable || !isEditing) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Car className="w-5 h-5 text-gray-400" />
            <div>
              <div className="font-medium">{vehicle.registration}</div>
              <div className="text-sm text-gray-600">
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </div>
              <div className="text-sm text-gray-600">
                {vehicle.engineSize} {vehicle.fuelType} {vehicle.transmission}
              </div>
            </div>
          </div>
          {isEditable && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onUpdate(editedVehicle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedVehicle(vehicle);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration
          </label>
          <input
            type="text"
            value={editedVehicle.registration}
            onChange={(e) => setEditedVehicle({ ...editedVehicle, registration: e.target.value.toUpperCase() })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Make
          </label>
          <input
            type="text"
            value={editedVehicle.make}
            onChange={(e) => setEditedVehicle({ ...editedVehicle, make: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <input
            type="text"
            value={editedVehicle.model}
            onChange={(e) => setEditedVehicle({ ...editedVehicle, model: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            type="number"
            value={editedVehicle.year}
            onChange={(e) => setEditedVehicle({ ...editedVehicle, year: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Engine Size
          </label>
          <input
            type="text"
            value={editedVehicle.engineSize || ''}
            onChange={(e) => setEditedVehicle({ ...editedVehicle, engineSize: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ECU Type
          </label>
          <input
            type="text"
            value={editedVehicle.ecuType}
            onChange={(e) => setEditedVehicle({ ...editedVehicle, ecuType: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fuel Type
          </label>
          <select
            value={editedVehicle.fuelType}
            onChange={(e) => setEditedVehicle({ ...editedVehicle, fuelType: e.target.value as FuelType })}
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
            value={editedVehicle.transmission}
            onChange={(e) => setEditedVehicle({ ...editedVehicle, transmission: e.target.value as TransmissionType })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="manual">Manual</option>
            <option value="auto">Automatic</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handleCancel}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          onClick={handleSave}
          className="p-2 text-green-600 hover:text-green-800"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;