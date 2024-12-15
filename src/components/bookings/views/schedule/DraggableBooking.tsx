import React from 'react';
import { useDrag } from 'react-dnd';
import { Booking } from '../../../../types';
import { getBookingStatusColor } from '../../../../utils/bookings';

interface DraggableBookingProps {
  booking: Booking;
  customerName?: string;
}

const DraggableBooking: React.FC<DraggableBookingProps> = ({
  booking,
  customerName
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'booking',
    item: { id: booking.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className={`
        p-2 rounded-lg cursor-move transition-all
        ${getBookingStatusColor(booking.status)}
        ${isDragging ? 'opacity-50 scale-95 shadow-lg' : 'opacity-100 scale-100'}
        hover:shadow-md
      `}
    >
      <div className="font-medium truncate">{customerName}</div>
      <div className="text-sm opacity-75 truncate">{booking.service}</div>
    </div>
  );
};

export default DraggableBooking;