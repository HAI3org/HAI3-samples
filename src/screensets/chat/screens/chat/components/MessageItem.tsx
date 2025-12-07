/**
 * MessageItem - Single message display with avatar, content, and actions
 */

import React, { useRef } from 'react';
import {
  Copy,
  Edit3,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  User,
  Bot,
  Code,
} from 'lucide-react';
import { Textarea, Skeleton } from '@hai3/uikit';
import { TextLoader } from '@hai3/uicore';
import { MarkdownRenderer } from '../../../uikit/components/MarkdownRenderer';
import { MessageFileDisplay } from '../../../uikit/components/FileAttachment';
import type { Message } from '../../../types';

export interface MessageItemProps {
  message: Message;
  isHovered: boolean;
  isEditing: boolean;
  editedContent: string;
  isStreaming: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onEditedContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onToggleViewMode: () => void;
  onLike: () => void;
  onDislike: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
  labels: {
    save: string;
    cancel: string;
    copyMessage: string;
    showMarkdownView: string;
    showRawMarkdown: string;
    editMessage: string;
    regenerateResponse: string;
    likeMessage: string;
    dislikeMessage: string;
    deleteMessage: string;
  };
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isHovered,
  isEditing,
  editedContent,
  isStreaming,
  onMouseEnter,
  onMouseLeave,
  onCopy,
  onEdit,
  onEditedContentChange,
  onSaveEdit,
  onCancelEdit,
  onToggleViewMode,
  onLike,
  onDislike,
  onRegenerate,
  onDelete,
  labels,
}) => {
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className="mb-8 group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center [&_svg]:size-4 ${
              message.type === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {message.type === 'user' ? <User /> : <Bot />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                ref={editTextareaRef}
                value={editedContent}
                onChange={onEditedContentChange}
                autoResize
                minHeight={50}
                maxHeight={350}
                className="w-full resize-none overflow-y-auto leading-normal"
              />
              <div className="flex gap-2">
                <button
                  onClick={onSaveEdit}
                  className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors"
                >
                  <TextLoader skeletonClassName="h-4 w-12" inheritColor>
                    {labels.save}
                  </TextLoader>
                </button>
                <button
                  onClick={onCancelEdit}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded hover:bg-secondary/90 transition-colors"
                >
                  <TextLoader skeletonClassName="h-4 w-14" inheritColor>
                    {labels.cancel}
                  </TextLoader>
                </button>
              </div>
            </div>
          ) : message.content === '' && isStreaming ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <>
              {message.showRawMarkdown ? (
                <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-3 rounded-lg">
                  {message.content}
                </pre>
              ) : (
                <MarkdownRenderer content={message.content} />
              )}
              {message.files && <MessageFileDisplay files={message.files} />}
            </>
          )}

          {/* Message Actions */}
          {!isEditing && (
            <div className="flex items-center gap-1 mt-2">
              {/* Always visible copy button */}
              <button
                onClick={onCopy}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground [&_svg]:size-3.5"
                title={labels.copyMessage}
              >
                <Copy />
              </button>

              {/* Additional buttons visible on hover or when liked/disliked/raw view */}
              <div
                className={`flex items-center gap-1 transition-opacity duration-200 ${
                  isHovered || message.liked || message.disliked || message.showRawMarkdown
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                <button
                  onClick={onToggleViewMode}
                  className={`p-1.5 hover:bg-muted rounded-lg transition-colors [&_svg]:size-3.5 ${
                    message.showRawMarkdown
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={message.showRawMarkdown ? labels.showMarkdownView : labels.showRawMarkdown}
                >
                  <Code />
                </button>
                <button
                  onClick={onEdit}
                  className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground [&_svg]:size-3.5"
                  title={labels.editMessage}
                >
                  <Edit3 />
                </button>
                {message.type === 'assistant' && (
                  <button
                    onClick={onRegenerate}
                    className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground [&_svg]:size-3.5"
                    title={labels.regenerateResponse}
                  >
                    <RotateCcw />
                  </button>
                )}
                {message.type === 'assistant' && (
                  <>
                    <button
                      onClick={onLike}
                      className={`p-1.5 hover:bg-muted rounded-lg transition-colors [&_svg]:size-3.5 ${
                        message.liked
                          ? 'text-green-600 dark:text-green-500'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      title={labels.likeMessage}
                    >
                      <ThumbsUp fill={message.liked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={onDislike}
                      className={`p-1.5 hover:bg-muted rounded-lg transition-colors [&_svg]:size-3.5 ${
                        message.disliked
                          ? 'text-red-600 dark:text-red-500'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      title={labels.dislikeMessage}
                    >
                      <ThumbsDown fill={message.disliked ? 'currentColor' : 'none'} />
                    </button>
                  </>
                )}
                <button
                  onClick={onDelete}
                  className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive [&_svg]:size-3.5"
                  title={labels.deleteMessage}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
