import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatThread as ChatThreadType, Message, ChatUser, Attachment } from '@/types/chat';
import { Contact } from '../messaging/types';
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
      content: 'Voici les documents pour votre dossier de financement.',
      timestamp: '2024-12-16T11:30:00',
      read: false,
      attachments: [
        {
          id: 'doc-1',
          name: 'Dossier_Financement.pdf',
          type: 'document',
          url: 'https://example.com/financement.pdf',
          size: 2048576
        },
        {
          id: 'doc-2',
          name: 'Plan_Business.xlsx',
          type: 'document',
          url: 'https://example.com/business_plan.xlsx',
          size: 1548576
        }
      ]
    },
    {
      id: '2',
      senderId: 'current-user-id',
      receiverId: '1',
      content: 'Merci, voici les documents signés en retour.',
      timestamp: '2024-12-16T11:35:00',
      read: true,
      attachments: [
        {
          id: 'doc-3',
          name: 'Documents_Signes.pdf',
          type: 'document',
          url: 'https://example.com/documents_signes.pdf',
          size: 3048576
        }
      ]
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
  participants: [mockCurrentUser, {
    id: contact.id,
    name: `${contact.firstName} ${contact.lastName}`,
    role: contact.role,
    avatar: `/avatars/${contact.id}.jpg`,
    online: Math.random() > 0.5,
  }],
  lastMessage: mockMessages[contact.id]?.[mockMessages[contact.id]?.length - 1],
  unreadCount: mockMessages[contact.id]?.filter(m => !m.read && m.senderId !== 'current-user-id').length || 0,
})).filter(thread => thread.lastMessage);

export function Messagerie() {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedThread, setSelectedThread] = useState<ChatThreadType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleThreadSelect = (threadId: string) => {
    const thread = mockThreads.find(t => t.id === threadId);
    if (thread) {
      setSelectedThread(thread);
      setMessages(mockMessages[threadId] || []);
    }
  };

  const handleSendMessage = async (content: string, threadId: string, files?: File[]) => {
    const attachments: Attachment[] = [];
    
    // Process files if any
    if (files && files.length > 0) {
      for (const file of files) {
        const isImage = file.type.startsWith('image/');
        // In a real app, you would upload the file to a server and get a URL back
        const mockUrl = URL.createObjectURL(file);
        
        attachments.push({
          id: `attachment-${Date.now()}-${Math.random()}`,
          name: file.name,
          type: isImage ? 'image' : 'document',
          url: mockUrl,
          size: file.size,
        });
      }
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      senderId: mockCurrentUser.id,
      receiverId: mockContacts.find(c => c.id === threadId)?.id || '',
      timestamp: new Date().toISOString(),
      read: true,
      attachments,
    };

    // Update messages for the thread
    setMessages(prev => [...prev, newMessage]);

    // Update mockMessages and threads
    mockMessages[threadId] = [...(mockMessages[threadId] || []), newMessage];
  };

  const handleMessagePartner = (partnerId: string) => {
    setActiveTab('messages');
    handleThreadSelect(partnerId);
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[40px] font-bold text-black">Communication</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-5rem)]">
        <div className="flex justify-end mb-6">
          <TabsList className="bg-white p-1 h-auto">
            <TabsTrigger value="messages" className="px-4 py-2">Messages</TabsTrigger>
            <TabsTrigger value="partners" className="px-4 py-2">Partenaires</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="messages" className="h-[calc(100%-4rem)]">
          <MessagesTab
            threads={mockThreads}
            currentUser={mockCurrentUser}
            selectedThread={selectedThread}
            messages={messages}
            onThreadSelect={handleThreadSelect}
            onSendMessage={handleSendMessage}
          />
        </TabsContent>

        <TabsContent value="partners">
          <PartnersTab
            contacts={mockContacts}
            messages={mockMessages}
            onMessagePartner={handleMessagePartner}
            currentUser={mockCurrentUser}
            threads={mockThreads}
            onThreadSelect={handleThreadSelect}
            onSendMessage={handleSendMessage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}