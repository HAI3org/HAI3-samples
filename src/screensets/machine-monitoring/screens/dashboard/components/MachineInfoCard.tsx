import { Card, CardContent, CardHeader, CardTitle, Badge } from '@hai3/uikit';
import type { MachineInfo } from '../../../api/mockData';

interface MachineInfoCardProps {
  machine: MachineInfo;
  tk: (key: string) => string;
}

function formatUptime(seconds: number, tk: (key: string) => string): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${tk('summary.days')}`);
  if (hours > 0) parts.push(`${hours} ${tk('summary.hours')}`);
  if (minutes > 0) parts.push(`${minutes} ${tk('summary.minutes')}`);

  return parts.join(', ') || `0 ${tk('summary.minutes')}`;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
  iconColor?: string;
}

function InfoItem({ icon, label, value, badge, iconColor = 'bg-blue-500' }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className={`p-2 rounded-lg ${iconColor} flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-muted-foreground mb-1">{label}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate" title={value}>
            {value}
          </span>
          {badge && (
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              {badge}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export function MachineInfoCard({ machine, tk }: MachineInfoCardProps) {
  const uptimeDays = Math.floor(machine.uptime / 86400);
  const uptimeBadge = uptimeDays > 30 ? '🟢 Stable' : uptimeDays > 7 ? '🟡 Recent' : '🔴 New';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{tk('summary.title')}</CardTitle>
          <Badge variant="outline" className="font-mono text-xs">
            {machine.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <InfoItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            label={tk('summary.os')}
            value={machine.os}
            iconColor="bg-blue-500"
          />

          <InfoItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label={tk('summary.uptime')}
            value={formatUptime(machine.uptime, tk)}
            badge={uptimeBadge}
            iconColor="bg-green-500"
          />

          <InfoItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
            label={tk('summary.cpu_model')}
            value={machine.cpuModel}
            iconColor="bg-purple-500"
          />

          <InfoItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
            label={tk('summary.gpu_model')}
            value={machine.gpuModel}
            iconColor="bg-orange-500"
          />

          <InfoItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            }
            label={tk('summary.total_ram')}
            value={`${machine.totalRam} GB`}
            iconColor="bg-cyan-500"
          />

          <InfoItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            }
            label={tk('summary.total_disk')}
            value={`${machine.totalDisk} GB`}
            iconColor="bg-indigo-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}
