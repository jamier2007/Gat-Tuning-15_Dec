import React from 'react';
import { Settings } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboard';
import { DashboardWidget } from '../../store/dashboard/types';

interface DashboardCustomizerProps {
  onClose: () => void;
}

const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({ onClose }) => {
  const { widgets, toggleWidget, updateWidgetOrder } = useDashboardStore();

  const handleDragStart = (e: React.DragEvent, widget: DashboardWidget) => {
    e.dataTransfer.setData('widgetId', widget.id);
  };

  const handleDrop = (e: React.DragEvent, targetWidget: DashboardWidget) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('widgetId');
    const sourceWidget = widgets.find(w => w.id === sourceId);
    const updatedWidgets = [...widgets];
    
    if (sourceWidget) {
      const sourceOrder = sourceWidget.order;
      const targetOrder = targetWidget.order;
      
      updatedWidgets.forEach(widget => {
        if (widget.id === sourceId) {
          widget.order = targetOrder;
        } else if (widget.id === targetWidget.id) {
          widget.order = sourceOrder;
        }
      });
      
      updateWidgetOrder(updatedWidgets);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Customize Dashboard
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {widgets
            .sort((a, b) => a.order - b.order)
            .map(widget => (
              <div
                key={widget.id}
                draggable
                onDragStart={(e) => handleDragStart(e, widget)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, widget)}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-move"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={widget.enabled}
                    onChange={() => toggleWidget(widget.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span>{widget.title}</span>
                </div>
                <div className="text-gray-400">⋮⋮</div>
              </div>
            ))}
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Drag and drop widgets to reorder. Use checkboxes to show/hide widgets.
        </p>
      </div>
    </div>
  );
};

export default DashboardCustomizer;