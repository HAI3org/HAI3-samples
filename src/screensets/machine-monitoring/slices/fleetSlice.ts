/**
 * Fleet Slice
 * Manages fleet overview state
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@hai3/uicore';
import type { MachineFleetInfo } from '../api/mockData';
import type { FleetStats } from '../api/MonitoringApiService';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const SLICE_KEY = `${MACHINE_MONITORING_SCREENSET_ID}/fleet` as const;

export interface FleetState {
  machines: MachineFleetInfo[];
  statistics: FleetStats | null;
  loading: boolean;
}

const initialState: FleetState = {
  machines: [],
  statistics: null,
  loading: false,
};

export const fleetSlice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setMachines: (state, action: PayloadAction<MachineFleetInfo[]>) => {
      state.machines = action.payload;
    },
    setStatistics: (state, action: PayloadAction<FleetStats | null>) => {
      state.statistics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFleetData: (
      state,
      action: PayloadAction<{ machines: MachineFleetInfo[]; statistics: FleetStats }>
    ) => {
      state.machines = action.payload.machines;
      state.statistics = action.payload.statistics;
    },
  },
});

export const { setMachines, setStatistics, setLoading, setFleetData } = fleetSlice.actions;

// Export the slice object for registerSlice()
export default fleetSlice;

// Module augmentation - extends uicore RootState
declare module '@hai3/uicore' {
  interface RootState {
    [SLICE_KEY]: FleetState;
  }
}

/**
 * Type-safe selector for fleet state
 * Returns initialState if slice not yet registered
 */
export const selectFleetState = (state: RootState): FleetState => {
  return state[SLICE_KEY] ?? initialState;
};
