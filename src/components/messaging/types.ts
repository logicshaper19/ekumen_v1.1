export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

export interface PartnersTabProps {
  contacts: Contact[];
  messages: { [key: string]: Message[] };
  onMessagePartner: (partnerId: string) => void;
  threads: ChatThread[];
  onThreadSelect: (threadId: string) => void;
  onSendMessage: (content: string, threadId: string, files?: File[]) => void;
}

import { Message, ChatThread } from '@/types/chat';
