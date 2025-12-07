/**
 * ChatScreen - Main chat interface
 * Orchestrates components for a full-featured chat UI
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  TextLoader,
  useAppSelector,
  useAppDispatch,
  useTranslation,
  useScreenTranslations,
  I18nRegistry,
  Language,
} from '@hai3/uicore';
import * as chatActions from '../../actions/chatActions';
import { ChatRole } from '../../api/api';
import type { AttachedFile } from '../../types';
import { selectThreadsState } from '../../slices/threadsSlice';
import { selectMessagesState } from '../../slices/messagesSlice';
import { selectComposerState } from '../../slices/composerSlice';
import { selectSettingsState } from '../../slices/settingsSlice';
import { CHAT_SCREENSET_ID, CHAT_SCREEN_ID } from '../../ids';
import { EnhancedThreadList, type EnhancedChatThread } from '../../uikit/components/EnhancedThreadList';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInputArea } from './components/ChatInputArea';

/**
 * Chat screen translations (loaded lazily when screen mounts)
 */
const translations = I18nRegistry.createLoader({
  [Language.English]: () => import('./i18n/en.json'),
  [Language.Arabic]: () => import('./i18n/ar.json'),
  [Language.Bengali]: () => import('./i18n/bn.json'),
  [Language.Czech]: () => import('./i18n/cs.json'),
  [Language.Danish]: () => import('./i18n/da.json'),
  [Language.German]: () => import('./i18n/de.json'),
  [Language.Greek]: () => import('./i18n/el.json'),
  [Language.Spanish]: () => import('./i18n/es.json'),
  [Language.Persian]: () => import('./i18n/fa.json'),
  [Language.Finnish]: () => import('./i18n/fi.json'),
  [Language.French]: () => import('./i18n/fr.json'),
  [Language.Hebrew]: () => import('./i18n/he.json'),
  [Language.Hindi]: () => import('./i18n/hi.json'),
  [Language.Hungarian]: () => import('./i18n/hu.json'),
  [Language.Indonesian]: () => import('./i18n/id.json'),
  [Language.Italian]: () => import('./i18n/it.json'),
  [Language.Japanese]: () => import('./i18n/ja.json'),
  [Language.Korean]: () => import('./i18n/ko.json'),
  [Language.Malay]: () => import('./i18n/ms.json'),
  [Language.Dutch]: () => import('./i18n/nl.json'),
  [Language.Norwegian]: () => import('./i18n/no.json'),
  [Language.Polish]: () => import('./i18n/pl.json'),
  [Language.Portuguese]: () => import('./i18n/pt.json'),
  [Language.Romanian]: () => import('./i18n/ro.json'),
  [Language.Russian]: () => import('./i18n/ru.json'),
  [Language.Swedish]: () => import('./i18n/sv.json'),
  [Language.Swahili]: () => import('./i18n/sw.json'),
  [Language.Tamil]: () => import('./i18n/ta.json'),
  [Language.Thai]: () => import('./i18n/th.json'),
  [Language.Tagalog]: () => import('./i18n/tl.json'),
  [Language.Turkish]: () => import('./i18n/tr.json'),
  [Language.Ukrainian]: () => import('./i18n/uk.json'),
  [Language.Urdu]: () => import('./i18n/ur.json'),
  [Language.Vietnamese]: () => import('./i18n/vi.json'),
  [Language.ChineseSimplified]: () => import('./i18n/zh.json'),
  [Language.ChineseTraditional]: () => import('./i18n/zh-TW.json'),
});

/**
 * ChatScreen - Main chat interface
 * Uses global Redux store (accessed via HAI3Provider in main.tsx)
 */
export const ChatScreen: React.FC = () => {
  useScreenTranslations(CHAT_SCREENSET_ID, CHAT_SCREEN_ID, translations);

  const dispatch = useAppDispatch();
  const { t, translationsReady } = useTranslation();
  const tk = (key: string) => t(`screen.${CHAT_SCREENSET_ID}.${CHAT_SCREEN_ID}:${key}`);

  // Fetch chat data on mount
  useEffect(() => {
    void dispatch(chatActions.fetchChatData());
  }, [dispatch]);

  // Local UI state
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const [isContextSelectorOpen, setIsContextSelectorOpen] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Redux state
  const threadsState = useAppSelector(selectThreadsState);
  const messagesState = useAppSelector(selectMessagesState);
  const composerState = useAppSelector(selectComposerState);
  const settingsState = useAppSelector(selectSettingsState);

  const { threads, currentThreadId } = threadsState;
  const { messages, isStreaming, editingMessageId, editedContent } = messagesState;
  const { inputValue, attachedFiles } = composerState;
  const { currentModel, currentContext, availableContexts } = settingsState;

  // Derived state
  const currentMessages = messages.filter((m) => m.threadId === currentThreadId);
  const currentThread = useMemo(
    () => threads.find((t) => t.id === currentThreadId) || { isTemporary: false, title: 'New Chat' },
    [threads, currentThreadId]
  );

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length, currentThreadId]);

  // Thread handlers
  const handleThreadSelect = useCallback((threadId: string) => {
    chatActions.selectThread(threadId);
  }, []);

  const handleNewThread = useCallback(() => {
    const isTemporary = currentThread?.isTemporary || false;
    const newChatTitle = t(`screenset.${CHAT_SCREENSET_ID}:new_chat`);
    chatActions.createDraftThread(newChatTitle, isTemporary);
  }, [currentThread, t]);

  const handleDeleteThread = useCallback((threadId: string) => {
    void dispatch(chatActions.deleteThread(threadId));
  }, [dispatch]);

  const handleThreadTitleEdit = useCallback((threadId: string, newTitle: string) => {
    void dispatch(chatActions.updateThreadTitle(threadId, newTitle));
  }, [dispatch]);

  const handleThreadReorder = useCallback((newThreads: EnhancedChatThread[]) => {
    chatActions.reorderThreads(newThreads);
  }, []);

  // Header handlers
  const handleTitleEditStart = useCallback(() => {
    if (currentThread) {
      setIsTitleEditing(true);
      setEditedTitle(currentThread.title);
    }
  }, [currentThread]);

  const handleTitleSave = useCallback(() => {
    if (currentThreadId && editedTitle.trim()) {
      void dispatch(chatActions.updateThreadTitle(currentThreadId, editedTitle.trim()));
    }
    setIsTitleEditing(false);
    setEditedTitle('');
  }, [currentThreadId, editedTitle, dispatch]);

  const handleTitleCancel = useCallback(() => {
    setIsTitleEditing(false);
    setEditedTitle('');
  }, []);

  // Message handlers
  const handleCopyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
  }, []);

  const handleEditMessage = useCallback((messageId: string) => {
    const message = currentMessages.find((m) => m.id === messageId);
    if (message) {
      chatActions.startEditingMessage(messageId, message.content);
    }
  }, [currentMessages]);

  const handleEditedContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    chatActions.updateEditedContent(e.target.value);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editingMessageId && editedContent.trim()) {
      chatActions.saveEditedMessage(editingMessageId, editedContent);
    }
  }, [editingMessageId, editedContent]);

  const handleCancelEdit = useCallback(() => {
    chatActions.cancelEditingMessage();
  }, []);

  const handleToggleViewMode = useCallback((messageId: string) => {
    chatActions.toggleMessageViewMode(messageId);
  }, []);

  const handleLikeMessage = useCallback((messageId: string) => {
    chatActions.likeMessage(messageId);
  }, []);

  const handleDislikeMessage = useCallback((messageId: string) => {
    chatActions.dislikeMessage(messageId);
  }, []);

  const handleRegenerateMessage = useCallback((messageId: string) => {
    const messageIndex = currentMessages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;

    const message = currentMessages[messageIndex];
    const conversationMessages = currentMessages.slice(0, messageIndex).map((m) => ({
      role: m.type === 'user' ? ChatRole.User : ChatRole.Assistant,
      content: m.content,
    }));

    void dispatch(chatActions.regenerateMessage(messageId, message.threadId, currentModel, conversationMessages));
  }, [currentMessages, currentModel, dispatch]);

  const handleDeleteMessage = useCallback((messageId: string) => {
    chatActions.deleteMessage(messageId);
  }, []);

  // Input handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    chatActions.changeInputValue(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!isStreaming && (inputValue.trim() || attachedFiles.length > 0) && currentThreadId) {
      const conversationMessages = messages
        .filter((m) => m.threadId === currentThreadId)
        .map((m) => ({
          role: m.type === 'user' ? ChatRole.User : ChatRole.Assistant,
          content: m.content,
        }));

      const isTemporary = currentThread?.isTemporary || false;
      void dispatch(chatActions.sendMessage(inputValue, currentThreadId, currentModel, conversationMessages, isTemporary));
    }
  }, [dispatch, inputValue, isStreaming, attachedFiles.length, currentThreadId, currentModel, messages, currentThread]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleModelChange = useCallback((model: string) => {
    chatActions.changeModel(model);
  }, []);

  const handleTemporaryToggle = useCallback((isTemporary: boolean) => {
    if (currentThreadId) {
      chatActions.toggleThreadTemporary(currentThreadId, isTemporary);
    }
  }, [currentThreadId]);

  const handleAddContext = useCallback((contextId: string) => {
    chatActions.addContext(contextId);
  }, []);

  const handleRemoveContext = useCallback((contextId: string) => {
    chatActions.removeContext(contextId);
  }, []);

  const handleFileSelect = useCallback((file: AttachedFile) => {
    chatActions.attachFile(file);
  }, []);

  const handleFileRemove = useCallback((fileId: string) => {
    chatActions.removeFile(fileId);
  }, []);

  return (
    <div className="flex h-full bg-background">
      {/* Left sidebar - Thread list */}
      <div
        className={`border-r border-border bg-card transition-all duration-300 ${
          isMenuCollapsed ? 'w-0' : 'w-80'
        } overflow-hidden flex-shrink-0`}
      >
        <EnhancedThreadList
          threads={threads}
          currentThreadId={currentThreadId}
          onThreadSelect={handleThreadSelect}
          onNewThread={handleNewThread}
          onThreadDelete={handleDeleteThread}
          onThreadTitleEdit={handleThreadTitleEdit}
          onReorder={handleThreadReorder}
          heading={
            <TextLoader skeletonClassName="h-7 w-32">
              {tk('recent_chats')}
            </TextLoader>
          }
          newThreadLabel={tk('new_thread')}
          searchPlaceholder={translationsReady ? tk('search_threads') : undefined}
          tempIndicator={
            <TextLoader skeletonClassName="text-xs w-12" inheritColor>
              {tk('temp_indicator')}
            </TextLoader>
          }
          editLabel={tk('edit_message')}
          deleteLabel={tk('delete_thread')}
          noMatchingChatsMessage={
            <TextLoader skeletonClassName="h-4 w-40">
              {tk('no_matching_chats')}
            </TextLoader>
          }
          noChatsYetMessage={
            <TextLoader skeletonClassName="h-4 w-24">
              {tk('no_chats_yet')}
            </TextLoader>
          }
          className="h-full"
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          isMenuCollapsed={isMenuCollapsed}
          onToggleMenu={() => setIsMenuCollapsed(!isMenuCollapsed)}
          title={currentThread.title}
          isEditing={isTitleEditing}
          editedTitle={editedTitle}
          onEditStart={handleTitleEditStart}
          onTitleChange={setEditedTitle}
          onSave={handleTitleSave}
          onCancel={handleTitleCancel}
          expandMenuLabel={tk('expand_menu')}
          collapseMenuLabel={tk('collapse_menu')}
          editLabel={tk('edit_title')}
          saveLabel={tk('save')}
          cancelLabel={tk('cancel')}
          placeholderLabel={tk('click_to_edit_title')}
        />

        <MessageList
          ref={messagesEndRef}
          messages={currentMessages}
          editingMessageId={editingMessageId}
          editedContent={editedContent}
          isStreaming={isStreaming}
          hoveredMessageId={hoveredMessage}
          onMessageHover={setHoveredMessage}
          onCopyMessage={handleCopyMessage}
          onEditMessage={handleEditMessage}
          onEditedContentChange={handleEditedContentChange}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onToggleViewMode={handleToggleViewMode}
          onLikeMessage={handleLikeMessage}
          onDislikeMessage={handleDislikeMessage}
          onRegenerateMessage={handleRegenerateMessage}
          onDeleteMessage={handleDeleteMessage}
          labels={{
            noMessages: tk('no_messages'),
            noMessagesDescription: tk('no_messages_description'),
            save: tk('save'),
            cancel: tk('cancel'),
            copyMessage: tk('copy_message'),
            showMarkdownView: tk('show_markdown_view'),
            showRawMarkdown: tk('show_raw_markdown'),
            editMessage: tk('edit_message'),
            regenerateResponse: tk('regenerate_response'),
            likeMessage: tk('like_message'),
            dislikeMessage: tk('dislike_message'),
            deleteMessage: tk('delete_message'),
          }}
        />

        <ChatInputArea
          ref={inputRef}
          inputValue={inputValue}
          currentModel={currentModel}
          isTemporary={currentThread?.isTemporary || false}
          isStreaming={isStreaming}
          attachedFiles={attachedFiles}
          availableContexts={availableContexts}
          selectedContexts={currentContext}
          isContextSelectorOpen={isContextSelectorOpen}
          translationsReady={translationsReady}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onSendMessage={handleSendMessage}
          onModelChange={handleModelChange}
          onTemporaryToggle={handleTemporaryToggle}
          onToggleContextSelector={() => setIsContextSelectorOpen(!isContextSelectorOpen)}
          onAddContext={handleAddContext}
          onRemoveContext={handleRemoveContext}
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          labels={{
            modelLabel: (
              <TextLoader skeletonClassName="h-4 w-12" inheritColor>
                {tk('model_label')}
              </TextLoader>
            ),
            selectModel: tk('select_model'),
            temporaryChat: (
              <TextLoader skeletonClassName="h-4 w-28" inheritColor>
                {tk('temporary_chat')}
              </TextLoader>
            ),
            contextLabel: (
              <TextLoader skeletonClassName="h-4 w-16" inheritColor>
                {tk('context_label')}
              </TextLoader>
            ),
            addContext: (
              <TextLoader skeletonClassName="h-4 w-20" inheritColor>
                {tk('add_context')}
              </TextLoader>
            ),
            selectContext: (
              <TextLoader skeletonClassName="h-4 w-24">
                {tk('select_context')}
              </TextLoader>
            ),
            removeFile: tk('remove_file'),
            attachFile: tk('attach_file'),
            messagePlaceholder: translationsReady ? tk('message_placeholder') : undefined,
            sendMessage: tk('send_message'),
          }}
        />
      </div>
    </div>
  );
};

ChatScreen.displayName = 'ChatScreen';

export default ChatScreen;
