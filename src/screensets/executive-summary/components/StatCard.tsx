import React from 'react';
import { TextLoader } from '@hai3/uicore';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

/**
 * StatCard Component
 * Displays a single statistic with icon, label and value
 * Used in Cyber Protection Summary section
 */
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <TextLoader skeletonClassName="h-4 w-16">
          <span className="text-sm">{label}</span>
        </TextLoader>
      </div>
      <TextLoader skeletonClassName="h-8 w-20">
        <span className="text-2xl font-bold">{value}</span>
      </TextLoader>
    </div>
  );
};

StatCard.displayName = 'StatCard';
