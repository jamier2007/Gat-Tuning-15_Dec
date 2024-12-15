import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDocumentsStore } from '../store/documents';
import DocumentList from '../components/documents/DocumentList';
import EstimateForm from '../components/EstimateForm';

const Estimates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { documents } = useDocumentsStore();
  const customer = location.state?.customer;
  const [searchTerm, setSearchTerm] = useState('');

  const estimates = documents.filter(doc => 
    doc.type === 'estimate' && 
    (doc.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.customer.vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Estimates</h1>
          <button
            onClick={() => navigate('/customers')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>New Estimate</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search estimates..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <DocumentList type="estimate" documents={estimates} />
      </div>
    );
  }

  return <EstimateForm customer={customer} />;
};

export default Estimates;