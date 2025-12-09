# Proposal: Migrate Machine-Monitoring to Event-Driven Architecture

## Summary
Migrate the machine-monitoring screenset from React local state (`useState`) to the HAI3 event-driven architecture pattern following Component -> Action -> Event -> Effect -> Slice -> Store flow.

## Motivation
The current machine-monitoring screenset violates HAI3 architecture rules:
1. Uses `useState` for all state management instead of Redux slices
2. Makes direct API calls in `useEffect` instead of through actions
3. Has no events, effects, or centralized store
4. Cannot participate in cross-domain communication

## Scope
- **In scope:** State management migration for both screens (Dashboard, MachinesListScreen)
- **In scope:** API service registration with apiRegistry
- **In scope:** Events, actions, effects, slices for all domains
- **Out of scope:** UI component changes (components remain unchanged)
- **Out of scope:** New features or functionality

## Key Domains
Based on the current state usage, the screenset has these logical domains:

1. **machines** - Machine list and selection
2. **metrics** - Current metrics and historical data
3. **processes** - Running process list
4. **fleet** - Fleet machines and statistics
5. **ui** - View mode, filters, modal state (local to screens)

## Related Specs
- Creates new spec: `monitoring-state-management`
- No modifications to existing specs
