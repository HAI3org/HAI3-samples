import React, { useMemo } from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  ChartContainer,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ChartTooltip,
  ChartLegend,
  ChartTooltipContent,
  ChartLegendContent,
  ResponsiveContainer,
} from '@hai3/uikit';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { BadgeCheckIcon } from '../uikit/icons/BadgeCheckIcon';
import { DEMO_SCREENSET_ID } from "../ids";
import { UI_KIT_ELEMENTS_SCREEN_ID } from "../ids";

/**
 * Get chart colors from CSS variables (theme-aware)
 * Returns resolved RGB values for Recharts compatibility
 */
const getChartColors = (): string[] => {
  const styles = getComputedStyle(document.documentElement);
  return [
    styles.getPropertyValue('--chart-1').trim(),
    styles.getPropertyValue('--chart-2').trim(),
    styles.getPropertyValue('--chart-3').trim(),
    styles.getPropertyValue('--chart-4').trim(),
    styles.getPropertyValue('--chart-5').trim(),
  ];
};

/**
 * Data Display Elements Component
 * Contains Avatar, Badge, and Chart demonstrations
 * Uses parent screen (UIKitElementsScreen) translations
 */
export const DataDisplayElements: React.FC = () => {
  const { t } = useTranslation();

  // Helper function to access parent screen's translations
  const tk = (key: string) => t(`screen.${DEMO_SCREENSET_ID}.${UI_KIT_ELEMENTS_SCREEN_ID}:${key}`);

  // Get theme-aware chart colors
  const chartColors = useMemo(() => getChartColors(), []);

  // Sample data for charts
  const lineChartData = [
    { name: 'Jan', users: 400, revenue: 2400 },
    { name: 'Feb', users: 300, revenue: 1398 },
    { name: 'Mar', users: 600, revenue: 9800 },
    { name: 'Apr', users: 800, revenue: 3908 },
    { name: 'May', users: 500, revenue: 4800 },
    { name: 'Jun', users: 700, revenue: 3800 },
  ];

  const barChartData = [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 35 },
    { name: 'Wed', value: 50 },
    { name: 'Thu', value: 30 },
    { name: 'Fri', value: 45 },
  ];

  const areaChartData = [
    { name: 'Page A', value: 4000 },
    { name: 'Page B', value: 3000 },
    { name: 'Page C', value: 2000 },
    { name: 'Page D', value: 2780 },
    { name: 'Page E', value: 1890 },
    { name: 'Page F', value: 2390 },
  ];

  const pieChartData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 30 },
    { name: 'Tablet', value: 25 },
  ];

  return (
    <>
      {/* Avatar Element Block */}
      <div data-element-id="element-avatar" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('avatar_heading')}
          </h2>
        </TextLoader>
        <div className="flex items-center justify-center p-6 border border-border rounded-lg bg-background">
          <div className="flex flex-row flex-wrap items-center gap-12">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="rounded-lg">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Element Block */}
      <div data-element-id="element-badge" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('badge_heading')}
          </h2>
        </TextLoader>
        <div className="flex items-center justify-center p-6 border border-border rounded-lg bg-background overflow-hidden">
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex w-full flex-wrap gap-2 justify-center">
              <Badge>
                <TextLoader skeletonClassName="h-4 w-12" inheritColor>
                  {tk('badge_default')}
                </TextLoader>
              </Badge>
              <Badge variant="secondary">
                <TextLoader skeletonClassName="h-3.5 w-14" inheritColor>
                  {tk('badge_secondary')}
                </TextLoader>
              </Badge>
              <Badge variant="destructive">
                <TextLoader skeletonClassName="h-4 w-20" inheritColor>
                  {tk('badge_destructive')}
                </TextLoader>
              </Badge>
              <Badge variant="outline">
                <TextLoader skeletonClassName="h-3.5 w-14" inheritColor>
                  {tk('badge_outline')}
                </TextLoader>
              </Badge>
            </div>
            <div className="flex w-full flex-wrap gap-2 justify-center">
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheckIcon className="w-3 h-3" />
                <TextLoader skeletonClassName="h-3.5 w-10" inheritColor>
                  {tk('badge_verified')}
                </TextLoader>
              </Badge>
              <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                8
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-green-500 text-white"
              >
                99
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="destructive"
              >
                99
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="outline"
              >
                20+
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Element Block */}
      <div data-element-id="element-chart" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('chart_heading')}
          </h2>
        </TextLoader>
        <div className="flex flex-col gap-6 p-6 border border-border rounded-lg bg-background">
          
          {/* Line Chart */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-20" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('chart_line_label')}
              </label>
            </TextLoader>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="users" stroke={chartColors[0]} strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke={chartColors[1]} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Bar Chart */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-20" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('chart_bar_label')}
              </label>
            </TextLoader>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill={chartColors[0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Area Chart */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-20" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('chart_area_label')}
              </label>
            </TextLoader>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={areaChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="value" stroke={chartColors[0]} fill={chartColors[0]} fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Pie Chart */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-20" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('chart_pie_label')}
              </label>
            </TextLoader>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={80}
                    fill={chartColors[0]}
                    dataKey="value"
                  >
                    {pieChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

        </div>
      </div>
    </>
  );
};

DataDisplayElements.displayName = 'DataDisplayElements';
