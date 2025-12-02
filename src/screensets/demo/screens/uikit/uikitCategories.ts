/**
 * UI Kit Element Categories
 * Organized grouping of all UI Kit elements
 */

import { toLower } from 'lodash';

export interface UIKitCategory {
  id: string;
  label: string;
  translationKey: string;
  elements: string[];
}

export const UIKIT_CATEGORIES: UIKitCategory[] = [
  {
    id: 'layout',
    label: 'Layout & Structure',
    translationKey: 'category_layout',
    elements: [
      'Card',
      'Dialog',
      'Sheet',
      'Drawer',
      'Separator',
      'Aspect Ratio',
      'Resizable',
      'Scroll Area',
      'Sidebar',
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    translationKey: 'category_navigation',
    elements: [
      'Navigation Menu',
      'Breadcrumb',
      'Pagination',
      'Tabs',
      'Menubar',
    ],
  },
  {
    id: 'forms',
    label: 'Forms & Inputs',
    translationKey: 'category_forms',
    elements: [
      'Input',
      'Input Group',
      'Input OTP',
      'Textarea',
      'Select',
      'Native Select',
      'Combobox',
      'Checkbox',
      'Radio Group',
      'Switch',
      'Date Picker',
      'Calendar',
      'Field',
      'Form',
      'Label',
    ],
  },
  {
    id: 'actions',
    label: 'Actions & Buttons',
    translationKey: 'category_actions',
    elements: [
      'Button',
      'Button Group',
      'Toggle',
      'Toggle Group',
      'Command',
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback & Status',
    translationKey: 'category_feedback',
    elements: [
      'Alert',
      'Alert Dialog',
      'Toast',
      'Sonner',
      'Progress',
      'Spinner',
      'Skeleton',
      'Empty',
    ],
  },
  {
    id: 'data-display',
    label: 'Data Display',
    translationKey: 'category_data_display',
    elements: [
      'Table',
      'Data Table',
      'Chart',
      'Avatar',
      'Badge',
      'Typography',
      'Kbd',
      'Item',
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays & Popovers',
    translationKey: 'category_overlays',
    elements: [
      'Context Menu',
      'Dropdown Menu',
      'Hover Card',
      'Popover',
      'Tooltip',
    ],
  },
  {
    id: 'media',
    label: 'Media & Content',
    translationKey: 'category_media',
    elements: [
      'Carousel',
      'Slider',
    ],
  },
  {
    id: 'disclosure',
    label: 'Disclosure',
    translationKey: 'category_disclosure',
    elements: [
      'Accordion',
      'Collapsible',
    ],
  },
];

/**
 * Get category by ID
 */
export function getCategoryById(categoryId: string): UIKitCategory | undefined {
  return UIKIT_CATEGORIES.find(cat => cat.id === categoryId);
}

/**
 * Get category ID for an element
 */
export function getCategoryIdForElement(elementName: string): string | undefined {
  const category = UIKIT_CATEGORIES.find(cat => 
    cat.elements.includes(elementName)
  );
  return category?.id;
}

/**
 * Get normalized element ID (for DOM IDs)
 */
export function getElementId(elementName: string): string {
  return `element-${toLower(elementName).replace(/\s+/g, '-')}`;
}

/**
 * Currently implemented elements (matching UIKitElementsScreen)
 */
export const IMPLEMENTED_ELEMENTS = [
  'Accordion',
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Carousel',
  'Collapsible',
  'Context Menu',
  'Dialog',
  'Dropdown Menu',
  'Hover Card',
  'Popover',
  'Progress',
  'Select',
  'Sheet',
  'Skeleton',
  'Slider',
  'Spinner',
  'Switch',
  'Tooltip',
];

