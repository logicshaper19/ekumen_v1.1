import React, { useState } from 'react';
import { Send, Paperclip, X, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatMessage } from './ChatMessage';
import { DocumentsPanel } from './DocumentsPanel';
import { Message, ChatUser, ChatThreadType } from '@/types/chat';

interface ChatThreadProps {
  thread: ChatThreadType;
  messages?: Message[];
  currentUser: ChatUser;
  onSendMessage?: (content: string, attachments: File[]) => void;
}

export function ChatThread({ thread, messages = [], currentUser }: ChatThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showDocuments, setShowDocuments] = useState(false);

  // Get the other participant from the thread with null checks
  const participant = thread?.participants?.find(p => p.id !== currentUser?.id);
  const participantName = participant?.name || 'Unknown';
  const participantInitial = participantName.charAt(0) || 'U';

  // Count total attachments with null checks
  const totalAttachments = messages?.reduce(
    (sum, message) => sum + (message.attachments?.length || 0),
    0
  ) || 0;

  const handleSend = () => {
    if (newMessage.trim() || attachments.length > 0) {
      onSendMessage?.(newMessage.trim(), attachments);
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  if (!thread || !participant) {
    return <div className="flex items-center justify-center h-full text-gray-500">
      Conversation non disponible
    </div>;
  }

  return (
    <div className="flex-1 flex">
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={participant.avatar} alt={participantName} />
                <AvatarFallback>{participantInitial}</AvatarFallback>
              </Avatar>
              {participant.online && (
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-900">{participantName}</h2>
              <p className="text-xs text-gray-500">
                {participant.online ? 'En ligne' : participant.lastSeen ? `Vu ${participant.lastSeen}` : ''}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
            onClick={() => setShowDocuments(!showDocuments)}
          >
            <FileText className="h-4 w-4" />
            <span>{totalAttachments} document{totalAttachments > 1 ? 's' : ''}</span>
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id || index}
                message={message}
                isCurrentUser={message.senderId === currentUser.id}
                participant={participant}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Attachment Preview */}
        {attachments.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-1"
                >
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez votre message..."
                className="min-h-[44px]"
              />
            </div>
            <div className="flex space-x-2">
              <input
                type="file"
                id="file-upload"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Panel */}
      {showDocuments && (
        <DocumentsPanel
          messages={messages}
          onClose={() => setShowDocuments(false)}
        />
      )}
    </div>
  );
}
