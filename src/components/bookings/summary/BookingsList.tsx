import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Check, Receipt } from 'lucide-react';
import { Booking } from '../../../types';
import BookingEditor from '../BookingEditor';
import { getBookingStatusColor } from '../../../utils/bookings';

interface BookingsListProps {
  bookings: Booking[];
  getCustomerName: (customerId: string) => string | undefined;
}

const BookingsList: React.FC<BookingsListProps> = ({ bookings, getCustomerName }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="space-y-4">
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No bookings scheduled for today
        </div>
      ) : (
        bookings.map((booking) => (
          <div 
            key={booking.id} 
            className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{getCustomerName(booking.customerId)}</div>
                <div className="text-sm text-gray-600">{booking.service}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(booking.date), 'h:mm a')}
                </div>
                {booking.notes && (
                  <div className="mt-1 text-sm text-gray-500">{booking.notes}</div>
                )}
              </div>
              <div className="flex items-start space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBookingStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                <button
                  onClick={() => handleEdit(booking)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {selectedBooking && (
        <BookingEditor
          booking={selectedBooking}
          onSave={() => setSelectedBooking(null)}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default BookingsList;