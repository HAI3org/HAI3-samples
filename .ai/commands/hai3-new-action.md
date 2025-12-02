<!-- @standalone -->
# hai3:new-action - Create New Action

## AI WORKFLOW (REQUIRED)
1) Read .ai/targets/EVENTS.md before starting.
2) Summarize 3-6 key rules.
3) Gather requirements from user.
4) Create OpenSpec proposal for approval.
5) After approval, apply implementation.

## GATHER REQUIREMENTS
Ask user for:
- Action purpose (e.g., "navigate to screen", "load user data").
- Which screenset and domain (e.g., "chat/threads", "demo/navigation").
- Event payload data.

## STEP 1: Create OpenSpec Proposal
Create `openspec/changes/add-{screenset}-{action}/` with:

### proposal.md
```markdown
# Proposal: Add {ActionName} Action

## Summary
Add new action "{actionName}" to {screenset}/{domain} domain.

## Details
- Screenset: {screenset}
- Domain: {domain}
- Action: {actionName}
- Event: {eventName}
- Payload: {payloadFields}

## Implementation
Follow HAI3 event-driven flux pattern: Action → Event → Effect → Slice.
```

### tasks.md
```markdown
# Tasks: Add {ActionName} Action

- [ ] Define event in events/{domain}Events.ts
- [ ] Create action in actions/{domain}Actions.ts
- [ ] Create effect in effects/{domain}Effects.ts
- [ ] Validate: `npm run arch:check`
```

## STEP 2: Wait for Approval
Tell user: "I've created an OpenSpec proposal at `openspec/changes/add-{screenset}-{action}/`. Please review and run `/openspec:apply add-{screenset}-{action}` to implement."

## STEP 3: Apply Implementation (after approval)
When user runs `/openspec:apply`, execute:

### 3.1 Define Event
In src/screensets/{screenset}/events/{domain}Events.ts:
```typescript
const DOMAIN_ID = '{domain}';

export const {Domain}Events = {
  {EventName}: `${SCREENSET_ID}/${DOMAIN_ID}/{eventName}` as const,
} as const;

export type {EventName}Payload = {
  // payload fields
};

declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [{Domain}Events.{EventName}]: {EventName}Payload;
  }
}
```

### 3.2 Create Action
In src/screensets/{screenset}/actions/{domain}Actions.ts:
```typescript
import { eventBus } from '@hai3/uicore';
import { {Domain}Events } from '../events/{domain}Events';

export const {actionName} = (params: ParamsType) => {
  return (): void => {
    eventBus.emit({Domain}Events.{EventName}, {
      // payload
    });
  };
};
```

### 3.3 Create Effect
In src/screensets/{screenset}/effects/{domain}Effects.ts:
```typescript
import { eventBus } from '@hai3/uicore';
import { {Domain}Events } from '../events/{domain}Events';
import type { Store } from '@hai3/uicore';

export function init{Domain}Effects(store: Store): void {
  eventBus.on({Domain}Events.{EventName}, (payload) => {
    store.dispatch(set{Something}(payload.{field}));
  });
}
```

### 3.4 Validate
```bash
npm run arch:check
```

### 3.5 Mark Tasks Complete
Update tasks.md to mark all completed tasks.

## RULES
- Actions use imperative names (selectScreen, changeTheme).
- Events use past-tense names (screenSelected, themeChanged).
- Actions are pure functions (no getState, no async thunks).
- Actions return void (not Promise).
- Effects update their own slice only.
- Cross-domain communication only via events.
- FORBIDDEN: Direct slice dispatch from actions/components.
