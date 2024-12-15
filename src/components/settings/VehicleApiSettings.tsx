import React from 'react';
import { Car } from 'lucide-react';
import IntegrationLink from '../IntegrationLink';

interface VehicleApiSettingsProps {
  apiKey: string;
  enabled: boolean;
  onChange: (field: string, value: string | boolean) => void;
  onTest: () => void;
  testStatus: 'success' | 'error' | 'testing' | null;
  isConnected: boolean;
}

const VehicleApiSettings: React.FC<VehicleApiSettingsProps> = ({
  apiKey,
  enabled,
  onChange,
  onTest,
  testStatus,
  isConnected,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Vehicle API Settings</h2>
        <IntegrationLink href="https://www.checkcardetails.co.uk">
          Vehicle API Dashboard
        </IntegrationLink>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onChange('apiKey', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter API key"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="vehicleApiEnabled"
            checked={enabled}
            onChange={(e) => onChange('enabled', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="vehicleApiEnabled" className="text-sm font-medium text-gray-700">
            Enable Vehicle API Integration
          </label>
        </div>
        <button
          onClick={onTest}
          disabled={!isConnected}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
        >
          <Car className="w-4 h-4" />
          <span>
            {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
          </span>
        </button>
        {testStatus === 'success' && (
          <div className="text-sm text-green-600">Connection successful!</div>
        )}
        {testStatus === 'error' && (
          <div className="text-sm text-red-600">Connection failed. Please check your credentials.</div>
        )}
      </div>
    </div>
  );
};

export default VehicleApiSettings;