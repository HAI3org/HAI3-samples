import { type ScreensetConfig, ScreensetCategory, uikitRegistry, I18nRegistry, Language, apiRegistry, screensetRegistry } from '@hai3/uicore';
import { EXECUTIVE_SUMMARY_SCREENSET_ID, DASHBOARD_SCREEN_ID, EXECUTIVE_SUMMARY_API_DOMAIN } from './ids';
import { DashboardIcon, DASHBOARD_ICON_ID } from './uikit/icons/DashboardIcon';

// Import module augmentation and mocks for executive summary service
import './api/executive-summary/extra';
import { executiveSummaryMockMap } from './api/executive-summary/mocks';

/**
 * Screenset-level translations
 * All 36 languages must be provided for type safety
 */
const screensetTranslations = I18nRegistry.createLoader({
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
 * Register mock data for executive summary service
 */
apiRegistry.registerMocks(EXECUTIVE_SUMMARY_API_DOMAIN, executiveSummaryMockMap);

/**
 * Register screenset-specific icons
 */
uikitRegistry.registerIcons({
  [DASHBOARD_ICON_ID]: <DashboardIcon />,
});

/**
 * Executive Summary Screenset Configuration
 * Dashboard for cyber protection overview with widgets and charts
 */
export const executiveSummaryScreenset: ScreensetConfig = {
  id: EXECUTIVE_SUMMARY_SCREENSET_ID,
  name: 'Executive Summary',
  category: ScreensetCategory.Drafts,
  defaultScreen: DASHBOARD_SCREEN_ID,
  localization: screensetTranslations,
  menu: [
    {
      menuItem: {
        id: DASHBOARD_SCREEN_ID,
        label: `screenset.${EXECUTIVE_SUMMARY_SCREENSET_ID}:screens.${DASHBOARD_SCREEN_ID}.title`,
        icon: DASHBOARD_ICON_ID,
      },
      screen: () => import('./screens/dashboard/DashboardScreen'),
    },
  ],
};

/**
 * Self-register screenset
 * Auto-discovered via Vite glob import in screensetRegistry.tsx
 */
screensetRegistry.register(executiveSummaryScreenset);
