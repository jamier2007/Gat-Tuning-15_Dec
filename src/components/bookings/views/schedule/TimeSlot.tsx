import React from 'react';
import { useDrop } from 'react-dnd';
import { Clock } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { Booking } from '../../../../types';
import DraggableBooking from './DraggableBooking';

interface TimeSlotProps {
  date: Date;
  time: string;
  bookings: Booking[];
  getCustomerName: (customerId: string) => string | undefined;
  onDrop: (bookingId: string, date: Date) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  date,
  time,
  bookings,
  getCustomerName,
  onDrop
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'booking',
    drop: (item: { id: string }) => {
      const targetDate = new Date(date);
      const [hours, minutes] = time.split(':').map(Number);
      targetDate.setHours(hours, minutes, 0, 0);
      onDrop(item.id, targetDate);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  const slotBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return (
      isSameDay(bookingDate, date) &&
      format(bookingDate, 'HH:mm') === time
    );
  });

  return (
    <div
      ref={drop}
      className={`
        p-2 rounded-lg border transition-colors min-h-[60px]
        ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
      `}
    >
      <div className="flex items-center space-x-2 mb-2">
        <Clock className="w-4 h-4 text-gray-400" />
        <span className="text-sm">{time}</span>
      </div>

      <div className="space-y-2">
        {slotBookings.map(booking => (
          <DraggableBooking
            key={booking.id}
            booking={booking}
            customerName={getCustomerName(booking.customerId)}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;