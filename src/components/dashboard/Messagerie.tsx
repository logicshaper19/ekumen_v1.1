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

const mockMessages: Record<string, Message[]> = {
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

const mockThreads: ChatThreadType[] = mockUsers.map(user => ({
  id: user.id,
  participants: [user, {
    id: 'current-user-id',
    name: 'Vous',
    avatar: '/avatars/current-user.jpg',
    role: 'Agriculteur',
    online: true,
  }],
  lastMessage: mockMessages[user.id][mockMessages[user.id].length - 1],
  unreadCount: mockMessages[user.id].filter(m => !m.read && m.senderId !== 'current-user-id').length,
}));

export function Community() {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  
  const handleSendMessage = (content: string, attachments: File[]) => {
    // Here you would typically send the message to your backend
    console.log('Sending message:', { content, attachments });
  };

  const activeThread = activeThreadId 
    ? mockThreads.find(t => t.id === activeThreadId)
    : null;
  
  const activeParticipant = activeThread
    ? activeThread.participants.find(p => p.id !== 'current-user-id')
    : null;

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <ChatList
        threads={mockThreads}
        activeThreadId={activeThreadId}
        onThreadSelect={setActiveThreadId}
      />
      {activeThreadId && activeParticipant ? (
        <ChatThread
          messages={mockMessages[activeThreadId]}
          participant={activeParticipant}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Sélectionnez une conversation pour commencer
        </div>
      )}
    </div>
  );
}