import React from 'react';
import { CreditCard } from 'lucide-react';
import IntegrationLink from '../IntegrationLink';

interface StripeSettingsProps {
  apiKey: string;
  webhookSecret: string;
  onChange: (field: string, value: string) => void;
  onTest: () => void;
  testStatus: 'success' | 'error' | 'testing' | null;
  isConnected: boolean;
}

const StripeSettings: React.FC<StripeSettingsProps> = ({
  apiKey,
  webhookSecret,
  onChange,
  onTest,
  testStatus,
  isConnected,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Payment Settings</h2>
        <IntegrationLink href="https://dashboard.stripe.com">
          Stripe Dashboard
        </IntegrationLink>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stripe API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onChange('apiKey', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="sk_test_..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Webhook Secret
          </label>
          <input
            type="password"
            value={webhookSecret}
            onChange={(e) => onChange('webhookSecret', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="whsec_..."
          />
        </div>
        <button
          onClick={onTest}
          disabled={!isConnected}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
        >
          <CreditCard className="w-4 h-4" />
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

export default StripeSettings;