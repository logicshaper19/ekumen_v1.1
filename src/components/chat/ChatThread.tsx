import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ChatThreadType, Message, ChatUser, Attachment } from '@/types/chat';
import { ChatMessage } from './ChatMessage';

interface ChatThreadProps {
  thread: ChatThreadType;
  messages: Message[];
  currentUser: ChatUser;
  onSendMessage?: (content: string, attachments?: File[]) => void;
}

export function ChatThread({ thread, messages, currentUser, onSendMessage }: ChatThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const otherParticipant = thread.participants.find(p => p.id !== currentUser.id);

  const handleSend = () => {
    if ((newMessage.trim() || attachments.length > 0) && onSendMessage) {
      onSendMessage(newMessage.trim(), attachments);
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="font-semibold text-lg">{otherParticipant?.name}</h2>
            <p className="text-sm text-gray-500">{otherParticipant?.role}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUser.id}
            sender={thread.participants.find(p => p.id === message.senderId)}
          />
        ))}
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1"
              >
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-gray-500 hover:text-[#005E5D]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-[#005E5D] rounded-lg focus:outline-none"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#005E5D]"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() && attachments.length === 0}
            className="p-2 bg-[#005E5D] text-white rounded-lg hover:bg-[#004a4a] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
