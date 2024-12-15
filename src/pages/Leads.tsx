import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeadsStore } from '../store/leads';
import LeadList from '../components/leads/LeadList';
import LeadForm from '../components/leads/LeadForm';
import LeadEditor from '../components/leads/LeadEditor';
import { Lead } from '../types';
import { convertLeadToBookingData } from '../utils/leads';

const Leads = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const { leads, addLead, updateLead } = useLeadsStore();

  const filteredLeads = leads.filter((lead) =>
    lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  const handleCreateLead = (lead: any) => {
    addLead(lead);
    setShowForm(false);
  };

  const handleUpdateLead = (id: string, updates: any) => {
    updateLead(id, updates);
    setEditingLead(null);
  };

  const handleCreateBooking = (lead: Lead) => {
    const bookingData = convertLeadToBookingData(lead);
    navigate('/bookings', { state: bookingData });
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <LeadForm
          onSubmit={handleCreateLead}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  if (editingLead) {
    const lead = leads.find(l => l.id === editingLead);
    if (!lead) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <LeadEditor
          lead={lead}
          onSubmit={handleUpdateLead}
          onCancel={() => setEditingLead(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Leads Management</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Lead</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <LeadList 
          leads={filteredLeads} 
          onEdit={setEditingLead}
          onCreateBooking={handleCreateBooking}
          onStatusChange={(id, status) => updateLead(id, { status })}
        />
      </div>
    </div>
  );
};

export default Leads;