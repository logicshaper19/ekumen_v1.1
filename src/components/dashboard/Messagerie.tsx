import React, { useState } from 'react';
import { ChatList } from '../chat/ChatList';
import { ChatThread } from '../chat/ChatThread';
import { ChatThread as ChatThreadType, Message, ChatUser } from '@/types/chat';

// Mock data
const mockUsers: ChatUser[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    avatar: '/avatars/marie.jpg',
    role: 'Agriculteur',
    organization: 'Crédit Agricole',
    online: true,
  },
  {
    id: '2',
    name: 'Jean Martin',
    avatar: '/avatars/jean.jpg',
    role: 'Conseiller',
    organization: 'Chambre d\'Agriculture',
    lastSeen: 'il y a 2h',
    online: false,
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    avatar: '/avatars/sophie.jpg',
    role: 'Responsable',
    organization: 'Coopérative Agricole',
    online: true,
  },
];

const mockCurrentUser: ChatUser = {
  id: 'current-user-id',
  name: 'Vous',
  avatar: '/avatars/current-user.jpg',
  role: 'Agriculteur',
  online: true,
};

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      senderId: '1',
      receiverId: 'current-user-id',
      content: 'Votre dossier de financement pour le nouveau tracteur a été approuvé.',
      timestamp: '2024-12-16T11:30:00',
      attachments: [
        {
          id: '1',
          type: 'document',
          url: '/documents/approval.pdf',
          name: 'Approbation_Financement.pdf',
          size: '2.4 MB'
        }
      ],
      read: true,
    },
    {
      id: '2',
      senderId: 'current-user-id',
      receiverId: '1',
      content: 'Merci beaucoup ! Je vais examiner les détails.',
      timestamp: '2024-12-16T11:35:00',
      attachments: [],
      read: true,
    }
  ],
  '2': [
    {
      id: '3',
      senderId: '2',
      receiverId: 'current-user-id',
      content: 'Je passerai demain pour évaluer l\'état des cultures.',
      timestamp: '2024-12-16T10:15:00',
      attachments: [],
      read: false,
    }
  ],
  '3': [
    {
      id: '4',
      senderId: '3',
      receiverId: 'current-user-id',
      content: 'Nouveaux prix des dispositions pour la saison à venir. À discuter ensemble.',
      timestamp: '2024-12-16T09:45:00',
      attachments: [
        {
          id: '2',
          type: 'document',
          url: '/documents/prices.pdf',
          name: 'Grille_Tarifaire_2024.pdf',
          size: '1.8 MB'
        }
      ],
      read: false,
    }
  ]
};

console.log('Mock Messages Available:', mockMessages);

const mockThreads = mockUsers.map(user => ({
  id: user.id,
  participants: [mockCurrentUser, user],
  lastMessage: mockMessages[user.id][mockMessages[user.id].length - 1],
  unreadCount: mockMessages[user.id].filter(m => !m.read && m.senderId !== 'current-user-id').length,
}));

export function Messagerie() {
  const [selectedThread, setSelectedThread] = useState<ChatThreadType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleThreadSelect = (threadId: string) => {
    const thread = mockThreads.find(t => t.id === threadId);
    if (thread) {
      setSelectedThread(thread);
      setMessages(mockMessages[threadId]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-bold">Messagerie</h1>
        <p className="text-gray-600">Vos conversations</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="w-full">
          <ChatList
            threads={mockThreads}
            activeThreadId={selectedThread?.id || null}
            onThreadSelect={handleThreadSelect}
          />
        </div>
        <div className="col-span-2">
          {selectedThread ? (
            <ChatThread
              thread={selectedThread}
              messages={messages}
              currentUser={mockCurrentUser}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Sélectionnez une conversation pour commencer
            </div>
          )}
        </div>
      </div>
    </div>
  );
}