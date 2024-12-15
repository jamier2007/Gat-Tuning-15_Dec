import React, { useState } from 'react';
import { Customer, Vehicle, Address } from '../types';
import AddressForm from './customers/AddressForm';

interface CustomerFormProps {
  onSubmit: (customer: Omit<Customer, 'id'>) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState<Address>({
    line1: '',
    city: '',
    postcode: ''
  });
  const [vehicle, setVehicle] = useState<Omit<Vehicle, 'id'>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    ecuType: '',
    registration: '',
    engineSize: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const customer: Omit<Customer, 'id'> = {
      name,
      email,
      phone,
      address,
      vehicle,
      tuningHistory: []
    };

    onSubmit(customer);
  };

  const handleVehicleChange = (field: keyof Vehicle, value: string | number) => {
    setVehicle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Address</h4>
                <AddressForm value={address} onChange={setAddress} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Vehicle Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration
                </label>
                <input
                  type="text"
                  value={vehicle.registration}
                  onChange={(e) => handleVehicleChange('registration', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <input
                  type="text"
                  value={vehicle.make}
                  onChange={(e) => handleVehicleChange('make', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => handleVehicleChange('model', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={vehicle.year}
                  onChange={(e) => handleVehicleChange('year', parseInt(e.target.value))}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engine Size
                </label>
                <input
                  type="text"
                  value={vehicle.engineSize}
                  onChange={(e) => handleVehicleChange('engineSize', e.target.value)}
                  placeholder="e.g. 2.0L or 2000cc"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ECU Type
                </label>
                <input
                  type="text"
                  value={vehicle.ecuType}
                  onChange={(e) => handleVehicleChange('ecuType', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
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
            Create Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;