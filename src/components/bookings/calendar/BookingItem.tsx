import React from 'react';
import { format } from 'date-fns';
import { useDrag } from 'react-dnd';
import { Booking } from '../../../types';
import { getBookingStatusColor } from '../../../utils/bookings';

interface BookingItemProps {
  booking: Booking;
  onClick: () => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'booking',
    item: { id: booking.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      onClick={onClick}
      className={`
        p-1 text-xs rounded-lg cursor-pointer transition-colors
        ${isDragging ? 'opacity-50' : ''}
        ${getBookingStatusColor(booking.status)}
        hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50
      `}
    >
      <div className="font-medium truncate">
        {format(new Date(booking.date), 'HH:mm')} - {booking.service}
      </div>
    </div>
  );
};

export default BookingItem;