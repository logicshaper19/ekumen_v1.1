import { ChatList } from '../chat/ChatList';
import { ChatThread as ChatThreadComponent } from '../chat/ChatThread';
import { ChatThread, Message, ChatUser } from '@/types/chat';
import { FileText } from 'lucide-react';

interface MessagesTabProps {
  threads: ChatThread[];
  currentUser: ChatUser;
  selectedThread: ChatThread | null;
  messages: Message[];
  onThreadSelect: (threadId: string) => void;
  onSendMessage?: (content: string, threadId: string) => void;
}

export function MessagesTab({ 
  threads, 
  currentUser, 
  selectedThread,
  messages,
  onThreadSelect,
  onSendMessage
}: MessagesTabProps) {
  // Filter threads to only show those with valid participants
  const validThreads = threads.filter(thread => 
    thread.participants && 
    thread.participants.length > 0 && 
    thread.participants.every((participant: ChatUser) => participant.name && participant.id)
  );

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r border-gray-200">
        <ChatList
          threads={validThreads}
          selectedThread={selectedThread}
          onThreadSelect={onThreadSelect}
          currentUser={currentUser}
        />
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 border-r border-gray-200">
          {selectedThread ? (
            <ChatThreadComponent
              thread={selectedThread}
              messages={messages}
              currentUser={currentUser}
              onSendMessage={(content) => onSendMessage?.(content, selectedThread.id)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Sélectionnez une conversation pour commencer
            </div>
          )}
        </div>
        {selectedThread && messages.length > 0 && (
          <div className="w-80 p-4 bg-gray-50">
            <h3 className="font-semibold text-lg mb-4">Documents échangés</h3>
            <div className="space-y-3">
              {messages
                .filter(msg => msg.attachments && msg.attachments.length > 0)
                .map(msg => (
                  <div key={msg.id} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(msg.timestamp).toLocaleDateString('fr-FR')}
                    </div>
                    {msg.attachments?.map(attachment => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md group"
                      >
                        {attachment.type === 'image' ? (
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <FileText className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-medium text-gray-900 group-hover:text-[#005E5D]">
                            {attachment.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {attachment.size ? `${Math.round(attachment.size / 1024)}KB` : 'Unknown size'}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
