import React from 'react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalendarHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7 gap-px mb-1">
      {WEEKDAYS.map((day) => (
        <div
          key={day}
          className="text-center py-2 text-sm font-medium text-gray-500"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;