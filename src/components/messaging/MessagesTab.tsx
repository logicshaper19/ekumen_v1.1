import React, { useState } from 'react';
import { ChatList } from '../chat/ChatList';
import { ChatThread } from '../chat/ChatThread';
import { ChatThreadType, Message, ChatUser } from '@/types/chat';

interface MessagesTabProps {
  threads?: ChatThreadType[];
  currentUser: ChatUser;
}

export function MessagesTab({ threads = [], currentUser }: MessagesTabProps) {
  const [selectedThread, setSelectedThread] = useState<ChatThreadType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Filter out threads without valid lastMessage
  const validThreads = threads.filter(thread => thread.lastMessage && thread.participants?.length > 0);

  const handleThreadSelect = (thread: ChatThreadType) => {
    setSelectedThread(thread);
    // Here you would typically fetch messages for the selected thread
    // For now, we'll use an empty array
    setMessages([]);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r border-gray-200">
        <ChatList
          threads={validThreads}
          selectedThread={selectedThread}
          onThreadSelect={handleThreadSelect}
          currentUser={currentUser}
        />
      </div>
      <div className="flex-1">
        {selectedThread ? (
          <ChatThread
            thread={selectedThread}
            messages={messages}
            currentUser={currentUser}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Sélectionnez une conversation pour commencer
          </div>
        )}
      </div>
    </div>
  );
}
