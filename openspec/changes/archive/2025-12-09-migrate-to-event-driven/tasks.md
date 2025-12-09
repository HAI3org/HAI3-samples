# Tasks: Migrate Machine-Monitoring to Event-Driven Architecture

## 1. API Service Setup
- [x] 1.1 Create `MonitoringApiService.ts` extending BaseApiService
- [x] 1.2 Define `MONITORING_DOMAIN` constant
- [x] 1.3 Register service with apiRegistry
- [x] 1.4 Create `mocks.ts` with mock map for all endpoints
- [x] 1.5 Register mocks in screenset entry point

## 2. Machines Domain
- [x] 2.1 Create `events/machinesEvents.ts` with event enum and payload types
- [x] 2.2 Create `slices/machinesSlice.ts` with state, reducers, selectors
- [x] 2.3 Create `effects/machinesEffects.ts` with event handlers
- [x] 2.4 Add machines actions to `actions/monitoringActions.ts`

## 3. Metrics Domain
- [x] 3.1 Create `events/metricsEvents.ts` with event enum and payload types
- [x] 3.2 Create `slices/metricsSlice.ts` with state, reducers, selectors
- [x] 3.3 Create `effects/metricsEffects.ts` with event handlers
- [x] 3.4 Add metrics actions to `actions/monitoringActions.ts`

## 4. Processes Domain
- [x] 4.1 Create `events/processesEvents.ts` with event enum and payload types
- [x] 4.2 Create `slices/processesSlice.ts` with state, reducers, selectors
- [x] 4.3 Create `effects/processesEffects.ts` with event handlers
- [x] 4.4 Add processes actions to `actions/monitoringActions.ts`

## 5. Fleet Domain
- [x] 5.1 Create `events/fleetEvents.ts` with event enum and payload types
- [x] 5.2 Create `slices/fleetSlice.ts` with state, reducers, selectors
- [x] 5.3 Create `effects/fleetEffects.ts` with event handlers
- [x] 5.4 Add fleet actions to `actions/monitoringActions.ts`

## 6. Data Events
- [x] 6.1 Create `events/dataEvents.ts` for aggregate fetch events

## 7. Screenset Integration
- [x] 7.1 Update `machineMonitoringScreenset.tsx` to import and register all slices
- [x] 7.2 Import API service for side-effect registration
- [x] 7.3 Register mocks with apiRegistry

## 8. Dashboard Screen Migration
- [x] 8.1 Replace `useState` for machines with `useSelector` from machinesSlice
- [x] 8.2 Replace `useState` for metrics with `useSelector` from metricsSlice
- [x] 8.3 Replace `useState` for processes with `useSelector` from processesSlice
- [x] 8.4 Replace direct API calls with action dispatches
- [x] 8.5 Update loading states to use slice loading flags
- [x] 8.6 Keep local state for derived/computed values (metricHistories)

## 9. MachinesListScreen Migration
- [x] 9.1 Replace `useState` for machines/stats with `useSelector` from fleetSlice
- [x] 9.2 Replace direct API calls with action dispatches
- [x] 9.3 Update loading states to use slice loading flag
- [x] 9.4 Keep local state for filters (search, locationFilter, statusFilter, issueTypeFilter)
- [x] 9.5 Keep local state for UI (viewMode, sshModalOpen, sshTarget)

## 10. Validation
- [x] 10.1 Run `npm run arch:check` - must pass with zero errors
- [x] 10.2 Run `npm run type-check` - must pass
- [x] 10.3 Run `npm run lint` - must pass with zero warnings

## 11. Chrome DevTools MCP Testing
- [x] 11.1 Navigate to Machines Fleet screen
- [x] 11.2 Verify fleet data loads (12 machines, statistics cards)
- [x] 11.3 Test search filter
- [x] 11.4 Test location filter dropdown
- [x] 11.5 Test status filter dropdown
- [x] 11.6 Test view mode toggle (grid/table)
- [x] 11.7 Navigate to Machine Monitoring Dashboard
- [x] 11.8 Verify machine dropdown populates
- [x] 11.9 Verify metrics cards display current values
- [x] 11.10 Verify sparkline charts render
- [x] 11.11 Test time range selector
- [x] 11.12 Verify process table displays
- [x] 11.13 Test machine selection updates all data
- [x] 11.14 Check for console errors - NONE expected
- [x] 11.15 Test theme switching (light/dark)
