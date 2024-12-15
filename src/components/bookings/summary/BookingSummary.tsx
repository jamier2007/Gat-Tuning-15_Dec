import React from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Booking } from '../../../types';
import { getBookingStatusColor } from '../../../utils/bookings';

interface BookingSummaryProps {
  booking: Booking;
  customerName?: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ booking, customerName }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <Calendar className="w-5 h-5 text-blue-500" />
        <div>
          <p className="font-medium">{booking.service}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(booking.date), 'h:mm a')}
          </p>
          <p className="text-sm text-gray-500">{customerName}</p>
        </div>
      </div>
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getBookingStatusColor(booking.status)}`}>
        {booking.status}
      </span>
    </div>
  );
};

export default BookingSummary;