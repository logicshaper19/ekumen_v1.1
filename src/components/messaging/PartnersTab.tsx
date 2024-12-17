import React, { useState } from 'react';
import { Search, Phone, Mail, Building2, MessageSquare, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Contact } from './types';
import { Message } from '@/types/chat';

interface PartnersTabProps {
  contacts: Contact[];
  messages: { [key: string]: Message[] };
  onMessagePartner: (partnerId: string) => void;
}

export function PartnersTab({ contacts, messages, onMessagePartner }: PartnersTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(searchTerm) ||
      contact.lastName.toLowerCase().includes(searchTerm) ||
      contact.company.toLowerCase().includes(searchTerm) ||
      contact.role.toLowerCase().includes(searchTerm)
    );
  });

  const getPartnerActivity = (partnerId: string) => {
    const partnerMessages = messages[partnerId] || [];
    const lastMessage = partnerMessages[partnerMessages.length - 1];
    const totalMessages = partnerMessages.length;
    
    return {
      lastActivity: lastMessage?.timestamp ? new Date(lastMessage.timestamp).toLocaleDateString() : 'Aucune activité',
      messageCount: totalMessages,
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-4">Partenaires</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher un partenaire..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          {filteredContacts.map(contact => {
            const activity = getPartnerActivity(contact.id);
            
            return (
              <div key={contact.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMessagePartner(contact.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-4 w-4 mr-2" />
                    {contact.company}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {contact.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.phone}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Activity className="h-4 w-4 mr-2" />
                      Dernière activité: {activity.lastActivity}
                    </div>
                    <div className="text-gray-600">
                      {activity.messageCount} messages
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
