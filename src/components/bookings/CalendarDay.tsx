import React from 'react';
import { format } from 'date-fns';
import { useDrop } from 'react-dnd';
import { Booking } from '../../types';
import BookingItem from './BookingItem';

interface CalendarDayProps {
  date: Date | null;
  bookings: Booking[];
  isCurrentMonth: boolean;
  onBookingMove: (bookingId: string, date: Date) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  bookings,
  isCurrentMonth,
  onBookingMove
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

  return (
    <div
      ref={drop}
      className={`
        h-32 p-2 bg-white border-r border-b
        ${!isCurrentMonth ? 'bg-gray-50' : ''}
        ${isOver ? 'bg-blue-50' : ''}
      `}
    >
      <div className="text-sm font-medium text-gray-500">
        {format(date, 'd')}
      </div>
      <div className="mt-1 space-y-1">
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;