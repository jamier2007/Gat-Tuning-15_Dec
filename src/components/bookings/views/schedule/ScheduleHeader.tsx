import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, format } from 'date-fns';

interface ScheduleHeaderProps {
  startDate: Date;
  onDateChange: (date: Date) => void;
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  startDate,
  onDateChange
}) => {
  const handlePrevWeek = () => onDateChange(addDays(startDate, -7));
  const handleNextWeek = () => onDateChange(addDays(startDate, 7));

  return (
    <div className="bg-white border-b p-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">
          {format(startDate, 'MMMM d')} - {format(addDays(startDate, 6), 'MMMM d, yyyy')}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevWeek}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHeader;