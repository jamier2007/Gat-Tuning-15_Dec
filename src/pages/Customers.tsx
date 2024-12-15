import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '../types';
import CustomerVehicle from '../components/CustomerVehicle';
import CustomerActions from '../components/CustomerActions';
import CustomerForm from '../components/CustomerForm';
import { useCustomersStore } from '../store';
import { syncTuningHistory } from '../utils/syncHistory';
import { filterCustomers } from '../utils/customers';

const Customers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { customers, updateCustomer, addCustomer } = useCustomersStore();

  // Filter customers based on search term
  const filteredCustomers = filterCustomers(customers, searchTerm);

  useEffect(() => {
    syncTuningHistory();
  }, []);

  const handleVehicleUpdate = (customerId: string, updatedVehicle: any) => {
    updateCustomer(customerId, { vehicle: updatedVehicle });
  };

  const handleCreateCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    addCustomer(newCustomer);
    setShowForm(false);
  };

  const handleEditCustomer = (customerId: string) => {
    navigate(`/customers/${customerId}/edit`);
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <CustomerForm
          onSubmit={handleCreateCustomer}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customer Management</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tuning History
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                    <div className="text-sm text-gray-500">
                      {customer.address.line1}<br />
                      {customer.address.line2 && <>{customer.address.line2}<br /></>}
                      {customer.address.city}<br />
                      {customer.address.postcode}
                    </div>
                    <div className="mt-2">
                      <CustomerActions customer={customer} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <CustomerVehicle
                      vehicle={customer.vehicle}
                      onUpdate={(updatedVehicle) => handleVehicleUpdate(customer.id, updatedVehicle)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {customer.tuningHistory.length > 0 ? (
                      customer.tuningHistory.map((record) => (
                        <div key={record.id} className="mb-2 last:mb-0">
                          <div className="text-sm font-medium">{record.type.replace('_', ' ')}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(record.date).toLocaleDateString()}
                          </div>
                          {record.notes && (
                            <div className="text-sm text-gray-500">{record.notes}</div>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No tuning history</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      onClick={() => handleEditCustomer(customer.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;