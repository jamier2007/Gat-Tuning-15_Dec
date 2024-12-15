import React from 'react';
import { formatTime } from '../../../utils/date';
import { Booking } from '../../../types';

interface BookingItemContentProps {
  booking: Booking;
}

const BookingItemContent: React.FC<BookingItemContentProps> = ({ booking }) => {
  return (
    <>
      <div className="font-medium truncate">
        {formatTime(booking.date)} - {booking.service}
      </div>
      <div className="truncate text-xs opacity-75">
        {booking.customer?.name}
      </div>
    </>
  );
};

export default BookingItemContent;