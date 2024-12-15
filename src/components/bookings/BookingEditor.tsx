import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { X, Check, Receipt, RotateCcw } from 'lucide-react';
import { Booking } from '../../types';
import { SERVICES } from '../../utils/pricing';
import { useCustomersStore, useDocumentsStore, useBookingsStore } from '../../store';

interface BookingEditorProps {
  booking: Booking;
  onClose: () => void;
}

const BookingEditor: React.FC<BookingEditorProps> = ({ booking, onClose }) => {
  const { customers } = useCustomersStore();
  const { addDocument, sendDocument } = useDocumentsStore();
  const { updateBooking } = useBookingsStore();
  const customer = customers.find(c => c.id === booking.customerId);
  
  const bookingDate = parseISO(booking.date);
  const [date, setDate] = useState(format(bookingDate, 'yyyy-MM-dd'));
  const [time, setTime] = useState(format(bookingDate, 'HH:mm'));
  const [service, setService] = useState(booking.service);
  const [status, setStatus] = useState(booking.status);
  const [notes, setNotes] = useState(booking.notes || '');
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine date and time into a single Date object
    const [hours, minutes] = time.split(':').map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes);

    updateBooking(booking.id, {
      date: updatedDate.toISOString(),
      service,
      status,
      notes
    });
    onClose();
  };

  const handleComplete = () => {
    updateBooking(booking.id, { status: 'completed' });
    setStatus('completed');
  };

  const handleUncomplete = () => {
    updateBooking(booking.id, { status: 'scheduled' });
    setStatus('scheduled');
  };

  const handleCreateInvoice = async () => {
    if (!customer) return;
    
    setIsCreatingInvoice(true);
    try {
      const serviceDetails = SERVICES.find(s => s.name === service);
      if (!serviceDetails) throw new Error('Service not found');

      const docId = await addDocument({
        type: 'invoice',
        customer,
        services: [serviceDetails],
        total: serviceDetails.price,
        notes: `Invoice for ${service} booking on ${format(new Date(date), 'dd/MM/yyyy')}`,
        status: 'pending'
      });

      await sendDocument(docId);
      onClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setIsCreatingInvoice(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Edit Booking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {customer && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-medium mb-1">{customer.name}</h3>
              <p className="text-sm text-gray-600">
                {customer.vehicle.make} {customer.vehicle.model} - {customer.vehicle.registration}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Booking['status'])}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} - £{s.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any notes or special requirements..."
            />
          </div>

          <div className="flex flex-wrap justify-end gap-3 pt-4 border-t">
            {status === 'scheduled' && (
              <>
                <button
                  type="button"
                  onClick={handleComplete}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Check className="w-4 h-4" />
                  <span>Complete</span>
                </button>
                <button
                  type="button"
                  onClick={handleCreateInvoice}
                  disabled={isCreatingInvoice}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
                >
                  <Receipt className="w-4 h-4" />
                  <span>{isCreatingInvoice ? 'Creating...' : 'Create Invoice'}</span>
                </button>
              </>
            )}
            {status === 'completed' && (
              <>
                <button
                  type="button"
                  onClick={handleUncomplete}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Uncomplete</span>
                </button>
                <button
                  type="button"
                  onClick={handleCreateInvoice}
                  disabled={isCreatingInvoice}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
                >
                  <Receipt className="w-4 h-4" />
                  <span>{isCreatingInvoice ? 'Creating...' : 'Create Invoice'}</span>
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingEditor;