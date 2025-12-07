/**
 * MessageList - Container for messages with empty state
 */

import React, { forwardRef } from 'react';
import { TextLoader } from '@hai3/uicore';
import { MessageItem, type MessageItemProps } from './MessageItem';
import type { Message } from '../../../types';

export interface MessageListProps {
  messages: Message[];
  editingMessageId: string | null;
  editedContent: string;
  isStreaming: boolean;
  hoveredMessageId: string | null;
  onMessageHover: (messageId: string | null) => void;
  onCopyMessage: (content: string) => void;
  onEditMessage: (messageId: string) => void;
  onEditedContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onToggleViewMode: (messageId: string) => void;
  onLikeMessage: (messageId: string) => void;
  onDislikeMessage: (messageId: string) => void;
  onRegenerateMessage: (messageId: string) => void;
  onDeleteMessage: (messageId: string) => void;
  labels: {
    noMessages: string;
    noMessagesDescription: string;
  } & MessageItemProps['labels'];
}

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  (
    {
      messages,
      editingMessageId,
      editedContent,
      isStreaming,
      hoveredMessageId,
      onMessageHover,
      onCopyMessage,
      onEditMessage,
      onEditedContentChange,
      onSaveEdit,
      onCancelEdit,
      onToggleViewMode,
      onLikeMessage,
      onDislikeMessage,
      onRegenerateMessage,
      onDeleteMessage,
      labels,
    },
    ref
  ) => {
    if (messages.length === 0) {
      return (
        <div className="flex-1 overflow-y-auto p-6 bg-muted">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <TextLoader skeletonClassName="h-7 w-48 mx-auto mb-2">
                <p className="text-lg mb-2">{labels.noMessages}</p>
              </TextLoader>
              <TextLoader skeletonClassName="h-5 w-96 mx-auto">
                <p className="text-sm">{labels.noMessagesDescription}</p>
              </TextLoader>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto p-6 bg-muted">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              isHovered={hoveredMessageId === message.id}
              isEditing={editingMessageId === message.id}
              editedContent={editedContent}
              isStreaming={isStreaming}
              onMouseEnter={() => onMessageHover(message.id)}
              onMouseLeave={() => onMessageHover(null)}
              onCopy={() => onCopyMessage(message.content)}
              onEdit={() => onEditMessage(message.id)}
              onEditedContentChange={onEditedContentChange}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onToggleViewMode={() => onToggleViewMode(message.id)}
              onLike={() => onLikeMessage(message.id)}
              onDislike={() => onDislikeMessage(message.id)}
              onRegenerate={() => onRegenerateMessage(message.id)}
              onDelete={() => onDeleteMessage(message.id)}
              labels={labels}
            />
          ))}
          <div ref={ref} />
        </div>
      </div>
    );
  }
);

MessageList.displayName = 'MessageList';
