/**
 * Processes Effects
 * Listen to process-related events and update processes slice
 */

import { eventBus, type AppDispatch } from '@hai3/uicore';
import { ProcessesEvents } from '../events/processesEvents';
import { MachinesEvents } from '../events/machinesEvents';
import { setProcesses, setLoading } from '../slices/processesSlice';

let dispatch: AppDispatch;

/**
 * Initialize processes effects
 * Called once during app bootstrap
 */
export const initializeProcessesEffects = (appDispatch: AppDispatch): void => {
  dispatch = appDispatch;

  // Processes fetched
  eventBus.on(ProcessesEvents.Fetched, ({ processes }) => {
    dispatch(setProcesses(processes));
    dispatch(setLoading(false));
  });

  // Fetch failed
  eventBus.on(ProcessesEvents.FetchFailed, ({ error }) => {
    console.error('Failed to fetch processes:', error);
    dispatch(setLoading(false));
  });

  // Cross-domain: When machine is selected, set loading state
  // The actual fetch is done by the action that triggered the selection
  eventBus.on(MachinesEvents.Selected, () => {
    dispatch(setLoading(true));
  });
};
