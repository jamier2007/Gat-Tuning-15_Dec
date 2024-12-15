import { Booking } from '../types';
import { isSameDayAs } from './date';

export const filterBookingsByDate = (bookings: Booking[], date: Date | null) => {
  if (!date) return [];
  return bookings.filter(booking => isSameDayAs(booking.date, date));
};

export const getBookingStatusColor = (status: Booking['status']) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};