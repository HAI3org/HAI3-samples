import { Card, CardContent, CardHeader, CardTitle } from '@hai3/uikit';
import { useMemo, useState } from 'react';
import { ProgressBar } from '../../../uikit/base/ProgressBar';
import { PositionedTooltip } from '../../../uikit/base/PositionedTooltip';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
  color: 'blue' | 'purple' | 'orange' | 'green' | 'cyan' | 'indigo';
  history?: number[];
}

const colorClasses = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  green: 'bg-green-500',
  cyan: 'bg-cyan-500',
  indigo: 'bg-indigo-500',
};

const strokeColors = {
  blue: 'hsl(var(--chart-1))',
  purple: 'hsl(var(--chart-2))',
  orange: 'hsl(var(--chart-3))',
  green: 'hsl(var(--chart-4))',
  cyan: 'hsl(var(--chart-5))',
  indigo: 'hsl(var(--chart-1))',
};

const fillColors = {
  blue: 'hsl(var(--chart-1) / 0.1)',
  purple: 'hsl(var(--chart-2) / 0.1)',
  orange: 'hsl(var(--chart-3) / 0.1)',
  green: 'hsl(var(--chart-4) / 0.1)',
  cyan: 'hsl(var(--chart-5) / 0.1)',
  indigo: 'hsl(var(--chart-1) / 0.1)',
};

const iconPaths = {
  cpu: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z',
  memory: 'M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2z',
  disk: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  gpu: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v10H7V7z',
  network: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z',
};

export function MetricCard({ title, value, unit, icon, color, history = [] }: MetricCardProps) {
  const percentage = unit === '%' ? value : null;
  const displayValue = percentage !== null ? percentage.toFixed(1) : value.toFixed(1);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; index: number } | null>(null);

  const chartPath = useMemo(() => {
    if (history.length < 2) return null;

    const width = 100;
    const height = 40;
    const maxValue = Math.max(...history, value);
    const minValue = Math.min(...history, value);
    const range = maxValue - minValue || 1;
    const xStep = width / (history.length - 1);

    const points = history.map((val, index) => {
      const x = index * xStep;
      const y = height - ((val - minValue) / range) * height;
      return { x, y, value: val, index };
    });

    const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    return { linePath, areaPath, points, maxValue, minValue, range };
  }, [history, value]);

  const trend = useMemo(() => {
    if (history.length < 2) return null;
    const recent = history.slice(-10);
    const avg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const diff = value - avg;
    return {
      direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'stable',
      percentage: Math.abs((diff / avg) * 100),
    };
  }, [history, value]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={iconPaths[icon as keyof typeof iconPaths] || iconPaths.cpu} />
          </svg>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">
            {displayValue}
            <span className="text-lg text-muted-foreground ml-1">{unit}</span>
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              {trend.direction === 'up' && (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {trend.direction === 'down' && (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span className={trend.direction === 'up' ? 'text-red-500' : trend.direction === 'down' ? 'text-green-500' : 'text-muted-foreground'}>
                {trend.percentage > 0.1 ? `${trend.percentage.toFixed(1)}%` : '~'}
              </span>
            </div>
          )}
        </div>

        {chartPath && (
          <div
            className="mt-3 h-16 relative group"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const closestPoint = chartPath.points.reduce((prev, curr) =>
                Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev
              );
              setTooltip(closestPoint);
            }}
            onMouseLeave={() => setTooltip(null)}
          >
            <svg
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d={chartPath.areaPath}
                fill={fillColors[color]}
              />
              <path
                d={chartPath.linePath}
                fill="none"
                stroke={strokeColors[color]}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              {tooltip && (
                <>
                  <line
                    x1={tooltip.x}
                    y1="0"
                    x2={tooltip.x}
                    y2="40"
                    stroke={strokeColors[color]}
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={tooltip.x}
                    cy={tooltip.y}
                    r="1.5"
                    fill={strokeColors[color]}
                    vectorEffect="non-scaling-stroke"
                  />
                </>
              )}
            </svg>
            {tooltip && (
              <PositionedTooltip leftPercent={tooltip.x}>
                <div className="font-semibold">{tooltip.value.toFixed(1)} {unit}</div>
                <div className="text-muted-foreground text-[10px]">
                  {history.length - tooltip.index} {history.length - tooltip.index === 1 ? 'day ago' : 'days ago'}
                </div>
              </PositionedTooltip>
            )}
          </div>
        )}

        {percentage !== null && (
          <div className="mt-3">
            <ProgressBar
              value={percentage}
              barClassName={colorClasses[color]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
