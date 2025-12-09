# Design: Migrate Machine-Monitoring to Event-Driven Architecture

## Context
The machine-monitoring screenset currently uses React local state (`useState`) for all data management. This violates HAI3's event-driven architecture requirement that mandates: Component -> Action -> Event -> Effect -> Slice -> Store.

The chat screenset provides a reference implementation with proper domain separation (threads, messages, composer, settings).

## Goals / Non-Goals
**Goals:**
- Implement event-driven data flow per EVENTS.md
- Register API service with apiRegistry
- Create domain-separated slices, events, effects, actions
- Enable cross-domain communication via events
- Maintain identical UI behavior and appearance

**Non-Goals:**
- Adding new features
- Changing UI components
- Modifying the API client methods

## Domain Structure

### Domain: machines
State related to machine list and selection.

**Slice State:**
```typescript
interface MachinesState {
  machines: MachineInfo[];
  selectedMachineId: string | null;
  loading: boolean;
}
```

**Events:**
- `machine-monitoring/machines/fetched` - Machines list loaded
- `machine-monitoring/machines/selected` - Machine selected

### Domain: metrics
State related to current and historical metrics.

**Slice State:**
```typescript
interface MetricsState {
  currentMetrics: MetricsSnapshot | null;
  rangeMetrics: MetricsSnapshot[];
  timeRange: TimeRange;
  loading: boolean;
}
```

**Events:**
- `machine-monitoring/metrics/fetched` - Metrics data loaded
- `machine-monitoring/metrics/timeRangeChanged` - Time range updated

### Domain: processes
State related to running processes.

**Slice State:**
```typescript
interface ProcessesState {
  processes: Process[];
  loading: boolean;
}
```

**Events:**
- `machine-monitoring/processes/fetched` - Processes loaded

### Domain: fleet
State related to fleet overview.

**Slice State:**
```typescript
interface FleetState {
  machines: MachineFleetInfo[];
  statistics: FleetStats | null;
  loading: boolean;
}
```

**Events:**
- `machine-monitoring/fleet/fetched` - Fleet data loaded

### UI State (Local)
Filter/view state remains local to screens since it's screen-specific:
- `viewMode` (grid/table)
- `search`, `locationFilter`, `statusFilter`, `issueTypeFilter`
- `sshModalOpen`, `sshTarget`

This follows the pattern where presentation-only state stays local.

## API Service Registration

Convert `MonitoringApiClient` to use `BaseApiService` and register with `apiRegistry`:

```typescript
export const MONITORING_DOMAIN = `${MACHINE_MONITORING_SCREENSET_ID}:monitoring` as const;

export class MonitoringApiService extends BaseApiService {
  // ... methods
}

apiRegistry.register(MONITORING_DOMAIN, MonitoringApiService);
```

## Data Flow Examples

### Dashboard: Load Initial Machines
```
DashboardScreen mounts
  -> useEffect calls fetchMachines action
    -> Action calls monitoringApi.getMachines()
    -> On success, emits MachinesEvents.Fetched
      -> machinesEffects hears event
        -> Dispatches setMachines to machinesSlice
          -> Store updates
            -> DashboardScreen re-renders via useSelector
```

### Dashboard: Select Machine
```
User selects machine from dropdown
  -> Component calls selectMachine(machineId) action
    -> Action emits MachinesEvents.Selected
      -> machinesEffects dispatches setSelectedMachineId
      -> metricsEffects hears selection, fetches metrics
        -> Emits MetricsEvents.Fetched when done
```

### MachinesListScreen: Filter Machines
Local state for filters (doesn't need Redux):
```
User types in search box
  -> setSearch(value) (local useState)
    -> filteredMachines useMemo recomputes
      -> UI updates
```

## Decisions

### Decision: Keep filter state local
**Rationale:** Filters (search, location, status, issueType) are screen-specific presentation state with no cross-domain impact. Keeping them in `useState` is simpler and follows React conventions for UI-only state.

**Alternative considered:** Put all state in Redux - rejected as over-engineering for filters.

### Decision: Single actions file
**Rationale:** The machine-monitoring screenset has a smaller surface area than chat. A single `monitoringActions.ts` file keeps related actions together.

**Alternative considered:** Separate action files per domain - would create too many small files.

### Decision: Register API with apiRegistry
**Rationale:** Enables mock mode via apiRegistry.registerMocks() and follows the established pattern from chat screenset.

## File Structure

```
src/screensets/machine-monitoring/
├── actions/
│   └── monitoringActions.ts        # All actions
├── events/
│   ├── machinesEvents.ts           # Machines domain events
│   ├── metricsEvents.ts            # Metrics domain events
│   ├── processesEvents.ts          # Processes domain events
│   ├── fleetEvents.ts              # Fleet domain events
│   └── dataEvents.ts               # Aggregate fetch events
├── effects/
│   ├── machinesEffects.ts          # Machines event handlers
│   ├── metricsEffects.ts           # Metrics event handlers
│   ├── processesEffects.ts         # Processes event handlers
│   └── fleetEffects.ts             # Fleet event handlers
├── slices/
│   ├── machinesSlice.ts            # Machines state
│   ├── metricsSlice.ts             # Metrics state
│   ├── processesSlice.ts           # Processes state
│   └── fleetSlice.ts               # Fleet state
├── api/
│   ├── MonitoringApiService.ts     # Registered API service (new)
│   ├── mockData.ts                 # Existing mock data
│   ├── mocks.ts                    # Mock map for apiRegistry (new)
│   └── monitoringApiClient.ts      # Keep for migration (deprecated)
└── machineMonitoringScreenset.tsx  # Updated with slice registration
```

## Risks / Trade-offs

**Risk:** More boilerplate code than useState
- **Mitigation:** Follow established patterns from chat; use domain separation

**Risk:** Migration may break existing functionality
- **Mitigation:** Test thoroughly via Chrome DevTools MCP after each domain

**Trade-off:** Increased complexity for a simple screenset
- **Accepted:** Consistency with HAI3 architecture is more important; enables future cross-screenset communication

## Open Questions
None - patterns are well-established in the chat screenset reference.
