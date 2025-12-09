# machine-monitoring-charts Specification

## Purpose
TBD - created by archiving change migrate-charts-to-uikit. Update Purpose after archive.
## Requirements
### Requirement: MetricCard Sparkline Chart
The MetricCard component SHALL display historical metric data as an interactive area chart using `@hai3/uikit` recharts components.

#### Scenario: Sparkline renders with history data
- **WHEN** MetricCard receives a non-empty `history` prop
- **THEN** an AreaChart SHALL render showing the historical values
- **AND** the chart fill color SHALL use theme-aware CSS variables (`--chart-N`)

#### Scenario: Sparkline tooltip on hover
- **WHEN** user hovers over a data point in the sparkline
- **THEN** a ChartTooltip SHALL display showing the value and time offset

#### Scenario: No sparkline without history
- **WHEN** MetricCard receives an empty or single-item `history` prop
- **THEN** no chart SHALL render

### Requirement: MetricsChart Multi-Line Chart
The MetricsChart component SHALL display multiple metric time series (CPU, RAM, Disk, GPU) as an interactive line chart using `@hai3/uikit` recharts components.

#### Scenario: Multi-line chart renders with metrics data
- **WHEN** MetricsChart receives a non-empty `metrics` array
- **THEN** a LineChart SHALL render with four lines (CPU, RAM, Disk, GPU)
- **AND** each line SHALL use a distinct theme-aware color from CSS variables (`--chart-1` through `--chart-4`)

#### Scenario: Chart includes axis labels
- **WHEN** MetricsChart renders
- **THEN** XAxis SHALL display formatted date labels
- **AND** YAxis SHALL display percentage scale

#### Scenario: Chart includes interactive legend
- **WHEN** MetricsChart renders
- **THEN** ChartLegend SHALL display labels for each metric type

#### Scenario: Chart tooltip on hover
- **WHEN** user hovers over a data point
- **THEN** ChartTooltip SHALL display all metric values at that timestamp

### Requirement: Theme-Aware Chart Colors
All chart components SHALL use CSS variable-based colors that respond to theme changes.

#### Scenario: Colors update on theme switch
- **WHEN** user switches between light and dark themes
- **THEN** chart stroke and fill colors SHALL update to reflect the active theme's `--chart-N` variables

#### Scenario: Colors obtained via getComputedStyle
- **WHEN** chart components initialize
- **THEN** colors SHALL be obtained via `getComputedStyle(document.documentElement).getPropertyValue('--chart-N')`

