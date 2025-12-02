<!-- @standalone -->
# hai3:new-screenset - Create New Screenset

## AI WORKFLOW (REQUIRED)
1) Read .ai/targets/SCREENSETS.md before starting.
2) Gather requirements from user.
3) Create OpenSpec proposal for approval.
4) After approval, apply implementation.

## GATHER REQUIREMENTS
Ask user for:
- Screenset name (camelCase).
- Category: Drafts | Mockups | Production.
- Initial screens.
- State management needed? (Y/N)
- API services needed? (Y/N)

## STEP 1: Create OpenSpec Proposal
Create `openspec/changes/add-{screenset-name}/` with:

### proposal.md
```markdown
# Proposal: Add {ScreensetName} Screenset

## Summary
Add new {category} screenset "{screensetName}" with {screens} screen(s).

## Details
- Name: {screensetName}
- Category: {category}
- Initial screens: {screens}
- State management: {Y/N}
- API services: {Y/N}

## Implementation
Uses `hai3 screenset create` CLI to ensure uniformity.
```

### tasks.md
```markdown
# Tasks: Add {ScreensetName} Screenset

- [ ] Create screenset via CLI: `hai3 screenset create {name} --category={category}`
- [ ] Add additional screens (if any): follow hai3:new-screen
- [ ] Add state management (if needed): slices/, events/, effects/, actions/
- [ ] Add API services (if needed): api/{Name}ApiService.ts
- [ ] Validate: `npm run type-check && npm run arch:check && npm run lint`
- [ ] Test via Chrome MCP
```

## STEP 2: Wait for Approval
Tell user: "I've created an OpenSpec proposal at `openspec/changes/add-{screenset-name}/`. Please review and run `/openspec:apply add-{screenset-name}` to implement."

## STEP 3: Apply Implementation (after approval)
When user runs `/openspec:apply`, execute:

### 3.1 Create Screenset via CLI
```bash
hai3 screenset create {name} --category={category}
```
This creates:
- Directory structure with screens/home/.
- Centralized ids.ts with SCREENSET_ID and HOME_SCREEN_ID.
- All 36 language files for screenset and screen.
- Screen component with useScreenTranslations().
- Screenset config with lazy-loaded screen.
- Auto-registration via screensetRegistry.register().

### 3.2 Add Additional Screens (if needed)
For each additional screen, follow hai3:new-screen command.

### 3.3 If State Management Needed
Create domain-based structure:
- slices/{domain}Slice.ts for each domain.
- events/{domain}Events.ts with local DOMAIN_ID constant.
- effects/{domain}Effects.ts for each domain.
- actions/{name}Actions.ts.
Register each slice with its own effects. NO coordinator effects file. NO barrel exports.

### 3.4 If API Services Needed
Create src/screensets/{name}/api/{Name}ApiService.ts
- Use template literal for domain: `${SCREENSET_ID}:serviceName`.
- Create mocks.ts and import in screenset config.

### 3.5 Validate
```bash
npm run type-check && npm run arch:check && npm run lint && npm run dev
```

### 3.6 Test via Chrome MCP
STOP: If MCP WebSocket is closed, fix first.
- Verify screenset in selector.
- Switch to new screenset via dev panel.
- Check 0 console errors.
- Test all screens and features.

### 3.7 Mark Tasks Complete
Update tasks.md to mark all completed tasks.
