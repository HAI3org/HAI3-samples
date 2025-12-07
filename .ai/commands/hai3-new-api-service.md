<!-- @standalone -->
# hai3:new-api-service - Add New API Service

## AI WORKFLOW (REQUIRED)
1) Read .ai/targets/SCREENSETS.md API SERVICE RULES section.
2) Gather requirements from user.
3) Create OpenSpec proposal for approval.
4) After approval, apply implementation.

## GATHER REQUIREMENTS
Ask user for:
- Which screenset will use it.
- Domain name.
- Endpoints/methods.
- Base URL.

## STEP 1: Create OpenSpec Proposal
Create `openspec/changes/add-{screenset}-{service}/` with:

### proposal.md
```markdown
# Proposal: Add {ServiceName} API Service

## Summary
Add new API service "{serviceName}" to {screenset} screenset.

## Details
- Screenset: {screenset}
- Domain: {domain}
- Base URL: {baseUrl}
- Endpoints: {endpoints}

## Implementation
Create screenset-local API service with mocks following HAI3 patterns.
```

### tasks.md
```markdown
# Tasks: Add {ServiceName} API Service

- [ ] Create API service class
- [ ] Register with apiRegistry
- [ ] Create mocks
- [ ] Register mocks in screenset config
- [ ] Validate: `npm run type-check && npm run arch:check`
- [ ] Test via Chrome DevTools MCP
```

## STEP 2: Wait for Approval
Tell user: "I've created an OpenSpec proposal at `openspec/changes/add-{screenset}-{service}/`. Please review and run `/openspec:apply add-{screenset}-{service}` to implement."

## STEP 3: Apply Implementation (after approval)
When user runs `/openspec:apply`, execute:

### 3.1 Create Service
File: src/screensets/{screenset}/api/{Name}ApiService.ts
```typescript
import { BaseApiService, apiRegistry } from '@hai3/uicore';
import { SCREENSET_ID } from '../ids';

export const DOMAIN = `${SCREENSET_ID}:serviceName` as const;

class {Name}ApiService extends BaseApiService {
  protected baseUrl = '/api/v1/{domain}';

  async getData(): Promise<DataType> {
    return this.get('/endpoint');
  }
}

apiRegistry.register(DOMAIN, {Name}ApiService);

declare module '@hai3/uicore' {
  interface ApiServicesMap {
    [DOMAIN]: {Name}ApiService;
  }
}
```

### 3.2 Create Mocks
File: src/screensets/{screenset}/api/mocks.ts
```typescript
import type { MockMap } from '@hai3/uicore';

export const mockMap = {
  'GET /endpoint': () => ({ data: mockData }),
} satisfies MockMap;
```

### 3.3 Register in Screenset Config
Import ./api/{Name}ApiService for side effect.
Call apiRegistry.registerMocks(DOMAIN, mockMap).

### 3.4 Validate
```bash
npm run type-check && npm run arch:check
```

### 3.5 Test via Chrome DevTools MCP
STOP: If MCP WebSocket is closed, fix first.
- Test API calls.
- Verify mocks return expected data.
- Toggle API mode in Studio and verify both modes work.

### 3.6 Mark Tasks Complete
Update tasks.md to mark all completed tasks.

## RULES
- REQUIRED: Screenset-local API services in src/screensets/*/api/.
- REQUIRED: Unique domain constant per screenset.
- FORBIDDEN: Centralized src/api/ directory.
- FORBIDDEN: Sharing API services between screensets.
