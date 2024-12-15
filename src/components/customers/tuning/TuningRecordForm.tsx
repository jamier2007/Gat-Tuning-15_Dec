import React, { useState } from 'react';
import { TuningRecord } from '../../../types';
import { format } from 'date-fns';

interface TuningRecordFormProps {
  onSubmit: (record: Omit<TuningRecord, 'id'>) => void;
  onCancel: () => void;
  initialValues?: Partial<TuningRecord>;
}

export const tuningTypes = [
  'Stage1',
  'DPF_Delete',
  'EGR_Delete',
  'AdBlue_Removal'
] as const;

const TuningRecordForm: React.FC<TuningRecordFormProps> = ({
  onSubmit,
  onCancel,
  initialValues
}) => {
  const [record, setRecord] = useState({
    type: initialValues?.type || 'Stage1' as typeof tuningTypes[number],
    date: initialValues?.date || format(new Date(), 'yyyy-MM-dd'),
    notes: initialValues?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(record);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={record.type}
            onChange={(e) => setRecord({ ...record, type: e.target.value as any })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tuningTypes.map(type => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={record.date}
            onChange={(e) => setRecord({ ...record, date: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          value={record.notes}
          onChange={(e) => setRecord({ ...record, notes: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {initialValues ? 'Update' : 'Add'} Record
        </button>
      </div>
    </div>
  );
};

export default TuningRecordForm;