import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Customer, Vehicle, Address } from '../types';
import AddressForm from './customers/AddressForm';
import TuningHistory from './customers/tuning/TuningHistory';
import { useCustomersStore } from '../store';

const CustomerEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, updateCustomer, addTuningRecord, updateTuningRecord, deleteTuningRecord } = useCustomersStore();
  const customer = customers.find(c => c.id === id);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState<Address>({
    line1: '',
    city: '',
    postcode: ''
  });
  const [vehicle, setVehicle] = useState<Vehicle>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    ecuType: '',
    registration: '',
    engineSize: '',
    fuelType: 'diesel',
    transmission: 'manual'
  });

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setAddress(customer.address);
      setVehicle(customer.vehicle);
    }
  }, [customer]);

  if (!customer) {
    return <Navigate to="/customers" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomer(customer.id, {
      name,
      email,
      phone,
      address,
      vehicle
    });
    navigate('/customers');
  };

  const handleCancel = () => {
    navigate('/customers');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Edit Customer</h1>
        <div className="space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Customer Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Address</h4>
              <AddressForm value={address} onChange={setAddress} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Vehicle Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration
              </label>
              <input
                type="text"
                value={vehicle.registration}
                onChange={(e) => setVehicle({ ...vehicle, registration: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                value={vehicle.make}
                onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                value={vehicle.model}
                onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                value={vehicle.year}
                onChange={(e) => setVehicle({ ...vehicle, year: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engine Size
              </label>
              <input
                type="text"
                value={vehicle.engineSize || ''}
                onChange={(e) => setVehicle({ ...vehicle, engineSize: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 2.0L"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ECU Type
              </label>
              <input
                type="text"
                value={vehicle.ecuType}
                onChange={(e) => setVehicle({ ...vehicle, ecuType: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>
              <select
                value={vehicle.fuelType}
                onChange={(e) => setVehicle({ ...vehicle, fuelType: e.target.value as 'petrol' | 'diesel' })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="diesel">Diesel</option>
                <option value="petrol">Petrol</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transmission
              </label>
              <select
                value={vehicle.transmission}
                onChange={(e) => setVehicle({ ...vehicle, transmission: e.target.value as 'manual' | 'auto' })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="manual">Manual</option>
                <option value="auto">Automatic</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <TuningHistory
          history={customer.tuningHistory}
          onAdd={(record) => addTuningRecord(customer.id, record)}
          onEdit={(id, updates) => updateTuningRecord(customer.id, id, updates)}
          onDelete={(id) => deleteTuningRecord(customer.id, id)}
        />
      </div>
    </div>
  );
};

export default CustomerEditor;