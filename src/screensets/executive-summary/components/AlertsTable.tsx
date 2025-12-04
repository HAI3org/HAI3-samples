import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@hai3/uikit';
import { TextLoader } from '@hai3/uicore';
import { AlertSeverity, type ActiveAlert } from '../api/executive-summary/types';

interface AlertsTableProps {
  title: string;
  alerts: ActiveAlert[];
}

const severityConfig: Record<AlertSeverity, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
  [AlertSeverity.Information]: { label: 'Information', variant: 'secondary', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  [AlertSeverity.Warning]: { label: 'Warning', variant: 'outline', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
  [AlertSeverity.Error]: { label: 'Error', variant: 'destructive', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  [AlertSeverity.Critical]: { label: 'Critical', variant: 'destructive', className: 'bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-100' },
};

const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

/**
 * AlertsTable Component
 * Displays active alerts in a table format
 * Used for: Active alerts details section
 */
export const AlertsTable: React.FC<AlertsTableProps> = ({
  title,
  alerts,
}) => {
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
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Alert time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Alert type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Alert severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Device name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Plan name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Alert message</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => {
                const config = severityConfig[alert.severity];
                return (
                  <tr key={alert.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm whitespace-nowrap">{formatTime(alert.time)}</td>
                    <td className="px-4 py-3 text-sm">{alert.type}</td>
                    <td className="px-4 py-3">
                      <Badge variant={config.variant} className={config.className}>
                        {alert.severity === AlertSeverity.Warning && (
                          <span className="mr-1">⚠</span>
                        )}
                        {alert.severity === AlertSeverity.Information && (
                          <span className="mr-1">ℹ</span>
                        )}
                        {config.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{alert.deviceName}</td>
                    <td className="px-4 py-3 text-sm">{alert.planName || '-'}</td>
                    <td className="px-4 py-3 text-sm max-w-md">{alert.message}</td>
                  </tr>
                );
              })}
              {alerts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No alerts to display
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

AlertsTable.displayName = 'AlertsTable';
