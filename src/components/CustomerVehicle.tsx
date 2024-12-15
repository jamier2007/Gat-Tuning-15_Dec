import React, { useState } from 'react';
import { Car, Edit2, Save, X } from 'lucide-react';
import { Vehicle } from '../types';
import VehicleLookup from './VehicleLookup';

interface CustomerVehicleProps {
  vehicle: Vehicle;
  onUpdate: (updatedVehicle: Vehicle) => void;
}

const CustomerVehicle: React.FC<CustomerVehicleProps> = ({ vehicle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState(vehicle);
  const [showLookup, setShowLookup] = useState(false);

  const handleSave = () => {
    onUpdate(editedVehicle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedVehicle(vehicle);
    setIsEditing(false);
  };

  const handleVehicleFound = (data: any) => {
    setEditedVehicle({
      ...editedVehicle,
      make: data.make,
      model: data.model,
      year: data.year,
      ecuType: editedVehicle.ecuType,
      registration: editedVehicle.registration
    });
    setShowLookup(false);
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration
            </label>
            <input
              type="text"
              value={editedVehicle.registration}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, registration: e.target.value })}
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
              Engine Size (CC)
            </label>
            <input
              type="text"
              value={editedVehicle.engineSize || ''}
              onChange={(e) => setEditedVehicle({ ...editedVehicle, engineSize: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2000cc"
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
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-3 py-2 text-gray-600 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-2 text-green-600 hover:text-green-800"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car className="w-5 h-5 text-gray-400" />
          <div>
            <div className="font-medium">{vehicle.registration}</div>
            <div className="text-sm text-gray-500">
              {vehicle.make} {vehicle.model} ({vehicle.year})
              {vehicle.engineSize && ` - ${vehicle.engineSize}`}
            </div>
            <div className="text-sm text-gray-500">{vehicle.ecuType}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowLookup(true)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Lookup
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {showLookup && (
        <div className="mt-4">
          <VehicleLookup onVehicleFound={handleVehicleFound} />
        </div>
      )}
    </div>
  );
};

export default CustomerVehicle;