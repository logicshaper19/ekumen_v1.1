import React from 'react';
import { FileText, Image, Link as LinkIcon, Eye } from 'lucide-react';
import { Message, Attachment } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const renderAttachment = () => {
    switch (attachment.type) {
      case 'image':
        return (
          <div className="relative group">
            <img
              src={attachment.previewUrl || attachment.url}
              alt={attachment.name}
              className="max-w-xs rounded-lg object-cover cursor-pointer"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg flex items-center justify-center">
              <Eye className="hidden group-hover:block text-white" />
            </div>
          </div>
        );
      
      case 'document':
        return (
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <FileText className="h-5 w-5 text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
              {attachment.size && (
                <p className="text-xs text-gray-500">{attachment.size}</p>
              )}
            </div>
          </div>
        );
      
      case 'link':
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <LinkIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-900 truncate">{attachment.name}</span>
          </a>
        );
    }
  };

  return (
    <div className="mt-2">
      {renderAttachment()}
    </div>
  );
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isCurrentUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isCurrentUser
              ? 'bg-[#005E5D] text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          <p className="text-sm">{message.content}</p>
          {message.attachments.map((attachment) => (
            <AttachmentPreview key={attachment.id} attachment={attachment} />
          ))}
        </div>
        <div
          className={`text-xs text-gray-500 mt-1 ${
            isCurrentUser ? 'text-right' : 'text-left'
          }`}
        >
          {formatDistanceToNow(new Date(message.timestamp), {
            addSuffix: true,
            locale: fr
          })}
        </div>
      </div>
    </div>
  );
}
