interface Environment {
  APP_URL: string;
  APP_NAME: string;
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;
  COMPANY_PHONE: string;
  COMPANY_EMAIL: string;
}

export const env: Environment = {
  APP_URL: import.meta.env.VITE_APP_URL || window.location.origin,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Gatwick Tuning CRM',
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'Gatwick Tuning Ltd',
  COMPANY_ADDRESS: import.meta.env.VITE_COMPANY_ADDRESS || '123 Example Street, Gatwick RH6 0NP',
  COMPANY_PHONE: import.meta.env.VITE_COMPANY_PHONE || '01293 123456',
  COMPANY_EMAIL: import.meta.env.VITE_COMPANY_EMAIL || 'info@gatwicktuning.com',
};

export const isDevelopment = import.meta.env.DEV;
export const isProduction = !isDevelopment;

export const getBaseUrl = () => env.APP_URL;