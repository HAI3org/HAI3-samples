# Monitoring State Management Capability

## ADDED Requirements

### Requirement: Event-Driven Data Flow
The machine-monitoring screenset SHALL use the event-driven architecture pattern for all data management.

#### Scenario: Actions emit events
- **WHEN** a user action triggers state change
- **THEN** an action function SHALL emit an event via eventBus
- **AND** the action SHALL NOT dispatch directly to Redux slices

#### Scenario: Effects update slices
- **WHEN** an event is emitted
- **THEN** the corresponding effect SHALL handle the event
- **AND** the effect SHALL dispatch to its own slice only

#### Scenario: Components read from store
- **WHEN** a component needs state
- **THEN** it SHALL use useSelector to read from the Redux store
- **AND** it SHALL NOT use useState for shared state

### Requirement: API Service Registration
The machine-monitoring API service SHALL be registered with apiRegistry for mock mode support.

#### Scenario: API service extends BaseApiService
- **WHEN** MonitoringApiService is defined
- **THEN** it SHALL extend BaseApiService from @hai3/uicore
- **AND** it SHALL be registered via apiRegistry.register()

#### Scenario: Mock data registered
- **WHEN** the screenset initializes
- **THEN** mock data SHALL be registered via apiRegistry.registerMocks()
- **AND** the mock mode toggle SHALL work in HAI3 Studio

### Requirement: Machines Domain
The machines domain SHALL manage machine list and selection state.

#### Scenario: Machines slice state structure
- **WHEN** machinesSlice is created
- **THEN** it SHALL contain machines array, selectedMachineId, and loading flag
- **AND** it SHALL augment RootState type

#### Scenario: Machine selection via event
- **WHEN** user selects a machine
- **THEN** selectMachine action SHALL emit MachinesEvents.Selected
- **AND** machinesEffects SHALL dispatch setSelectedMachineId

#### Scenario: Machines fetch on mount
- **WHEN** a screen component mounts
- **THEN** it SHALL dispatch fetchMachinesData action
- **AND** MachinesEvents.Fetched SHALL be emitted on success

### Requirement: Metrics Domain
The metrics domain SHALL manage current and historical metrics state.

#### Scenario: Metrics slice state structure
- **WHEN** metricsSlice is created
- **THEN** it SHALL contain currentMetrics, rangeMetrics, timeRange, and loading flag

#### Scenario: Metrics fetch on machine selection
- **WHEN** MachinesEvents.Selected is emitted
- **THEN** metricsEffects SHALL trigger metrics fetch
- **AND** MetricsEvents.Fetched SHALL be emitted with metrics data

#### Scenario: Time range change
- **WHEN** user changes time range
- **THEN** changeTimeRange action SHALL emit MetricsEvents.TimeRangeChanged
- **AND** metricsEffects SHALL refetch metrics for new range

### Requirement: Processes Domain
The processes domain SHALL manage running process list state.

#### Scenario: Processes slice state structure
- **WHEN** processesSlice is created
- **THEN** it SHALL contain processes array and loading flag

#### Scenario: Processes fetch on machine selection
- **WHEN** MachinesEvents.Selected is emitted
- **THEN** processesEffects SHALL trigger processes fetch
- **AND** ProcessesEvents.Fetched SHALL be emitted with process list

### Requirement: Fleet Domain
The fleet domain SHALL manage fleet overview state.

#### Scenario: Fleet slice state structure
- **WHEN** fleetSlice is created
- **THEN** it SHALL contain machines array, statistics object, and loading flag

#### Scenario: Fleet data fetch
- **WHEN** MachinesListScreen mounts
- **THEN** fetchFleetData action SHALL be dispatched
- **AND** FleetEvents.Fetched SHALL be emitted with fleet data

### Requirement: Slice Registration
All slices SHALL be registered with registerSlice in the screenset entry point.

#### Scenario: Slices registered on import
- **WHEN** machineMonitoringScreenset.tsx is imported
- **THEN** all domain slices SHALL be registered via registerSlice()
- **AND** each slice's effects SHALL be initialized

#### Scenario: RootState augmentation
- **WHEN** a slice is created
- **THEN** it SHALL augment @hai3/uicore RootState interface
- **AND** selectors SHALL be type-safe
