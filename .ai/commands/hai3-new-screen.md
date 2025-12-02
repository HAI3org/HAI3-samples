<!-- @standalone -->
# hai3:new-screen - Add New Screen

## AI WORKFLOW (REQUIRED)
1) Read .ai/targets/SCREENSETS.md before starting.
2) Gather requirements from user.
3) Create OpenSpec proposal for approval.
4) After approval, apply implementation.

## GATHER REQUIREMENTS
Ask user for:
- Screenset path (e.g., src/screensets/chat).
- Screen name (camelCase).
- Add to menu? (Y/N)

## STEP 1: Create OpenSpec Proposal
Create `openspec/changes/add-{screenset}-{screen}/` with:

### proposal.md
```markdown
# Proposal: Add {ScreenName} Screen

## Summary
Add new screen "{screenName}" to {screenset} screenset.

## Details
- Screenset: {screenset}
- Screen name: {screenName}
- Add to menu: {Y/N}

## Implementation
Follow HAI3 screen creation pattern with i18n support for all 36 languages.
```

### tasks.md
```markdown
# Tasks: Add {ScreenName} Screen

- [ ] Add screen ID to ids.ts
- [ ] Create screen directory structure
- [ ] Create i18n files for all 36 languages
- [ ] Create screen component with useScreenTranslations()
- [ ] Add to menu (if requested)
- [ ] Validate: `npm run type-check && npm run lint`
- [ ] Test via Chrome MCP
```

## STEP 2: Wait for Approval
Tell user: "I've created an OpenSpec proposal at `openspec/changes/add-{screenset}-{screen}/`. Please review and run `/openspec:apply add-{screenset}-{screen}` to implement."

## STEP 3: Apply Implementation (after approval)
When user runs `/openspec:apply`, execute:

### 3.1 Add Screen ID to ids.ts
File: src/screensets/{screenset}/ids.ts
Add: export const {SCREEN_NAME}_SCREEN_ID = '{screenName}';

### 3.2 Create Screen Directory
```bash
mkdir -p src/screensets/{screenset}/screens/{screen-name}/i18n
```

### 3.3 Create Screen i18n Files
Create ALL 36 language files in screens/{screen-name}/i18n/.

### 3.4 Create Screen Component
File: src/screensets/{screenset}/screens/{screen-name}/{ScreenName}Screen.tsx
- Import useScreenTranslations, useTranslation, I18nRegistry, Language from @hai3/uicore.
- Import SCREENSET_ID and SCREEN_ID from ../../ids.
- Create translation loader with I18nRegistry.createLoader() for ALL 36 languages.
- Call useScreenTranslations(SCREENSET_ID, SCREEN_ID, translations) in component.
- Use t() with keys: screen.${SCREENSET_ID}.${SCREEN_ID}:key.
- Wrap translated text with TextLoader.
- Add displayName property.
- Export default for lazy loading.

### 3.5 If Adding to Menu
Edit src/screensets/{screenset}/{screenset}Screenset.tsx menu array:
- Add menuItem with id, label (translation key), optional icon.
- Add screen lazy loader: () => import('./screens/{screen-name}/{ScreenName}Screen').

### 3.6 Validate
```bash
npm run type-check && npm run lint
```

### 3.7 Test via Chrome MCP
STOP: If MCP WebSocket is closed, fix first.
- Navigate to screenset.
- Navigate to new screen.
- Verify 0 console errors.
- Verify translations load correctly.

### 3.8 Mark Tasks Complete
Update tasks.md to mark all completed tasks.
