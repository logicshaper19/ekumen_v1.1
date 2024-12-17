import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FileText, Image } from 'lucide-react';
import { Message, ChatUser, Attachment } from '@/types/chat';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  sender?: ChatUser;
}

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const isImage = attachment.type === 'image';

  const attachmentContent = (
    <div className="block rounded-lg overflow-hidden border border-gray-200 hover:border-[#005E5D] transition-colors cursor-pointer">
      {isImage ? (
        <div className="relative">
          <img
            src={attachment.url}
            alt={attachment.name}
            className="max-h-48 w-auto object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
            {attachment.name}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2 p-2 bg-gray-50">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700 truncate">{attachment.name}</span>
          {attachment.size && (
            <span className="text-xs text-gray-500">
              ({Math.round(attachment.size / 1024)}KB)
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-2">
          {attachmentContent}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        {isImage ? (
          <img
            src={attachment.url}
            alt={attachment.name}
            className="w-full h-auto"
          />
        ) : (
          <iframe
            src={attachment.url}
            title={attachment.name}
            className="w-full h-[80vh]"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ChatMessage({ message, isCurrentUser, sender }: ChatMessageProps) {
  const messageTime = new Date(message.timestamp);
  const formattedTime = format(messageTime, 'HH:mm', { locale: fr });

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-end space-x-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div>
          <div
            className={`rounded-lg px-4 py-2 ${
              isCurrentUser
                ? 'bg-[#005E5D] text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            {message.attachments?.map((attachment) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
            <div
              className={`text-xs mt-1 ${
                isCurrentUser ? 'text-teal-100' : 'text-gray-500'
              }`}
            >
              {formattedTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
