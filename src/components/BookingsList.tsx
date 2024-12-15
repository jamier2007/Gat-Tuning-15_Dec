import React from 'react';
import { format, isAfter, addDays } from 'date-fns';
import { useBookingsStore, useCustomersStore } from '../store';

const BookingsList = () => {
  const { bookings } = useBookingsStore();
  const { customers } = useCustomersStore();

  // Get only upcoming bookings for the next 7 days that are scheduled
  const now = new Date();
  const weekEnd = addDays(now, 7);
  
  const upcomingBookings = bookings
    .filter(booking => 
      booking.status === 'scheduled' && 
      isAfter(new Date(booking.date), now) &&
      !isAfter(new Date(booking.date), weekEnd)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name;
  };

  return (
    <div className="divide-y divide-gray-200">
      {upcomingBookings.length === 0 ? (
        <div className="py-4 text-center text-gray-500">
          No upcoming bookings
        </div>
      ) : (
        upcomingBookings.map((booking) => (
          <div key={booking.id} className="py-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{getCustomerName(booking.customerId)}</h4>
                <p className="text-sm text-gray-600">{booking.service}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {format(new Date(booking.date), 'MMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(booking.date), 'h:mm a')}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingsList;