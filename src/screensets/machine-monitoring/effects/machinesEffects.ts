/**
 * Machines Effects
 * Listen to machine-related events and update machines slice
 */

import { eventBus, type AppDispatch, store } from '@hai3/uicore';
import { MachinesEvents } from '../events/machinesEvents';
import { DataEvents } from '../events/dataEvents';
import {
  setMachines,
  setSelectedMachineId,
  setLoading,
  selectMachinesState,
} from '../slices/machinesSlice';

let dispatch: AppDispatch;

/**
 * Initialize machines effects
 * Called once during app bootstrap
 */
export const initializeMachinesEffects = (appDispatch: AppDispatch): void => {
  dispatch = appDispatch;

  // Machine selection
  eventBus.on(MachinesEvents.Selected, ({ machineId }) => {
    dispatch(setSelectedMachineId(machineId));
  });

  // Machines fetched
  eventBus.on(MachinesEvents.Fetched, ({ machines }) => {
    dispatch(setMachines(machines));
    dispatch(setLoading(false));

    // Auto-select first machine if none selected
    const state = selectMachinesState(store.getState());
    if (machines.length > 0 && !state.selectedMachineId) {
      dispatch(setSelectedMachineId(machines[0].id));
    }
  });

  // Fetch failed
  eventBus.on(MachinesEvents.FetchFailed, ({ error }) => {
    console.error('Failed to fetch machines:', error);
    dispatch(setLoading(false));
  });

  // Dashboard fetch started - set loading
  eventBus.on(DataEvents.DashboardFetchStarted, () => {
    dispatch(setLoading(true));
  });
};
