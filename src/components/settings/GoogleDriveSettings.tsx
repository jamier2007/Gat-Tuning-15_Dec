import React from 'react';
import { Cloud } from 'lucide-react';
import IntegrationLink from '../IntegrationLink';
import { initiateGoogleDriveAuth } from '../../config/oauth';

interface GoogleDriveSettingsProps {
  clientId: string;
  clientSecret: string;
  accessToken?: string;
  onChange: (field: string, value: string) => void;
  onTest: () => void;
  testStatus: 'success' | 'error' | 'testing' | null;
  isConnected: boolean;
}

const GoogleDriveSettings: React.FC<GoogleDriveSettingsProps> = ({
  clientId,
  clientSecret,
  accessToken,
  onChange,
  onTest,
  testStatus,
  isConnected,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Storage Settings</h2>
        <IntegrationLink href="https://console.cloud.google.com">
          Google Cloud Console
        </IntegrationLink>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Drive Client ID
          </label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => onChange('clientId', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your-client-id"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Drive Client Secret
          </label>
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => onChange('clientSecret', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your-client-secret"
          />
        </div>
        {!accessToken ? (
          <button
            onClick={() => initiateGoogleDriveAuth()}
            disabled={!clientId || !clientSecret}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            <Cloud className="w-4 h-4" />
            <span>Connect Google Drive</span>
          </button>
        ) : (
          <button
            onClick={onTest}
            disabled={!isConnected}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
          >
            <Cloud className="w-4 h-4" />
            <span>
              {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
            </span>
          </button>
        )}
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

export default GoogleDriveSettings;