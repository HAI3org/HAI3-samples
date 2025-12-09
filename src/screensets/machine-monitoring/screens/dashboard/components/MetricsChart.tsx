import { Card, CardContent, CardHeader, CardTitle, LineChart, Line, XAxis, YAxis, ResponsiveContainer, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@hai3/uikit';
import type { MetricsSnapshot } from '../../../api/mockData';
import { useMemo } from 'react';
import { sortBy } from 'lodash';

interface MetricsChartProps {
  metrics: MetricsSnapshot[];
  tk: (key: string) => string;
}

/**
 * Get chart colors from CSS variables (theme-aware)
 */
const getChartColors = (): string[] => {
  const styles = getComputedStyle(document.documentElement);
  return [
    styles.getPropertyValue('--chart-1').trim(),
    styles.getPropertyValue('--chart-2').trim(),
    styles.getPropertyValue('--chart-3').trim(),
    styles.getPropertyValue('--chart-4').trim(),
  ];
};

export function MetricsChart({ metrics, tk }: MetricsChartProps) {
  const sortedMetrics = useMemo(() => sortBy(metrics, 'timestamp'), [metrics]);

  // Transform data for recharts
  const chartData = useMemo(() => {
    return sortedMetrics.map(m => ({
      timestamp: m.timestamp,
      date: new Date(m.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      CPU: m.cpuUsage,
      RAM: m.ramUsage,
      Disk: m.diskUsage,
      GPU: m.gpuUsage,
    }));
  }, [sortedMetrics]);

  // Get theme-aware chart colors
  const chartColors = useMemo(() => getChartColors(), []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{tk('chart.past_week')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="w-full h-48">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                    tickFormatter={(yValue) => `${yValue}%`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="CPU" stroke={chartColors[0]} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="RAM" stroke={chartColors[1]} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Disk" stroke={chartColors[2]} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="GPU" stroke={chartColors[3]} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
