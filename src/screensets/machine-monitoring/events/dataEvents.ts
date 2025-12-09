/**
 * Data Events
 * Aggregate fetch events for data loading
 */

import '@hai3/uicore';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const DOMAIN_ID = 'data';

export enum DataEvents {
  DashboardFetchStarted = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/dashboardFetchStarted`,
  FleetFetchStarted = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fleetFetchStarted`,
}

declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [DataEvents.DashboardFetchStarted]: Record<string, never>;
    [DataEvents.FleetFetchStarted]: Record<string, never>;
  }
}
