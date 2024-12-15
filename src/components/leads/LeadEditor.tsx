import React, { useState } from 'react';
import { Lead, FuelType, TransmissionType } from '../../types';
import { addWeeks, format } from 'date-fns';

interface LeadEditorProps {
  lead: Lead;
  onSubmit: (id: string, updates: Partial<Lead>) => void;
  onCancel: () => void;
}

const followUpOptions = [
  { label: 'No follow-up', value: '' },
  { label: '1 week', value: '1' },
  { label: '2 weeks', value: '2' },
  { label: '3 weeks', value: '3' },
];

const LeadEditor: React.FC<LeadEditorProps> = ({ lead, onSubmit, onCancel }) => {
  const [customerName, setCustomerName] = useState(lead.customerName);
  const [email, setEmail] = useState(lead.email);
  const [phone, setPhone] = useState(lead.phone);
  const [notes, setNotes] = useState(lead.notes);
  const [followUpWeeks, setFollowUpWeeks] = useState('');
  const [status, setStatus] = useState(lead.status);
  const [vehicle, setVehicle] = useState({
    registration: lead.vehicle?.registration || '',
    make: lead.vehicle?.make || '',
    model: lead.vehicle?.model || '',
    year: lead.vehicle?.year?.toString() || '',
    engineSize: lead.vehicle?.engineSize || '',
    ecuType: lead.vehicle?.ecuType || '',
    fuelType: lead.vehicle?.fuelType || 'diesel',
    transmission: lead.vehicle?.transmission || 'manual'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const followUpDate = followUpWeeks 
      ? format(addWeeks(new Date(), parseInt(followUpWeeks)), "yyyy-MM-dd'T'HH:mm")
      : undefined;
    
    const updates: Partial<Lead> = {
      customerName,
      email,
      phone,
      notes,
      followUpDate,
      status,
      vehicle: {
        registration: vehicle.registration || undefined,
        make: vehicle.make || undefined,
        model: vehicle.model || undefined,
        year: vehicle.year ? parseInt(vehicle.year) : undefined,
        engineSize: vehicle.engineSize || undefined,
        ecuType: vehicle.ecuType || undefined,
        fuelType: vehicle.fuelType as FuelType,
        transmission: vehicle.transmission as TransmissionType
      }
    };

    onSubmit(lead.id, updates);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Lead</h2>
        <div className="space-x-4">
          <button
            onClick={onCancel}
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Customer Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Lead['status'])}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow Up In
              </label>
              <select
                value={followUpWeeks}
                onChange={(e) => setFollowUpWeeks(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {followUpOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
                onChange={(e) => setVehicle(prev => ({ ...prev, registration: e.target.value.toUpperCase() }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. AB12CDE"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                value={vehicle.make}
                onChange={(e) => setVehicle(prev => ({ ...prev, make: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. BMW"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                value={vehicle.model}
                onChange={(e) => setVehicle(prev => ({ ...prev, model: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 320d"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={vehicle.year}
                  onChange={(e) => setVehicle(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 2020"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engine Size
                </label>
                <input
                  type="text"
                  value={vehicle.engineSize}
                  onChange={(e) => setVehicle(prev => ({ ...prev, engineSize: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 2.0L"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ECU Type
              </label>
              <input
                type="text"
                value={vehicle.ecuType}
                onChange={(e) => setVehicle(prev => ({ ...prev, ecuType: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Bosch EDC17"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={vehicle.fuelType}
                  onChange={(e) => setVehicle(prev => ({ ...prev, fuelType: e.target.value as FuelType }))}
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
                  onChange={(e) => setVehicle(prev => ({ ...prev, transmission: e.target.value as TransmissionType }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="manual">Manual</option>
                  <option value="auto">Automatic</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter any additional notes or requirements..."
          />
        </div>
      </form>
    </div>
  );
};

export default LeadEditor;