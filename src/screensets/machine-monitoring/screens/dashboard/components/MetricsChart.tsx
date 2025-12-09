import { Card, CardContent, CardHeader, CardTitle } from '@hai3/uikit';
import type { MetricsSnapshot } from '../../../api/mockData';
import { useMemo } from 'react';
import { sortBy } from 'lodash';

interface MetricsChartProps {
  metrics: MetricsSnapshot[];
  tk: (key: string) => string;
}

export function MetricsChart({ metrics, tk }: MetricsChartProps) {
  const sortedMetrics = useMemo(() => sortBy(metrics, 'timestamp'), [metrics]);

  const chartData = useMemo(() => {
    if (sortedMetrics.length === 0) return { points: [], maxValue: 100 };

    const maxValue = Math.max(
      ...sortedMetrics.map(m => Math.max(m.cpuUsage, m.ramUsage, m.diskUsage, m.gpuUsage))
    );

    return {
      points: sortedMetrics,
      maxValue: Math.ceil(maxValue / 10) * 10,
    };
  }, [sortedMetrics]);

  const createPath = (dataKey: keyof MetricsSnapshot, color: string) => {
    if (chartData.points.length === 0) return null;

    const width = 100;
    const height = 60;
    const xStep = width / (chartData.points.length - 1 || 1);

    const points = chartData.points.map((point, index) => {
      const x = index * xStep;
      const value = point[dataKey] as number;
      const y = height - (value / chartData.maxValue) * height;
      return `${x},${y}`;
    });

    return (
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
      />
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const latestMetrics = sortedMetrics[sortedMetrics.length - 1];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{tk('chart.past_week')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="relative w-full h-48 bg-muted/30 rounded-lg p-4">
            <svg
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {createPath('cpuUsage', 'hsl(var(--chart-1))')}
              {createPath('ramUsage', 'hsl(var(--chart-2))')}
              {createPath('diskUsage', 'hsl(var(--chart-3))')}
              {createPath('gpuUsage', 'hsl(var(--chart-4))')}
            </svg>
          </div>

          {/* Legend and Current Values */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div className="text-sm">
                <span className="font-medium">CPU:</span>{' '}
                <span className="text-muted-foreground">
                  {latestMetrics?.cpuUsage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <div className="text-sm">
                <span className="font-medium">RAM:</span>{' '}
                <span className="text-muted-foreground">
                  {latestMetrics?.ramUsage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <div className="text-sm">
                <span className="font-medium">Disk:</span>{' '}
                <span className="text-muted-foreground">
                  {latestMetrics?.diskUsage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="text-sm">
                <span className="font-medium">GPU:</span>{' '}
                <span className="text-muted-foreground">
                  {latestMetrics?.gpuUsage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Time Range */}
          {sortedMetrics.length > 0 && (
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatDate(sortedMetrics[0].timestamp)}</span>
              <span>{formatDate(sortedMetrics[sortedMetrics.length - 1].timestamp)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
