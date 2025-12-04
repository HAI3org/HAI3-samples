import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button, ButtonVariant, ButtonSize } from '@hai3/uikit';
import { DraggableWidget } from './DraggableWidget';

export interface WidgetConfig {
  id: string;
  name: string;
  render: () => React.ReactNode;
  colSpan?: 1 | 2 | 3; // 1 = 1/3 width, 2 = 2/3 width, 3 = full width
}

interface WidgetGridProps {
  widgets: WidgetConfig[];
  availableWidgets?: WidgetConfig[];
  onReorder?: (widgets: WidgetConfig[]) => void;
  onRemove?: (id: string) => void;
  onAdd?: (widget: WidgetConfig) => void;
}

/**
 * WidgetGrid Component
 * A grid container that allows drag-and-drop reordering of widgets
 * Uses native HTML5 Drag and Drop API
 */
export const WidgetGrid: React.FC<WidgetGridProps> = ({ 
  widgets: initialWidgets, 
  availableWidgets = [],
  onReorder,
  onRemove,
  onAdd,
}) => {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Get widgets that are not currently displayed
  const hiddenWidgets = availableWidgets.filter(
    (aw) => !widgets.some((w) => w.id === aw.id)
  );

  const handleDragStart = useCallback((id: string) => {
    setDraggedId(id);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedId && dragOverId && draggedId !== dragOverId) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === draggedId);
        const newIndex = items.findIndex((item) => item.id === dragOverId);
        
        if (oldIndex === -1 || newIndex === -1) return items;
        
        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        
        onReorder?.(newItems);
        return newItems;
      });
    }
    setDraggedId(null);
    setDragOverId(null);
  }, [draggedId, dragOverId, onReorder]);

  const handleDragOver = useCallback((id: string) => {
    if (id !== draggedId) {
      setDragOverId(id);
    }
  }, [draggedId]);

  const handleRemove = useCallback((id: string) => {
    setWidgets((items) => items.filter((item) => item.id !== id));
    onRemove?.(id);
  }, [onRemove]);

  const handleAdd = useCallback((widget: WidgetConfig) => {
    setWidgets((items) => [...items, widget]);
    setShowAddMenu(false);
    onAdd?.(widget);
  }, [onAdd]);

  return (
    <div className="space-y-4">
      {/* Add widget button */}
      <div className="relative">
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Sm}
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="gap-2"
          disabled={hiddenWidgets.length === 0}
        >
          <Plus className="w-4 h-4" />
          Add Widget
        </Button>
        
        {/* Dropdown menu */}
        {showAddMenu && hiddenWidgets.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-20 py-2">
            {hiddenWidgets.map((widget) => (
              <button
                key={widget.id}
                onClick={() => handleAdd(widget)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
              >
                {widget.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Widget grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {widgets.map((widget) => {
          const spanClass = widget.colSpan === 3 
            ? 'md:col-span-2 lg:col-span-3' 
            : widget.colSpan === 2 
              ? 'lg:col-span-2' 
              : '';
          return (
            <div
              key={widget.id}
              className={`${spanClass} ${dragOverId === widget.id ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''}`}
            >
            <DraggableWidget
              id={widget.id}
              isDragging={draggedId === widget.id}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onRemove={handleRemove}
            >
              {widget.render()}
            </DraggableWidget>
          </div>
          );
        })}
      </div>

      {/* Empty state */}
      {widgets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-lg">
          <p className="text-sm mb-4">No widgets displayed</p>
          {hiddenWidgets.length > 0 && (
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.Sm}
              onClick={() => setShowAddMenu(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Widget
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

WidgetGrid.displayName = 'WidgetGrid';
