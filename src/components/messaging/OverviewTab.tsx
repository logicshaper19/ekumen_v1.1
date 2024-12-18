import React from 'react';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { MessageSquare, Users, Clock } from 'lucide-react';
import { Contact } from './types';
import { Message, ChatThread } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface OverviewTabProps {
  contacts: Contact[];
  messages: { [key: string]: Message[] };
  threads: ChatThread[];
  onNavigateToMessages: () => void;
  onNavigateToPartners: () => void;
}

export function OverviewTab({
  contacts,
  messages,
  threads,
  onNavigateToMessages,
  onNavigateToPartners,
}: OverviewTabProps) {
  const totalMessages = Object.values(messages).flat().length;
  const unreadMessages = threads.reduce((acc, thread) => acc + (thread.unreadCount || 0), 0);
  const totalPartners = contacts.length;
  const recentActivity = Object.values(messages)
    .flat()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: fr });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsCard
          title="Messages"
          value={totalMessages.toString()}
          description={`${unreadMessages} messages non lus`}
          change={unreadMessages > 0 ? `+${unreadMessages}%` : '0%'}
          trend={unreadMessages > 0 ? 'up' : 'down'}
          icon={MessageSquare}
          onClick={onNavigateToMessages}
        />
        <AnalyticsCard
          title="Partenaires"
          value={totalPartners.toString()}
          description="Partenaires actifs"
          change={totalPartners > 0 ? `+${totalPartners}%` : '0%'}
          trend={totalPartners > 0 ? 'up' : 'down'}
          icon={Users}
          onClick={onNavigateToPartners}
        />
        <AnalyticsCard
          title="Dernière activité"
          value={recentActivity[0]?.timestamp ? formatTimestamp(recentActivity[0].timestamp) : '-'}
          description="Dernier message reçu"
          change={recentActivity.length > 0 ? `+${recentActivity.length}%` : '0%'}
          trend={recentActivity.length > 0 ? 'up' : 'down'}
          icon={Clock}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
        <div className="space-y-4">
          {recentActivity.map((message) => {
            const sender = contacts.find(c => c.id === message.senderId);
            return (
              <div key={message.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium">
                    {sender ? `${sender.firstName} ${sender.lastName}` : 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
