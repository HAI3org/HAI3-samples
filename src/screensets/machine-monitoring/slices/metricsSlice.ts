/**
 * Metrics Slice
 * Manages current and historical metrics state
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@hai3/uicore';
import type { MetricsSnapshot, TimeRange } from '../api/mockData';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const SLICE_KEY = `${MACHINE_MONITORING_SCREENSET_ID}/metrics` as const;

export interface MetricsState {
  currentMetrics: MetricsSnapshot | null;
  rangeMetrics: MetricsSnapshot[];
  timeRange: TimeRange;
  loading: boolean;
}

const initialState: MetricsState = {
  currentMetrics: null,
  rangeMetrics: [],
  timeRange: '1day',
  loading: false,
};

export const metricsSlice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setCurrentMetrics: (state, action: PayloadAction<MetricsSnapshot | null>) => {
      state.currentMetrics = action.payload;
    },
    setRangeMetrics: (state, action: PayloadAction<MetricsSnapshot[]>) => {
      state.rangeMetrics = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<TimeRange>) => {
      state.timeRange = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMetrics: (
      state,
      action: PayloadAction<{ currentMetrics: MetricsSnapshot; rangeMetrics: MetricsSnapshot[] }>
    ) => {
      state.currentMetrics = action.payload.currentMetrics;
      state.rangeMetrics = action.payload.rangeMetrics;
    },
  },
});

export const {
  setCurrentMetrics,
  setRangeMetrics,
  setTimeRange,
  setLoading,
  setMetrics,
} = metricsSlice.actions;

// Export the slice object for registerSlice()
export default metricsSlice;

// Module augmentation - extends uicore RootState
declare module '@hai3/uicore' {
  interface RootState {
    [SLICE_KEY]: MetricsState;
  }
}

/**
 * Type-safe selector for metrics state
 * Returns initialState if slice not yet registered
 */
export const selectMetricsState = (state: RootState): MetricsState => {
  return state[SLICE_KEY] ?? initialState;
};
