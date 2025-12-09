# Tasks: Migrate Machine-Monitoring Charts to @hai3/uikit

## 1. Preparation
- [x] 1.1 Review existing chart component patterns in `demo/components/DataDisplayElements.tsx`
- [x] 1.2 Identify CSS variable references for chart colors (`--chart-1` through `--chart-5`)

## 2. MetricCard Chart Migration
- [x] 2.1 Import `@hai3/uikit` chart components (`AreaChart`, `Area`, `ResponsiveContainer`, `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`)
- [x] 2.2 Replace custom `chartPath` SVG generation with `AreaChart` component
- [x] 2.3 Update tooltip to use `ChartTooltip` with `ChartTooltipContent`
- [x] 2.4 Remove custom `PositionedTooltip` usage for chart (keep base component for other uses)
- [x] 2.5 Update color mapping to use CSS variables via `getComputedStyle`

## 3. MetricsChart Migration
- [x] 3.1 Import `@hai3/uikit` chart components (`LineChart`, `Line`, `XAxis`, `YAxis`, `CartesianGrid`, `ResponsiveContainer`, `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`)
- [x] 3.2 Replace custom `createPath` SVG generation with `LineChart` component
- [x] 3.3 Add proper XAxis with formatted dates and YAxis with percentage values
- [x] 3.4 Replace manual legend with `ChartLegend` component
- [x] 3.5 Update color mapping to use CSS variables

## 4. Cleanup
- [x] 4.1 Remove unused custom SVG path generation code
- [x] 4.2 Remove `strokeColors` and `fillColors` constants if no longer needed
- [x] 4.3 Verify `PositionedTooltip` base component is still needed elsewhere (keep if used) - REMOVED (no longer used)

## 5. Validation
- [x] 5.1 Run `npm run arch:check` - must pass with zero errors
- [x] 5.2 Run `npm run type-check` - must pass
- [x] 5.3 Run `npm run lint` - must pass with zero warnings
- [x] 5.4 Test via Chrome DevTools MCP:
  - [x] 5.4.1 Navigate to machine-monitoring dashboard
  - [x] 5.4.2 Verify MetricCard sparkline charts render correctly
  - [x] 5.4.3 Verify MetricCard tooltips display on hover
  - [x] 5.4.4 Verify MetricsChart multi-line chart renders correctly - N/A (component not used in current dashboard)
  - [x] 5.4.5 Verify MetricsChart legend displays - N/A (component not used in current dashboard)
  - [x] 5.4.6 Verify MetricsChart tooltips work - N/A (component not used in current dashboard)
  - [x] 5.4.7 Test theme switching (light/dark) - charts should use theme colors
  - [x] 5.4.8 Check for console errors - NONE
