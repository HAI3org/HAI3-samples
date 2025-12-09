import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input, Badge } from '@hai3/uikit';
import type { Process } from '../../../api/mockData';
import { orderBy } from 'lodash';
import { ProgressBar } from '../../../uikit/base/ProgressBar';

interface ProcessTableProps {
  processes: Process[];
  tk: (key: string) => string;
}

type SortField = 'pid' | 'name' | 'cpuPercent' | 'rssMemory' | 'virtualMemory' | 'startTime';
type SortDirection = 'asc' | 'desc';

export function ProcessTable({ processes, tk }: ProcessTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('cpuPercent');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredAndSortedProcesses = useMemo(() => {
    let filtered = processes;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = processes.filter(
        p =>
          p.pid.toString().includes(query) ||
          p.name.toLowerCase().includes(query) ||
          p.command.toLowerCase().includes(query)
      );
    }

    return orderBy(filtered, [sortField], [sortDirection]);
  }, [processes, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes.toFixed(0)} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{tk('processes.title')}</CardTitle>
          <div className="w-80">
            <Input
              type="text"
              placeholder={tk('processes.search_placeholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('pid')}
                  >
                    <div className="flex items-center gap-2">
                      {tk('processes.pid')}
                      <SortIcon field="pid" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      {tk('processes.name')}
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('cpuPercent')}
                  >
                    <div className="flex items-center gap-2">
                      {tk('processes.cpu')}
                      <SortIcon field="cpuPercent" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('rssMemory')}
                  >
                    <div className="flex items-center gap-2">
                      {tk('processes.rss')}
                      <SortIcon field="rssMemory" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('virtualMemory')}
                  >
                    <div className="flex items-center gap-2">
                      {tk('processes.virtual')}
                      <SortIcon field="virtualMemory" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('startTime')}
                  >
                    <div className="flex items-center gap-2">
                      {tk('processes.start_time')}
                      <SortIcon field="startTime" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">{tk('processes.command')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProcesses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      {tk('processes.no_results')}
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedProcesses.map(process => (
                    <tr key={process.pid} className="border-b hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{process.pid}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{process.name}</span>
                          <Badge variant={process.status === 'running' ? 'default' : 'secondary'}>
                            {process.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{process.cpuPercent.toFixed(1)}%</span>
                          <ProgressBar
                            value={process.cpuPercent}
                            className="w-16 overflow-hidden"
                            barClassName="bg-blue-500"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">{formatBytes(process.rssMemory)}</td>
                      <td className="px-4 py-3">{formatBytes(process.virtualMemory)}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {formatTime(process.startTime)}
                      </td>
                      <td className="px-4 py-3 max-w-md">
                        <div className="truncate font-mono text-xs text-muted-foreground" title={process.command}>
                          {process.command}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          {filteredAndSortedProcesses.length} {filteredAndSortedProcesses.length === 1 ? 'process' : 'processes'}
        </div>
      </CardContent>
    </Card>
  );
}
