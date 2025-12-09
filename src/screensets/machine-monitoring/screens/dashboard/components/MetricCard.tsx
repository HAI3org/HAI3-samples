import { Card, CardContent, CardHeader, CardTitle, AreaChart, Area, ResponsiveContainer, ChartTooltip } from '@hai3/uikit';
import { useMemo } from 'react';
import { ProgressBar } from '../../../uikit/base/ProgressBar';

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

const colorToChartVar: Record<string, string> = {
  blue: '--chart-1',
  purple: '--chart-2',
  orange: '--chart-3',
  green: '--chart-4',
  cyan: '--chart-5',
  indigo: '--chart-1',
};

const iconPaths = {
  cpu: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z',
  memory: 'M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2z',
  disk: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  gpu: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v10H7V7z',
  network: 'M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z',
};

// Icons that should be filled instead of stroked
const filledIcons = ['network'];

/**
 * Get chart color from CSS variables (theme-aware)
 */
const getChartColor = (colorName: string): string => {
  const cssVar = colorToChartVar[colorName] || '--chart-1';
  const styles = getComputedStyle(document.documentElement);
  return styles.getPropertyValue(cssVar).trim();
};

export function MetricCard({ title, value, unit, icon, color, history = [] }: MetricCardProps) {
  const percentage = unit === '%' ? value : null;
  const displayValue = percentage !== null ? percentage.toFixed(1) : value.toFixed(1);

  // Transform history data for recharts
  const chartData = useMemo(() => {
    if (history.length < 2) return null;
    return history.map((val, index) => ({
      index,
      value: val,
      daysAgo: history.length - index,
    }));
  }, [history]);

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

  // Get theme-aware chart color
  const chartColor = useMemo(() => getChartColor(color), [color]);

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
            fill={filledIcons.includes(icon) ? 'white' : 'none'}
            stroke={filledIcons.includes(icon) ? 'none' : 'white'}
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

        {chartData && (
          <div className="mt-3 h-16 w-full">
            <ResponsiveContainer width="100%" height={64}>
              <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  fill={chartColor}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
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
