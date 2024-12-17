import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChatThreadType, ChatUser } from '@/types/chat';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { InviteModal } from './InviteModal';

interface ChatListProps {
  threads: ChatThreadType[];
  selectedThread: ChatThreadType | null;
  onThreadSelect: (threadId: string) => void;
  currentUser: ChatUser;
}

export function ChatList({ threads, selectedThread, onThreadSelect, currentUser }: ChatListProps) {
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
              const otherParticipant = thread.participants.find(p => p.id !== currentUser.id);
              if (!otherParticipant) return null;

              const lastMessage = thread.lastMessage;
              const messageTime = lastMessage ? new Date(lastMessage.timestamp) : null;
              const formattedTime = messageTime ? format(messageTime, 'HH:mm', { locale: fr }) : '';

              return (
                <button
                  key={thread.id}
                  onClick={() => onThreadSelect(thread.id)}
                  className={`w-full text-left p-3 hover:bg-gray-100 transition-colors ${
                    selectedThread?.id === thread.id ? 'bg-[#F5F5F0]' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        {otherParticipant.avatar && (
                          <AvatarImage 
                            src={otherParticipant.avatar} 
                            alt={otherParticipant.name} 
                          />
                        )}
                        <AvatarFallback>{otherParticipant.name.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      {otherParticipant.online && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {otherParticipant.name}
                          </p>
                          <p className="text-xs text-gray-500">{otherParticipant.role}</p>
                        </div>
                        {formattedTime && (
                          <span className="text-xs text-gray-500">{formattedTime}</span>
                        )}
                      </div>
                      {lastMessage && (
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {lastMessage.senderId === currentUser.id ? 'Vous : ' : ''}
                          {lastMessage.content}
                        </p>
                      )}
                      {thread.unreadCount > 0 && (
                        <div className="mt-1">
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">
                            {thread.unreadCount}
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
      {showInviteModal && (
        <InviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </>
  );
}
