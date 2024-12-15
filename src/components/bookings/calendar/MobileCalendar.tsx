import React from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isToday } from 'date-fns';
import { Booking } from '../../../types';
import { filterBookingsByDate } from '../../../utils/bookings';
import { useCustomersStore } from '../../../store';

interface MobileCalendarProps {
  currentDate: Date;
  bookings: Booking[];
  onBookingMove: (bookingId: string, date: Date) => void;
  onBookingClick: (booking: Booking) => void;
}

const MobileCalendar: React.FC<MobileCalendarProps> = ({
  currentDate,
  bookings,
  onBookingMove,
  onBookingClick
}) => {
  const { customers } = useCustomersStore();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name || 'Unknown Customer';
  };

  return (
    <div className="divide-y">
      {days.map(day => {
        const dayBookings = filterBookingsByDate(bookings, day);
        if (dayBookings.length === 0) return null;

        return (
          <div key={day.toISOString()} className="p-4">
            <div className={`
              text-sm font-medium mb-2
              ${isToday(day) ? 'text-blue-600' : 'text-gray-600'}
            `}>
              {format(day, 'EEEE, MMMM d')}
            </div>
            <div className="space-y-2">
              {dayBookings.map(booking => (
                <div
                  key={booking.id}
                  onClick={() => onBookingClick(booking)}
                  className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        {format(new Date(booking.date), 'h:mm a')}
                      </div>
                      <div className="text-sm text-gray-600">
                        {getCustomerName(booking.customerId)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {booking.service}
                      </div>
                    </div>
                    <div className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${booking.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                      ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {booking.status}
                    </div>
                  </div>
                  {booking.notes && (
                    <div className="mt-2 text-sm text-gray-500">
                      {booking.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileCalendar;