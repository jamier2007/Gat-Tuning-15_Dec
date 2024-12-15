import { Booking } from '../../types';

export interface BookingsState {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  moveBooking: (id: string, newDate: Date) => void;
}