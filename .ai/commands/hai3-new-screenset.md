<!-- @standalone -->
# hai3:new-screenset - Create New Screenset

## PREREQUISITES (CRITICAL - STOP IF FAILED)
Run `hai3 --version`.
STOP: If fails, tell user to install.
FORBIDDEN: Proceeding without CLI tools.
FORBIDDEN: Creating screenset manually or by copying peers.

## AI WORKFLOW (REQUIRED)
1) Check prerequisites above.
2) Read .ai/targets/SCREENSETS.md and .ai/targets/EVENTS.md before starting.
3) Gather requirements from user (including UI sections).
4) Create OpenSpec proposal via `.claude/commands/openspec-proposal.md` (REQUIRED).
5) After approval, implement via `.claude/commands/openspec-apply.md` (REQUIRED).

## GATHER REQUIREMENTS
Ask user for:
- Screenset name (camelCase).
- Category: Drafts | Mockups | Production.
- Initial screens.
- UI sections per screen (e.g., "stats cards, charts, activity feed").

## STEP 1: Create OpenSpec Proposal (REQUIRED)
Execute openspec:proposal command (see `.claude/commands/openspec-proposal.md`).
Proposal name: `add-{screenset-name}`

### proposal.md content
```
# Proposal: Add {ScreensetName} Screenset

## Summary
Add new {category} screenset "{screensetName}" with {screens} screen(s).

## Details
- Name: {screensetName}
- Category: {category}
- Initial screens: {screens}

## Component Plan
- REQUIRED: Use @hai3/uikit components first; local uikit only if missing.
- uikit/base/: rare primitives (inline styles allowed, needs justification)
- uikit/composite/: screenset composites (theme tokens only)
- components/: multi-screen components
- screens/{screen}/components/: screen-specific components

## Data Flow
- Events: {domain events per EVENTS.md}
- State: slices/, events/, effects/, actions/
- API: api/{Name}ApiService.ts with mocks
```

### tasks.md minimum required tasks
NOTE: Proposal may include additional tasks, but MUST include these:
```
- [ ] Create screenset: `hai3 screenset create {name} --category={category}`
- [ ] Create components per Component Plan (BEFORE screen file)
- [ ] Implement data flow per EVENTS.md (actions emit events, effects update slices)
- [ ] Add API service with mocks
- [ ] Validate: `npm run type-check && npm run arch:check && npm run lint`
- [ ] Test via Chrome DevTools MCP
```

## STEP 2: Wait for Approval
Tell user: "Review proposal at `openspec/changes/add-{screenset-name}/`."
Tell user: "Execute openspec:apply command to implement."

## STEP 3: Implementation (via openspec:apply)
BEFORE executing openspec:apply, verify tasks.md contains all minimum required tasks above.
Execute openspec:apply command (see `.claude/commands/openspec-apply.md`).
Follow tasks.md strictly:
1) Create screenset via `hai3 screenset create` (REQUIRED).
2) Create components BEFORE screen file per Component Plan.
3) Implement data flow per .ai/targets/EVENTS.md:
   - Actions emit events via eventBus.emit()
   - Effects subscribe and update slices
   - FORBIDDEN: Direct slice dispatch from components
4) Add API service with mocks.
5) Validate: `npm run type-check && npm run arch:check && npm run lint`.
6) Test via Chrome DevTools MCP (REQUIRED):
   - Navigate to new screenset
   - Verify screen renders without console errors
   - Test user interactions trigger correct events
   - Verify state updates via Redux DevTools
   - STOP if MCP connection fails
