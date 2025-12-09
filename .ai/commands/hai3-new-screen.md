<!-- @standalone -->
# hai3:new-screen - Add New Screen

## PREREQUISITES (CRITICAL - STOP IF FAILED)
FORBIDDEN: Proceeding without proposal.
FORBIDDEN: Creating screen manually without OpenSpec workflow.

## AI WORKFLOW (REQUIRED)
1) Read .ai/targets/SCREENSETS.md and .ai/targets/EVENTS.md before starting.
2) Gather requirements from user (including UI sections).
3) Create OpenSpec proposal via `.claude/commands/openspec-proposal.md` (REQUIRED).
4) After approval, implement via `.claude/commands/openspec-apply.md` (REQUIRED).

## GATHER REQUIREMENTS
Ask user for:
- Screenset path (e.g., src/screensets/chat).
- Screen name (camelCase).
- UI sections (e.g., "header, form, data table").
- Add to menu? (Y/N)

## STEP 1: Create OpenSpec Proposal (REQUIRED)
Execute openspec:proposal command (see `.claude/commands/openspec-proposal.md`).
Proposal name: `add-{screenset}-{screen}`

### proposal.md content
```
# Proposal: Add {ScreenName} Screen

## Summary
Add new screen "{screenName}" to {screenset} screenset.

## Details
- Screenset: {screenset}
- Screen name: {screenName}
- Add to menu: {Y/N}

## Component Plan
- REQUIRED: Use @hai3/uikit components first; local uikit only if missing.
- uikit/base/: rare primitives (inline styles allowed, needs justification)
- uikit/composite/: screenset composites (theme tokens only)
- screens/{screen}/components/: screen-specific components

## Data Flow
- Uses existing screenset events/slices per EVENTS.md
- Screen dispatches actions, never direct slice updates
```

### tasks.md minimum required tasks
NOTE: Proposal may include additional tasks, but MUST include these:
```
- [ ] Add screen ID to ids.ts
- [ ] Create components per Component Plan (BEFORE screen file)
- [ ] Create screen (orchestrates components, follows EVENTS.md data flow)
- [ ] Add i18n files for all languages
- [ ] Add to menu (if requested)
- [ ] Validate: `npm run type-check && npm run lint`
- [ ] Test via Chrome DevTools MCP
```

## STEP 2: Wait for Approval
Tell user: "Review proposal at `openspec/changes/add-{screenset}-{screen}/`."
Tell user: "Execute openspec:apply command to implement."

## STEP 3: Implementation (via openspec:apply)
BEFORE executing openspec:apply, verify tasks.md contains all minimum required tasks above.
Execute openspec:apply command (see `.claude/commands/openspec-apply.md`).
Follow tasks.md strictly:
1) Add screen ID to ids.ts.
2) Create components BEFORE screen file per Component Plan.
3) Create screen following data flow rules from .ai/targets/EVENTS.md:
   - Use actions to trigger state changes
   - FORBIDDEN: Direct slice dispatch from screen
4) Add i18n with useScreenTranslations(). Export default.
5) Add to menu if requested.
6) Validate: `npm run type-check && npm run lint`.
7) Test via Chrome DevTools MCP (REQUIRED):
   - Navigate to new screen
   - Verify screen renders without console errors
   - Test UI interactions and data flow
   - Verify translations load correctly
   - STOP if MCP connection fails
