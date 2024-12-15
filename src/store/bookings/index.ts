import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format, parseISO } from 'date-fns';
import { BookingsState } from './types';
import { createBookingActions } from './actions';
import { mockBookings } from './mock-data';

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: mockBookings,
      ...createBookingActions(set, get)
    }),
    {
      name: 'bookings-storage',
      version: 1,
      partialize: (state) => ({ bookings: state.bookings })
    }
  )
);