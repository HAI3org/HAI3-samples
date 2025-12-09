/**
 * Mock data map for MonitoringApiService
 * Used with apiRegistry.registerMocks()
 */

import type { MockMap } from '@hai3/uicore';
import {
  MOCK_MACHINES,
  MOCK_FLEET_MACHINES,
  generateMetricsForRange,
  generateProcessList,
  getFleetStatistics,
} from './mockData';

/**
 * Default machine ID for mock responses
 * In real usage, the URL would contain the machineId, but mocks don't have access to URL params
 */
const DEFAULT_MACHINE_ID = 'machine-1';

/**
 * Mock handlers for all monitoring endpoints
 * Uses synchronous functions per MockResponseFactory type
 */
export const monitoringMockMap = {
  'GET /machines': () => [...MOCK_MACHINES],

  'GET /machines/:machineId': () => MOCK_MACHINES[0] || null,

  // Pattern with query string - MockPlugin strips query params for matching
  'GET /machines/:machineId/metrics': () => generateMetricsForRange(DEFAULT_MACHINE_ID, '1day'),

  'GET /machines/:machineId/metrics/current': () => {
    const metrics = generateMetricsForRange(DEFAULT_MACHINE_ID, '30min');
    return metrics[metrics.length - 1];
  },

  'GET /machines/:machineId/processes': () => generateProcessList(DEFAULT_MACHINE_ID),

  'GET /fleet': () => [...MOCK_FLEET_MACHINES],

  'GET /fleet/statistics': () => getFleetStatistics(),

  'GET /fleet/:machineId': () => MOCK_FLEET_MACHINES[0] || null,
} satisfies MockMap;
