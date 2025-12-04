import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@hai3/uikit';
import { TextLoader } from '@hai3/uicore';
import type { DonutChartItem } from '../api/executive-summary/types';

interface DonutChartWidgetProps {
  title: string;
  centerValue: number | string;
  centerLabel: string;
  items: DonutChartItem[];
}

/**
 * DonutChartWidget Component
 * Displays a donut chart with legend
 * Used for: Missing updates, Workloads backed up, Patched vulnerabilities, etc.
 */
export const DonutChartWidget: React.FC<DonutChartWidgetProps> = ({
  title,
  centerValue,
  centerLabel,
  items,
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const total = items.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate stroke-dasharray for each segment
  const circumference = 2 * Math.PI * 40; // radius = 40
  let currentOffset = 0;
  
  const segments = items.map((item) => {
    const percentage = total > 0 ? (item.value / total) * 100 : 0;
    const strokeLength = (percentage / 100) * circumference;
    const segment = {
      ...item,
      strokeDasharray: `${strokeLength} ${circumference - strokeLength}`,
      strokeDashoffset: -currentOffset,
    };
    currentOffset += strokeLength;
    return segment;
  });

  return (
    <Card className="border border-border h-[255px]">
      <CardHeader className="pb-0 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <TextLoader skeletonClassName="h-4 w-48">
            {title}
          </TextLoader>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-3 h-[calc(255px-60px)] flex items-center">
        <div className="flex items-center gap-6 w-full">
          {/* Donut Chart */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted/20"
              />
              {/* Data segments */}
              {segments.map((segment, index) => (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={hoveredIndex === index ? 12 : 8}
                  strokeDasharray={segment.strokeDasharray}
                  strokeDashoffset={segment.strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  style={{ opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.4 : 1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold leading-tight">{centerValue}</span>
              <span className="text-[10px] text-muted-foreground">{centerLabel}</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex flex-col gap-1">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-sm cursor-pointer transition-opacity duration-200 hover:opacity-100"
                style={{ opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.4 : 1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};

DonutChartWidget.displayName = 'DonutChartWidget';
