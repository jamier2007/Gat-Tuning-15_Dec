import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { TuningRecord } from '../../../types';
import { format } from 'date-fns';

interface TuningRecordItemProps {
  record: TuningRecord;
  onEdit: () => void;
  onDelete: () => void;
}

const TuningRecordItem: React.FC<TuningRecordItemProps> = ({
  record,
  onEdit,
  onDelete
}) => {
  return (
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
          onClick={onEdit}
          className="text-gray-400 hover:text-gray-600"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-red-400 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TuningRecordItem;