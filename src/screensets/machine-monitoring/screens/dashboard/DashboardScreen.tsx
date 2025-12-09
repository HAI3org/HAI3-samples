import { useEffect, useMemo, useRef } from 'react';
import { useScreenTranslations, useTranslation, I18nRegistry, Language, useAppDispatch, useAppSelector } from '@hai3/uicore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hai3/uikit';
import { MACHINE_MONITORING_SCREENSET_ID, DASHBOARD_SCREEN_ID } from '../../ids';
import { selectMachinesState } from '../../slices/machinesSlice';
import { selectMetricsState } from '../../slices/metricsSlice';
import { selectProcessesState } from '../../slices/processesSlice';
import { fetchMachines, selectMachine, changeTimeRange } from '../../actions/monitoringActions';
import type { TimeRange } from '../../api/mockData';
import { MetricCard } from './components/MetricCard';
import { ProcessTable } from './components/ProcessTable';
import { MachineInfoCard } from './components/MachineInfoCard';

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

export default function DashboardScreen() {
  useScreenTranslations(MACHINE_MONITORING_SCREENSET_ID, DASHBOARD_SCREEN_ID, translations);
  const { t } = useTranslation();
  const tk = (key: string) => t(`screen.${MACHINE_MONITORING_SCREENSET_ID}.${DASHBOARD_SCREEN_ID}:${key}`);

  const dispatch = useAppDispatch();

  // Select from Redux store
  const { machines, selectedMachineId, loading: machinesLoading } = useAppSelector(selectMachinesState);
  const { currentMetrics, rangeMetrics, timeRange, loading: metricsLoading } = useAppSelector(selectMetricsState);
  const { processes } = useAppSelector(selectProcessesState);

  const selectedMachine = useMemo(
    () => machines.find(m => m.id === selectedMachineId),
    [machines, selectedMachineId]
  );

  const metricHistories = useMemo(() => {
    if (rangeMetrics.length === 0) return null;
    return {
      cpu: rangeMetrics.map(m => m.cpuUsage),
      ram: rangeMetrics.map(m => m.ramUsage),
      disk: rangeMetrics.map(m => m.diskUsage),
      gpu: rangeMetrics.map(m => m.gpuUsage),
      networkIn: rangeMetrics.map(m => m.networkIn),
      networkOut: rangeMetrics.map(m => m.networkOut),
    };
  }, [rangeMetrics]);

  // Track previous selectedMachineId to detect changes
  const prevSelectedMachineIdRef = useRef<string | null>(null);

  // Fetch machines on mount
  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);

  // Fetch metrics when selectedMachineId changes (including auto-select on mount)
  useEffect(() => {
    if (selectedMachineId && selectedMachineId !== prevSelectedMachineIdRef.current) {
      prevSelectedMachineIdRef.current = selectedMachineId;
      selectMachine(selectedMachineId, timeRange);
    }
  }, [selectedMachineId, timeRange]);

  const handleMachineSelect = (machineId: string) => {
    selectMachine(machineId, timeRange);
  };

  const handleTimeRangeChange = (newTimeRange: string) => {
    if (selectedMachineId) {
      dispatch(changeTimeRange(newTimeRange as TimeRange, selectedMachineId));
    }
  };

  const loading = machinesLoading || metricsLoading;

  if (loading && machines.length === 0) {
    return (
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64" />
          <div className="h-32 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-32 bg-muted rounded" />
            <div className="h-32 bg-muted rounded" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{tk('title')}</h1>
          <p className="text-base text-muted-foreground mt-2">{tk('subtitle')}</p>
        </div>

        {/* Machine and Time Range Selectors */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">{tk('machine_selector.label')}</label>
            <Select value={selectedMachineId || ''} onValueChange={handleMachineSelect}>
              <SelectTrigger className="w-80">
                <SelectValue placeholder={tk('machine_selector.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {machines.map(machine => (
                  <SelectItem key={machine.id} value={machine.id}>
                    {machine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">{tk('time_range.label')}</label>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30min">{tk('time_range.30min')}</SelectItem>
                <SelectItem value="4hours">{tk('time_range.4hours')}</SelectItem>
                <SelectItem value="1day">{tk('time_range.1day')}</SelectItem>
                <SelectItem value="7days">{tk('time_range.7days')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {selectedMachine && currentMetrics && (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title={tk('metrics.cpu')}
              value={currentMetrics.cpuUsage}
              unit="%"
              icon="cpu"
              color="blue"
              history={metricHistories?.cpu}
            />
            <MetricCard
              title={tk('metrics.ram')}
              value={currentMetrics.ramUsage}
              unit="%"
              icon="memory"
              color="purple"
              history={metricHistories?.ram}
            />
            <MetricCard
              title={tk('metrics.disk')}
              value={currentMetrics.diskUsage}
              unit="%"
              icon="disk"
              color="orange"
              history={metricHistories?.disk}
            />
            <MetricCard
              title={tk('metrics.gpu')}
              value={currentMetrics.gpuUsage}
              unit="%"
              icon="gpu"
              color="green"
              history={metricHistories?.gpu}
            />
            <MetricCard
              title={`${tk('metrics.network')} ${tk('metrics.in')}`}
              value={currentMetrics.networkIn}
              unit="Mbps"
              icon="network"
              color="cyan"
              history={metricHistories?.networkIn}
            />
            <MetricCard
              title={`${tk('metrics.network')} ${tk('metrics.out')}`}
              value={currentMetrics.networkOut}
              unit="Mbps"
              icon="network"
              color="indigo"
              history={metricHistories?.networkOut}
            />
          </div>

          {/* Machine Info */}
          <MachineInfoCard machine={selectedMachine} tk={tk} />

          {/* Process Table */}
          <ProcessTable processes={processes} tk={tk} />
        </>
      )}
    </div>
  );
}
