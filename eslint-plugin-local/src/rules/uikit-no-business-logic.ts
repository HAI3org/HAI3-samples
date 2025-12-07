/**
 * @fileoverview UIKit components must be presentational only - no @hai3/uicore imports
 * @author HAI3 Team
 */

import type { Rule } from 'eslint';
import type { ImportDeclaration } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'UIKit components must be presentational only',
      category: 'Screenset Architecture',
      recommended: true,
    },
    messages: {
      noUicoreImport:
        'UIKit components cannot import from @hai3/uicore (except types). ' +
        'UIKit components must be purely presentational (value/onChange pattern, no hooks). ' +
        'Move to screensets/{name}/components/ if business logic is needed.',
    },
    schema: [],
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const filename = context.getFilename();

    // Only check screensets/*/uikit/ folders (not screens/*/uikit/ which is a screen folder)
    // Pattern: screensets/{screensetName}/uikit/ - uikit must be directly under screenset
    const isInScreensetsUikit =
      (filename.includes('/screensets/') || filename.includes('\\screensets\\')) &&
      (filename.includes('/uikit/') || filename.includes('\\uikit\\')) &&
      // Exclude screens/uikit/ which is a screen folder
      !filename.includes('/screens/uikit/') && !filename.includes('\\screens\\uikit\\');

    if (!isInScreensetsUikit) {
      return {};
    }

    // Skip icons/ folder - icons may need uicore for icon registry
    if (filename.includes('/icons/') || filename.includes('\\icons\\')) {
      return {};
    }

    return {
      ImportDeclaration(node: ImportDeclaration) {
        if (node.source.value === '@hai3/uicore') {
          // Check if all imports are type-only
          const sourceText = context.getSourceCode().getText(node);

          // Allow: import type { ... } from '@hai3/uicore'
          if (sourceText.startsWith('import type')) {
            return;
          }

          // Check individual specifiers for type imports
          const hasValueImports = node.specifiers.some((spec) => {
            if (spec.type !== 'ImportSpecifier') {
              // Default or namespace imports are value imports
              return true;
            }
            // Check if the individual import is marked as type
            const specText = context.getSourceCode().getText(spec);
            return !specText.startsWith('type ');
          });

          if (hasValueImports) {
            context.report({
              node: node as unknown as Rule.Node,
              messageId: 'noUicoreImport',
            });
          }
        }
      },
    };
  },
};

export = rule;
