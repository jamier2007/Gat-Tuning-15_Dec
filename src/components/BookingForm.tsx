import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Customer, Vehicle } from '../types';
import { SERVICES } from '../utils/pricing';
import CustomerSelect from './bookings/CustomerSelect';
import VehicleDetails from './bookings/VehicleDetails';

interface BookingFormProps {
  onSubmit: (booking: any) => void;
  onCancel: () => void;
  customers: Customer[];
  initialCustomer?: Customer;
  initialVehicle?: Vehicle;
  initialNotes?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  onCancel,
  customers,
  initialCustomer,
  initialVehicle,
  initialNotes = ''
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState(initialCustomer?.id || '');
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [time, setTime] = useState('09:00');
  const [notes, setNotes] = useState(initialNotes);
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(initialVehicle);

  // Set initial customer if provided
  useEffect(() => {
    if (initialCustomer) {
      setSelectedCustomer(initialCustomer.id);
    }
  }, [initialCustomer]);

  // Set initial vehicle if provided
  useEffect(() => {
    if (initialVehicle) {
      setVehicle(initialVehicle);
    }
  }, [initialVehicle]);

  // Set initial notes if provided
  useEffect(() => {
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking = {
      customerId: selectedCustomer,
      service: selectedService,
      date: `${date}T${time}`,
      status: 'scheduled',
      notes,
      vehicle // Include the potentially modified vehicle details
    };

    onSubmit(booking);
  };

  const customer = customers.find(c => c.id === selectedCustomer);

  // Handle customer change
  const handleCustomerChange = (customerId: string) => {
    setSelectedCustomer(customerId);
    const newCustomer = customers.find(c => c.id === customerId);
    setVehicle(newCustomer?.vehicle);
  };

  // Handle vehicle update
  const handleVehicleUpdate = (updatedVehicle: Vehicle) => {
    setVehicle(updatedVehicle);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">New Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CustomerSelect
          customers={customers}
          selectedCustomerId={selectedCustomer}
          onChange={handleCustomerChange}
        />

        {vehicle && (
          <VehicleDetails
            vehicle={vehicle}
            onUpdate={handleVehicleUpdate}
            isEditable={true}
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name} - £{service.price}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={format(new Date(), 'yyyy-MM-dd')}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter any additional notes or special requirements..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;