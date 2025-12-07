/**
 * ChatInputArea - Bottom input area with model, context, files, and textarea
 */

import React, { forwardRef } from 'react';
import { Send } from 'lucide-react';
import { Button, Textarea } from '@hai3/uikit';
import { ButtonVariant } from '@hai3/uikit-contracts';
import { ModelSelector } from '../../../uikit/components/ModelSelector';
import { TemporaryChatToggle } from '../../../uikit/components/TemporaryChatToggle';
import {
  ContextSelector,
  SelectedContextsDisplay,
} from '../../../uikit/components/ContextSelector';
import {
  FileAttachmentButton,
  FileAttachmentPreview,
} from '../../../uikit/components/FileAttachment';
import type { AttachedFile, Context } from '../../../types';

export interface ChatInputAreaProps {
  inputValue: string;
  currentModel: string;
  isTemporary: boolean;
  isStreaming: boolean;
  attachedFiles: AttachedFile[];
  availableContexts: Context[];
  selectedContexts: string[];
  isContextSelectorOpen: boolean;
  translationsReady: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
  onModelChange: (model: string) => void;
  onTemporaryToggle: (isTemporary: boolean) => void;
  onToggleContextSelector: () => void;
  onAddContext: (contextId: string) => void;
  onRemoveContext: (contextId: string) => void;
  onFileSelect: (file: AttachedFile) => void;
  onFileRemove: (fileId: string) => void;
  labels: {
    modelLabel: React.ReactNode;
    selectModel: string;
    temporaryChat: React.ReactNode;
    contextLabel: React.ReactNode;
    addContext: React.ReactNode;
    selectContext: React.ReactNode;
    removeFile: string;
    attachFile: string;
    messagePlaceholder: string | undefined;
    sendMessage: string;
  };
}

export const ChatInputArea = forwardRef<HTMLTextAreaElement, ChatInputAreaProps>(
  (
    {
      inputValue,
      currentModel,
      isTemporary,
      isStreaming,
      attachedFiles,
      availableContexts,
      selectedContexts,
      isContextSelectorOpen,
      translationsReady,
      onInputChange,
      onKeyDown,
      onSendMessage,
      onModelChange,
      onTemporaryToggle,
      onToggleContextSelector,
      onAddContext,
      onRemoveContext,
      onFileSelect,
      onFileRemove,
      labels,
    },
    ref
  ) => {
    const canSend = !isStreaming && (inputValue.trim() || attachedFiles.length > 0);

    return (
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Model and temporary chat toggle */}
          <div className="flex items-center gap-3">
            <ModelSelector
              value={currentModel}
              onChange={onModelChange}
              placeholder={labels.selectModel}
              disabled={isStreaming}
            >
              {labels.modelLabel}
            </ModelSelector>
            <TemporaryChatToggle
              value={isTemporary}
              onChange={onTemporaryToggle}
              disabled={isStreaming}
            >
              {labels.temporaryChat}
            </TemporaryChatToggle>
          </div>

          {/* Selected contexts display */}
          {selectedContexts.length > 0 && (
            <SelectedContextsDisplay
              availableContexts={availableContexts}
              selectedContexts={selectedContexts}
              onRemove={onRemoveContext}
              removeAriaLabelFormatter={(name) => `Remove ${name}`}
            >
              {labels.contextLabel}
            </SelectedContextsDisplay>
          )}

          {/* File attachments preview */}
          <FileAttachmentPreview
            files={attachedFiles}
            onRemove={onFileRemove}
            removeLabel={labels.removeFile}
          />

          {/* Message input */}
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={ref}
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                placeholder={translationsReady ? labels.messagePlaceholder : undefined}
                disabled={isStreaming}
                size="sm"
                autoResize
                className="w-full pe-20 rounded-lg resize-none overflow-y-auto"
              />
              <div className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <ContextSelector
                  availableContexts={availableContexts}
                  selectedContexts={selectedContexts}
                  isOpen={isContextSelectorOpen}
                  onToggleOpen={onToggleContextSelector}
                  onAdd={onAddContext}
                  onRemove={onRemoveContext}
                  placeholderLabel={labels.addContext}
                  selectContextLabel={labels.selectContext}
                  disabled={isStreaming}
                />
                <FileAttachmentButton
                  onFileSelect={onFileSelect}
                  disabled={isStreaming}
                  attachLabel={labels.attachFile}
                />
              </div>
            </div>
            <Button
              variant={ButtonVariant.Default}
              onClick={onSendMessage}
              disabled={!canSend}
              className="h-11 px-4 rounded-lg [&_svg]:size-5"
              aria-label={labels.sendMessage}
            >
              <Send />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ChatInputArea.displayName = 'ChatInputArea';
