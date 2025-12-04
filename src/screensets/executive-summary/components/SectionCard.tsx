import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@hai3/uikit';
import { TextLoader } from '@hai3/uicore';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionCard Component
 * A wrapper card for dashboard sections with a title
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <Card className={`border border-border h-[255px] ${className}`}>
      <CardHeader className="pb-0 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <TextLoader skeletonClassName="h-4 w-48">
            {title}
          </TextLoader>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        {children}
      </CardContent>
    </Card>
  );
};

SectionCard.displayName = 'SectionCard';
