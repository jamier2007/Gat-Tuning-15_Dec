import React from 'react';
import { Car, Edit2 } from 'lucide-react';
import { VehicleDetails } from '../../types/vehicle';

interface VehicleListProps {
  vehicles: VehicleDetails[];
  onSelect: (vehicleId: string) => void;
  onEdit: (vehicleId: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onSelect,
  onEdit
}) => {
  const formatFuelType = (fuelType: string = 'diesel') => {
    return fuelType.charAt(0).toUpperCase() + fuelType.slice(1);
  };

  const formatTransmission = (transmission: string = 'manual') => {
    return transmission === 'auto' ? 'Automatic' : 'Manual';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registration
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(vehicle.id)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Car className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{vehicle.registration}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  <div>{vehicle.make} {vehicle.model}</div>
                  <div className="text-gray-500">
                    {vehicle.year} - {formatFuelType(vehicle.fuelType)}{' '}
                    ({formatTransmission(vehicle.transmission)})
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  <div>{vehicle.customer.name}</div>
                  <div className="text-gray-500">{vehicle.customer.phone}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {vehicle.notes.length} notes
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(vehicle.id);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;