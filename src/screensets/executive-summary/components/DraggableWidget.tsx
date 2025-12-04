import React from 'react';
import { GripVertical, X } from 'lucide-react';

interface DraggableWidgetProps {
  id: string;
  children: React.ReactNode;
  isDragging?: boolean;
  onDragStart?: (id: string) => void;
  onDragEnd?: () => void;
  onDragOver?: (id: string) => void;
  onRemove?: (id: string) => void;
}

/**
 * DraggableWidget Component
 * Wrapper that makes any widget draggable using native HTML5 Drag and Drop
 */
export const DraggableWidget: React.FC<DraggableWidgetProps> = ({ 
  id, 
  children, 
  isDragging,
  onDragStart,
  onDragEnd,
  onDragOver,
  onRemove,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(id);
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver?.(id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      className={`relative group cursor-grab active:cursor-grabbing transition-opacity ${isDragging ? 'opacity-50' : ''}`}
    >
      {/* Widget controls */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onRemove && (
          <button
            onClick={handleRemove}
            className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Remove widget"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="p-1 rounded bg-background/80 pointer-events-none">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      {children}
    </div>
  );
};

DraggableWidget.displayName = 'DraggableWidget';
