<!-- @standalone -->
# hai3:new-component - Add New UI Component

## AI WORKFLOW (REQUIRED)
1) Check if @hai3/uikit has equivalent component first.
2) Gather requirements from user.
3) Determine type: screenset composite (default) | screenset base (rare).
4) Create OpenSpec proposal for approval.
5) After approval, apply implementation.

## CHECK GLOBAL UIKIT FIRST
- REQUIRED: Before creating screenset component, verify @hai3/uikit lacks equivalent.
- REQUIRED: Import from @hai3/uikit if component exists there.

## GATHER REQUIREMENTS
Ask user for:
- Component name (e.g., "DataTable", "ColorPicker").
- Component type: screenset composite (default) | screenset base (rare).
- Component description and props.
- If screenset base: justification why composite is insufficient.

## IF SCREENSET COMPONENT

### STEP 0: Determine Subfolder
- uikit/composite/: Screenset-specific composites (theme tokens only).
- uikit/base/: Rare primitives needing inline styles (needs strong justification).

### STEP 1: Create OpenSpec Proposal
Create openspec/changes/add-{screenset}-{component}/ with:

#### proposal.md
- Summary: Add new screenset-specific component to {screenset}.
- Details: Screenset, component name, placement (base/composite), description, props.
- Justification (if base/): Why global uikit insufficient, why composite insufficient.
- Implementation: HAI3 patterns (no Redux, no business logic).

#### tasks.md
- Create component file in uikit/{base|composite}/.
- Implement props interface.
- Add theme token styling (or inline for base/).
- Export from local index if needed.
- Validate: npm run arch:check.
- Test in UI.

### STEP 2: Wait for Approval
Tell user: "Review proposal at openspec/changes/add-{screenset}-{component}/."
Tell user: "Run /openspec:apply add-{screenset}-{component} to implement."

### STEP 3: Apply Implementation (after approval)
When user runs /openspec:apply:

#### 3.1 Create Component
File: src/screensets/{screenset}/uikit/{base|composite}/{ComponentName}.tsx
- composite/: Use theme tokens only (no inline styles).
- base/: May use inline styles (rare, needs justification).
- Must be reusable within the screenset.
- NO @hai3/uicore imports (except types).
- NO Redux or state management.
- Accept value/onChange pattern for state.

#### 3.2 Export
Export from local index if needed.

#### 3.3 Validation
Run: npm run arch:check && npm run dev
Test component in UI.

#### 3.4 Mark Tasks Complete
Update tasks.md to mark all completed tasks.

## RULES
- REQUIRED: Check @hai3/uikit first; screenset uikit only if missing.
- REQUIRED: Screenset base components need strong justification.
- FORBIDDEN: Redux, business logic, side effects in components.
- FORBIDDEN: Inline styles outside uikit/base/.
- REQUIRED: Accept value/onChange pattern for state.
