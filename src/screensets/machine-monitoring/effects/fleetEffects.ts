/**
 * Fleet Effects
 * Listen to fleet-related events and update fleet slice
 */

import { eventBus, type AppDispatch } from '@hai3/uicore';
import { FleetEvents } from '../events/fleetEvents';
import { DataEvents } from '../events/dataEvents';
import { setFleetData, setLoading } from '../slices/fleetSlice';

let dispatch: AppDispatch;

/**
 * Initialize fleet effects
 * Called once during app bootstrap
 */
export const initializeFleetEffects = (appDispatch: AppDispatch): void => {
  dispatch = appDispatch;

  // Fleet data fetched
  eventBus.on(FleetEvents.Fetched, ({ machines, statistics }) => {
    dispatch(setFleetData({ machines, statistics }));
    dispatch(setLoading(false));
  });

  // Fetch failed
  eventBus.on(FleetEvents.FetchFailed, ({ error }) => {
    console.error('Failed to fetch fleet data:', error);
    dispatch(setLoading(false));
  });

  // Fleet fetch started - set loading
  eventBus.on(DataEvents.FleetFetchStarted, () => {
    dispatch(setLoading(true));
  });
};
