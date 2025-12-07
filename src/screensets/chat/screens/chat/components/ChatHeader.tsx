/**
 * ChatHeader - Header with collapse button and title editor
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@hai3/uikit';
import { ButtonVariant, ButtonSize } from '@hai3/uikit-contracts';
import { ChatTitleEditor } from '../../../uikit/components/ChatTitleEditor';

export interface ChatHeaderProps {
  isMenuCollapsed: boolean;
  onToggleMenu: () => void;
  title: string;
  isEditing: boolean;
  editedTitle: string;
  onEditStart: () => void;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onCancel: () => void;
  expandMenuLabel: string;
  collapseMenuLabel: string;
  editLabel: string;
  saveLabel: string;
  cancelLabel: string;
  placeholderLabel: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMenuCollapsed,
  onToggleMenu,
  title,
  isEditing,
  editedTitle,
  onEditStart,
  onTitleChange,
  onSave,
  onCancel,
  expandMenuLabel,
  collapseMenuLabel,
  editLabel,
  saveLabel,
  cancelLabel,
  placeholderLabel,
}) => {
  return (
    <div className="border-b border-border px-4 py-3 flex items-center gap-4 bg-card">
      <Button
        variant={ButtonVariant.Ghost}
        size={ButtonSize.Icon}
        onClick={onToggleMenu}
        aria-label={isMenuCollapsed ? expandMenuLabel : collapseMenuLabel}
        className="[&_svg]:size-5"
      >
        {isMenuCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
      <div className="flex-1 min-w-0">
        <ChatTitleEditor
          title={title}
          isEditing={isEditing}
          editedTitle={editedTitle}
          onEditStart={onEditStart}
          onTitleChange={onTitleChange}
          onSave={onSave}
          onCancel={onCancel}
          editLabel={editLabel}
          saveLabel={saveLabel}
          cancelLabel={cancelLabel}
          placeholderLabel={placeholderLabel}
        />
      </div>
    </div>
  );
};
