import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChatThread } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { InviteModal } from './InviteModal';

interface ChatListProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onThreadSelect: (threadId: string) => void;
}

export function ChatList({ threads, activeThreadId, onThreadSelect }: ChatListProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <>
      <div className="w-80 border-r border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInviteModal(true)}
              className="flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Inviter</span>
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une conversation..."
              className="pl-8"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {threads.map((thread) => {
              const otherParticipant = thread.participants.find(
                (p) => p.id !== 'current-user-id'
              );
              
              if (!otherParticipant) return null;

              return (
                <button
                  key={thread.id}
                  onClick={() => onThreadSelect(thread.id)}
                  className={`w-full text-left p-3 hover:bg-gray-100 transition-colors ${
                    activeThreadId === thread.id ? 'bg-[#F5F5F0]' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                        <AvatarFallback>{otherParticipant.name[0]}</AvatarFallback>
                      </Avatar>
                      {otherParticipant.online && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {otherParticipant.name}
                          </p>
                          {thread.unreadCount > 0 && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-xs font-semibold">
                              {thread.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(thread.lastMessage.timestamp), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </div>
                      
                      <div className="mt-0.5 flex items-center space-x-2">
                        {otherParticipant.role && (
                          <span className="text-xs text-gray-500 truncate">
                            {otherParticipant.role}
                          </span>
                        )}
                        {otherParticipant.organization && (
                          <>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-500 truncate">
                              {otherParticipant.organization}
                            </span>
                          </>
                        )}
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-600 truncate">
                        {thread.lastMessage.content}
                      </p>
                      
                      {thread.lastMessage.attachments.length > 0 && (
                        <div className="mt-1 flex items-center space-x-1">
                          <svg className="h-3 w-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-gray-500">
                            {thread.lastMessage.attachments.length} pièce{thread.lastMessage.attachments.length > 1 ? 's' : ''} jointe{thread.lastMessage.attachments.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <InviteModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />
    </>
  );
}
