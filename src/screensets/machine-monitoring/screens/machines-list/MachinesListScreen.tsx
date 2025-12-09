import { useState, useEffect, useMemo } from 'react';
import { useScreenTranslations, useTranslation, I18nRegistry, Language, navigateToScreen, useAppDispatch, useAppSelector } from '@hai3/uicore';
import { Card, CardContent } from '@hai3/uikit';
import { MACHINE_MONITORING_SCREENSET_ID, MACHINES_LIST_SCREEN_ID, DASHBOARD_SCREEN_ID } from '../../ids';
import { selectFleetState } from '../../slices/fleetSlice';
import { fetchFleetData } from '../../actions/monitoringActions';
import type { MachineFleetInfo, LocationCategory, IssueType } from '../../api/mockData';
import { MachineCard } from './components/MachineCard';
import { MachineTableRow } from './components/MachineTableRow';
import { FleetStatsCard } from './components/FleetStatsCard';
import { IssuesSummaryCard } from './components/IssuesSummaryCard';
import { FilterBar } from './components/FilterBar';
import { SSHTerminalModal } from './components/SSHTerminalModal';
import _ from 'lodash';

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

type ViewMode = 'grid' | 'table';

export default function MachinesListScreen() {
  useScreenTranslations(MACHINE_MONITORING_SCREENSET_ID, MACHINES_LIST_SCREEN_ID, translations);
  const { t } = useTranslation();
  const tk = (key: string) => t(`screen.${MACHINE_MONITORING_SCREENSET_ID}.${MACHINES_LIST_SCREEN_ID}:${key}`);

  const dispatch = useAppDispatch();

  // Select from Redux store
  const { machines, statistics: stats, loading } = useAppSelector(selectFleetState);

  // Local UI state (filters and view mode)
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // SSH Modal state (local)
  const [sshModalOpen, setSSHModalOpen] = useState(false);
  const [sshTarget, setSSHTarget] = useState<{ hostname: string; ipAddress: string } | null>(null);

  // Filters (local state - presentation only)
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState<LocationCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'maintenance'>('all');
  const [issueTypeFilter, setIssueTypeFilter] = useState<IssueType | 'all'>('all');

  // Fetch fleet data on mount
  useEffect(() => {
    dispatch(fetchFleetData());
  }, [dispatch]);

  const filteredMachines = useMemo(() => {
    let result = machines;

    if (search) {
      const searchLower = _.toLower(search);
      result = _.filter(result, m =>
        _.includes(_.toLower(m.name), searchLower) ||
        _.includes(_.toLower(m.hostname), searchLower) ||
        _.includes(_.toLower(m.ipAddress), searchLower) ||
        _.some(m.tags, tag => _.includes(_.toLower(tag), searchLower))
      );
    }

    if (locationFilter !== 'all') {
      result = _.filter(result, m => m.location === locationFilter);
    }

    if (statusFilter !== 'all') {
      result = _.filter(result, m => m.status === statusFilter);
    }

    if (issueTypeFilter !== 'all') {
      result = _.filter(result, m => _.some(m.issues, i => i.type === issueTypeFilter));
    }

    // Sort: machines with critical issues first, then by name
    return _.orderBy(
      result,
      [
        m => _.some(m.issues, i => i.severity === 'critical') ? 0 : 1,
        m => m.issues.length > 0 ? 0 : 1,
        m => _.toLower(m.name),
      ],
      ['asc', 'asc', 'asc']
    );
  }, [machines, search, locationFilter, statusFilter, issueTypeFilter]);

  const handleResetFilters = () => {
    setSearch('');
    setLocationFilter('all');
    setStatusFilter('all');
    setIssueTypeFilter('all');
  };

  const handleMachineNameClick = () => {
    navigateToScreen(DASHBOARD_SCREEN_ID);
  };

  const handleSSHClick = (machine: MachineFleetInfo) => {
    setSSHTarget({ hostname: machine.hostname, ipAddress: machine.ipAddress });
    setSSHModalOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-muted rounded w-80" />
          <div className="h-16 bg-muted rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-muted rounded" />
            <div className="h-64 bg-muted rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-7xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
          <div>
            <h1 className="text-2xl font-semibold">{tk('title')}</h1>
            <p className="text-sm text-muted-foreground">{tk('subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && stats.locationCounts && stats.issuesByType && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FleetStatsCard stats={stats} tk={tk} />
          <IssuesSummaryCard title={tk('issues.title')} stats={stats} tk={tk} />
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        location={locationFilter}
        onLocationChange={setLocationFilter}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        issueType={issueTypeFilter}
        onIssueTypeChange={setIssueTypeFilter}
        onReset={handleResetFilters}
        tk={tk}
      />

      {/* Results count and view switcher */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {tk('showing')} <span className="font-semibold text-foreground">{filteredMachines.length}</span> {tk('of')} <span className="font-semibold text-foreground">{machines.length}</span> {tk('machines')}
        </p>
        <div className="flex items-center gap-1 bg-muted rounded-md p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
            title={tk('view.grid')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'table' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
            title={tk('view.table')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Machine Grid/Table */}
      {filteredMachines.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMachines.map(machine => (
              <MachineCard
                key={machine.id}
                machine={machine}
                tk={tk}
                onNameClick={handleMachineNameClick}
                onSSHClick={() => handleSSHClick(machine)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-3 py-2 w-8"></th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.name')}</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.ip')}</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.os')}</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.type')}</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.location')}</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.ram')}</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.disk')}</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.uptime')}</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted-foreground">{tk('table.issues')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMachines.map(machine => (
                      <MachineTableRow
                        key={machine.id}
                        machine={machine}
                        tk={tk}
                        onNameClick={handleMachineNameClick}
                        onSSHClick={() => handleSSHClick(machine)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <svg className="w-16 h-16 text-muted-foreground/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold mb-1">{tk('no_results.title')}</h3>
          <p className="text-muted-foreground text-sm">{tk('no_results.description')}</p>
        </div>
      )}

      {/* SSH Terminal Modal */}
      {sshTarget && (
        <SSHTerminalModal
          isOpen={sshModalOpen}
          onClose={() => {
            setSSHModalOpen(false);
            setSSHTarget(null);
          }}
          hostname={sshTarget.hostname}
          ipAddress={sshTarget.ipAddress}
          tk={tk}
        />
      )}
    </div>
  );
}
