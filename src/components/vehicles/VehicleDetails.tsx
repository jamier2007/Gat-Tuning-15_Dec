import React from 'react';
import { Car, User, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VehicleDetails as IVehicleDetails } from '../../types/vehicle';
import VehicleNotes from './VehicleNotes';
import { formatFuelType, formatTransmission } from '../../utils/vehicle';

interface VehicleDetailsProps {
  vehicle: IVehicleDetails;
  onAddNote: (content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
  vehicle,
  onAddNote,
  onDeleteNote
}) => {
  const navigate = useNavigate();

  const handleViewCustomer = () => {
    // Navigate to customer page and trigger edit mode
    navigate(`/customers/${vehicle.customer.id}/edit`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Car className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Vehicle Information</h3>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold">{vehicle.registration}</p>
            <p className="text-gray-600">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </p>
            {vehicle.engineSize && (
              <p className="text-gray-600">Engine: {vehicle.engineSize}</p>
            )}
            <p className="text-gray-600">ECU: {vehicle.ecuType}</p>
            <p className="text-gray-600">Fuel: {formatFuelType(vehicle.fuelType)}</p>
            <p className="text-gray-600">
              Transmission: {formatTransmission(vehicle.transmission)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Owner Information</h3>
            </div>
            <button
              onClick={handleViewCustomer}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
              title="Edit customer details"
            >
              <span className="text-sm">Edit Customer</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold">{vehicle.customer.name}</p>
            <p className="text-gray-600">{vehicle.customer.email}</p>
            <p className="text-gray-600">{vehicle.customer.phone}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Vehicle Notes</h3>
        <VehicleNotes
          notes={vehicle.notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
        />
      </div>
    </div>
  );
};

export default VehicleDetails;