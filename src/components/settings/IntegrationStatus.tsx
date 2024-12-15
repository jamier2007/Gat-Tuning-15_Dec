import React from 'react';
import { Mail, CreditCard, Cloud, Car, MapPin } from 'lucide-react';

interface IntegrationStatusProps {
  connections: {
    email: boolean;
    stripe: boolean;
    googleDrive: boolean;
    vehicleApi: boolean;
    getAddress: boolean;
  };
}

const IntegrationStatus: React.FC<IntegrationStatusProps> = ({ connections }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Integration Status</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Mail className={`w-5 h-5 ${connections.email ? 'text-green-500' : 'text-gray-400'}`} />
            <span>Postmark Email</span>
          </div>
          <span className={connections.email ? 'text-green-500' : 'text-gray-400'}>
            {connections.email ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className={`w-5 h-5 ${connections.stripe ? 'text-green-500' : 'text-gray-400'}`} />
            <span>Stripe Payments</span>
          </div>
          <span className={connections.stripe ? 'text-green-500' : 'text-gray-400'}>
            {connections.stripe ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Cloud className={`w-5 h-5 ${connections.googleDrive ? 'text-green-500' : 'text-gray-400'}`} />
            <span>Google Drive</span>
          </div>
          <span className={connections.googleDrive ? 'text-green-500' : 'text-gray-400'}>
            {connections.googleDrive ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Car className={`w-5 h-5 ${connections.vehicleApi ? 'text-green-500' : 'text-gray-400'}`} />
            <span>Vehicle API</span>
          </div>
          <span className={connections.vehicleApi ? 'text-green-500' : 'text-gray-400'}>
            {connections.vehicleApi ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <MapPin className={`w-5 h-5 ${connections.getAddress ? 'text-green-500' : 'text-gray-400'}`} />
            <span>GetAddress.io</span>
          </div>
          <span className={connections.getAddress ? 'text-green-500' : 'text-gray-400'}>
            {connections.getAddress ? 'Connected' : 'Not Connected'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;