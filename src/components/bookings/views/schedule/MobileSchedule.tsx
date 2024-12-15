import React from 'react';
import { addDays, format, isSameDay, parseISO, startOfToday } from 'date-fns';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useBookingsStore, useCustomersStore } from '../../../../store';
import { generateTimeSlots } from '../../../../utils/schedule';
import TimeSlot from './TimeSlot';

interface MobileScheduleProps {
  workingHours: { start: string; end: string };
  timeSlotDuration: number;
}

const MobileSchedule: React.FC<MobileScheduleProps> = ({
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
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6 p-4">
        {days.map(day => {
          const dayBookings = bookings.filter(booking => 
            isSameDay(parseISO(booking.date), day)
          );

          return (
            <div key={day.toISOString()}>
              <div className={`
                text-lg font-medium mb-4 sticky top-0 bg-white py-2
                ${isSameDay(day, today) ? 'text-blue-600' : ''}
              `}>
                {format(day, 'EEEE, MMMM d')}
              </div>

              <div className="space-y-4">
                {timeSlots.map((slot) => {
                  const slotBookings = bookings.filter(booking => {
                    const bookingDate = parseISO(booking.date);
                    return isSameDay(bookingDate, day) && 
                           format(bookingDate, 'HH:mm') === slot.start;
                  });

                  if (slotBookings.length === 0) return null;

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

                {dayBookings.length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    No bookings scheduled
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DndProvider>
  );
};

export default MobileSchedule;