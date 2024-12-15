/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_COMPANY_NAME: string;
  readonly VITE_COMPANY_ADDRESS: string;
  readonly VITE_COMPANY_PHONE: string;
  readonly VITE_COMPANY_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}