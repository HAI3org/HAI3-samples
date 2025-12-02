/**
 * HAI3 ESLint Configuration (Standalone)
 * Base rules for HAI3 projects - screenset architecture and flux pattern
 *
 * This is the single source of truth for standalone project ESLint rules.
 * - Monorepo extends this via presets/monorepo/configs/eslint.config.js
 * - CLI copies this to new projects via copy-templates.ts
 */

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { createRequire } from 'module';

// Local plugin uses CommonJS, need to require it
// eslint-plugin-local is in presets/standalone/ (sibling to configs/)
const localPlugin = createRequire(import.meta.url)('./eslint-plugin-local');

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'scripts/**',
      'presets/standalone/scripts/**',
      'eslint-plugin-local/**', // ESLint plugin is CommonJS, has its own linting
      'vite.config.ts',
      '*.config.*',
      // CommonJS config files (dependency-cruiser uses CommonJS)
      '**/*.cjs',
    ],
  },

  // Base JS config
  js.configs.recommended,

  // TypeScript config
  ...tseslint.configs.recommended,

  // Main configuration for all TS/TSX files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
      local: localPlugin,
    },
    linterOptions: {
      noInlineConfig: true,
    },
    rules: {
      // Unused detection
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      // Allow empty interfaces (used for module augmentation, extension points, and type stubs)
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': true,
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],
      'prefer-const': 'error',
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'error',
      'no-console': 'off',
      'no-var': 'error',
      'no-empty-pattern': 'error',

      // Screenset Architecture: Domain-based conventions (disabled globally, enabled for screensets)
      'local/no-barrel-exports-events-effects': 'off',
      'local/no-coordinator-effects': 'off',
      'local/no-missing-domain-id': 'off',
      'local/domain-event-format': 'off',

      // Flux Architecture: No direct store.dispatch
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.name='dispatch'] > MemberExpression[object.name='store']",
          message:
            'FLUX VIOLATION: Components must not call store.dispatch directly. Use actions instead. See EVENTS.md.',
        },
        // Lodash enforcement
        {
          selector: "CallExpression[callee.property.name='trim']",
          message:
            "LODASH VIOLATION: Use lodash trim() instead of native .trim(). Import { trim } from 'lodash'.",
        },
        {
          selector: "CallExpression[callee.property.name='charAt']",
          message:
            'LODASH VIOLATION: Use lodash string methods instead of native .charAt().',
        },
        {
          selector: "CallExpression[callee.property.name='substring']",
          message:
            'LODASH VIOLATION: Use lodash truncate() or other string methods instead of native .substring().',
        },
        {
          selector: "CallExpression[callee.property.name='toUpperCase']",
          message:
            'LODASH VIOLATION: Use lodash upperCase() or upperFirst() instead of native .toUpperCase().',
        },
        {
          selector: "CallExpression[callee.property.name='toLowerCase']",
          message:
            'LODASH VIOLATION: Use lodash lowerCase() or lowerFirst() instead of native .toLowerCase().',
        },
      ],
    },
  },

  // Screensets: Domain-based architecture rules
  {
    files: ['src/screensets/**/*'],
    rules: {
      'local/no-barrel-exports-events-effects': 'error',
      'local/no-coordinator-effects': 'error',
      'local/no-missing-domain-id': 'error',
      'local/domain-event-format': 'error',
    },
  },

  // Flux Architecture: Effects cannot import actions
  {
    files: ['**/*Effects.ts', '**/*Effects.tsx', '**/effects/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/actions/**',
                '../actions/**',
                './actions/**',
                '**/core/actions/**',
              ],
              message:
                'FLUX VIOLATION: Effects cannot import actions (circular flow risk). Effects only listen to events and update slices. See EVENTS.md.',
            },
          ],
        },
      ],
    },
  },

  // Flux Architecture: Actions cannot import slices
  {
    files: ['**/*Actions.ts', '**/*Actions.tsx', '**/actions/**/*'],
    ignores: ['**/*.test.*', '**/*.spec.*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/*Slice', '../*Slice', './*Slice', '**/*Slice.ts'],
              message:
                'FLUX VIOLATION: Actions cannot import slice files. Actions should emit events via eventBus, effects update slices. See EVENTS.md.',
            },
            {
              group: ['**/slices/**', '../slices/**', './slices/**'],
              message:
                'FLUX VIOLATION: Actions cannot import from /slices/ folders. Emit events instead. See EVENTS.md.',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "FunctionDeclaration[returnType.typeAnnotation.typeName.name='Promise']",
          message:
            'FLUX VIOLATION: Actions must return void, not Promise<void>. Use fire-and-forget pattern.',
        },
        {
          selector:
            "ArrowFunctionExpression[returnType.typeAnnotation.typeName.name='Promise']",
          message:
            'FLUX VIOLATION: Actions must return void, not Promise<void>. Use fire-and-forget pattern.',
        },
        {
          selector: 'FunctionDeclaration[async=true]',
          message:
            'FLUX VIOLATION: Actions must NOT use async keyword. Use fire-and-forget pattern.',
        },
        {
          selector: 'ArrowFunctionExpression[async=true]',
          message:
            'FLUX VIOLATION: Actions must NOT use async keyword. Use fire-and-forget pattern.',
        },
        {
          selector: "FunctionDeclaration:has(Identifier[name='getState'])",
          message:
            'FLUX VIOLATION: Actions are PURE FUNCTIONS. They must NOT access store via getState().',
        },
        {
          selector: "ArrowFunctionExpression:has(Identifier[name='getState'])",
          message:
            'FLUX VIOLATION: Actions are PURE FUNCTIONS. They must NOT access store via getState().',
        },
      ],
    },
  },

  // Components: No direct slice dispatch
  {
    files: ['src/screensets/**/*.tsx', 'src/components/**/*.tsx'],
    ignores: [
      '**/*.test.*',
      '**/*.spec.*',
      '**/*Slice.tsx',
      '**/actions/**',
      '**/effects/**',
      '**/store/**',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/store/*Store',
                '../store/*Store',
                './store/*Store',
                '../../store/*Store',
              ],
              message:
                'FLUX VIOLATION: Components cannot import custom stores. Use Redux slices with useSelector and dispatch actions.',
            },
            {
              group: [
                '**/hooks/use*Store',
                '../hooks/use*Store',
                './hooks/use*Store',
                '../../hooks/use*Store',
              ],
              message:
                'FLUX VIOLATION: Components cannot use custom store hooks. Use Redux useSelector hook.',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.name='dispatch'] CallExpression[callee.name=/^set[A-Z]/]",
          message:
            'FLUX VIOLATION: Components cannot call slice reducers (setXxx functions). Use actions from /actions/ instead.',
        },
        {
          selector:
            "CallExpression[callee.object.name=/Store$/][callee.property.name!='getState']",
          message:
            'FLUX VIOLATION: Components cannot call custom store methods directly. Use Redux actions and useSelector.',
        },
      ],
    },
  },

  // Flux Architecture: Effects cannot emit events
  {
    files: ['**/*Effects.ts', '**/effects/**/*.ts'],
    ignores: ['**/*.test.*', '**/*.spec.*'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.object.name='eventBus'][callee.property.name='emit']",
          message:
            'FLUX VIOLATION: Effects cannot emit events (creates circular flow). Effects should only listen to events and update slices.',
        },
      ],
    },
  },

  // Data Layer: No hardcoded i18n values
  {
    files: ['**/types/**/*', '**/api/**/*', '**/mocks.ts', '**/*.types.ts'],
    ignores: ['**/*.test.*', '**/*.spec.*', '**/*.tsx', '**/*.jsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='t']",
          message:
            'I18N VIOLATION: Translation function t() should NOT be used in types, interfaces, or data structures.',
        },
      ],
    },
  },

  // Mock Data: Strict lodash enforcement
  {
    files: ['**/mocks.ts', '**/mock*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.property.name='trim']",
          message:
            'MOCK DATA VIOLATION: Use lodash trim() instead of native .trim() in mock data factories.',
        },
        {
          selector: "CallExpression[callee.property.name='charAt']",
          message:
            'MOCK DATA VIOLATION: Use lodash string methods instead of native .charAt() in mock data.',
        },
        {
          selector: "CallExpression[callee.property.name='substring']",
          message:
            'MOCK DATA VIOLATION: Use lodash truncate() or other methods instead of native .substring() in mock data.',
        },
        {
          selector: "CallExpression[callee.property.name='toUpperCase']",
          message:
            'MOCK DATA VIOLATION: Use lodash upperCase() or upperFirst() instead of native .toUpperCase() in mock data.',
        },
        {
          selector: "CallExpression[callee.property.name='toLowerCase']",
          message:
            'MOCK DATA VIOLATION: Use lodash lowerCase() or lowerFirst() instead of native .toLowerCase() in mock data.',
        },
        {
          selector: "CallExpression[callee.property.name='slice']",
          message:
            'MOCK DATA VIOLATION: Use lodash slice() instead of native .slice() in mock data.',
        },
      ],
    },
  },
];
