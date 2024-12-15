import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { startOfDay } from 'date-fns';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSettingsStore } from '../../../store';
import ScheduleHeader from './schedule/ScheduleHeader';
import ScheduleGrid from './schedule/ScheduleGrid';
import MobileSchedule from './schedule/MobileSchedule';

interface ScheduleManagerProps {
  onClose: () => void;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ onClose }) => {
  const { settings } = useSettingsStore();
  const [startDate, setStartDate] = useState(startOfDay(new Date()));

  // Default settings if not initialized
  const workingHours = settings.bookings?.workingHours || { start: '09:00', end: '18:00' };
  const timeSlotDuration = settings.bookings?.timeSlotDuration || 90;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col">
      <div className="bg-gray-800 text-white p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Schedule Manager</h2>
        </div>
      </div>

      <ScheduleHeader
        startDate={startDate}
        onDateChange={setStartDate}
      />

      <DndProvider backend={HTML5Backend}>
        {/* Desktop Schedule View */}
        <div className="hidden md:block flex-1 overflow-auto">
          <ScheduleGrid
            startDate={startDate}
            workingHours={workingHours}
            timeSlotDuration={timeSlotDuration}
          />
        </div>

        {/* Mobile Schedule View */}
        <div className="md:hidden flex-1 overflow-auto">
          <MobileSchedule
            startDate={startDate}
            workingHours={workingHours}
            timeSlotDuration={timeSlotDuration}
          />
        </div>
      </DndProvider>
    </div>
  );
};

export default ScheduleManager;