import React from 'react';
import { Clock } from 'lucide-react';

interface BookingSettingsProps {
  timeSlotDuration: number;
  workingHours: {
    start: string;
    end: string;
  };
  onChange: (field: string, value: any) => void;
}

const defaultWorkingHours = {
  start: '09:00',
  end: '18:00'
};

const BookingSettings: React.FC<BookingSettingsProps> = ({
  timeSlotDuration = 90,
  workingHours = defaultWorkingHours,
  onChange
}) => {
  const timeSlotOptions = [
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Booking Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Slot Duration
          </label>
          <select
            value={timeSlotDuration}
            onChange={(e) => onChange('timeSlotDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeSlotOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            This will determine the length of each booking slot in the calendar
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Working Hours Start
            </label>
            <input
              type="time"
              value={workingHours.start}
              onChange={(e) => onChange('workingHours', { ...workingHours, start: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Working Hours End
            </label>
            <input
              type="time"
              value={workingHours.end}
              onChange={(e) => onChange('workingHours', { ...workingHours, end: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSettings;