<!-- @standalone -->
# hai3:new-component - Add New UI Component

## AI WORKFLOW (REQUIRED)
1) Gather requirements from user.
2) Determine component type.
3) Create OpenSpec proposal for approval.
4) After approval, apply implementation.

## GATHER REQUIREMENTS
Ask user for:
- Component name (e.g., "DataTable", "ColorPicker").
- Component type: base (from shadcn) | screenset-specific.
- Component description and props.

## IF BASE COMPONENT (SHADCN)
Base components don't need OpenSpec - run directly:
```bash
npx shadcn add {component}
```
Component will be added to packages/uikit/src/base/. No further changes needed.

## IF SCREENSET-SPECIFIC COMPONENT

### STEP 1: Create OpenSpec Proposal
Create `openspec/changes/add-{screenset}-{component}/` with:

#### proposal.md
```markdown
# Proposal: Add {ComponentName} Component

## Summary
Add new screenset-specific component "{ComponentName}" to {screenset} screenset.

## Details
- Screenset: {screenset}
- Component name: {ComponentName}
- Description: {description}
- Props: {props}

## Implementation
Create reusable component following HAI3 patterns (no Redux, no business logic).
```

#### tasks.md
```markdown
# Tasks: Add {ComponentName} Component

- [ ] Create component file
- [ ] Implement props interface
- [ ] Add theme token styling
- [ ] Export from local index
- [ ] Validate: `npm run arch:check`
- [ ] Test in UI
```

### STEP 2: Wait for Approval
Tell user: "I've created an OpenSpec proposal at `openspec/changes/add-{screenset}-{component}/`. Please review and run `/openspec:apply add-{screenset}-{component}` to implement."

### STEP 3: Apply Implementation (after approval)
When user runs `/openspec:apply`, execute:

#### 3.1 Create Component
File: src/screensets/{screenset}/uikit/{ComponentName}.tsx
- Follow same rules as composite components.
- Must be reusable within the screenset.
- NO @hai3/uicore imports or hooks.
- NO Redux or state management.
- Accept value/onChange pattern for state.
- Use theme tokens for styling.

#### 3.2 Export
Export from local index if needed.

#### 3.3 Validation
```bash
npm run arch:check
npm run dev
```
Test component in UI.

#### 3.4 Mark Tasks Complete
Update tasks.md to mark all completed tasks.

## RULES
- NO Redux, NO business logic, NO side effects in components.
- Accept value/onChange pattern for state.
- Use theme tokens for styling.
- Manual styling is FORBIDDEN; use @hai3/uikit components only.
