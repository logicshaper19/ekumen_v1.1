import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatThread as ChatThreadType, Message, ChatUser } from '@/types/chat';
import { Contact } from '../messaging/types';
import { OverviewTab } from '../messaging/OverviewTab';
import { MessagesTab } from '../messaging/MessagesTab';
import { PartnersTab } from '../messaging/PartnersTab';

// Mock contacts data
const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@creditagricole.fr',
    phone: '06 12 34 56 78',
    company: 'Crédit Agricole',
    role: 'Conseillère Financière'
  },
  {
    id: '2',
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'j.martin@chambre-agriculture.fr',
    phone: '06 23 45 67 89',
    company: 'Chambre d\'Agriculture',
    role: 'Conseiller Technique'
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Laurent',
    email: 's.laurent@cooperative-agricole.fr',
    phone: '06 34 56 78 90',
    company: 'Coopérative Agricole',
    role: 'Responsable Commercial'
  },
  {
    id: '4',
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'p.durand@msa.fr',
    phone: '06 45 67 89 01',
    company: 'MSA',
    role: 'Gestionnaire de Compte'
  },
  {
    id: '5',
    firstName: 'Claire',
    lastName: 'Moreau',
    email: 'c.moreau@safer.fr',
    phone: '06 56 78 90 12',
    company: 'SAFER',
    role: 'Conseillère Foncier'
  }
];

// Mock messages data
const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      senderId: '1',
      receiverId: 'current-user-id',
      content: 'Votre dossier de financement pour le nouveau tracteur a été approuvé.',
      timestamp: '2024-12-16T11:30:00',
      read: false,
    },
    {
      id: '2',
      senderId: 'current-user-id',
      receiverId: '1',
      content: 'Merci beaucoup pour cette excellente nouvelle !',
      timestamp: '2024-12-16T11:35:00',
      read: true,
    }
  ],
  '2': [
    {
      id: '3',
      senderId: '2',
      receiverId: 'current-user-id',
      content: 'Je vous propose un rendez-vous la semaine prochaine pour discuter de votre plan de culture.',
      timestamp: '2024-12-15T14:20:00',
      read: false,
    }
  ],
  '3': [
    {
      id: '4',
      senderId: '3',
      receiverId: 'current-user-id',
      content: 'Les nouveaux prix pour les semences sont disponibles.',
      timestamp: '2024-12-14T09:15:00',
      read: true,
    }
  ]
};

const mockCurrentUser: ChatUser = {
  id: 'current-user-id',
  name: 'Vous',
  avatar: '/avatars/current-user.jpg',
  role: 'Agriculteur',
  online: true,
};

const mockThreads = mockContacts.map(contact => ({
  id: contact.id,
  participants: [mockCurrentUser, contact],
  lastMessage: mockMessages[contact.id]?.[mockMessages[contact.id]?.length - 1],
  unreadCount: mockMessages[contact.id]?.filter(m => !m.read && m.senderId !== 'current-user-id').length || 0,
})).filter(thread => thread.lastMessage);

export function Messagerie() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedThread, setSelectedThread] = useState<ChatThreadType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleThreadSelect = (threadId: string) => {
    const thread = mockThreads.find(t => t.id === threadId);
    if (thread) {
      setSelectedThread(thread);
      setMessages(mockMessages[threadId]);
    }
  };

  const handleMessagePartner = (partnerId: string) => {
    setActiveTab('messages');
    handleThreadSelect(partnerId);
  };

  const navigateToMessages = () => {
    setActiveTab('messages');
  };

  const navigateToPartners = () => {
    setActiveTab('partners');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-bold">Communication</h1>
        <p className="text-gray-600">Gérez vos messages et partenaires</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="partners">Partenaires</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            contacts={mockContacts}
            messages={mockMessages}
            threads={mockThreads}
            onNavigateToMessages={navigateToMessages}
            onNavigateToPartners={navigateToPartners}
          />
        </TabsContent>

        <TabsContent value="messages">
          <MessagesTab
            threads={mockThreads}
            messages={messages}
            selectedThread={selectedThread}
            currentUser={mockCurrentUser}
            onThreadSelect={handleThreadSelect}
          />
        </TabsContent>

        <TabsContent value="partners">
          <PartnersTab
            contacts={mockContacts}
            messages={mockMessages}
            onMessagePartner={handleMessagePartner}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}