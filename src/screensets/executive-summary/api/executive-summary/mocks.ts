/**
 * Executive Summary API Mocks
 */
import type { MockMap } from '@hai3/uicore';
import {
  type ExecutiveSummaryData,
  AlertSeverity,
  SoftwareStatus,
  WorkloadType,
} from './types';

// Calculate date range: 1 month ago to today
const today = new Date();
const monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);

const formatDateISO = (date: Date) => date.toISOString().split('T')[0];

// Helper to generate random number in range
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const mockExecutiveSummaryData: ExecutiveSummaryData = {
  customerName: 'FE',
  dateRange: {
    start: formatDateISO(monthAgo),
    end: formatDateISO(today),
  },
  generatedAt: today.toISOString(),
  cyberProtectionSummary: {
    dataBackedUp: '19.18 GB',
    mitigatedThreats: rand(5, 50),
    maliciousUrlsBlocked: rand(10, 100),
    patchedVulnerabilities: 66,
    installedPatches: 7,
    serversProtectedWithDr: rand(1, 10),
    fileSyncShareUsers: 3,
    notarizedFiles: rand(5, 30),
    eSignedDocuments: rand(2, 20),
    blockedPeripheralDevices: rand(1, 15),
  },
  missingUpdates: {
    total: 12,
    items: [
      { label: 'Security updates', value: rand(2, 8), color: '#3b82f6' },
      { label: 'Critical updates', value: rand(1, 5), color: '#22c55e' },
      { label: 'Other', value: rand(3, 12), color: '#6366f1' },
    ],
  },
  workloadsBackedUp: {
    total: 5,
    items: [
      { label: 'Backed up', value: 2, color: '#22c55e' },
      { label: 'Not backed up', value: 3, color: '#f59e0b' },
    ],
  },
  workloadsProtectionStatus: {
    totalProtected: 4,
    totalUnprotected: 1,
    total: 5,
    items: [
      { type: WorkloadType.Servers, label: 'Servers', protected: rand(1, 3), unprotected: rand(0, 2), total: rand(2, 5) },
      { type: WorkloadType.Workstations, label: 'Workstations', protected: rand(2, 5), unprotected: rand(0, 1), total: rand(3, 6) },
      { type: WorkloadType.VirtualMachines, label: 'Virtual machines', protected: 3, unprotected: 1, total: 4 },
      { type: WorkloadType.WebHostingServers, label: 'Web hosting servers', protected: rand(0, 2), unprotected: rand(0, 1), total: rand(1, 3) },
      { type: WorkloadType.MobileDevices, label: 'Mobile devices', protected: rand(1, 4), unprotected: rand(0, 2), total: rand(2, 6) },
    ],
  },
  activeAlerts: [
    {
      id: '1',
      time: '2025-12-03T14:01:00Z',
      type: 'Low CPU usage',
      severity: AlertSeverity.Information,
      deviceName: 'DESKTOP-FA47EAL',
      planName: 'Recommended monitoring for servers',
      message: "The CPU usage of workload 'DESKTOP-FA47EAL' was below 20 % for a period of 10 minutes.",
    },
    {
      id: '2',
      time: '2025-12-03T13:07:00Z',
      type: 'Restart required to complete the agent installation',
      severity: AlertSeverity.Warning,
      deviceName: 'WIN-4H8TV8C4NDH',
      planName: '',
      message: "Installation of agent '25.8.40800' completed successfully. Please restart 'WIN-4H8TV8C4NDH' to apply the changes.",
    },
    {
      id: '3',
      time: '2025-12-03T11:09:00Z',
      type: 'Restart required to complete the agent installation',
      severity: AlertSeverity.Warning,
      deviceName: 'DESKTOP-FA47EAL',
      planName: '',
      message: "Installation of agent '25.7.40497' completed successfully. Please restart 'DESKTOP-FA47EAL' to apply the changes.",
    },
    {
      id: '4',
      time: '2025-12-03T00:14:00Z',
      type: 'Disabled antimalware software',
      severity: AlertSeverity.Warning,
      deviceName: 'testing',
      planName: 'Monitoring plan - default',
      message: "'Cyber Protect' is not running on workload 'testing'.",
    },
    {
      id: '5',
      time: '2025-12-02T17:44:00Z',
      type: 'Protection plan conflict detected',
      severity: AlertSeverity.Warning,
      deviceName: 'WIN-4H8TV8C4NDH',
      planName: 'New protection plan (3)',
      message: "There is a conflict between protection plan 'Protection plan - for all in customer[policy.security.patch_management]', currently applied to device 'WIN-4H8TV8C4NDH', and protection plan 'New protection plan (3)' from dynamic group 'All'. The following plans applied to 'WIN-4H8TV8C4NDH' will be disabled 'New protection plan (3)'.",
    },
    {
      id: '6',
      time: '2025-12-02T07:03:00Z',
      type: 'Protection plan conflict detected',
      severity: AlertSeverity.Warning,
      deviceName: 'DESKTOP-FA47EAL',
      planName: 'Duos plan',
      message: "There is a conflict between protection plan 'Protection plan - for all in customer[policy.security.url_filtering]', currently applied to device 'DESKTOP-FA47EAL', and protection plan 'Duos plan' from dynamic group 'All'. The following plans applied to 'DESKTOP-FA47EAL' will be disabled 'Duos plan'.",
    },
  ],
  patchedVulnerabilities: {
    total: 66,
    items: [
      { label: 'Microsoft vulnerabilities', value: 50, color: '#3b82f6' },
      { label: 'Windows third-party vulnerabilities', value: 16, color: '#22c55e' },
    ],
    workloadsScanned: {
      current: 4,
      total: 5,
    },
  },
  patchesInstalled: {
    total: 7,
    items: [
      { label: 'Microsoft patches', value: 3, color: '#3b82f6' },
      { label: 'Windows third-party patches', value: 4, color: '#22c55e' },
    ],
    workloadsPatched: {
      current: 3,
      total: 5,
    },
  },
  antimalwareScanOfFiles: {
    totalFiles: 926549,
    items: [
      { label: 'Clean', value: 926549, color: '#22c55e' },
      { label: 'Detected, quarantined', value: rand(5, 25), color: '#f59e0b' },
      { label: 'Detected, not quarantined', value: rand(1, 10), color: '#ef4444' },
    ],
    devicesProtected: {
      current: rand(3, 5),
      total: 5,
    },
  },
  fileSyncShareStats: {
    totalCloudStorageUsed: 0,
    endUsers: 3,
    guestUsers: 0,
    averageStoragePerUser: 0,
  },
  fileSyncShareStorageUsage: {
    totalEndUsers: 3,
    items: [
      { label: '0 - 1 GB', value: rand(5, 15), color: '#84cc16' },
      { label: '1 - 5 GB', value: rand(3, 10), color: '#3b82f6' },
      { label: '5 - 10 GB', value: rand(2, 8), color: '#6366f1' },
      { label: '10 - 50 GB', value: rand(1, 5), color: '#8b5cf6' },
      { label: '50 - 100 GB', value: rand(0, 3), color: '#06b6d4' },
      { label: '100 - 500 GB', value: rand(0, 2), color: '#f59e0b' },
      { label: '500 GB - 1 TB', value: rand(0, 1), color: '#22c55e' },
      { label: '1+ TB', value: rand(0, 1), color: '#9ca3af' },
    ],
  },
  softwareInventory: [
    {
      deviceName: 'DESKTOP-FA47EAL',
      items: [
        { id: '1', softwareName: '7-Zip', softwareVersion: '24.07', vendorName: 'Igor Pavlov', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T21:45:00Z' },
        { id: '2', softwareName: '7-Zip', softwareVersion: '23.01.00.0', vendorName: 'Igor Pavlov', status: SoftwareStatus.NoChange, dateInstalled: '2025-09-01T03:00:00Z', scanTime: '2025-12-02T21:45:00Z' },
        { id: '3', softwareName: 'Cyber Protect', softwareVersion: '25.10.41225', vendorName: 'Acronis', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T21:45:00Z' },
        { id: '4', softwareName: 'Far Manager 3', softwareVersion: '3.0.6116', vendorName: 'Eugene Roshal & Far Group', status: SoftwareStatus.NoChange, dateInstalled: '2023-04-22T03:00:00Z', scanTime: '2025-12-02T21:45:00Z' },
        { id: '5', softwareName: 'Google Chrome', softwareVersion: '142.0.7444.176', vendorName: 'Google LLC', status: SoftwareStatus.NoChange, dateInstalled: '2025-11-20T02:00:00Z', scanTime: '2025-12-02T21:45:00Z' },
        { id: '6', softwareName: 'Mozilla Firefox', softwareVersion: '143.0.1', vendorName: 'Mozilla', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T21:45:00Z' },
        { id: '7', softwareName: 'Mozilla Maintenance Service', softwareVersion: '143.0.1', vendorName: 'Mozilla', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T21:45:00Z' },
        { id: '8', softwareName: 'Notepad++', softwareVersion: '8.8.1', vendorName: 'Notepad++ Team', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T21:45:00Z' },
        { id: '9', softwareName: 'Windows Defender', softwareVersion: '-', vendorName: 'Microsoft', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T21:45:00Z' },
        { id: '10', softwareName: 'WinRAR', softwareVersion: '7.13.0', vendorName: 'win.rar GmbH', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T21:45:00Z' },
      ],
    },
    {
      deviceName: 'WIN-4H8TV8C4NDH',
      items: [
        { id: '11', softwareName: '7-Zip', softwareVersion: '23.01.00.0', vendorName: 'Igor Pavlov', status: SoftwareStatus.NoChange, dateInstalled: '2025-09-01T03:00:00Z', scanTime: '2025-12-02T17:51:00Z' },
        { id: '12', softwareName: 'Beyond Compare', softwareVersion: '5.0.5.30614', vendorName: 'Scooter Software', status: SoftwareStatus.NoChange, dateInstalled: '2025-03-20T02:00:00Z', scanTime: '2025-12-02T17:51:00Z' },
        { id: '13', softwareName: 'Cyber Protect', softwareVersion: '25.6.40217', vendorName: 'Acronis', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T17:51:00Z' },
        { id: '14', softwareName: 'Far Manager 3', softwareVersion: '3.0.6116', vendorName: 'Eugene Roshal & Far Group', status: SoftwareStatus.NoChange, dateInstalled: '2023-04-18T03:00:00Z', scanTime: '2025-12-02T17:51:00Z' },
        { id: '15', softwareName: 'FileZilla', softwareVersion: '3.67.1', vendorName: 'Tim Kosse', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T17:51:00Z' },
        { id: '16', softwareName: 'Google Chrome', softwareVersion: '142.0.7444.176', vendorName: 'Google LLC', status: SoftwareStatus.NoChange, dateInstalled: '2025-11-20T02:00:00Z', scanTime: '2025-12-02T17:51:00Z' },
        { id: '17', softwareName: 'Mozilla Firefox', softwareVersion: '127.0', vendorName: 'Mozilla', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T17:51:00Z' },
        { id: '18', softwareName: 'Mozilla Maintenance Service', softwareVersion: '108.0.2', vendorName: 'Mozilla', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T17:51:00Z' },
        { id: '19', softwareName: 'Notepad++', softwareVersion: '8.8.1', vendorName: 'Notepad++ Team', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T17:51:00Z' },
        { id: '20', softwareName: 'Postman', softwareVersion: '9.31.0', vendorName: 'Postman', status: SoftwareStatus.NoChange, dateInstalled: '2022-09-29T03:00:00Z', scanTime: '2025-12-02T17:51:00Z' },
        { id: '21', softwareName: 'Python', softwareVersion: '3.11.1150.0', vendorName: 'Python Software Foundation', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T17:51:00Z' },
        { id: '22', softwareName: 'Python Launcher', softwareVersion: '3.11.8009.0', vendorName: 'Python Software Foundation', status: SoftwareStatus.NoChange, dateInstalled: '2023-01-05T02:00:00Z', scanTime: '2025-12-02T17:51:00Z' },
        { id: '23', softwareName: 'Windows Defender', softwareVersion: '-', vendorName: 'Microsoft', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T17:51:00Z' },
        { id: '24', softwareName: 'WinRAR', softwareVersion: '7.13.0', vendorName: 'win.rar GmbH', status: SoftwareStatus.NoChange, dateInstalled: null, scanTime: '2025-12-02T17:51:00Z' },
      ],
    },
    {
      deviceName: 'testing',
      items: [
        { id: '25', softwareName: 'Acronis Cyber Protect', softwareVersion: '25.10.1129', vendorName: 'Acronis International GmbH', status: SoftwareStatus.Updated, dateInstalled: '2025-11-17T15:42:00Z', scanTime: '2025-11-17T16:00:00Z' },
        { id: '26', softwareName: 'atp-context-menu-service', softwareVersion: '1', vendorName: 'Acronis International GmbH', status: SoftwareStatus.NoChange, dateInstalled: '2025-11-17T15:42:00Z', scanTime: '2025-11-17T16:00:00Z' },
        { id: '27', softwareName: 'Connect Agent', softwareVersion: '25037', vendorName: 'Acronis International GmbH', status: SoftwareStatus.Updated, dateInstalled: '2025-11-17T15:42:00Z', scanTime: '2025-11-17T16:00:00Z' },
        { id: '28', softwareName: 'Cyber Protect Agent', softwareVersion: '25.10.41225', vendorName: 'Acronis International GmbH (ZU2TV78AA6)', status: SoftwareStatus.Updated, dateInstalled: '2025-11-17T15:42:00Z', scanTime: '2025-11-17T16:00:00Z' },
      ],
    },
  ],
};

/**
 * Mock responses for executive summary service endpoints
 * Type-safe mapping of endpoints to response factories
 */
export const executiveSummaryMockMap = {
  'GET /api/executive-summary': () => mockExecutiveSummaryData,
  'GET /api/executive-summary/alerts': () => mockExecutiveSummaryData.activeAlerts,
  'GET /api/executive-summary/software-inventory': () => mockExecutiveSummaryData.softwareInventory,
} satisfies MockMap;
