# Change: Migrate Machine-Monitoring Charts to @hai3/uikit Recharts Components

## Why
The machine-monitoring screenset uses custom SVG chart implementations (`MetricCard.tsx`, `MetricsChart.tsx`) instead of the standardized `@hai3/uikit` recharts components. This creates inconsistency with the demo screenset's chart patterns and duplicates functionality. Per SCREENSETS.md: "REQUIRED: Use @hai3/uikit components; manual styling only in uikit/base/".

## What Changes
- Replace custom SVG sparkline charts in `MetricCard.tsx` with `@hai3/uikit` `AreaChart` components
- Replace custom SVG multi-line chart in `MetricsChart.tsx` with `@hai3/uikit` `LineChart` components
- Use theme-aware CSS variables (`--chart-1` through `--chart-5`) for consistent coloring
- Leverage built-in `ChartTooltip` and `ChartLegend` components for interactivity
- Remove custom tooltip and chart path generation code

## Impact
- Affected specs: machine-monitoring-charts (new capability)
- Affected code:
  - `src/screensets/machine-monitoring/screens/dashboard/components/MetricCard.tsx`
  - `src/screensets/machine-monitoring/screens/dashboard/components/MetricsChart.tsx`
- Dependencies: `@hai3/uikit` recharts exports (already available)
- Risk: Low - follows existing patterns from demo screenset
