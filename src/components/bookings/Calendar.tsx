import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { Booking } from '../../types';

interface CalendarProps {
  currentDate: Date;
  bookings: Booking[];
  onDateChange: (date: Date) => void;
  onBookingMove: (bookingId: string, date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  bookings,
  onDateChange,
  onBookingMove
}) => {
  const handlePrevMonth = () => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <CalendarHeader />
      <CalendarGrid
        currentDate={currentDate}
        bookings={bookings}
        onBookingMove={onBookingMove}
      />
    </div>
  );
};

export default Calendar;