/**
 * Metrics Effects
 * Listen to metrics-related events and update metrics slice
 */

import { eventBus, type AppDispatch } from '@hai3/uicore';
import { MetricsEvents } from '../events/metricsEvents';
import { MachinesEvents } from '../events/machinesEvents';
import { setMetrics, setTimeRange, setLoading } from '../slices/metricsSlice';

let dispatch: AppDispatch;

/**
 * Initialize metrics effects
 * Called once during app bootstrap
 */
export const initializeMetricsEffects = (appDispatch: AppDispatch): void => {
  dispatch = appDispatch;

  // Metrics fetched
  eventBus.on(MetricsEvents.Fetched, ({ currentMetrics, rangeMetrics }) => {
    dispatch(setMetrics({ currentMetrics, rangeMetrics }));
    dispatch(setLoading(false));
  });

  // Time range changed - update state
  eventBus.on(MetricsEvents.TimeRangeChanged, ({ timeRange }) => {
    dispatch(setTimeRange(timeRange));
  });

  // Fetch failed
  eventBus.on(MetricsEvents.FetchFailed, ({ error }) => {
    console.error('Failed to fetch metrics:', error);
    dispatch(setLoading(false));
  });

  // Cross-domain: When machine is selected, set loading state
  // The actual fetch is done by the action that triggered the selection
  eventBus.on(MachinesEvents.Selected, () => {
    dispatch(setLoading(true));
  });
};
