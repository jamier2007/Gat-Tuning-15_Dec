import React from 'react';
import { addDays, format, isSameDay, parseISO, startOfToday } from 'date-fns';
import { useBookingsStore, useCustomersStore } from '../../../../store';
import { generateTimeSlots } from '../../../../utils/schedule';
import TimeSlot from './TimeSlot';

interface ScheduleGridProps {
  workingHours: { start: string; end: string };
  timeSlotDuration: number;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  workingHours,
  timeSlotDuration
}) => {
  const { bookings, moveBooking } = useBookingsStore();
  const { customers } = useCustomersStore();
  const today = startOfToday();
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));
  const timeSlots = generateTimeSlots(workingHours.start, workingHours.end, timeSlotDuration);

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name;
  };

  const handleDrop = (bookingId: string, date: Date) => {
    moveBooking(bookingId, date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4">
      {days.map(day => (
        <div key={day.toISOString()} className="space-y-4">
          <div className={`
            text-center p-2 rounded-lg font-medium
            ${isSameDay(day, today) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}
          `}>
            <div>{format(day, 'EEEE')}</div>
            <div className="text-sm">{format(day, 'MMM d')}</div>
          </div>

          <div className="space-y-2">
            {timeSlots.map((slot) => {
              const slotBookings = bookings.filter(booking => {
                const bookingDate = parseISO(booking.date);
                return isSameDay(bookingDate, day) && 
                       format(bookingDate, 'HH:mm') === slot.start;
              });

              return (
                <TimeSlot
                  key={`${day.toISOString()}-${slot.start}`}
                  date={day}
                  time={slot.start}
                  bookings={slotBookings}
                  getCustomerName={getCustomerName}
                  onDrop={handleDrop}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleGrid;