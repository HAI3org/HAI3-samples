import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@hai3/uikit';
import { TextLoader } from '@hai3/uicore';
import type { WorkloadProtectionItem } from '../api/executive-summary/types';

interface ProgressBarWidgetProps {
  title: string;
  totalProtected: number;
  totalUnprotected: number;
  total: number;
  items: WorkloadProtectionItem[];
}

/**
 * ProgressBarWidget Component
 * Displays workload protection status with horizontal bar charts
 * Used for: Workloads protection status section
 */
export const ProgressBarWidget: React.FC<ProgressBarWidgetProps> = ({
  title,
  totalProtected,
  totalUnprotected,
  total,
  items,
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const maxValue = Math.max(...items.map(item => item.total), 1);

  return (
    <Card className="border border-border">
      <CardHeader className="pb-0 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <TextLoader skeletonClassName="h-4 w-48">
            {title}
          </TextLoader>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        {/* Summary badges */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">{totalProtected} Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-sm">{totalUnprotected} Unprotected</span>
          </div>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm font-medium">{total} Total</span>
        </div>

        {/* Progress bars */}
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 cursor-pointer transition-opacity duration-200"
              style={{ opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.4 : 1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="text-sm text-muted-foreground w-32 flex-shrink-0">
                {item.label}
              </span>
              <div className={`flex-1 bg-muted/30 rounded-sm overflow-hidden relative transition-all duration-200 ${hoveredIndex === index ? 'h-6' : 'h-4'}`}>
                {/* Protected portion (green) */}
                {item.protected > 0 && (
                  <div
                    className="absolute h-full bg-green-500 transition-all duration-200"
                    style={{
                      width: `${(item.protected / maxValue) * 100}%`,
                      left: 0,
                    }}
                  />
                )}
                {/* Unprotected portion (amber) */}
                {item.unprotected > 0 && (
                  <div
                    className="absolute h-full bg-amber-500 transition-all duration-200"
                    style={{
                      width: `${(item.unprotected / maxValue) * 100}%`,
                      left: `${(item.protected / maxValue) * 100}%`,
                    }}
                  />
                )}
                {/* Tooltip */}
                {hoveredIndex === index && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground border border-border rounded-md px-3 py-1.5 text-xs shadow-md whitespace-nowrap z-10">
                    <span className="text-green-500 font-medium">{item.protected}</span> protected, <span className="text-amber-500 font-medium">{item.unprotected}</span> unprotected
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Scale at bottom */}
          <div className="flex items-center gap-4 mt-2">
            <span className="w-32 flex-shrink-0" />
            <div className="flex-1 flex justify-between text-xs text-muted-foreground">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ProgressBarWidget.displayName = 'ProgressBarWidget';
