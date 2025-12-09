/**
 * Fleet Domain Events
 * Fleet overview events
 */

import '@hai3/uicore';
import type { MachineFleetInfo } from '../api/mockData';
import type { FleetStats } from '../api/MonitoringApiService';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const DOMAIN_ID = 'fleet';

export enum FleetEvents {
  Fetched = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fetched`,
  FetchFailed = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fetchFailed`,
}

declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [FleetEvents.Fetched]: {
      machines: MachineFleetInfo[];
      statistics: FleetStats;
    };
    [FleetEvents.FetchFailed]: { error: string };
  }
}
