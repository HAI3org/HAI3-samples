/**
 * Monitoring Domain - API Service
 * Service for machine monitoring endpoints
 */

import { BaseApiService, RestProtocol, apiRegistry, type MockMap } from '@hai3/uicore';
import { MACHINE_MONITORING_SCREENSET_ID } from '../ids';
import type {
  MachineInfo,
  MachineFleetInfo,
  MetricsSnapshot,
  Process,
  TimeRange,
  LocationCategory,
  IssueType,
} from './mockData';

/**
 * Monitoring API domain identifier
 */
export const MONITORING_DOMAIN = `${MACHINE_MONITORING_SCREENSET_ID}:monitoring` as const;

/**
 * Fleet statistics type
 */
export type FleetStats = {
  totalMachines: number;
  onlineMachines: number;
  offlineMachines: number;
  maintenanceMachines: number;
  virtualMachines: number;
  physicalMachines: number;
  totalIssues: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  issuesByType: {
    hardware: number;
    software: number;
    security: number;
    backup: number;
    network: number;
  };
  locationCounts: {
    datacenter: number;
    cloud: number;
    office: number;
    remote: number;
  };
};

/**
 * Fleet filter options
 */
export interface FleetFilters {
  location?: LocationCategory;
  issueType?: IssueType;
  status?: 'online' | 'offline' | 'maintenance';
  search?: string;
}

/**
 * Monitoring API Service
 * Manages machine monitoring endpoints
 */
export class MonitoringApiService extends BaseApiService {
  constructor() {
    super(
      { baseURL: '/api/monitoring' },
      new RestProtocol({
        timeout: 30000,
      })
    );
  }

  /**
   * Get mock map from registry
   */
  protected getMockMap(): MockMap {
    return apiRegistry.getMockMap(MONITORING_DOMAIN);
  }

  /**
   * Get list of available machines
   */
  async getMachines(): Promise<MachineInfo[]> {
    return this.protocol(RestProtocol).get<MachineInfo[]>('/machines');
  }

  /**
   * Get machine by ID
   */
  async getMachine(machineId: string): Promise<MachineInfo | null> {
    return this.protocol(RestProtocol).get<MachineInfo | null>(`/machines/${machineId}`);
  }

  /**
   * Get metrics for a machine for a specific time range
   * Note: In mock mode, query params are not used for pattern matching,
   * so mock returns default time range data regardless of timeRange param
   */
  async getMetrics(machineId: string, _timeRange: TimeRange): Promise<MetricsSnapshot[]> {
    // Query params don't work with mock pattern matching, use path-only URL
    return this.protocol(RestProtocol).get<MetricsSnapshot[]>(
      `/machines/${machineId}/metrics`
    );
  }

  /**
   * Get current metrics snapshot
   */
  async getCurrentMetrics(machineId: string): Promise<MetricsSnapshot> {
    return this.protocol(RestProtocol).get<MetricsSnapshot>(
      `/machines/${machineId}/metrics/current`
    );
  }

  /**
   * Get list of running processes
   */
  async getProcesses(machineId: string): Promise<Process[]> {
    return this.protocol(RestProtocol).get<Process[]>(`/machines/${machineId}/processes`);
  }

  /**
   * Get all fleet machines with optional filters
   */
  async getFleetMachines(filters?: FleetFilters): Promise<MachineFleetInfo[]> {
    const params = new URLSearchParams();
    if (filters?.location) params.set('location', filters.location);
    if (filters?.status) params.set('status', filters.status);
    if (filters?.issueType) params.set('issueType', filters.issueType);
    if (filters?.search) params.set('search', filters.search);

    const query = params.toString();
    return this.protocol(RestProtocol).get<MachineFleetInfo[]>(
      `/fleet${query ? `?${query}` : ''}`
    );
  }

  /**
   * Get fleet statistics summary
   */
  async getFleetStatistics(): Promise<FleetStats> {
    return this.protocol(RestProtocol).get<FleetStats>('/fleet/statistics');
  }

  /**
   * Get a single fleet machine by ID
   */
  async getFleetMachine(machineId: string): Promise<MachineFleetInfo | null> {
    return this.protocol(RestProtocol).get<MachineFleetInfo | null>(`/fleet/${machineId}`);
  }
}

// Register service type in ApiServicesMap via module augmentation
declare module '@hai3/uicore' {
  interface ApiServicesMap {
    [MONITORING_DOMAIN]: MonitoringApiService;
  }
}

// Self-register with API registry
apiRegistry.register(MONITORING_DOMAIN, MonitoringApiService);
