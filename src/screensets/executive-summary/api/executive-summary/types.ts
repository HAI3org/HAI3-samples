/**
 * Executive Summary API Types
 */

// Alert severity levels
export enum AlertSeverity {
  Information = 'information',
  Warning = 'warning',
  Error = 'error',
  Critical = 'critical',
}

// Software update status
export enum SoftwareStatus {
  NoChange = 'no_change',
  Updated = 'updated',
  New = 'new',
  Removed = 'removed',
}

// Workload types for protection status
export enum WorkloadType {
  Servers = 'servers',
  Workstations = 'workstations',
  VirtualMachines = 'virtual_machines',
  WebHostingServers = 'web_hosting_servers',
  MobileDevices = 'mobile_devices',
}

/**
 * Cyber Protection Summary Stats
 */
export type CyberProtectionSummary = {
  dataBackedUp: string;
  mitigatedThreats: number;
  maliciousUrlsBlocked: number;
  patchedVulnerabilities: number;
  installedPatches: number;
  serversProtectedWithDr: number;
  fileSyncShareUsers: number;
  notarizedFiles: number;
  eSignedDocuments: number;
  blockedPeripheralDevices: number;
};

/**
 * Donut Chart Data Item
 */
export type DonutChartItem = {
  label: string;
  value: number;
  color: string;
};

/**
 * Missing Updates by Categories
 */
export type MissingUpdates = {
  total: number;
  items: DonutChartItem[];
};

/**
 * Workloads Backed Up
 */
export type WorkloadsBackedUp = {
  total: number;
  items: DonutChartItem[];
};

/**
 * Patched Vulnerabilities
 */
export type PatchedVulnerabilities = {
  total: number;
  items: DonutChartItem[];
  workloadsScanned: {
    current: number;
    total: number;
  };
};

/**
 * Patches Installed
 */
export type PatchesInstalled = {
  total: number;
  items: DonutChartItem[];
  workloadsPatched: {
    current: number;
    total: number;
  };
};

/**
 * File Sync & Share Statistics
 */
export type FileSyncShareStats = {
  totalCloudStorageUsed: number;
  endUsers: number;
  guestUsers: number;
  averageStoragePerUser: number;
};

/**
 * File Sync & Share Storage Usage
 */
export type FileSyncShareStorageUsage = {
  totalEndUsers: number;
  items: DonutChartItem[];
};

/**
 * Antimalware Scan Results
 */
export type AntimalwareScanResults = {
  totalFiles: number;
  items: DonutChartItem[];
  devicesProtected: {
    current: number;
    total: number;
  };
};

/**
 * Workload Protection Status Item
 */
export type WorkloadProtectionItem = {
  type: WorkloadType;
  label: string;
  protected: number;
  unprotected: number;
  total: number;
};

/**
 * Workloads Protection Status
 */
export type WorkloadsProtectionStatus = {
  totalProtected: number;
  totalUnprotected: number;
  total: number;
  items: WorkloadProtectionItem[];
};

/**
 * Active Alert
 */
export type ActiveAlert = {
  id: string;
  time: string;
  type: string;
  severity: AlertSeverity;
  deviceName: string;
  planName: string;
  message: string;
};

/**
 * Software Inventory Item
 */
export type SoftwareInventoryItem = {
  id: string;
  softwareName: string;
  softwareVersion: string;
  vendorName: string;
  status: SoftwareStatus;
  dateInstalled: string | null;
  scanTime: string;
};

/**
 * Software Inventory by Device
 */
export type DeviceSoftwareInventory = {
  deviceName: string;
  items: SoftwareInventoryItem[];
};

/**
 * Executive Summary Dashboard Data
 */
export type ExecutiveSummaryData = {
  customerName: string;
  dateRange: {
    start: string;
    end: string;
  };
  generatedAt: string;
  cyberProtectionSummary: CyberProtectionSummary;
  missingUpdates: MissingUpdates;
  workloadsBackedUp: WorkloadsBackedUp;
  workloadsProtectionStatus: WorkloadsProtectionStatus;
  activeAlerts: ActiveAlert[];
  patchedVulnerabilities: PatchedVulnerabilities;
  patchesInstalled: PatchesInstalled;
  antimalwareScanOfFiles: AntimalwareScanResults;
  fileSyncShareStats: FileSyncShareStats;
  fileSyncShareStorageUsage: FileSyncShareStorageUsage;
  softwareInventory: DeviceSoftwareInventory[];
};
