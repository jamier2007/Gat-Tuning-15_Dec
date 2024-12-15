import React, { useState } from 'react';
import { Customer, ServicePrice } from '../types';
import { SERVICES, calculateTotalPrice } from '../utils/pricing';
import { useDocumentsStore } from '../store/documents';
import PrintableDocument from './documents/PrintableDocument';

interface EstimateFormProps {
  customer: Customer;
}

const EstimateForm: React.FC<EstimateFormProps> = ({ customer }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const { addDocument, sendDocument } = useDocumentsStore();
  const [isSaving, setIsSaving] = useState(false);

  if (!customer) {
    return <div>No customer selected</div>;
  }

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const total = calculateTotalPrice(selectedServices);

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const services = selectedServices.map(id => 
        SERVICES.find(s => s.id === id)!
      );

      const docId = await addDocument({
        type: 'estimate',
        customer,
        services,
        total,
        notes,
        status: 'draft'
      });

      await sendDocument(docId);
      window.history.back();
    } catch (error) {
      console.error('Error creating estimate:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (showPreview) {
    return (
      <div>
        <div className="fixed top-4 right-4 space-x-4 print:hidden">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Back
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Print
          </button>
        </div>
        <PrintableDocument
          type="estimate"
          customer={customer}
          services={selectedServices.map(id => SERVICES.find(s => s.id === id)!)}
          total={total}
          notes={notes}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Create Estimate</h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Preview
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedServices.length === 0 || isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSaving ? 'Creating...' : 'Create & Send'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
            <p className="text-gray-600">{customer.name}</p>
            <p className="text-gray-600">{customer.email}</p>
            <p className="text-gray-600">{customer.phone}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
            <p className="text-gray-600">{customer.vehicle.registration}</p>
            <p className="text-gray-600">
              {customer.vehicle.make} {customer.vehicle.model} ({customer.vehicle.year})
            </p>
            <p className="text-gray-600">{customer.vehicle.engineSize}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Services</h3>
          <div className="grid gap-4">
            {SERVICES.map((service) => (
              <label
                key={service.id}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium">{service.name}</span>
                    <p className="text-sm text-gray-500">£{service.price}</p>
                  </div>
                </div>
                {selectedServices.includes(service.id) && selectedServices.length > 1 && (
                  <span className="text-sm text-gray-500">
                    {service.price === Math.max(...selectedServices.map(id => 
                      SERVICES.find(s => s.id === id)?.price || 0
                    )) 
                      ? 'Base price'
                      : '+£50'}
                  </span>
                )}
              </label>
            ))}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter any additional notes or special requirements..."
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span>£{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateForm;