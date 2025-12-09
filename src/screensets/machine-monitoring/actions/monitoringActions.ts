/**
 * Monitoring Actions
 * Emit events AND interact with APIs (Flux pattern)
 * Following Flux: Actions emit events for effects to update Redux, and call APIs
 */

import { eventBus, apiRegistry, type AppDispatch } from '@hai3/uicore';
import { MachinesEvents } from '../events/machinesEvents';
import { MetricsEvents } from '../events/metricsEvents';
import { ProcessesEvents } from '../events/processesEvents';
import { FleetEvents } from '../events/fleetEvents';
import { DataEvents } from '../events/dataEvents';
import { MONITORING_DOMAIN } from '../api/MonitoringApiService';
import type { TimeRange } from '../api/mockData';

/**
 * Machine Actions
 */
export const selectMachine = (machineId: string, timeRange: TimeRange): void => {
  // Emit selection event
  eventBus.emit(MachinesEvents.Selected, { machineId });

  const monitoringApi = apiRegistry.getService(MONITORING_DOMAIN);

  // Fetch metrics
  void Promise.all([
    monitoringApi.getCurrentMetrics(machineId),
    monitoringApi.getMetrics(machineId, timeRange),
  ])
    .then(([currentMetrics, rangeMetrics]) => {
      eventBus.emit(MetricsEvents.Fetched, { currentMetrics, rangeMetrics });
    })
    .catch((error) => {
      eventBus.emit(MetricsEvents.FetchFailed, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    });

  // Fetch processes
  monitoringApi
    .getProcesses(machineId)
    .then((processes) => {
      eventBus.emit(ProcessesEvents.Fetched, { processes });
    })
    .catch((error) => {
      eventBus.emit(ProcessesEvents.FetchFailed, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    });
};

export const fetchMachines = () => {
  return (_dispatch: AppDispatch): void => {
    eventBus.emit(DataEvents.DashboardFetchStarted, {});

    const monitoringApi = apiRegistry.getService(MONITORING_DOMAIN);

    monitoringApi
      .getMachines()
      .then((machines) => {
        eventBus.emit(MachinesEvents.Fetched, { machines });
      })
      .catch((error) => {
        eventBus.emit(MachinesEvents.FetchFailed, {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      });
  };
};

/**
 * Metrics Actions
 */
export const changeTimeRange = (timeRange: TimeRange, machineId: string) => {
  return (_dispatch: AppDispatch): void => {
    eventBus.emit(MetricsEvents.TimeRangeChanged, { timeRange });

    const monitoringApi = apiRegistry.getService(MONITORING_DOMAIN);

    void Promise.all([
      monitoringApi.getCurrentMetrics(machineId),
      monitoringApi.getMetrics(machineId, timeRange),
    ])
      .then(([currentMetrics, rangeMetrics]) => {
        eventBus.emit(MetricsEvents.Fetched, { currentMetrics, rangeMetrics });
      })
      .catch((error) => {
        eventBus.emit(MetricsEvents.FetchFailed, {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      });
  };
};

/**
 * Fleet Actions
 */
export const fetchFleetData = () => {
  return (_dispatch: AppDispatch): void => {
    eventBus.emit(DataEvents.FleetFetchStarted, {});

    const monitoringApi = apiRegistry.getService(MONITORING_DOMAIN);

    void Promise.all([
      monitoringApi.getFleetMachines(),
      monitoringApi.getFleetStatistics(),
    ])
      .then(([machines, statistics]) => {
        eventBus.emit(FleetEvents.Fetched, { machines, statistics });
      })
      .catch((error) => {
        eventBus.emit(FleetEvents.FetchFailed, {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      });
  };
};
