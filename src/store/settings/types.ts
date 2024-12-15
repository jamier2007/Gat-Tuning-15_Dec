export interface Settings {
  email: {
    postmarkToken: string;
    fromEmail: string;
  };
  stripe: {
    apiKey: string;
    webhookSecret: string;
  };
  googleDrive: {
    clientId: string;
    clientSecret: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  };
  vehicleApi: {
    apiKey: string;
    enabled: boolean;
  };
  getAddress: {
    apiKey: string;
    adminKey: string;
    enabled: boolean;
  };
  bookings: {
    timeSlotDuration: number;
    workingHours: {
      start: string;
      end: string;
    };
  };
}

export const initialSettings: Settings = {
  email: {
    postmarkToken: '',
    fromEmail: '',
  },
  stripe: {
    apiKey: '',
    webhookSecret: '',
  },
  googleDrive: {
    clientId: '',
    clientSecret: '',
  },
  vehicleApi: {
    apiKey: '',
    enabled: true,
  },
  getAddress: {
    apiKey: '',
    adminKey: '',
    enabled: true,
  },
  bookings: {
    timeSlotDuration: 90,
    workingHours: {
      start: '09:00',
      end: '18:00'
    }
  }
};