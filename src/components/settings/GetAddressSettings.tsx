import React from 'react';
import { MapPin } from 'lucide-react';
import IntegrationLink from '../IntegrationLink';

interface GetAddressSettingsProps {
  apiKey: string;
  adminKey: string;
  enabled: boolean;
  onChange: (field: string, value: string | boolean) => void;
  onTest: () => void;
  testStatus: 'success' | 'error' | 'testing' | null;
  isConnected: boolean;
}

const GetAddressSettings: React.FC<GetAddressSettingsProps> = ({
  apiKey,
  adminKey,
  enabled,
  onChange,
  onTest,
  testStatus,
  isConnected,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Address Lookup Settings</h2>
        <IntegrationLink href="https://getaddress.io/dashboard">
          GetAddress.io Dashboard
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
            placeholder="Enter GetAddress.io API key"
          />
          <p className="mt-1 text-sm text-gray-500">
            Your GetAddress.io API key can be found in your dashboard under API Keys.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Key
          </label>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => onChange('adminKey', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter GetAddress.io Admin key"
          />
          <p className="mt-1 text-sm text-gray-500">
            The Admin key is required for certain operations and can be found in your dashboard settings.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="getAddressEnabled"
            checked={enabled}
            onChange={(e) => onChange('enabled', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="getAddressEnabled" className="text-sm font-medium text-gray-700">
            Enable Address Lookup Integration
          </label>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Pricing Information</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Free tier: 20 lookups/day</li>
            <li>• Pay as you go: £0.0025 per lookup</li>
            <li>• Bulk pricing available for higher volumes</li>
          </ul>
        </div>

        <button
          onClick={onTest}
          disabled={!isConnected}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
        >
          <MapPin className="w-4 h-4" />
          <span>
            {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
          </span>
        </button>

        {testStatus === 'success' && (
          <div className="text-sm text-green-600">Connection successful!</div>
        )}
        {testStatus === 'error' && (
          <div className="text-sm text-red-600">Connection failed. Please check your API and Admin keys.</div>
        )}
      </div>
    </div>
  );
};

export default GetAddressSettings;