/**
 * Processes Slice
 * Manages running processes state
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@hai3/uicore';
import type { Process } from '../api/mockData';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const SLICE_KEY = `${MACHINE_MONITORING_SCREENSET_ID}/processes` as const;

export interface ProcessesState {
  processes: Process[];
  loading: boolean;
}

const initialState: ProcessesState = {
  processes: [],
  loading: false,
};

export const processesSlice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setProcesses: (state, action: PayloadAction<Process[]>) => {
      state.processes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProcesses, setLoading } = processesSlice.actions;

// Export the slice object for registerSlice()
export default processesSlice;

// Module augmentation - extends uicore RootState
declare module '@hai3/uicore' {
  interface RootState {
    [SLICE_KEY]: ProcessesState;
  }
}

/**
 * Type-safe selector for processes state
 * Returns initialState if slice not yet registered
 */
export const selectProcessesState = (state: RootState): ProcessesState => {
  return state[SLICE_KEY] ?? initialState;
};
