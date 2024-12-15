import { StateCreator } from 'zustand';
import { BookingsState } from './types';
import { format } from 'date-fns';

export const createBookingActions = (
  set: StateCreator<BookingsState>['setState']
) => ({
  addBooking: (booking) => {
    const newBooking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    set((state) => ({
      bookings: [...state.bookings, newBooking]
    }));
  },
  
  updateBooking: (id, updates) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id ? { ...booking, ...updates } : booking
      )
    }));
  },
  
  moveBooking: (id, newDate) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id
          ? { ...booking, date: format(newDate, "yyyy-MM-dd'T'HH:mm:ss") }
          : booking
      )
    }));
  }
});