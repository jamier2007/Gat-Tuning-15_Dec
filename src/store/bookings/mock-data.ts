import { Booking } from '../../types';
import { addDays, format } from 'date-fns';

// Create bookings for the next few days
const today = new Date();
const tomorrow = addDays(today, 1);
const dayAfter = addDays(today, 2);

export const mockBookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    date: format(today, "yyyy-MM-dd'T'10:00:00"),
    service: 'Stage 1 Tuning',
    status: 'scheduled',
    notes: 'First booking of the day'
  },
  {
    id: '2',
    customerId: '2',
    date: format(tomorrow, "yyyy-MM-dd'T'14:30:00"),
    service: 'DPF Delete',
    status: 'scheduled',
    notes: 'Customer requested afternoon appointment'
  },
  {
    id: '3',
    customerId: '1',
    date: format(dayAfter, "yyyy-MM-dd'T'11:00:00"),
    service: 'EGR Delete',
    status: 'scheduled'
  }
];