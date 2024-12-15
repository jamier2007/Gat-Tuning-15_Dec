import React from 'react';
import { format } from 'date-fns';
import { useDrag } from 'react-dnd';
import { Booking } from '../../types';

interface BookingItemProps {
  booking: Booking;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
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
      className={`
        p-1 text-xs rounded-lg cursor-move
        ${isDragging ? 'opacity-50' : ''}
        ${booking.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
      `}
    >
      <div className="font-medium truncate">
        {format(new Date(booking.date), 'HH:mm')} - {booking.service}
      </div>
      <div className="truncate text-xs opacity-75">
        {booking.customer?.name}
      </div>
    </div>
  );
};

export default BookingItem;