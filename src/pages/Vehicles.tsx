import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import useVehicleStore from '../store/vehicles';
import VehicleDetails from '../components/vehicles/VehicleDetails';
import VehicleEditor from '../components/vehicles/VehicleEditor';
import VehicleForm from '../components/vehicles/VehicleForm';
import VehicleList from '../components/vehicles/VehicleList';
import { useCustomersStore } from '../store/customers';

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { vehicles, addVehicle, addNote, deleteNote, updateVehicle } = useVehicleStore();
  const { customers } = useCustomersStore();

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedVehicleDetails = vehicles.find(v => v.id === selectedVehicle);

  const handleAddVehicle = (vehicleData: any) => {
    addVehicle(vehicleData);
    setIsAdding(false);
  };

  const handleSaveEdit = (updates: any) => {
    if (selectedVehicle) {
      updateVehicle(selectedVehicle, updates);
      setIsEditing(false);
    }
  };

  if (isAdding) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Add New Vehicle</h1>
          <button
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>

        <VehicleForm
          onSubmit={handleAddVehicle}
          onCancel={() => setIsAdding(false)}
          customers={customers.map(c => ({ id: c.id, name: c.name }))}
        />
      </div>
    );
  }

  if (selectedVehicleDetails) {
    if (isEditing) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Edit Vehicle</h1>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>

          <VehicleEditor
            vehicle={selectedVehicleDetails}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Vehicle Details</h1>
          <div className="space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Edit Vehicle
            </button>
            <button
              onClick={() => setSelectedVehicle(null)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Back to List
            </button>
          </div>
        </div>

        <VehicleDetails
          vehicle={selectedVehicleDetails}
          onAddNote={(content) => addNote(selectedVehicleDetails.id, content, 'user')}
          onDeleteNote={(noteId) => deleteNote(selectedVehicleDetails.id, noteId)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Vehicles</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vehicle</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <VehicleList
          vehicles={filteredVehicles}
          onSelect={setSelectedVehicle}
          onEdit={(id) => {
            setSelectedVehicle(id);
            setIsEditing(true);
          }}
        />
      </div>
    </div>
  );
};

export default Vehicles;