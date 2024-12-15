import React from 'react';
import { Phone, Mail, Car } from 'lucide-react';
import { Lead } from '../../types';
import { formatFuelType, formatTransmission } from '../../utils/vehicle';
import LeadStatus from './status/LeadStatus';
import LeadActions from './actions/LeadActions';

interface LeadListProps {
  leads: Lead[];
  onStatusChange?: (id: string, status: Lead['status']) => void;
  onEdit: (id: string) => void;
  onCreateBooking: (lead: Lead) => void;
}

const LeadList: React.FC<LeadListProps> = ({
  leads,
  onStatusChange,
  onEdit,
  onCreateBooking
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Follow Up
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{lead.customerName}</div>
                <div className="text-sm text-gray-500">
                  Added {new Date(lead.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{lead.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{lead.phone}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {lead.vehicle ? (
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-gray-400" />
                    <div className="text-sm">
                      <div>{lead.vehicle.registration}</div>
                      <div className="text-gray-500">
                        {lead.vehicle.make} {lead.vehicle.model}
                        {lead.vehicle.year ? ` (${lead.vehicle.year})` : ''}
                      </div>
                      {lead.vehicle.fuelType && (
                        <div className="text-gray-500">
                          {formatFuelType(lead.vehicle.fuelType)}
                          {lead.vehicle.transmission && ` - ${formatTransmission(lead.vehicle.transmission)}`}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">No vehicle info</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <LeadStatus
                  status={lead.status}
                  onChange={(status) => onStatusChange?.(lead.id, status)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <div className="max-w-xs truncate">{lead.notes}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <LeadActions
                  lead={lead}
                  onEdit={() => onEdit(lead.id)}
                  onCreateBooking={() => onCreateBooking(lead)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadList;