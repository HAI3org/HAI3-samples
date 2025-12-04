import React from 'react';
import { useTranslation, TextLoader, useScreenTranslations, I18nRegistry, Language } from '@hai3/uicore';
import { Card, CardHeader, CardTitle, CardContent } from '@hai3/uikit';
import { 
  Upload, 
  Shield, 
  Ban, 
  CheckSquare, 
  Server, 
  Users, 
  FileText, 
  PenTool, 
  Usb 
} from 'lucide-react';
import { EXECUTIVE_SUMMARY_SCREENSET_ID, DASHBOARD_SCREEN_ID } from '../../ids';
import { StatCard } from '../../components/StatCard';
import { DonutChartWidget } from '../../components/DonutChartWidget';
import { ProgressBarWidget } from '../../components/ProgressBarWidget';
import { AlertsTable } from '../../components/AlertsTable';
import { SectionCard } from '../../components/SectionCard';
import { EmptyState } from '../../components/EmptyState';
import { WidgetGrid } from '../../components/WidgetGrid';
import { SoftwareInventoryTable } from '../../components/SoftwareInventoryTable';
import { executiveSummaryMockMap } from '../../api/executive-summary/mocks';
import type { ExecutiveSummaryData } from '../../api/executive-summary/types';

/**
 * Dashboard screen translations
 */
const translations = I18nRegistry.createLoader({
  [Language.English]: () => import('./i18n/en.json'),
  [Language.Arabic]: () => import('./i18n/ar.json'),
  [Language.Bengali]: () => import('./i18n/bn.json'),
  [Language.Czech]: () => import('./i18n/cs.json'),
  [Language.Danish]: () => import('./i18n/da.json'),
  [Language.German]: () => import('./i18n/de.json'),
  [Language.Greek]: () => import('./i18n/el.json'),
  [Language.Spanish]: () => import('./i18n/es.json'),
  [Language.Persian]: () => import('./i18n/fa.json'),
  [Language.Finnish]: () => import('./i18n/fi.json'),
  [Language.French]: () => import('./i18n/fr.json'),
  [Language.Hebrew]: () => import('./i18n/he.json'),
  [Language.Hindi]: () => import('./i18n/hi.json'),
  [Language.Hungarian]: () => import('./i18n/hu.json'),
  [Language.Indonesian]: () => import('./i18n/id.json'),
  [Language.Italian]: () => import('./i18n/it.json'),
  [Language.Japanese]: () => import('./i18n/ja.json'),
  [Language.Korean]: () => import('./i18n/ko.json'),
  [Language.Malay]: () => import('./i18n/ms.json'),
  [Language.Dutch]: () => import('./i18n/nl.json'),
  [Language.Norwegian]: () => import('./i18n/no.json'),
  [Language.Polish]: () => import('./i18n/pl.json'),
  [Language.Portuguese]: () => import('./i18n/pt.json'),
  [Language.Romanian]: () => import('./i18n/ro.json'),
  [Language.Russian]: () => import('./i18n/ru.json'),
  [Language.Swedish]: () => import('./i18n/sv.json'),
  [Language.Swahili]: () => import('./i18n/sw.json'),
  [Language.Tamil]: () => import('./i18n/ta.json'),
  [Language.Thai]: () => import('./i18n/th.json'),
  [Language.Tagalog]: () => import('./i18n/tl.json'),
  [Language.Turkish]: () => import('./i18n/tr.json'),
  [Language.Ukrainian]: () => import('./i18n/uk.json'),
  [Language.Urdu]: () => import('./i18n/ur.json'),
  [Language.Vietnamese]: () => import('./i18n/vi.json'),
  [Language.ChineseSimplified]: () => import('./i18n/zh.json'),
  [Language.ChineseTraditional]: () => import('./i18n/zh-TW.json'),
});

/**
 * Dashboard Screen
 * Main executive summary dashboard with all widgets
 */
export const DashboardScreen: React.FC = () => {
  useScreenTranslations(EXECUTIVE_SUMMARY_SCREENSET_ID, DASHBOARD_SCREEN_ID, translations);
  const { t } = useTranslation();
  
  // Get mock data (in real app, this would come from API/Redux)
  const data = executiveSummaryMockMap['GET /api/executive-summary']() as ExecutiveSummaryData;
  
  const tk = (key: string) => t(`screen.${EXECUTIVE_SUMMARY_SCREENSET_ID}.${DASHBOARD_SCREEN_ID}:${key}`);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <TextLoader skeletonClassName="h-8 w-64">
            <h1 className="text-2xl font-bold">{tk('title')}</h1>
          </TextLoader>
          <TextLoader skeletonClassName="h-5 w-48 mt-1">
            <p className="text-muted-foreground">
              {tk('customer')}: {data.customerName} &nbsp;|&nbsp; 
              {tk('date_range')}: {formatDate(data.dateRange.start)} - {formatDate(data.dateRange.end)}
            </p>
          </TextLoader>
        </div>
        <TextLoader skeletonClassName="h-5 w-64">
          <p className="text-sm text-muted-foreground">
            {formatDateTime(data.generatedAt)}
          </p>
        </TextLoader>
      </div>

      {/* Draggable Widgets */}
      <WidgetGrid
        widgets={[
          {
            id: 'cyber-protection-summary',
            name: 'Cyber Protection Summary',
            colSpan: 3,
            render: () => (
              <Card className="border border-border">
                <CardHeader className="pb-0 pt-4 px-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    <TextLoader skeletonClassName="h-4 w-48">
                      {tk('cyber_protection_summary')} (1)
                    </TextLoader>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <StatCard icon={<Upload className="w-5 h-5" />} label={tk('data_backed_up')} value={data.cyberProtectionSummary.dataBackedUp} />
                    <StatCard icon={<Shield className="w-5 h-5" />} label={tk('mitigated_threats')} value={data.cyberProtectionSummary.mitigatedThreats} />
                    <StatCard icon={<Ban className="w-5 h-5" />} label={tk('malicious_urls_blocked')} value={data.cyberProtectionSummary.maliciousUrlsBlocked} />
                    <StatCard icon={<CheckSquare className="w-5 h-5" />} label={tk('patched_vulnerabilities')} value={data.cyberProtectionSummary.patchedVulnerabilities} />
                    <StatCard icon={<CheckSquare className="w-5 h-5" />} label={tk('installed_patches')} value={data.cyberProtectionSummary.installedPatches} />
                    <StatCard icon={<Server className="w-5 h-5" />} label={tk('servers_protected_dr')} value={data.cyberProtectionSummary.serversProtectedWithDr} />
                    <StatCard icon={<Users className="w-5 h-5" />} label={tk('file_sync_share_users')} value={data.cyberProtectionSummary.fileSyncShareUsers} />
                    <StatCard icon={<FileText className="w-5 h-5" />} label={tk('notarized_files')} value={data.cyberProtectionSummary.notarizedFiles} />
                    <StatCard icon={<PenTool className="w-5 h-5" />} label={tk('esigned_documents')} value={data.cyberProtectionSummary.eSignedDocuments} />
                    <StatCard icon={<Usb className="w-5 h-5" />} label={tk('blocked_peripheral_devices')} value={data.cyberProtectionSummary.blockedPeripheralDevices} />
                  </div>
                </CardContent>
              </Card>
            ),
          },
          {
            id: 'workloads-backed-up',
            name: 'Workloads Backed Up',
            render: () => (
              <DonutChartWidget
                title={tk('workloads_backed_up')}
                centerValue={data.workloadsBackedUp.total}
                centerLabel={tk('workloads')}
                items={data.workloadsBackedUp.items}
              />
            ),
          },
          {
            id: 'missing-updates',
            name: 'Missing Updates',
            render: () => (
              <DonutChartWidget
                title={tk('missing_updates')}
                centerValue={data.missingUpdates.total}
                centerLabel={tk('updates')}
                items={data.missingUpdates.items}
              />
            ),
          },
          {
            id: 'antimalware-scan',
            name: 'Antimalware Scan',
            render: () => (
              <DonutChartWidget
                title={tk('antimalware_scan_files')}
                centerValue={data.antimalwareScanOfFiles.totalFiles.toLocaleString()}
                centerLabel={tk('files')}
                items={data.antimalwareScanOfFiles.items}
              />
            ),
          },
          {
            id: 'blocked-urls',
            name: 'Blocked URLs',
            render: () => (
              <SectionCard title={tk('blocked_urls')}>
                <EmptyState />
              </SectionCard>
            ),
          },
          {
            id: 'antimalware-backups',
            name: 'Antimalware Scan of Backups',
            render: () => (
              <SectionCard title={tk('antimalware_scan_backups')}>
                <EmptyState />
              </SectionCard>
            ),
          },
          {
            id: 'threats-detected',
            name: 'Threats Detected',
            render: () => (
              <SectionCard title={tk('threats_detected')}>
                <EmptyState />
              </SectionCard>
            ),
          },
          {
            id: 'workloads-protection',
            name: 'Workloads Protection Status',
            colSpan: 3,
            render: () => (
              <ProgressBarWidget
                title={tk('workloads_protection_status')}
                totalProtected={data.workloadsProtectionStatus.totalProtected}
                totalUnprotected={data.workloadsProtectionStatus.totalUnprotected}
                total={data.workloadsProtectionStatus.total}
                items={data.workloadsProtectionStatus.items}
              />
            ),
          },
          {
            id: 'active-alerts',
            name: 'Active Alerts',
            colSpan: 3,
            render: () => (
              <AlertsTable
                title={tk('active_alerts')}
                alerts={data.activeAlerts}
              />
            ),
          },
          {
            id: 'patched-vulnerabilities',
            name: 'Patched Vulnerabilities',
            render: () => (
              <DonutChartWidget
                title={tk('patched_vulnerabilities_chart')}
                centerValue={data.patchedVulnerabilities.total}
                centerLabel={tk('total')}
                items={data.patchedVulnerabilities.items}
              />
            ),
          },
          {
            id: 'patches-installed',
            name: 'Patches Installed',
            render: () => (
              <DonutChartWidget
                title={tk('patches_installed')}
                centerValue={data.patchesInstalled.total}
                centerLabel={tk('installed')}
                items={data.patchesInstalled.items}
              />
            ),
          },
          {
            id: 'storage-usage',
            name: 'Storage Usage',
            render: () => (
              <DonutChartWidget
                title={tk('storage_usage')}
                centerValue={data.fileSyncShareStorageUsage.totalEndUsers}
                centerLabel={tk('end_users')}
                items={data.fileSyncShareStorageUsage.items}
              />
            ),
          },
          {
            id: 'software-history',
            name: 'Software Installation History',
            colSpan: 3,
            render: () => (
              <SectionCard title={`${tk('software_installation_history')} - 30 ${tk('days')}`} className="h-auto">
                <EmptyState />
              </SectionCard>
            ),
          },
          {
            id: 'software-inventory',
            name: 'Software Inventory',
            colSpan: 3,
            render: () => (
              <SoftwareInventoryTable
                title={tk('software_inventory')}
                inventory={data.softwareInventory}
              />
            ),
          },
        ]}
        availableWidgets={[
          {
            id: 'cyber-protection-summary',
            name: 'Cyber Protection Summary',
            colSpan: 3,
            render: () => (
              <Card className="border border-border">
                <CardHeader className="pb-0 pt-4 px-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {tk('cyber_protection_summary')} (1)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <StatCard icon={<Upload className="w-5 h-5" />} label={tk('data_backed_up')} value={data.cyberProtectionSummary.dataBackedUp} />
                    <StatCard icon={<Shield className="w-5 h-5" />} label={tk('mitigated_threats')} value={data.cyberProtectionSummary.mitigatedThreats} />
                    <StatCard icon={<Ban className="w-5 h-5" />} label={tk('malicious_urls_blocked')} value={data.cyberProtectionSummary.maliciousUrlsBlocked} />
                    <StatCard icon={<CheckSquare className="w-5 h-5" />} label={tk('patched_vulnerabilities')} value={data.cyberProtectionSummary.patchedVulnerabilities} />
                    <StatCard icon={<CheckSquare className="w-5 h-5" />} label={tk('installed_patches')} value={data.cyberProtectionSummary.installedPatches} />
                    <StatCard icon={<Server className="w-5 h-5" />} label={tk('servers_protected_dr')} value={data.cyberProtectionSummary.serversProtectedWithDr} />
                    <StatCard icon={<Users className="w-5 h-5" />} label={tk('file_sync_share_users')} value={data.cyberProtectionSummary.fileSyncShareUsers} />
                    <StatCard icon={<FileText className="w-5 h-5" />} label={tk('notarized_files')} value={data.cyberProtectionSummary.notarizedFiles} />
                    <StatCard icon={<PenTool className="w-5 h-5" />} label={tk('esigned_documents')} value={data.cyberProtectionSummary.eSignedDocuments} />
                    <StatCard icon={<Usb className="w-5 h-5" />} label={tk('blocked_peripheral_devices')} value={data.cyberProtectionSummary.blockedPeripheralDevices} />
                  </div>
                </CardContent>
              </Card>
            ),
          },
          {
            id: 'missing-updates',
            name: 'Missing Updates',
            render: () => (
              <DonutChartWidget
                title={tk('missing_updates')}
                centerValue={data.missingUpdates.total}
                centerLabel={tk('updates')}
                items={data.missingUpdates.items}
              />
            ),
          },
          {
            id: 'workloads-backed-up',
            name: 'Workloads Backed Up',
            render: () => (
              <DonutChartWidget
                title={tk('workloads_backed_up')}
                centerValue={data.workloadsBackedUp.total}
                centerLabel={tk('workloads')}
                items={data.workloadsBackedUp.items}
              />
            ),
          },
          {
            id: 'workloads-protection',
            name: 'Workloads Protection Status',
            colSpan: 3,
            render: () => (
              <ProgressBarWidget
                title={tk('workloads_protection_status')}
                totalProtected={data.workloadsProtectionStatus.totalProtected}
                totalUnprotected={data.workloadsProtectionStatus.totalUnprotected}
                total={data.workloadsProtectionStatus.total}
                items={data.workloadsProtectionStatus.items}
              />
            ),
          },
          {
            id: 'active-alerts',
            name: 'Active Alerts',
            colSpan: 3,
            render: () => (
              <AlertsTable
                title={tk('active_alerts')}
                alerts={data.activeAlerts}
              />
            ),
          },
          {
            id: 'antimalware-scan',
            name: 'Antimalware Scan',
            render: () => (
              <DonutChartWidget
                title={tk('antimalware_scan_files')}
                centerValue={data.antimalwareScanOfFiles.totalFiles.toLocaleString()}
                centerLabel={tk('files')}
                items={data.antimalwareScanOfFiles.items}
              />
            ),
          },
          {
            id: 'blocked-urls',
            name: 'Blocked URLs',
            render: () => (
              <SectionCard title={tk('blocked_urls')}>
                <EmptyState />
              </SectionCard>
            ),
          },
          {
            id: 'antimalware-backups',
            name: 'Antimalware Scan of Backups',
            render: () => (
              <SectionCard title={tk('antimalware_scan_backups')}>
                <EmptyState />
              </SectionCard>
            ),
          },
          {
            id: 'threats-detected',
            name: 'Threats Detected',
            render: () => (
              <SectionCard title={tk('threats_detected')}>
                <EmptyState />
              </SectionCard>
            ),
          },
          {
            id: 'patched-vulnerabilities',
            name: 'Patched Vulnerabilities',
            render: () => (
              <DonutChartWidget
                title={tk('patched_vulnerabilities_chart')}
                centerValue={data.patchedVulnerabilities.total}
                centerLabel={tk('total')}
                items={data.patchedVulnerabilities.items}
              />
            ),
          },
          {
            id: 'patches-installed',
            name: 'Patches Installed',
            render: () => (
              <DonutChartWidget
                title={tk('patches_installed')}
                centerValue={data.patchesInstalled.total}
                centerLabel={tk('installed')}
                items={data.patchesInstalled.items}
              />
            ),
          },
          {
            id: 'storage-usage',
            name: 'Storage Usage',
            render: () => (
              <DonutChartWidget
                title={tk('storage_usage')}
                centerValue={data.fileSyncShareStorageUsage.totalEndUsers}
                centerLabel={tk('end_users')}
                items={data.fileSyncShareStorageUsage.items}
              />
            ),
          },
          {
            id: 'software-history',
            name: 'Software Installation History',
            colSpan: 3,
            render: () => (
              <SectionCard title={`${tk('software_installation_history')} - 30 ${tk('days')}`}>
                <EmptyState />
              </SectionCard>
            ),
          },
        ]}
      />
    </div>
  );
};

DashboardScreen.displayName = 'DashboardScreen';

export default DashboardScreen;
