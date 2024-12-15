import { useSettingsStore } from '../store/settings';

// Get the current URL, handling both development and production environments
const getCurrentBaseUrl = () => {
  // For development
  if (import.meta.env.DEV) {
    return window.location.origin;
  }
  
  // For production
  return import.meta.env.VITE_APP_URL || window.location.origin;
};

export const GOOGLE_DRIVE_CONFIG = {
  auth_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  token_endpoint: 'https://oauth2.googleapis.com/token',
  get redirect_uri() {
    return `${getCurrentBaseUrl()}/settings/oauth/google-drive/callback`;
  },
  scope: 'https://www.googleapis.com/auth/drive.file',
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent'
};

export const initiateGoogleDriveAuth = () => {
  const { settings } = useSettingsStore.getState();
  const { clientId } = settings.googleDrive;

  if (!clientId) {
    console.error('Google Drive client ID is not configured');
    return;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: GOOGLE_DRIVE_CONFIG.redirect_uri,
    response_type: GOOGLE_DRIVE_CONFIG.response_type,
    scope: GOOGLE_DRIVE_CONFIG.scope,
    access_type: GOOGLE_DRIVE_CONFIG.access_type,
    prompt: GOOGLE_DRIVE_CONFIG.prompt
  });

  window.location.href = `${GOOGLE_DRIVE_CONFIG.auth_endpoint}?${params.toString()}`;
};