import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { lookupVehicle } from '../utils/vehicleApi';
import { VehicleData } from '../types';

interface VehicleLookupProps {
  onVehicleFound: (data: VehicleData) => void;
}

const VehicleLookup: React.FC<VehicleLookupProps> = ({ onVehicleFound }) => {
  const [registration, setRegistration] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await lookupVehicle(registration);
      onVehicleFound(data);
      setRegistration('');
    } catch (err) {
      setError('Could not find vehicle details. Please check the registration number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1">
          <input
            type="text"
            value={registration}
            onChange={(e) => setRegistration(e.target.value.toUpperCase())}
            placeholder="Enter registration (e.g., AB12CDE)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="^[A-Z0-9 ]*$"
            maxLength={8}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <span className="animate-spin">⌛</span>
              <span>Searching...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Lookup</span>
            </span>
          )}
        </button>
      </form>

      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default VehicleLookup;