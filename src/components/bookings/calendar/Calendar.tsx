import React, { useState } from 'react';
import { format, isSameMonth } from 'date-fns';
import { Booking } from '../../../types';
import CalendarNavigation from './CalendarNavigation';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import MobileCalendar from './MobileCalendar';
import BookingEditor from '../BookingEditor';
import { useBookingsStore } from '../../../store';

interface CalendarProps {
  currentDate: Date;
  bookings: Booking[];
  onDateChange: (date: Date) => void;
  onBookingMove: (bookingId: string, date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  bookings,
  onDateChange,
  onBookingMove
}) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { updateBooking } = useBookingsStore();

  const handlePrevMonth = () => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleBookingUpdate = (updates: Partial<Booking>) => {
    if (selectedBooking) {
      updateBooking(selectedBooking.id, updates);
      setSelectedBooking(null);
    }
  };

  // Filter bookings for current month
  const monthBookings = bookings.filter(booking => 
    isSameMonth(new Date(booking.date), currentDate)
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <CalendarNavigation
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      
      {/* Desktop Calendar View */}
      <div className="hidden md:block">
        <CalendarHeader />
        <CalendarGrid
          currentDate={currentDate}
          bookings={bookings}
          onBookingMove={onBookingMove}
          onBookingClick={handleBookingClick}
        />
      </div>

      {/* Mobile Calendar View */}
      <div className="md:hidden">
        <MobileCalendar
          currentDate={currentDate}
          bookings={monthBookings}
          onBookingMove={onBookingMove}
          onBookingClick={handleBookingClick}
        />
      </div>

      {/* Booking Editor Modal */}
      {selectedBooking && (
        <BookingEditor
          booking={selectedBooking}
          onSave={handleBookingUpdate}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default Calendar;