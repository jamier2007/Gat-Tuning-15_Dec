import React from 'react';
import { Lead } from '../../../types';

interface LeadStatusProps {
  status: Lead['status'];
  onChange?: (status: Lead['status']) => void;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  converted: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

const LeadStatus: React.FC<LeadStatusProps> = ({ status, onChange }) => {
  return (
    <select
      value={status}
      onChange={(e) => onChange?.(e.target.value as Lead['status'])}
      className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${statusColors[status]}`}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="converted">Converted</option>
      <option value="lost">Lost</option>
    </select>
  );
};

export default LeadStatus;