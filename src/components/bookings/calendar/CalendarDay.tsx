import React from 'react';
import { format, isToday } from 'date-fns';
import { useDrop } from 'react-dnd';
import { Booking } from '../../../types';
import { filterBookingsByDate } from '../../../utils/bookings';
import BookingItem from './BookingItem';

interface CalendarDayProps {
  date: Date | null;
  bookings: Booking[];
  isCurrentMonth: boolean;
  onBookingMove: (bookingId: string, date: Date) => void;
  onBookingClick: (booking: Booking) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  bookings,
  isCurrentMonth,
  onBookingMove,
  onBookingClick
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'booking',
    drop: (item: { id: string }) => {
      if (date) {
        onBookingMove(item.id, date);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  if (!date) {
    return <div className="h-32 bg-gray-50" />;
  }

  const dayBookings = filterBookingsByDate(bookings, date);
  const isCurrentDate = isToday(date);

  return (
    <div
      ref={drop}
      className={`
        h-32 p-2 bg-white border-r border-b relative
        ${!isCurrentMonth ? 'bg-gray-50' : ''}
        ${isOver ? 'bg-blue-50' : ''}
        ${isCurrentDate ? 'ring-2 ring-blue-500 ring-inset' : ''}
      `}
    >
      <div className={`
        text-sm font-medium mb-1
        ${isCurrentDate ? 'text-blue-600' : 'text-gray-500'}
      `}>
        {format(date, 'd')}
      </div>
      <div className="mt-1 space-y-1">
        {dayBookings.map((booking) => (
          <BookingItem
            key={booking.id}
            booking={booking}
            onClick={() => onBookingClick(booking)}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;