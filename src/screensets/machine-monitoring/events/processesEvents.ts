/**
 * Processes Domain Events
 * Running processes events
 */

import '@hai3/uicore';
import type { Process } from '../api/mockData';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const DOMAIN_ID = 'processes';

export enum ProcessesEvents {
  Fetched = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fetched`,
  FetchFailed = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fetchFailed`,
}

declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [ProcessesEvents.Fetched]: { processes: Process[] };
    [ProcessesEvents.FetchFailed]: { error: string };
  }
}
