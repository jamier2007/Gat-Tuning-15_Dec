import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TuningRecord } from '../../../types';
import TuningRecordForm from './TuningRecordForm';
import TuningRecordItem from './TuningRecordItem';

interface TuningHistoryProps {
  history: TuningRecord[];
  onAdd: (record: Omit<TuningRecord, 'id'>) => void;
  onEdit: (id: string, updates: Partial<TuningRecord>) => void;
  onDelete: (id: string) => void;
}

const TuningHistory: React.FC<TuningHistoryProps> = ({
  history,
  onAdd,
  onEdit,
  onDelete
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (record: Omit<TuningRecord, 'id'>) => {
    onAdd(record);
    setIsAdding(false);
  };

  const handleEdit = (id: string, updates: Omit<TuningRecord, 'id'>) => {
    onEdit(id, updates);
    setEditingId(null);
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
        <div className="bg-gray-50 rounded-lg p-4">
          <TuningRecordForm
            onSubmit={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      <div className="space-y-2">
        {history.map((record) => (
          <div key={record.id} className="bg-gray-50 rounded-lg p-4">
            {editingId === record.id ? (
              <TuningRecordForm
                initialValues={record}
                onSubmit={(updates) => handleEdit(record.id, updates)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <TuningRecordItem
                record={record}
                onEdit={() => setEditingId(record.id)}
                onDelete={() => onDelete(record.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TuningHistory;