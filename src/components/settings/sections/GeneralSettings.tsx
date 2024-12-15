import React from 'react';
import { Settings } from 'lucide-react';
import BookingSettings from '../BookingSettings';

interface GeneralSettingsProps {
  bookingSettings: {
    timeSlotDuration?: number;
    workingHours?: {
      start: string;
      end: string;
    };
  };
  onChange: (category: string, field: string, value: any) => void;
}

const defaultWorkingHours = {
  start: '09:00',
  end: '18:00'
};

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  bookingSettings = {},
  onChange
}) => {
  // Ensure we have default values if settings are undefined
  const timeSlotDuration = bookingSettings.timeSlotDuration ?? 90;
  const workingHours = bookingSettings.workingHours ?? defaultWorkingHours;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">General Settings</h2>
      </div>

      <BookingSettings
        timeSlotDuration={timeSlotDuration}
        workingHours={workingHours}
        onChange={(field, value) => onChange('bookings', field, value)}
      />
    </div>
  );
};

export default GeneralSettings;