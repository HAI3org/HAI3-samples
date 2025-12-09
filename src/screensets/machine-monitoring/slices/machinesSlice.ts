/**
 * Machines Slice
 * Manages machine list and selection state
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@hai3/uicore';
import type { MachineInfo } from '../api/mockData';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const SLICE_KEY = `${MACHINE_MONITORING_SCREENSET_ID}/machines` as const;

export interface MachinesState {
  machines: MachineInfo[];
  selectedMachineId: string | null;
  loading: boolean;
}

const initialState: MachinesState = {
  machines: [],
  selectedMachineId: null,
  loading: false,
};

export const machinesSlice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setMachines: (state, action: PayloadAction<MachineInfo[]>) => {
      state.machines = action.payload;
    },
    setSelectedMachineId: (state, action: PayloadAction<string | null>) => {
      state.selectedMachineId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setMachines, setSelectedMachineId, setLoading } = machinesSlice.actions;

// Export the slice object for registerSlice()
export default machinesSlice;

// Module augmentation - extends uicore RootState
declare module '@hai3/uicore' {
  interface RootState {
    [SLICE_KEY]: MachinesState;
  }
}

/**
 * Type-safe selector for machines state
 * Returns initialState if slice not yet registered
 */
export const selectMachinesState = (state: RootState): MachinesState => {
  return state[SLICE_KEY] ?? initialState;
};
