import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@hai3/uikit';
import { TextLoader } from '@hai3/uicore';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SoftwareStatus, type DeviceSoftwareInventory } from '../api/executive-summary/types';

interface SoftwareInventoryTableProps {
  title: string;
  inventory: DeviceSoftwareInventory[];
}

const statusConfig: Record<SoftwareStatus, { label: string; className: string }> = {
  [SoftwareStatus.NoChange]: { label: 'No change', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' },
  [SoftwareStatus.Updated]: { label: 'Updated', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  [SoftwareStatus.New]: { label: 'New', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  [SoftwareStatus.Removed]: { label: 'Removed', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
};

const formatDate = (isoString: string | null): string => {
  if (!isoString) return '-';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * SoftwareInventoryTable Component
 * Displays software inventory grouped by device
 * Used for: Software inventory section
 */
export const SoftwareInventoryTable: React.FC<SoftwareInventoryTableProps> = ({
  title,
  inventory,
}) => {
  const [expandedDevices, setExpandedDevices] = React.useState<Set<string>>(
    new Set(inventory.map(d => d.deviceName)) // All expanded by default
  );

  const toggleDevice = (deviceName: string) => {
    setExpandedDevices(prev => {
      const next = new Set(prev);
      if (next.has(deviceName)) {
        next.delete(deviceName);
      } else {
        next.add(deviceName);
      }
      return next;
    });
  };

  return (
    <Card className="border border-border">
      <CardHeader className="pb-0 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <TextLoader skeletonClassName="h-4 w-40">
            {title}
          </TextLoader>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-3">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Software name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Software version</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Vendor name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date installed</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Scan time</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((device) => {
                const isExpanded = expandedDevices.has(device.deviceName);
                return (
                  <React.Fragment key={device.deviceName}>
                    {/* Device header row */}
                    <tr 
                      className="bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleDevice(device.deviceName)}
                    >
                      <td colSpan={6} className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <span className="font-medium text-sm">{device.deviceName}</span>
                          <span className="text-xs text-muted-foreground">({device.items.length} items)</span>
                        </div>
                      </td>
                    </tr>
                    {/* Software items - only show if expanded */}
                    {isExpanded && device.items.map((item) => {
                      const config = statusConfig[item.status];
                      return (
                        <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                          <td className="px-4 py-2 pl-8 text-sm">{item.softwareName}</td>
                          <td className="px-4 py-2 text-sm">{item.softwareVersion}</td>
                          <td className="px-4 py-2 text-sm">{item.vendorName}</td>
                          <td className="px-4 py-2">
                            <Badge variant="outline" className={config.className}>
                              {config.label}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 text-sm">{formatDate(item.dateInstalled)}</td>
                          <td className="px-4 py-2 text-sm">{formatDate(item.scanTime)}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
              {inventory.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No software inventory to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

SoftwareInventoryTable.displayName = 'SoftwareInventoryTable';
