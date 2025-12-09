/**
 * Metrics Domain Events
 * Current and historical metrics events
 */

import '@hai3/uicore';
import type { MetricsSnapshot, TimeRange } from '../api/mockData';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';

const DOMAIN_ID = 'metrics';

export enum MetricsEvents {
  Fetched = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fetched`,
  TimeRangeChanged = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/timeRangeChanged`,
  FetchFailed = `${MACHINE_MONITORING_SCREENSET_ID}/${DOMAIN_ID}/fetchFailed`,
}

declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [MetricsEvents.Fetched]: {
      currentMetrics: MetricsSnapshot;
      rangeMetrics: MetricsSnapshot[];
    };
    [MetricsEvents.TimeRangeChanged]: { timeRange: TimeRange };
    [MetricsEvents.FetchFailed]: { error: string };
  }
}
