import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonthYear } from '../../../utils/date';

interface CalendarNavigationProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <h2 className="text-xl font-semibold">
        {formatMonthYear(currentDate)}
      </h2>
      <div className="flex space-x-2">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CalendarNavigation;