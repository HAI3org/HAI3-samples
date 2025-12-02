/**
 * HAI3 Dependency Cruiser Configuration (Standalone)
 * Base rules for HAI3 projects - screenset isolation and flux architecture
 *
 * This is the single source of truth for standalone project dependency rules.
 * - Monorepo extends this via presets/monorepo/configs/.dependency-cruiser.cjs
 * - CLI copies this to new projects via copy-templates.ts
 *
 * Note: Uses $1, $2 for backreferences (not \1, \2) per dependency-cruiser docs
 */

module.exports = {
  forbidden: [
    // ============ SCREENSET ISOLATION RULES ============
    {
      name: 'no-cross-screenset-imports',
      severity: 'error',
      from: { path: '^src/screensets/([^/]+)/' },
      to: {
        path: '^src/screensets/[^/]+/',
        pathNot: ['^src/screensets/$1/', '^src/screensets/screensetRegistry\\.tsx$']
      },
      comment: 'Screensets must not import from other screensets (vertical slice isolation). Each screenset is self-contained.'
    },
    {
      name: 'no-circular-screenset-deps',
      severity: 'warn',
      from: { path: '^src/screensets/([^/]+)/' },
      to: {
        path: '^src/screensets/$1/',
        circular: true
      },
      comment: 'Avoid circular dependencies within screenset modules. May indicate tight coupling.'
    },

    // ============ FLUX ARCHITECTURE RULES ============
    {
      name: 'flux-no-actions-in-effects-folder',
      severity: 'error',
      from: { path: '/effects/' },
      to: { path: '/actions/' },
      comment: 'FLUX VIOLATION: Effects folder cannot import from actions folder (circular flow risk). See EVENTS.md.'
    },
    {
      name: 'flux-no-effects-in-actions-folder',
      severity: 'error',
      from: { path: '/actions/' },
      to: { path: '/effects/' },
      comment: 'FLUX VIOLATION: Actions folder cannot import from effects folder. Use event bus. See EVENTS.md.'
    },

    // ============ GENERAL RULES ============
    {
      name: 'no-circular',
      severity: 'error',
      from: { path: '^(?!.*node_modules)' },
      to: { circular: true },
      comment: 'Circular dependencies create tight coupling and make code harder to reason about.'
    }
  ],
  options: {
    doNotFollow: '^node_modules',
    exclude: {
      dynamic: true
    }
  }
};
