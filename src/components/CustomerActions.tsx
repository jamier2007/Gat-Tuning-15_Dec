import React from 'react';
import { FileText, Receipt, Calendar, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '../types';

interface CustomerActionsProps {
  customer: Customer;
}

const CustomerActions: React.FC<CustomerActionsProps> = ({ customer }) => {
  const navigate = useNavigate();

  const createEstimate = () => {
    navigate('/estimates', { state: { customer } });
  };

  const createInvoice = () => {
    navigate('/invoices', { state: { customer } });
  };

  const createBooking = () => {
    navigate('/bookings', { state: { customer } });
  };

  const editCustomer = () => {
    navigate(`/customers/${customer.id}/edit`);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={editCustomer}
        className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Edit2 className="w-4 h-4" />
        <span>Edit</span>
      </button>
      <button
        onClick={createBooking}
        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
      >
        <Calendar className="w-4 h-4" />
        <span>Book</span>
      </button>
      <button
        onClick={createEstimate}
        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
      >
        <FileText className="w-4 h-4" />
        <span>Estimate</span>
      </button>
      <button
        onClick={createInvoice}
        className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
      >
        <Receipt className="w-4 h-4" />
        <span>Invoice</span>
      </button>
    </div>
  );
};

export default CustomerActions;