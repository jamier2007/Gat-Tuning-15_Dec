import React from 'react';
import { Mail } from 'lucide-react';
import IntegrationLink from '../IntegrationLink';

interface EmailSettingsProps {
  postmarkToken: string;
  fromEmail: string;
  onChange: (field: string, value: string) => void;
  onTest: () => void;
  testStatus: 'success' | 'error' | 'testing' | null;
  isConnected: boolean;
}

const EmailSettings: React.FC<EmailSettingsProps> = ({
  postmarkToken,
  fromEmail,
  onChange,
  onTest,
  testStatus,
  isConnected,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Email Integration</h2>
        <IntegrationLink href="https://account.postmarkapp.com">
          Postmark Dashboard
        </IntegrationLink>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postmark Server Token
          </label>
          <input
            type="password"
            value={postmarkToken}
            onChange={(e) => onChange('postmarkToken', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="postmark_server_token"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Email Address
          </label>
          <input
            type="email"
            value={fromEmail}
            onChange={(e) => onChange('fromEmail', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="notifications@yourdomain.com"
          />
        </div>
        <button
          onClick={onTest}
          disabled={!isConnected}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
        >
          <Mail className="w-4 h-4" />
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

export default EmailSettings;