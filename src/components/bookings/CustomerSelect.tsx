import React from 'react';
import { Customer } from '../../types';

interface CustomerSelectProps {
  customers: Customer[];
  selectedCustomerId: string;
  onChange: (customerId: string) => void;
}

const CustomerSelect: React.FC<CustomerSelectProps> = ({
  customers,
  selectedCustomerId,
  onChange
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Customer
      </label>
      <select
        value={selectedCustomerId}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name} - {customer.vehicle?.registration || 'No vehicle'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerSelect;