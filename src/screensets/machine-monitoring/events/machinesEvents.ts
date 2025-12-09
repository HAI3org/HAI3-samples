/**
 * Machines Domain Events
 * Machine list and selection events
 */

import '@hai3/uicore';
import type { MachineInfo } from '../api/mockData';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const DOMAIN_ID = 'machines';

export enum MachinesEvents {
  Fetched = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fetched`,
  Selected = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/selected`,
  FetchFailed = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fetchFailed`,
}

declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [MachinesEvents.Fetched]: { machines: MachineInfo[] };
    [MachinesEvents.Selected]: { machineId: string };
    [MachinesEvents.FetchFailed]: { error: string };
  }
}
