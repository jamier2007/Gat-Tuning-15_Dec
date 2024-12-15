import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth } from 'date-fns';
import { Booking } from '../../../types';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  currentDate: Date;
  bookings: Booking[];
  onBookingMove: (bookingId: string, date: Date) => void;
  onBookingClick: (booking: Booking) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  bookings,
  onBookingMove,
  onBookingClick
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days to start from Monday
  const startPadding = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;
  const paddedDays = Array(startPadding).fill(null).concat(days);

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {paddedDays.map((day, index) => (
        <CalendarDay
          key={day ? format(day, 'yyyy-MM-dd') : `padding-${index}`}
          date={day}
          bookings={bookings}
          isCurrentMonth={day ? isSameMonth(day, currentDate) : false}
          onBookingMove={onBookingMove}
          onBookingClick={onBookingClick}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;