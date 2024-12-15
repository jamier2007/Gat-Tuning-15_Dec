import React from 'react';
import { useDrop } from 'react-dnd';
import { Clock } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { Booking } from '../../../../types';
import { getBookingStatusColor } from '../../../../utils/bookings';

interface MobileTimeSlotProps {
  date: Date;
  time: string;
  bookings: Booking[];
  getCustomerName: (customerId: string) => string | undefined;
  onDrop: (bookingId: string, date: Date) => void;
}

const MobileTimeSlot: React.FC<MobileTimeSlotProps> = ({
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

  if (slotBookings.length === 0) return null;

  return (
    <div
      ref={drop}
      className={`
        p-4 rounded-lg transition-colors
        ${isOver ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-gray-50'}
      `}
    >
      <div className="flex items-center space-x-2 mb-2">
        <Clock className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">{time}</span>
      </div>

      <div className="space-y-2">
        {slotBookings.map(booking => (
          <div
            key={booking.id}
            className={`
              p-3 rounded-lg
              ${getBookingStatusColor(booking.status)}
            `}
          >
            <div className="font-medium">
              {getCustomerName(booking.customerId)}
            </div>
            <div className="text-sm opacity-75">
              {booking.service}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileTimeSlot;