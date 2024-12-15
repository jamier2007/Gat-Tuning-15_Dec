import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useSettingsStore } from '../store';
import GeneralSettings from '../components/settings/sections/GeneralSettings';
import IntegrationSettings from '../components/settings/sections/IntegrationSettings';
import IntegrationStatus from '../components/settings/IntegrationStatus';

const Settings = () => {
  const { settings = {}, updateSettings } = useSettingsStore(); // Provide default value for settings
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<Record<string, 'success' | 'error' | 'testing' | null>>({
    email: null,
    stripe: null,
    googleDrive: null,
    vehicleApi: null,
    getAddress: null,
  });

  const handleChange = (category: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] ?? {}), // Ensure the category exists or use an empty object
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      await updateSettings(formData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
    }
    setIsSaving(false);
  };

  const handleTest = async (service: string) => {
    setTestResults(prev => ({ ...prev, [service]: 'testing' }));
    try {
      const success = await testService(service);
      setTestResults(prev => ({ ...prev, [service]: success ? 'success' : 'error' }));
      setTimeout(() => {
        setTestResults(prev => ({ ...prev, [service]: null }));
      }, 3000);
    } catch (error) {
      console.error(`Error testing service ${service}:`, error);
      setTestResults(prev => ({ ...prev, [service]: 'error' }));
      setTimeout(() => {
        setTestResults(prev => ({ ...prev, [service]: null }));
      }, 3000);
    }
  };

  const testService = async (service: string): Promise<boolean> => {
    // Simulated service testing logic
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Settings saved successfully
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error saving settings. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GeneralSettings
            bookingSettings={formData.bookings ?? {}} // Ensure bookings is defined
            onChange={handleChange}
          />
        </div>

        <div className="space-y-6">
          <IntegrationSettings
            settings={formData ?? {}} // Ensure settings is defined
            onChange={handleChange}
            onTest={handleTest}
            testResults={testResults}
          />

          <IntegrationStatus
            connections={{
              email: !!(formData?.email?.postmarkToken && formData?.email?.fromEmail),
              stripe: !!(formData?.stripe?.apiKey && formData?.stripe?.webhookSecret),
              googleDrive: !!formData?.googleDrive?.accessToken,
              vehicleApi: !!(formData?.vehicleApi?.apiKey && formData?.vehicleApi?.enabled),
              getAddress: !!(formData?.getAddress?.apiKey && formData?.getAddress?.enabled),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;