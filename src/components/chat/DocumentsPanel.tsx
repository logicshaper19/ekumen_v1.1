import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message, Attachment } from '@/types/chat';
import { FileText, Image, Link as LinkIcon, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DocumentsPanelProps {
  messages: Message[];
  onClose: () => void;
}

type GroupedAttachments = {
  [key: string]: {
    attachments: Attachment[];
    timestamp: string;
    sender: string;
  }[];
};

export function DocumentsPanel({ messages, onClose }: DocumentsPanelProps) {
  // Group attachments by date
  const groupedAttachments = messages.reduce<GroupedAttachments>((acc, message) => {
    if (message.attachments.length === 0) return acc;

    const date = new Date(message.timestamp).toLocaleDateString('fr-FR');
    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push({
      attachments: message.attachments,
      timestamp: message.timestamp,
      sender: message.senderId
    });

    return acc;
  }, {});

  const renderAttachmentIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-gray-400" />;
      case 'document':
        return <FileText className="h-5 w-5 text-gray-400" />;
      case 'link':
        return <LinkIcon className="h-5 w-5 text-gray-400" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="w-80 border-l border-gray-200 flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold">Documents Partagés</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {Object.entries(groupedAttachments).map(([date, groups]) => (
            <div key={date}>
              <h3 className="text-sm font-medium text-gray-500 mb-3">{date}</h3>
              <div className="space-y-4">
                {groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-2">
                    <div className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(group.timestamp), {
                        addSuffix: true,
                        locale: fr
                      })}
                      {' par '}
                      <span className="font-medium">
                        {group.sender === 'current-user-id' ? 'Vous' : 'Contact'}
                      </span>
                    </div>
                    {group.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        {renderAttachmentIcon(attachment.type)}
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#005E5D]">
                            {attachment.name}
                          </p>
                          {attachment.size && (
                            <p className="text-xs text-gray-500">{attachment.size}</p>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
