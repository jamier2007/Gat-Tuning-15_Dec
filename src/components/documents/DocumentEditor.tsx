import React, { useState } from 'react';
import { ServicePrice } from '../../types';
import { SERVICES, calculateTotalPrice } from '../../utils/pricing';

interface DocumentEditorProps {
  services: ServicePrice[];
  notes: string;
  onUpdate: (services: ServicePrice[], notes: string) => void;
  onCancel: () => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  services,
  notes: initialNotes,
  onUpdate,
  onCancel
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    services.map(s => s.id)
  );
  const [notes, setNotes] = useState(initialNotes);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSave = () => {
    const updatedServices = selectedServices.map(id => 
      SERVICES.find(s => s.id === id)!
    );
    onUpdate(updatedServices, notes);
  };

  return (
    <div className="space-y-6">
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
            placeholder="Enter any additional notes..."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount:</span>
            <span>£{calculateTotalPrice(selectedServices)}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;