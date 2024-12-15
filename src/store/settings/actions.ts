import { StateCreator } from 'zustand';
import { SettingsState } from './types';
import { initializePostmark, sendEmail } from '../../utils/email';
import { GOOGLE_DRIVE_CONFIG } from '../../config/oauth';
import { testGetAddressLookup } from '../../utils/postcode';

export const createSettingsActions = (
  set: StateCreator<SettingsState>['setState'],
  get: () => SettingsState
) => ({
  updateSettings: async (newSettings) => {
    try {
      if (newSettings.email.postmarkToken) {
        initializePostmark(newSettings.email.postmarkToken);
      }
      set({ settings: newSettings });
    } catch (error) {
      console.error('Error updating settings:', error);
      throw new Error('Failed to update settings');
    }
  },

  testEmailConnection: async () => {
    const { postmarkToken, fromEmail } = get().settings.email;
    if (!postmarkToken || !fromEmail) {
      throw new Error('Email settings not configured');
    }
    
    try {
      return await sendEmail(
        fromEmail,
        'Test Email Connection',
        'This is a test email from your CRM system.',
        '<h1>Test Email</h1><p>This is a test email from your CRM system.</p>'
      );
    } catch (error) {
      console.error('Email test failed:', error);
      return false;
    }
  },

  testStripeConnection: async () => {
    const { apiKey, webhookSecret } = get().settings.stripe;
    return !!(apiKey && webhookSecret);
  },

  testGoogleDriveConnection: async () => {
    const { accessToken } = get().settings.googleDrive;
    if (!accessToken) return false;

    try {
      const response = await fetch('https://www.googleapis.com/drive/v3/files?pageSize=1', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  testVehicleApi: async () => {
    const { apiKey, enabled } = get().settings.vehicleApi;
    if (!apiKey || !enabled) return false;

    try {
      const response = await fetch('https://www.checkcardetails.co.uk/api/vehicledata?reg=AA19AAA', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  testGetAddressApi: async () => {
    const { apiKey, enabled } = get().settings.getAddress;
    if (!apiKey || !enabled) return false;

    try {
      return await testGetAddressLookup(apiKey);
    } catch {
      return false;
    }
  },

  handleGoogleDriveCallback: async (code) => {
    try {
      const { clientId, clientSecret } = get().settings.googleDrive;
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: GOOGLE_DRIVE_CONFIG.redirect_uri,
          grant_type: 'authorization_code',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for tokens');
      }

      const data = await response.json();
      
      set(state => ({
        settings: {
          ...state.settings,
          googleDrive: {
            ...state.settings.googleDrive,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: Date.now() + (data.expires_in * 1000),
          },
        },
      }));
    } catch (error) {
      console.error('Error handling Google Drive callback:', error);
      throw error;
    }
  }
});