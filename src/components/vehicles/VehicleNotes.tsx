import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { VehicleNote } from '../../types/vehicle';
import { format } from 'date-fns';

interface VehicleNotesProps {
  notes: VehicleNote[];
  onAddNote: (content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const VehicleNotes: React.FC<VehicleNotesProps> = ({
  notes,
  onAddNote,
  onDeleteNote
}) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new note..."
          rows={3}
        />
        <button
          type="submit"
          disabled={!newNote.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          Add Note
        </button>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
                <p className="text-sm text-gray-400">
                  Added by {note.updatedBy} on {format(new Date(note.createdAt), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
              <button
                onClick={() => onDeleteNote(note.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleNotes;