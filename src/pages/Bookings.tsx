import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import Calendar from '../components/bookings/calendar/Calendar';
import BookingsList from '../components/bookings/summary/BookingsList';
import BookingsView from '../components/bookings/views/BookingsView';
import ScheduleManager from '../components/bookings/views/ScheduleManager';
import { useCustomersStore, useBookingsStore } from '../store';
import { LeadToBookingData } from '../utils/leads';

const Bookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customers, addCustomer } = useCustomersStore();
  const { bookings, addBooking, moveBooking } = useBookingsStore();
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showScheduleManager, setShowScheduleManager] = useState(false);
  
  // Handle lead conversion data if present
  const leadData = location.state as LeadToBookingData | undefined;

  // If we have lead data, create a customer first if needed
  React.useEffect(() => {
    if (leadData) {
      // Check if customer already exists by email
      const existingCustomer = customers.find(c => c.email === leadData.customer.email);
      
      if (!existingCustomer) {
        // Create new customer from lead data
        addCustomer({
          name: leadData.customer.name,
          email: leadData.customer.email,
          phone: leadData.customer.phone,
          address: leadData.customer.address || {
            line1: '',
            city: '',
            postcode: ''
          },
          vehicle: leadData.customer.vehicle,
          tuningHistory: []
        });
      }
      
      // Show the booking form
      setShowForm(true);
    }
  }, [leadData, customers, addCustomer]);

  const handleCreateBooking = (newBooking: any) => {
    addBooking(newBooking);
    setShowForm(false);
    // Clear the location state after creating booking
    navigate('/bookings', { replace: true });
  };

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name;
  };

  if (showForm) {
    // Find the customer from lead data if present
    const initialCustomer = leadData 
      ? customers.find(c => c.email === leadData.customer.email)
      : undefined;

    return (
      <div className="max-w-4xl mx-auto">
        <BookingForm
          onSubmit={handleCreateBooking}
          onCancel={() => {
            setShowForm(false);
            navigate('/bookings', { replace: true });
          }}
          customers={customers}
          initialCustomer={initialCustomer}
          initialVehicle={leadData?.customer.vehicle}
          initialNotes={leadData?.notes}
        />
      </div>
    );
  }

  if (showAllBookings) {
    return <BookingsView bookings={bookings} onClose={() => setShowAllBookings(false)} />;
  }

  if (showScheduleManager) {
    return <ScheduleManager onClose={() => setShowScheduleManager(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Bookings Calendar</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Booking</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
            <BookingsList 
              bookings={bookings.filter(b => 
                format(new Date(b.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              )}
              getCustomerName={getCustomerName}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button 
              onClick={() => setShowAllBookings(true)}
              className="w-full flex items-center justify-between px-4 py-2 text-left border rounded-lg hover:bg-gray-50"
            >
              <span>View All Bookings</span>
              <CalendarIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowScheduleManager(true)}
              className="w-full flex items-center justify-between px-4 py-2 text-left border rounded-lg hover:bg-gray-50"
            >
              <span>Manage Schedule</span>
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <DndProvider backend={HTML5Backend}>
        <Calendar
          currentDate={currentDate}
          bookings={bookings}
          onDateChange={setCurrentDate}
          onBookingMove={moveBooking}
        />
      </DndProvider>
    </div>
  );
};

export default Bookings;