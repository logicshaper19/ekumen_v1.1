export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document';
  url: string;
  size?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Attachment[];
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  online?: boolean;
  lastSeen?: string;
}

export interface ChatThread {
  id: string;
  participants: ChatUser[];
  lastMessage?: Message;
  unreadCount?: number;
}
