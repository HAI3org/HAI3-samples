# Design: Migrate Machine-Monitoring Charts to @hai3/uikit

## Context
The machine-monitoring screenset currently implements custom SVG-based charts with manual path generation and tooltip handling. This approach:
1. Duplicates functionality available in `@hai3/uikit`
2. Creates inconsistency with the demo screenset's chart patterns
3. Requires custom code for features like tooltips and legends

The `@hai3/uikit` package re-exports recharts components with HAI3-specific wrappers (`ChartContainer`, `ChartTooltipContent`, `ChartLegendContent`) that integrate with the theme system.

## Goals / Non-Goals
**Goals:**
- Replace custom SVG charts with standardized `@hai3/uikit` recharts components
- Maintain current visual appearance and interactivity
- Use theme-aware colors via CSS variables
- Reduce custom chart code by leveraging built-in recharts features

**Non-Goals:**
- Adding new chart types or features
- Changing the data flow or API contracts
- Modifying the Progress component (already uses `@hai3/uikit`)

## Decisions

### Decision: Use AreaChart for MetricCard sparklines
**Rationale:** The current sparkline shows a filled area under a line, which maps directly to recharts `AreaChart` with `Area` component. This provides built-in tooltip support and responsive sizing.

**Alternative considered:** LineChart - rejected because it doesn't support the filled area effect currently shown.

### Decision: Use LineChart for MetricsChart multi-line
**Rationale:** The current chart shows multiple metrics (CPU, RAM, Disk, GPU) as separate lines over time, which maps directly to `LineChart` with multiple `Line` components.

### Decision: Get theme colors via getComputedStyle
**Rationale:** Following the pattern from `demo/components/DataDisplayElements.tsx`, use `getComputedStyle(document.documentElement).getPropertyValue('--chart-N')` to get resolved theme colors. This ensures charts update correctly when themes change.

**Alternative considered:** Hardcoded HSL values - rejected because they wouldn't respond to theme changes.

## Component Mapping

| Current Code | Replacement |
|-------------|-------------|
| Custom SVG `<path>` with area fill | `<AreaChart>` + `<Area>` |
| Custom SVG `<polyline>` | `<LineChart>` + `<Line>` |
| `PositionedTooltip` (for charts) | `<ChartTooltip content={<ChartTooltipContent />}>` |
| Manual legend divs | `<ChartLegend content={<ChartLegendContent />}>` |
| `strokeColors` / `fillColors` maps | CSS variables via `getComputedStyle` |

## Risks / Trade-offs

**Risk:** Recharts bundle size increase
- **Mitigation:** `@hai3/uikit` already includes recharts; no new dependencies added

**Risk:** Visual differences from current implementation
- **Mitigation:** Test thoroughly via Chrome DevTools MCP; adjust styling via className props if needed

**Trade-off:** Less fine-grained control over SVG rendering
- **Accepted:** The standardization benefits outweigh the loss of low-level control

## Migration Plan

1. **MetricCard first:** Simpler component, establishes the pattern
2. **MetricsChart second:** Apply learned patterns to more complex multi-line chart
3. **Cleanup last:** Remove unused code after both migrations verified

## Open Questions

None - the pattern is well-established in the demo screenset.
