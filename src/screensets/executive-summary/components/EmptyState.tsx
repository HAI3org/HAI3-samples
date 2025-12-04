import React from 'react';
import { Clock } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

/**
 * EmptyState Component
 * Displays a placeholder when there's no data to show
 * Used for: Sections with no items (Blocked URLs, Antimalware scan of backups, etc.)
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'There are no items to show in this view',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <Clock className="w-12 h-12 mb-4 text-muted-foreground/30" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
