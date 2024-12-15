import React from 'react';
import { Puzzle } from 'lucide-react';
import EmailSettings from '../EmailSettings';
import StripeSettings from '../StripeSettings';
import GoogleDriveSettings from '../GoogleDriveSettings';
import VehicleApiSettings from '../VehicleApiSettings';
import GetAddressSettings from '../GetAddressSettings';

interface IntegrationSettingsProps {
  settings: {
    email?: { postmarkToken?: string; fromEmail?: string };
    stripe?: { apiKey?: string; webhookSecret?: string };
    googleDrive?: { clientId?: string; clientSecret?: string; accessToken?: string };
    vehicleApi?: { apiKey?: string; enabled?: boolean };
    getAddress?: { apiKey?: string; enabled?: boolean };
  };
  onChange: (category: string, field: string, value: any) => void;
  onTest: (service: string) => Promise<void>;
  testResults: Record<string, 'success' | 'error' | 'testing' | null>;
}

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({
  settings = {},
  onChange,
  onTest,
  testResults = {}
}) => {
  // Safely access nested properties with defaults
  const email = settings.email ?? {};
  const stripe = settings.stripe ?? {};
  const googleDrive = settings.googleDrive ?? {};
  const vehicleApi = settings.vehicleApi ?? {};
  const getAddress = settings.getAddress ?? {};

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Puzzle className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Integrations</h2>
      </div>

      <EmailSettings
        postmarkToken={email.postmarkToken ?? ''}
        fromEmail={email.fromEmail ?? ''}
        onChange={(field, value) => onChange('email', field, value)}
        onTest={() => onTest('email')}
        testStatus={testResults.email}
        isConnected={!!(email.postmarkToken && email.fromEmail)}
      />

      <StripeSettings
        apiKey={stripe.apiKey ?? ''}
        webhookSecret={stripe.webhookSecret ?? ''}
        onChange={(field, value) => onChange('stripe', field, value)}
        onTest={() => onTest('stripe')}
        testStatus={testResults.stripe}
        isConnected={!!(stripe.apiKey && stripe.webhookSecret)}
      />

      <GoogleDriveSettings
        clientId={googleDrive.clientId ?? ''}
        clientSecret={googleDrive.clientSecret ?? ''}
        accessToken={googleDrive.accessToken}
        onChange={(field, value) => onChange('googleDrive', field, value)}
        onTest={() => onTest('googleDrive')}
        testStatus={testResults.googleDrive}
        isConnected={!!googleDrive.accessToken}
      />

      <VehicleApiSettings
        apiKey={vehicleApi.apiKey ?? ''}
        enabled={vehicleApi.enabled ?? false}
        onChange={(field, value) => onChange('vehicleApi', field, value)}
        onTest={() => onTest('vehicleApi')}
        testStatus={testResults.vehicleApi}
        isConnected={!!(vehicleApi.apiKey && vehicleApi.enabled)}
      />

      <GetAddressSettings
        apiKey={getAddress.apiKey ?? ''}
        enabled={getAddress.enabled ?? false}
        onChange={(field, value) => onChange('getAddress', field, value)}
        onTest={() => onTest('getAddress')}
        testStatus={testResults.getAddress}
        isConnected={!!(getAddress.apiKey && getAddress.enabled)}
      />
    </div>
  );
};

export default IntegrationSettings;