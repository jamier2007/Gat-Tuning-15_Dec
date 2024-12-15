import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Filter, ArrowUpDown, Check, Receipt, ArrowLeft, RotateCcw, ExternalLink } from 'lucide-react';
import { Booking } from '../../../types';
import { useCustomersStore, useDocumentsStore, useBookingsStore } from '../../../store';
import { getBookingStatusColor } from '../../../utils/bookings';
import { SERVICES } from '../../../utils/pricing';
import { useNavigate } from 'react-router-dom';

interface BookingsViewProps {
  bookings: Booking[];
  onClose: () => void;
}

const BookingsView: React.FC<BookingsViewProps> = ({ bookings: initialBookings, onClose }) => {
  const navigate = useNavigate();
  const { customers } = useCustomersStore();
  const { addDocument, sendDocument } = useDocumentsStore();
  const { updateBooking } = useBookingsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'customer' | 'service'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [processingBooking, setProcessingBooking] = useState<string | null>(null);

  // Filter bookings
  const filteredBookings = initialBookings
    .filter(booking => {
      const customer = customers.find(c => c.id === booking.customerId);
      const searchString = `${customer?.name} ${booking.service}`.toLowerCase();
      const matchesSearch = searchString.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'customer') {
        const customerA = customers.find(c => c.id === a.customerId)?.name || '';
        const customerB = customers.find(c => c.id === b.customerId)?.name || '';
        comparison = customerA.localeCompare(customerB);
      } else if (sortBy === 'service') {
        comparison = a.service.localeCompare(b.service);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const handleComplete = async (bookingId: string) => {
    updateBooking(bookingId, { status: 'completed' });
  };

  const handleUncomplete = async (bookingId: string) => {
    updateBooking(bookingId, { status: 'scheduled' });
  };

  const handleCreateInvoice = async (booking: Booking) => {
    const customer = customers.find(c => c.id === booking.customerId);
    if (!customer) return;

    setProcessingBooking(booking.id);
    try {
      const serviceDetails = SERVICES.find(s => s.name === booking.service);
      if (!serviceDetails) throw new Error('Service not found');

      const docId = await addDocument({
        type: 'invoice',
        customer,
        services: [serviceDetails],
        total: serviceDetails.price,
        notes: `Invoice for ${booking.service} booking on ${format(new Date(booking.date), 'dd/MM/yyyy')}`,
        status: 'pending'
      });

      await sendDocument(docId);
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setProcessingBooking(null);
    }
  };

  const handleViewCustomer = (customerId: string) => {
    navigate(`/customers/${customerId}/edit`);
  };

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col">
      <div className="bg-gray-800 text-white p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">All Bookings</h2>
        </div>
      </div>

      <div className="p-4 border-b bg-white">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('date')}>
                <div className="flex items-center space-x-1">
                  <span>Date & Time</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('customer')}>
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('service')}>
                <div className="flex items-center space-x-1">
                  <span>Service</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => {
              const customer = customers.find(c => c.id === booking.customerId);
              return (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {format(new Date(booking.date), 'dd MMM yyyy')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(booking.date), 'h:mm a')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer?.vehicle.registration}
                        </div>
                      </div>
                      <button
                        onClick={() => customer && handleViewCustomer(customer.id)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View customer details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.service}</div>
                    {booking.notes && (
                      <div className="text-sm text-gray-500 truncate max-w-xs" title={booking.notes}>
                        {booking.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBookingStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {booking.status === 'scheduled' && (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleComplete(booking.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                        >
                          <Check className="w-4 h-4" />
                          <span>Complete</span>
                        </button>
                        <button
                          onClick={() => handleCreateInvoice(booking)}
                          disabled={processingBooking === booking.id}
                          className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
                        >
                          <Receipt className="w-4 h-4" />
                          <span>{processingBooking === booking.id ? 'Creating...' : 'Invoice'}</span>
                        </button>
                      </div>
                    )}
                    {booking.status === 'completed' && (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleUncomplete(booking.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Uncomplete</span>
                        </button>
                        <button
                          onClick={() => handleCreateInvoice(booking)}
                          disabled={processingBooking === booking.id}
                          className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
                        >
                          <Receipt className="w-4 h-4" />
                          <span>{processingBooking === booking.id ? 'Creating...' : 'Invoice'}</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsView;