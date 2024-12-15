import React from 'react';
import { Calendar, Edit2 } from 'lucide-react';
import { Lead } from '../../../types';

interface LeadActionsProps {
  lead: Lead;
  onEdit: () => void;
  onCreateBooking: () => void;
}

const LeadActions: React.FC<LeadActionsProps> = ({
  lead,
  onEdit,
  onCreateBooking
}) => {
  return (
    <div className="flex justify-end space-x-2">
      <button
        onClick={onCreateBooking}
        className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition-colors"
        title="Create Booking"
      >
        <Calendar className="w-5 h-5" />
      </button>
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
        title="Edit Lead"
      >
        <Edit2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default LeadActions;