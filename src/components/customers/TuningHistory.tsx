import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { TuningRecord } from '../../types';
import { format } from 'date-fns';

interface TuningHistoryProps {
  history: TuningRecord[];
  onAdd: (record: Omit<TuningRecord, 'id'>) => void;
  onEdit: (id: string, updates: Partial<TuningRecord>) => void;
  onDelete: (id: string) => void;
}

const tuningTypes = [
  'Stage1',
  'DPF_Delete',
  'EGR_Delete',
  'AdBlue_Removal'
] as const;

const TuningHistory: React.FC<TuningHistoryProps> = ({
  history,
  onAdd,
  onEdit,
  onDelete
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRecord, setNewRecord] = useState({
    type: 'Stage1' as typeof tuningTypes[number],
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: ''
  });

  const handleAdd = () => {
    onAdd(newRecord);
    setIsAdding(false);
    setNewRecord({
      type: 'Stage1',
      date: format(new Date(), 'yyyy-MM-dd'),
      notes: ''
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Tuning History</h3>
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value as any })}
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
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={newRecord.notes}
              onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {history.map((record) => (
          <div key={record.id} className="bg-gray-50 rounded-lg p-4">
            {editingId === record.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={record.type}
                      onChange={(e) => onEdit(record.id, { type: e.target.value as any })}
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
                      value={format(new Date(record.date), 'yyyy-MM-dd')}
                      onChange={(e) => onEdit(record.id, { date: e.target.value })}
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
                    onChange={(e) => onEdit(record.id, { notes: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{record.type.replace('_', ' ')}</div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(record.date), 'MMM d, yyyy')}
                  </div>
                  {record.notes && (
                    <div className="mt-2 text-sm text-gray-600">{record.notes}</div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(record.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(record.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TuningHistory;